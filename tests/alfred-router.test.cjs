const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const { getPath, isAllowedRoute, selectRequestHeaders, proxyErrorCode, fetchUpstream } = require("../api/alfred-router.js");

const vercel = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "vercel.json"), "utf8"));
const proxySource = fs.readFileSync(path.join(__dirname, "..", "api", "alfred-router.js"), "utf8");
test("routes every same-origin proxy subpath to the single Vercel function", () => {
  assert.deepEqual(vercel.rewrites, [
    { source: "/api/alfred-router/:path*", destination: "/api/alfred-router?path=:path*" },
  ]);
  assert.equal(getPath({ query: { path: "api/access/requests" } }), "/api/access/requests");
  assert.equal(getPath({ query: { path: ["api", "me"] } }), "/api/me");
});

test("allows long reasoning-model requests to finish through the production proxy", () => {
  const timeout = Number(proxySource.match(/AbortSignal\.timeout\((\d+)\)/)?.[1] || 0);
  assert.ok(timeout >= 80000, `proxy timeout too short: ${timeout}`);
  assert.ok(vercel.functions?.["api/alfred-router.js"]?.maxDuration >= 90);
});

test("allows only the dashboard's exact public and authenticated API routes", () => {
  const allowed = [
    ["POST", "/api/access/requests"],
    ["POST", "/api/access/join"],
    ["GET", "/api/me"],
    ["GET", "/api/orientation"],
    ["POST", "/api/orientation/answer"],
    ["GET", "/api/alfred/status"],
    ["POST", "/api/alfred/chat"],
    ["GET", "/api/alfred/conversations/00000000-0000-0000-0000-000000000001/messages"],
    ["POST", "/api/actions/drafts"],
    ["PATCH", "/api/actions/00000000-0000-0000-0000-000000000001/draft"],
    ["POST", "/api/actions/00000000-0000-0000-0000-000000000001/approve"],
    ["GET", "/api/integrations/docusign/status"],
    ["GET", "/api/integrations/docusign/callback"],
    ["POST", "/api/integrations/docusign/connect"],
    ["POST", "/api/actions/00000000-0000-0000-0000-000000000001/docusign/draft"],
    ["POST", "/api/actions/00000000-0000-0000-0000-000000000001/docusign/sender-view"],
  ];
  for (const [method, path] of allowed) {
    assert.equal(isAllowedRoute(method, path), true, `${method} ${path}`);
  }
});

test("blocks operator, documentation, health, malformed, and method-confused routes", () => {
  const blocked = [
    ["GET", "/api/operator/access/requests"],
    ["POST", "/api/operator/access/invitations/internal-test"],
    ["GET", "/docs"],
    ["GET", "/openapi.json"],
    ["GET", "/health"],
    ["GET", "/api/access/requests"],
    ["DELETE", "/api/actions/00000000-0000-0000-0000-000000000001"],
    ["GET", "/api/actions/not-a-uuid"],
    ["GET", "/api//me"],
    ["GET", "/api/me?spoofed=true"],
  ];
  for (const [method, path] of blocked) {
    assert.equal(isAllowedRoute(method, path), false, `${method} ${path}`);
  }
});

test("forwards only bounded browser headers and injects the server-only edge key", () => {
  const selected = selectRequestHeaders(
    {
      authorization: "Bearer browser-jwt",
      "content-type": "application/json",
      accept: "application/json",
      cookie: "private-cookie",
      host: "attacker.example",
      "x-tiberius-edge-key": "browser-spoof",
      "x-forwarded-host": "attacker.example",
      "x-forwarded-for": "198.51.100.24",
      "x-tiberius-client-ip": "192.0.2.77",
    },
    "server-edge-key",
  );
  assert.deepEqual(selected, {
    authorization: "Bearer browser-jwt",
    "content-type": "application/json",
    accept: "application/json",
    "x-tiberius-edge-key": "server-edge-key",
    "x-tiberius-client-ip": "198.51.100.24",
  });
});

test("rejects malformed Vercel client identity rather than forwarding spoofed values", () => {
  const selected = selectRequestHeaders(
    {
      "x-forwarded-for": "not-an-ip",
      "x-tiberius-client-ip": "192.0.2.77",
    },
    "server-edge-key",
  );
  assert.equal(selected["x-tiberius-client-ip"], undefined);
});

test("reports only a bounded transport code for proxy diagnostics", () => {
  assert.equal(proxyErrorCode({ cause: { code: "UND_ERR_CONNECT_TIMEOUT" } }), "UND_ERR_CONNECT_TIMEOUT");
  assert.equal(proxyErrorCode({ cause: { code: "secret=value with spaces" } }), "unknown");
  assert.equal(proxyErrorCode(new Error("contains sensitive request data")), "unknown");
});

test("retries transient upstream transport failures with a strict bound", async () => {
  let attempts = 0;
  const originalFetch = global.fetch;
  global.fetch = async () => {
    attempts += 1;
    if (attempts < 3) throw Object.assign(new Error("temporary"), { cause: { code: "ECONNRESET" } });
    return new Response("ok", { status: 200 });
  };
  try {
    const response = await fetchUpstream("https://example.test/health", {}, 3);
    assert.equal(response.status, 200);
    assert.equal(attempts, 3);
  } finally {
    global.fetch = originalFetch;
  }
});
