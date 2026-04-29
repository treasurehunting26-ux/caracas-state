// Minimal static file server that respects process.env.PORT
// Used only for the v0 preview sandbox. Production is served by Vercel directly.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('.', import.meta.url)))
const port = Number(process.env.PORT) || 3000
const host = '0.0.0.0'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif':  'image/gif',
  '.ico':  'image/x-icon',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml; charset=utf-8',
}

async function resolvePath(urlPath) {
  // strip query string + decode
  const clean = decodeURIComponent(urlPath.split('?')[0])
  // prevent path traversal
  const safe = normalize(clean).replace(/^(\.\.[/\\])+/, '')
  let target = join(root, safe)

  try {
    const st = await stat(target)
    if (st.isDirectory()) target = join(target, 'index.html')
    return target
  } catch {
    // try clean URLs: /security -> /security.html
    if (!extname(safe)) {
      try {
        const withHtml = join(root, safe + '.html')
        await stat(withHtml)
        return withHtml
      } catch {}
    }
    return null
  }
}

const server = createServer(async (req, res) => {
  try {
    const file = await resolvePath(req.url || '/')
    if (!file) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      return res.end('404 Not Found')
    }
    const data = await readFile(file)
    const type = MIME[extname(file).toLowerCase()] || 'application/octet-stream'
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-cache',
    })
    res.end(data)
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('500 Server Error: ' + err.message)
  }
})

server.listen(port, host, () => {
  console.log(`[dev] Caracas Luxury Estate serving on http://${host}:${port}`)
})
