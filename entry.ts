// HACK: map webpack resolution to native ESM
// @ts-expect-error Property '__webpack_require__' does not exist on type 'Window & typeof globalThis'.
globalThis.__webpack_require__ = (id) => import(id);

await import("./rsc-server.tsx");
