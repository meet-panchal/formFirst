import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { defineConfig } from 'vite';

/**
 * Collect files from a directory recursively and return paths with `/` separators.
 */
async function listFiles(directory, relativeDirectory = '') {
  const currentDirectory = path.join(directory, relativeDirectory);
  const entries = await readdir(currentDirectory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relativePath = path.posix.join(
      relativeDirectory.split(path.sep).join('/'),
      entry.name,
    );

    if (entry.isDirectory()) {
      files.push(...await listFiles(directory, relativePath));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }

  return files;
}

/**
 * Keep the small, essential public assets available offline at first launch.
 * Exercise movement/target images are cached at runtime as the user opens them.
 */
function shouldPrecachePublicFile(file) {
  return (
    file === 'manifest.webmanifest' ||
    file === 'favicon.ico' ||
    file.startsWith('icons/') ||
    file.startsWith('assets/branding/') ||
    file.startsWith('assets/nav/') ||
    file.startsWith('assets/warmup/') ||
    file === 'assets/icons8-fire-transparent.png'
  );
}

/**
 * Generate a precache manifest from Vite's real output plus selected public files.
 * The service worker reads this file during its install event.
 */
function formFirstPrecachePlugin() {
  let publicDirectory = '';

  return {
    name: 'form-first-precache-manifest',
    apply: 'build',
    enforce: 'post',

    configResolved(config) {
      publicDirectory = config.publicDir;
    },

    async generateBundle(_outputOptions, bundle) {
      if (!publicDirectory) {
        this.warn('Public directory is not configured; only bundled files will be precached.');
      }

      const bundledFiles = Object.keys(bundle)
        .filter((file) => !file.endsWith('.map'));

      const publicFiles = publicDirectory
        ? (await listFiles(publicDirectory)).filter(shouldPrecachePublicFile)
        : [];

      const precacheFiles = [...new Set([
        './',
        './index.html',
        ...bundledFiles.map((file) => `./${file}`),
        ...publicFiles.map((file) => `./${file}`),
      ])].sort();

      this.emitFile({
        type: 'asset',
        fileName: 'precache-manifest.json',
        source: `${JSON.stringify(precacheFiles, null, 2)}\n`,
      });

      this.info(`Generated precache manifest with ${precacheFiles.length} entries.`);
    },
  };
}

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  // Keep local previews at `/`; use the repository subpath only in GitHub Actions.
  base: isGitHubActions ? '/formFirst/' : './',
  publicDir: 'public',

  plugins: [formFirstPrecachePlugin()],

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },

  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true,
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true,
  },
});
