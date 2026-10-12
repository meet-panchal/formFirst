export function applyTheme(isDark, animate = true) {
  const root = document.documentElement;
  if (animate) {
    root.classList.remove('theme-changing');
    void root.offsetWidth;
    root.classList.add('theme-changing');
    clearTimeout(applyTheme.timeoutId);
    applyTheme.timeoutId = setTimeout(() => root.classList.remove('theme-changing'), 360);
  }

  root.dataset.theme = isDark ? 'dark' : 'light';
  root.style.colorScheme = isDark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#11110f' : '#fffdf6');
  document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')?.setAttribute('content', isDark ? 'black-translucent' : 'default');
}
