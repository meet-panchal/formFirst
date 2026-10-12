#!/usr/bin/env python3
"""Build the zero-config classic browser bundle from the ES-module source graph.

This is a compatibility bridge until Form First moves to a real production bundler
(Vite/Rolldown). It intentionally discovers dependencies from imports instead of
maintaining a second hand-written module list, which prevents source/build drift.
"""

from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
ENTRY = ROOT / 'src' / 'app-controller.js'
OUTPUT = ROOT / 'app.js'

IMPORT_RE = re.compile(
    r"(?ms)^\s*import\s+(?:[\s\S]*?\s+from\s+)?['\"]([^'\"]+)['\"]\s*;\s*"
)
EXPORT_RE = re.compile(r'(?m)^export\s+')

IMPORT_STATEMENT_RE = re.compile(r"(?ms)^\s*import\s+([\s\S]*?)\s+from\s+['\"]([^'\"]+)['\"]\s*;\s*")
SIDE_EFFECT_IMPORT_RE = re.compile(r"(?m)^\s*import\s+['\"][^'\"]+['\"]\s*;\s*")
MODULE_SYNTAX_RE = re.compile(r'(?m)^\s*(?:import|export)\s')
TOP_LEVEL_DECL_RE = re.compile(r'(?m)^(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)')

HEADER = """/**
 * Form First browser bundle - GENERATED FILE.
 * Source modules live under /src.
 * Run: python scripts/build-browser-bundle.py
 *
 * A classic script is intentional for the current zero-config local-file workflow.
 * The source graph remains standards-based ES modules and is ready for the planned
 * Vite production-build migration.
 */
'use strict';
"""


def assert_compatibility_imports(path: Path, source: str) -> None:
    # This temporary classic-bundle bridge intentionally supports only direct named
    # imports. Aliases/default/namespace imports are valid ES modules, but simply
    # stripping them would change runtime bindings and can produce a blank app.
    # Fail loudly until Vite replaces this bridge.
    if SIDE_EFFECT_IMPORT_RE.search(source):
        raise RuntimeError(
            f'Unsupported side-effect import in {path.relative_to(ROOT)}; '
            'the compatibility bundler requires direct named imports'
        )

    for clause, _specifier in IMPORT_STATEMENT_RE.findall(source):
        normalized = ' '.join(clause.split())
        if not (normalized.startswith('{') and normalized.endswith('}')):
            raise RuntimeError(
                f'Unsupported default/namespace import in {path.relative_to(ROOT)}: {normalized}'
            )
        if re.search(r'\bas\b', normalized):
            raise RuntimeError(
                f'Unsupported import alias in {path.relative_to(ROOT)}: {normalized}. '
                'Use the exported binding name until the Vite migration.'
            )


def imports_for(path: Path) -> list[Path]:
    source = path.read_text(encoding='utf-8')
    assert_compatibility_imports(path, source)
    dependencies: list[Path] = []

    for specifier in IMPORT_RE.findall(source):
        if not specifier.startswith('.'):
            raise RuntimeError(f'Unsupported non-relative import in {path.relative_to(ROOT)}: {specifier}')

        resolved = (path.parent / specifier).resolve()
        if resolved.suffix == '':
            resolved = resolved.with_suffix('.js')
        if not resolved.is_file():
            raise RuntimeError(f'Missing import in {path.relative_to(ROOT)}: {specifier}')
        if ROOT not in resolved.parents:
            raise RuntimeError(f'Import escapes project root in {path.relative_to(ROOT)}: {specifier}')
        dependencies.append(resolved)

    return dependencies


def dependency_order(entry: Path) -> list[Path]:
    ordered: list[Path] = []
    visiting: set[Path] = set()
    visited: set[Path] = set()

    def visit(path: Path) -> None:
        if path in visited:
            return
        if path in visiting:
            cycle = ' -> '.join(str(item.relative_to(ROOT)) for item in [*visiting, path])
            raise RuntimeError(f'Circular source dependency detected: {cycle}')

        visiting.add(path)
        for dependency in imports_for(path):
            visit(dependency)
        visiting.remove(path)
        visited.add(path)
        ordered.append(path)

    visit(entry)
    return ordered


def strip_module_syntax(source: str) -> str:
    return EXPORT_RE.sub('', IMPORT_RE.sub('', source)).strip()


def assert_no_global_collisions(sections: list[tuple[Path, str]]) -> None:
    owners: dict[str, Path] = {}
    for path, source in sections:
        for symbol in TOP_LEVEL_DECL_RE.findall(source):
            previous = owners.get(symbol)
            if previous and previous != path:
                raise RuntimeError(
                    f'Classic-bundle global collision for {symbol!r}: '
                    f'{previous.relative_to(ROOT)} and {path.relative_to(ROOT)}'
                )
            owners[symbol] = path


def main() -> None:
    if not ENTRY.is_file():
        raise RuntimeError(f'Missing entry module: {ENTRY.relative_to(ROOT)}')

    ordered_paths = dependency_order(ENTRY)
    sections: list[tuple[Path, str]] = []
    for path in ordered_paths:
        source = strip_module_syntax(path.read_text(encoding='utf-8'))
        sections.append((path, source))

    assert_no_global_collisions(sections)

    output_sections = [HEADER.strip()]
    for path, source in sections:
        output_sections.append(f'/* ===== {path.relative_to(ROOT).as_posix()} ===== */\n{source}')

    bundle = '\n\n'.join(output_sections) + '\n'
    if MODULE_SYNTAX_RE.search(bundle):
        raise RuntimeError('Generated classic bundle still contains ES-module syntax')

    OUTPUT.write_text(bundle, encoding='utf-8')
    print(f'Built {OUTPUT.name} from {len(ordered_paths)} source modules')
    for path in ordered_paths:
        print(f'  - {path.relative_to(ROOT).as_posix()}')


if __name__ == '__main__':
    main()
