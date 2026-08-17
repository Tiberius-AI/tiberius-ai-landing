const { isIP } = require("node:net");
const { URL, URLSearchParams } = require("node:url");

const UUID = "[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}";
const ROUTES = [
  ["POST", /^\/api\/access\/(?:requests|join)$/],
  ["GET", /^\/api\/me$/],
  ["GET", /^\/api\/orientation$/],
  ["POST", /^\/api\/orientation\/answer$/],
  ["GET", /^\/api\/(?:leads|conversations|appointments)$/],
  ["POST", /^\/api\/(?:leads|conversations|appointments)$/],
  ["GET", /^\/api\/alfred\/(?:status|memories|conversations)$/],
  ["GET", new RegExp(`^/api/alfred/conversations/${UUID}/messages$`)],
  ["POST", /^\/api\/alfred\/(?:chat|voice-sessions|transcribe|tts)$/],
  ["POST", new RegExp(`^/api/alfred/voice-sessions/${UUID}/end$`)],
  ["GET", /^\/api\/actions$/],
  ["POST", /^\/api\/actions\/drafts$/],
  ["GET", new RegExp(`^/api/actions/${UUID}$`)],
  ["PATCH", new RegExp(`^/api/actions/${UUID}/draft$`)],
  ["POST", new RegExp(`^/api/actions/${UUID}/(?:request-review|reject|approve)$`)],
];

function isAllowedRoute(method, path) {
  return typeof method === "string" && typeof path === "string" &&
    ROUTES.some(([allowedMethod, pattern]) => allowedMethod === method.toUpperCase() && pattern.test(path));
}

function selectRequestHeaders(headers, edgeKey) {
  const selected = {};
  for (const name of ["authorization", "content-type", "accept"]) {
    const value = headers[name];
    if (typeof value === "string" && value.length > 0) selected[name] = value;
  }
  selected["x-tiberius-edge-key"] = edgeKey;
  const forwarded = typeof headers["x-forwarded-for"] === "string"
    ? headers["x-forwarded-for"].split(",", 1)[0].trim()
    : "";
  if (isIP(forwarded)) selected["x-tiberius-client-ip"] = forwarded;
  return selected;
}

function getUpstreamOrigin() {
  const raw = process.env.TIBERIUS_FUNNEL_ORIGIN || "";
  const parsed = new URL(raw);
  if (parsed.protocol !== "https:" || parsed.pathname !== "/" || parsed.search || parsed.hash) {
    throw new Error("TIBERIUS_FUNNEL_ORIGIN must be an HTTPS origin");
  }
  return parsed.origin;
}

function getPath(req) {
  const raw = req.query && req.query.path;
  const values = (Array.isArray(raw) ? raw : typeof raw === "string" ? [raw] : [])
    .flatMap((part) => String(part).split("/"))
    .filter((part) => part.length > 0);
  return `/${values.map((part) => encodeURIComponent(decodeURIComponent(part))).join("/")}`;
}

function getSearch(req) {
  const search = new URLSearchParams();
  for (const [name, raw] of Object.entries(req.query || {})) {
    if (name === "path") continue;
    const values = Array.isArray(raw) ? raw : [raw];
    for (const value of values) search.append(name, String(value));
  }
  const encoded = search.toString();
  return encoded ? `?${encoded}` : "";
}

async function readBoundedBody(req, maxBytes = 6 * 1024 * 1024) {
  if (req.method === "GET" || req.method === "HEAD") return undefined;
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > maxBytes) {
      const error = new Error("Request body too large");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(buffer);
  }
  return Buffer.concat(chunks);
}

function proxyErrorCode(error) {
  const code = error && error.cause && error.cause.code;
  return typeof code === "string" && /^[A-Z0-9_]{1,64}$/.test(code) ? code : "unknown";
}

async function handler(req, res) {
  const path = getPath(req);
  if (!isAllowedRoute(req.method, path)) {
    return res.status(404).json({ detail: "Not found" });
  }

  const edgeKey = process.env.TIBERIUS_FUNNEL_EDGE_KEY || "";
  if (Buffer.byteLength(edgeKey) < 32) {
    return res.status(503).json({ detail: "Service unavailable" });
  }

  try {
    const body = await readBoundedBody(req);
    const upstream = await fetch(`${getUpstreamOrigin()}${path}${getSearch(req)}`, {
      method: req.method,
      headers: selectRequestHeaders(req.headers, edgeKey),
      body,
      redirect: "manual",
      signal: AbortSignal.timeout(25000),
    });
    const payload = Buffer.from(await upstream.arrayBuffer());
    const contentType = upstream.headers.get("content-type");
    if (contentType) res.setHeader("content-type", contentType);
    res.setHeader("cache-control", "no-store");
    return res.status(upstream.status).send(payload);
  } catch (error) {
    if (error && error.statusCode === 413) {
      return res.status(413).json({ detail: "Request body too large" });
    }
    console.error("Alfred router proxy failed", proxyErrorCode(error));
    return res.status(502).json({ detail: "Service unavailable" });
  }
}

module.exports = handler;
module.exports.getPath = getPath;
module.exports.isAllowedRoute = isAllowedRoute;
module.exports.selectRequestHeaders = selectRequestHeaders;
module.exports.proxyErrorCode = proxyErrorCode;
module.exports.readBoundedBody = readBoundedBody;
module.exports.config = { api: { bodyParser: false } };
