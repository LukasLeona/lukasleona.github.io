import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = decodeURIComponent(new URL(".", import.meta.url).pathname).replace(/^\/(?:([A-Za-z]):)/, "$1:");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
};

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const file = normalize(join(root, relative));

  if (!file.startsWith(normalize(root)) || !existsSync(file) || statSync(file).isDirectory()) {
    response.writeHead(404).end("Not found");
    return;
  }

  const size = statSync(file).size;
  const type = types[extname(file).toLowerCase()] || "application/octet-stream";
  const range = request.headers.range;

  if (range) {
    const [startText, endText] = range.replace("bytes=", "").split("-");
    const start = Number(startText);
    const end = endText ? Number(endText) : size - 1;
    response.writeHead(206, {
      "Accept-Ranges": "bytes",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": end - start + 1,
      "Content-Type": type,
      "Cache-Control": "no-cache",
    });
    createReadStream(file, { start, end }).pipe(response);
    return;
  }

  response.writeHead(200, {
    "Accept-Ranges": "bytes",
    "Content-Length": size,
    "Content-Type": type,
    "Cache-Control": "no-cache",
  });
  createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`FORMA preview: http://127.0.0.1:${port}`);
});
