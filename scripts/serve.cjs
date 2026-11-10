const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const ALLOWED_ROOT_FILES = new Set(['index.html', 'manifest.webmanifest', 'splash.js', 'sw.js', 'favicon.ico']);
const ALLOWED_DIRECTORIES = new Set(['assets', 'css', 'icons', 'src']);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4'
};

http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end('Bad request');
    return;
  }

  let file = path.resolve(ROOT, `.${pathname}`);
  const relative = path.relative(ROOT, file);
  const firstSegment = relative.split(path.sep)[0];
  if (relative.startsWith('..') || path.isAbsolute(relative)
      || (relative && !ALLOWED_ROOT_FILES.has(relative) && !ALLOWED_DIRECTORIES.has(firstSegment))) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  if (file === ROOT) file = path.join(ROOT, 'index.html');
  fs.stat(file, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404).end('Not found');
      return;
    }

    const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
    const range = request.headers.range?.match(/^bytes=(\d*)-(\d*)$/);
    if (range) {
      const start = range[1] ? Number(range[1]) : 0;
      const end = range[2] ? Math.min(Number(range[2]), stats.size - 1) : stats.size - 1;
      if (start <= end && start < stats.size) {
        response.writeHead(206, {
          'Accept-Ranges': 'bytes',
          'Content-Range': `bytes ${start}-${end}/${stats.size}`,
          'Content-Length': end - start + 1,
          'Content-Type': type,
          'Cache-Control': 'no-cache'
        });
        if (request.method === 'HEAD') response.end();
        else fs.createReadStream(file, { start, end }).pipe(response);
        return;
      }
    }

    response.writeHead(200, {
      'Accept-Ranges': 'bytes',
      'Content-Length': stats.size,
      'Content-Type': type,
      'Cache-Control': 'no-cache'
    });
    if (request.method === 'HEAD') response.end();
    else fs.createReadStream(file).pipe(response);
  });
}).listen(5173, '0.0.0.0', () => {
  console.log('Form First is available at http://localhost:5173');
});
