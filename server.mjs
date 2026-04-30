// Minimal static file server that respects process.env.PORT
// Used only for the v0 preview sandbox. Production is served by Vercel directly.
// Also dispatches /api/* to the Vercel-style functions in /api so dev/prod stay aligned.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

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
  '.pdf':  'application/pdf',
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

/* ── Vercel-style API dispatcher ───────────────────────────────
   Maps /api/foo            → api/foo.js
        /api/foo/bar        → api/foo/bar.js
   The handler uses Express-like (req, res), with res.status() and
   res.setHeader() shimmed onto the bare http.ServerResponse. */
function shimRes(res) {
  res.status = (code) => { res.statusCode = code; return res }
  return res
}

async function handleApi(req, res) {
  const pathname = (req.url || '/').split('?')[0]
  // Try exact: /api/foo/bar -> api/foo/bar.js  then  /api/foo/bar/index.js
  const rel = pathname.replace(/^\//, '')
  const candidates = [
    join(root, rel + '.js'),
    join(root, rel + '.mjs'),
    join(root, rel, 'index.js'),
  ]
  const file = candidates.find(p => existsSync(p))
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'not-found' }))
  }
  try {
    const mod = await import(pathToFileURL(file).href + `?t=${Date.now()}`)
    const handler = mod.default
    if (typeof handler !== 'function') {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ error: 'no-default-export' }))
    }
    // Pre-parse JSON body for POST/PUT/PATCH so handlers can read req.body
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      let raw = ''
      await new Promise((rs, rj) => {
        req.on('data', c => { raw += c; if (raw.length > 64 * 1024) req.destroy() })
        req.on('end',  rs)
        req.on('error', rj)
      })
      if (raw) {
        try { req.body = JSON.parse(raw) } catch { req.body = raw }
      }
    }
    await handler(req, shimRes(res))
  } catch (err) {
    console.error('[api] handler error:', err)
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
    }
    res.end(JSON.stringify({ error: 'internal', message: err.message }))
  }
}

const server = createServer(async (req, res) => {
  try {
    const pathname = (req.url || '/').split('?')[0]
    if (pathname.startsWith('/api/')) return handleApi(req, res)

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
