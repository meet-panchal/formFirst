import { escapeHtml } from '../core/html.js';
import { ICON } from './icons.js';

function browserHost(url) {
  try { return new URL(url, window.location.href).hostname.replace(/^www\./, ''); }
  catch { return 'Web'; }
}

function openFormBrowser(url, title, source, onUnavailable) {
  const safeUrl = String(url || '').trim();
  if (!/^https?:\/\//i.test(safeUrl)) { onUnavailable(); return; }

  document.getElementById('formWebView')?.remove();
  const overlay = document.createElement('section');
  overlay.id = 'formWebView';
  overlay.className = 'form-webview';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `${title} web view`);
  const safeTitle = escapeHtml(title);
  const safeSource = escapeHtml(source || 'Watch Form');
  const safeHost = escapeHtml(browserHost(safeUrl));
  const safeFrameUrl = escapeHtml(safeUrl);
  overlay.innerHTML = `<div class="form-webview-shell"><header class="form-webview-bar"><button type="button" class="form-webview-done" id="formWebViewDone">Done</button><div class="form-webview-title"><strong>${safeSource}</strong><small>${safeHost}</small></div><button type="button" class="form-webview-external" id="formWebViewExternal" aria-label="Open in Safari">${ICON.external}</button></header><div class="form-webview-content"><div class="form-webview-loading" id="formWebViewLoading" aria-live="polite"><span class="form-webview-spinner" aria-hidden="true"></span><span>Loading form guide…</span></div><iframe class="form-webview-frame" id="formWebViewFrame" src="${safeFrameUrl}" title="${safeTitle}" referrerpolicy="strict-origin-when-cross-origin" allow="fullscreen" loading="eager"></iframe><div class="form-webview-fallback" id="formWebViewFallback"><span>If this website blocks in-app viewing, open it in Safari.</span><button type="button" id="formWebViewFallbackOpen">Open in Safari</button></div></div></div>`;
  document.body.appendChild(overlay);
  document.body.classList.add('form-webview-open');
  requestAnimationFrame(() => overlay.classList.add('is-visible'));

  let closed = false;
  const onKey = event => { if (event.key === 'Escape') close(); };
  const close = () => {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey);
    overlay.classList.remove('is-visible');
    document.body.classList.remove('form-webview-open');
    setTimeout(() => overlay.remove(), 280);
  };
  const openExternal = () => window.open(safeUrl, '_blank', 'noopener,noreferrer');

  overlay.querySelector('#formWebViewDone')?.addEventListener('click', close);
  overlay.querySelector('#formWebViewExternal')?.addEventListener('click', openExternal);
  overlay.querySelector('#formWebViewFallbackOpen')?.addEventListener('click', openExternal);
  const frame = overlay.querySelector('#formWebViewFrame');
  const loading = overlay.querySelector('#formWebViewLoading');
  frame?.addEventListener('load', () => loading?.classList.add('is-hidden'), { once: true });
  frame?.addEventListener('error', () => {
    loading?.classList.add('is-hidden');
    overlay.querySelector('#formWebViewFallback')?.classList.add('is-prominent');
  }, { once: true });
  document.addEventListener('keydown', onKey);
}

function openPicker(exercise, links, onUnavailable) {
  document.getElementById('formPicker')?.remove();
  const overlay = document.createElement('div');
  overlay.id = 'formPicker';
  overlay.className = 'form-picker-backdrop';
  const exerciseName = escapeHtml(exercise.name);
  overlay.innerHTML = `<div class="form-picker" role="dialog" aria-modal="true" aria-label="Choose form guide"><div class="form-picker-handle"></div><div class="form-picker-head"><div><small>WATCH FORM</small><strong>${exerciseName}</strong></div><button type="button" class="form-picker-close" aria-label="Close">${ICON.close}</button></div><div class="form-picker-list">${links.map((link, index) => `<button type="button" class="form-picker-option" data-form-index="${index}"><span><strong>${escapeHtml(link.label)}</strong><small>${escapeHtml(link.source)}</small></span><span class="form-picker-arrow">${ICON.external}</span></button>`).join('')}</div></div>`;
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  overlay.querySelector('.form-picker-close')?.addEventListener('click', close);
  overlay.querySelectorAll('[data-form-index]').forEach(button => button.addEventListener('click', () => {
    const link = links[Number(button.dataset.formIndex)];
    if (link) openFormBrowser(link.url, link.label || `${exercise.name} form guide`, link.source || 'Watch Form', onUnavailable);
    close();
  }));
}

export function openFormGuide(exercise, { showToast } = {}) {
  const onUnavailable = () => showToast?.('Form guide unavailable for this exercise');
  const links = exercise.formLinks || [];
  if (!links.length) { onUnavailable(); return; }
  if (links.length === 1) {
    const link = links[0];
    openFormBrowser(link.url, link.label || `${exercise.name} form guide`, link.source || 'Watch Form', onUnavailable);
    return;
  }
  openPicker(exercise, links, onUnavailable);
}
