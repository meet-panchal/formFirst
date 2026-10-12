#!/usr/bin/env python3
"""Static release verification for the zero-config Form First build.

This intentionally checks the failure modes that have caused regressions in past
builds: unresolved local assets, stale service-worker shell entries, module syntax
leaking into the classic browser bundle, orphaned CSS, and duplicate binary assets.
"""
from __future__ import annotations

from collections import defaultdict
from pathlib import Path
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]

RUNTIME_TEXT_FILES = [
    ROOT / 'index.html',
    ROOT / 'styles.css',
    ROOT / 'splash.js',
    ROOT / 'sw.js',
    ROOT / 'manifest.webmanifest',
    *sorted((ROOT / 'src').rglob('*.js')),
]

LOCAL_REF_RE = re.compile(
    r"(?P<quote>['\"])(?P<path>\./(?:assets|icons)/[^'\"?#]+|\./(?:favicon\.ico|manifest\.webmanifest|styles\.css|app\.js|splash\.js|sw\.js|index\.html))(?P=quote)"
)
CSS_URL_RE = re.compile(r"url\(\s*['\"]?(?P<path>\./(?:assets|icons)/[^)'\"?#]+)['\"]?\s*\)")
CLASS_SELECTOR_RE = re.compile(r"(?<![\w-])\.([A-Za-z_][\w-]*)")
MODULE_SYNTAX_RE = re.compile(r"(?m)^\s*(?:import|export)\s")
APP_SHELL_RE = re.compile(r"(?ms)const\s+APP_SHELL\s*=\s*\[(.*?)\];")
QUOTED_RELATIVE_RE = re.compile(r"['\"](\./[^'\"]+)['\"]")


def fail(message: str) -> None:
    print(f'FAIL {message}', file=sys.stderr)
    raise SystemExit(1)


def resolve_relative(path: str) -> Path:
    clean = path.split('?', 1)[0].split('#', 1)[0]
    if clean in {'./', '.'}:
        return ROOT
    return (ROOT / clean.removeprefix('./')).resolve()


def runtime_text() -> str:
    return '\n'.join(path.read_text(encoding='utf-8') for path in RUNTIME_TEXT_FILES if path.is_file())


def verify_manifest() -> None:
    try:
        manifest = json.loads((ROOT / 'manifest.webmanifest').read_text(encoding='utf-8'))
    except Exception as error:
        fail(f'manifest.webmanifest is invalid JSON: {error}')

    for icon in manifest.get('icons', []):
        src = icon.get('src')
        if src and src.startswith('./') and not resolve_relative(src).is_file():
            fail(f'manifest icon is missing: {src}')


def verify_bundle() -> None:
    bundle = (ROOT / 'app.js').read_text(encoding='utf-8')
    if MODULE_SYNTAX_RE.search(bundle):
        fail('classic app.js contains ES-module import/export syntax')


def collect_local_refs() -> set[str]:
    refs: set[str] = set()
    for path in RUNTIME_TEXT_FILES:
        if not path.is_file():
            continue
        text = path.read_text(encoding='utf-8')
        refs.update(match.group('path') for match in LOCAL_REF_RE.finditer(text))
        if path.name == 'styles.css':
            refs.update(match.group('path') for match in CSS_URL_RE.finditer(text))
    return refs


def verify_local_refs() -> int:
    refs = collect_local_refs()
    missing = sorted(ref for ref in refs if not resolve_relative(ref).is_file())
    if missing:
        fail('missing local references:\n  ' + '\n  '.join(missing))
    return len(refs)


def verify_service_worker_shell() -> int:
    sw = (ROOT / 'sw.js').read_text(encoding='utf-8')
    match = APP_SHELL_RE.search(sw)
    if not match:
        fail('service worker APP_SHELL could not be parsed')
    shell_refs = QUOTED_RELATIVE_RE.findall(match.group(1))
    missing = sorted(ref for ref in shell_refs if not resolve_relative(ref).exists())
    if missing:
        fail('service-worker shell contains missing paths:\n  ' + '\n  '.join(missing))
    return len(shell_refs)


def verify_css_producers() -> tuple[int, int]:
    css = (ROOT / 'styles.css').read_text(encoding='utf-8')
    classes = set(CLASS_SELECTOR_RE.findall(css))
    producer_text = (ROOT / 'index.html').read_text(encoding='utf-8')
    producer_text += '\n' + '\n'.join(path.read_text(encoding='utf-8') for path in (ROOT / 'src').rglob('*.js'))
    producer_text += '\n' + (ROOT / 'splash.js').read_text(encoding='utf-8')

    orphaned = [
        name for name in sorted(classes)
        if not re.search(rf'(?<![\w-]){re.escape(name)}(?![\w-])', producer_text)
    ]
    if orphaned:
        fail('CSS classes have no runtime producer:\n  ' + '\n  '.join(orphaned))
    return len(classes), len(orphaned)


def binary_assets() -> list[Path]:
    candidates = []
    for directory in (ROOT / 'assets', ROOT / 'icons'):
        if directory.exists():
            candidates.extend(path for path in directory.rglob('*') if path.is_file())
    if (ROOT / 'favicon.ico').is_file():
        candidates.append(ROOT / 'favicon.ico')
    return sorted(candidates)


def verify_assets() -> tuple[int, int, int]:
    assets = binary_assets()
    runtime = runtime_text()
    unused: list[Path] = []
    hashes: dict[str, list[Path]] = defaultdict(list)

    for path in assets:
        relative = './' + path.relative_to(ROOT).as_posix()
        # Runtime references can be relative strings in data/CSS/HTML/service worker.
        if relative not in runtime:
            unused.append(path)
        hashes[hashlib.sha256(path.read_bytes()).hexdigest()].append(path)

    if unused:
        fail('unreferenced packaged assets:\n  ' + '\n  '.join(str(p.relative_to(ROOT)) for p in unused))

    duplicates = [group for group in hashes.values() if len(group) > 1]
    if duplicates:
        formatted = '\n'.join('  ' + ', '.join(str(p.relative_to(ROOT)) for p in group) for group in duplicates)
        fail('byte-identical packaged assets remain:\n' + formatted)

    return len(assets), len(unused), len(duplicates)


def main() -> None:
    required = ['index.html', 'styles.css', 'app.js', 'splash.js', 'sw.js', 'manifest.webmanifest']
    for name in required:
        if not (ROOT / name).is_file():
            fail(f'missing required runtime file: {name}')

    verify_manifest()
    verify_bundle()
    ref_count = verify_local_refs()
    shell_count = verify_service_worker_shell()
    class_count, orphan_count = verify_css_producers()
    asset_count, unused_count, duplicate_count = verify_assets()

    print('PASS release verification')
    print(f'  local runtime refs: {ref_count} (0 missing)')
    print(f'  service-worker shell entries: {shell_count} (0 missing)')
    print(f'  CSS classes: {class_count} ({orphan_count} orphaned)')
    print(f'  packaged assets: {asset_count} ({unused_count} unused, {duplicate_count} duplicate groups)')


if __name__ == '__main__':
    main()
