const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const assert = require("node:assert/strict");

const { getPath, isAllowedRoute, selectRequestHeaders } = require("../api/alfred-router.js");

const vercel = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "vercel.json"), "utf8"));
test("routes every same-origin proxy subpath to the single Vercel function", () => {
  assert.deepEqual(vercel.rewrites, [
    { source: "/api/alfred-router/:path*", destination: "/api/alfred-router?path=:path*" },
  ]);
  assert.equal(getPath({ query: { path: "api/access/requests" } }), "/api/access/requests");
  assert.equal(getPath({ query: { path: ["api", "me"] } }), "/api/me");
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
