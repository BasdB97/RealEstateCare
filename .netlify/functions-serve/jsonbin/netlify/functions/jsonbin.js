var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/jsonbin.js
var jsonbin_exports = {};
__export(jsonbin_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(jsonbin_exports);
async function handler(event) {
  const BIN_ID = process.env.JSONBIN_BIN_ID;
  const BASE = process.env.JSONBIN_BASE || "https://api.jsonbin.io/v3";
  const MASTER = process.env.JSONBIN_MASTER_KEY;
  if (!BIN_ID || !MASTER) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Missing server env vars",
        has: { BIN_ID: !!BIN_ID, MASTER: !!MASTER, BASE: !!BASE },
        context: process.env.NETLIFY ? "production-runtime" : "local"
      })
    };
  }
  const isGet = event.httpMethod === "GET";
  const url = `${BASE}/b/${BIN_ID}${isGet ? "/latest" : ""}`;
  const res = await fetch(url, {
    method: isGet ? "GET" : event.httpMethod,
    headers: { "X-Master-Key": MASTER, "Content-Type": "application/json" },
    body: isGet ? void 0 : event.body
  });
  const text = await res.text();
  return { statusCode: res.status, headers: { "Content-Type": "application/json" }, body: text };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=jsonbin.js.map
