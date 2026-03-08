import {
  renderToReadableStream,
  createTemporaryReferenceSet,
  decodeReply,
  loadServerAction,
  decodeAction,
  decodeFormState,
} from "@vitejs/plugin-rsc/rsc";
import type { ReactFormState } from "react-dom/client";
import { Root } from "../root.tsx";
import { parseRenderRequest } from "./request.tsx";

export type RscPayload = {
  root: React.ReactNode;
  returnValue?: { ok: boolean; data: unknown };
  formState?: ReactFormState;
};

async function handler(request: Request): Promise<Response> {
  // Image proxy route handler
  const urlObj = new URL(request.url);
  if (urlObj.pathname === "/api/proxy-image") {
    const targetUrl = urlObj.searchParams.get("url");
    if (!targetUrl) {
      return new Response("Missing 'url' parameter", { status: 400 });
    }
    let remote;
    try {
      remote = new URL(targetUrl);
    } catch {
      return new Response("Invalid target URL", { status: 400 });
    }
    // SECURITY: Only allow certain domains
    const ALLOWLIST = ["d15f34w2p8l1cc.cloudfront.net", "static.playoverwatch.com", "a.ltrbxd.com"];
    if (!ALLOWLIST.includes(remote.hostname)) {
      return new Response("Forbidden domain", { status: 403 });
    }
    // Fetch the image
    let resp;
    try {
      resp = await fetch(remote.toString());
    } catch {
      return new Response("Failed to fetch remote image", { status: 502 });
    }
    const contentType = resp.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      return new Response("URL did not return an image", { status: 415 });
    }
    // Set Cloudflare cache headers
    const headers = new Headers(resp.headers);
    headers.set(
      "Cache-Control",
      "public, s-maxage=86400, max-age=3600, stale-while-revalidate=604800",
    );
    headers.set("Access-Control-Allow-Origin", "*");
    return new Response(resp.body, {
      status: resp.status,
      headers,
    });
  }

  // ...existing code...
  // differentiate RSC, SSR, action, etc.
  const renderRequest = parseRenderRequest(request);
  request = renderRequest.request;

  // handle server function request
  let returnValue: RscPayload["returnValue"] | undefined;
  let formState: ReactFormState | undefined;
  let temporaryReferences: unknown | undefined;
  let actionStatus: number | undefined;
  if (renderRequest.isAction === true) {
    if (renderRequest.actionId) {
      // action is called via `ReactClient.setServerCallback`.
      const contentType = request.headers.get("content-type");
      const body = contentType?.startsWith("multipart/form-data")
        ? await request.formData()
        : await request.text();
      temporaryReferences = createTemporaryReferenceSet();
      const args = await decodeReply(body, { temporaryReferences });
      const action = await loadServerAction(renderRequest.actionId);
      try {
        const data = await action.apply(null, args);
        returnValue = { ok: true, data };
      } catch (e) {
        returnValue = { ok: false, data: e };
        actionStatus = 500;
      }
    } else {
      // otherwise server function is called via `<form action={...}>`
      // before hydration (e.g. when javascript is disabled).
      // aka progressive enhancement.
      const formData = await request.formData();
      const decodedAction = await decodeAction(formData);
      try {
        const result = await decodedAction();
        formState = await decodeFormState(result, formData);
      } catch (_e) {
        // there's no single general obvious way to surface this error,
        // so explicitly return classic 500 response.
        return new Response("Internal Server Error: server action failed", {
          status: 500,
        });
      }
    }
  }

  // serialization from React VDOM tree to RSC stream.
  // we render RSC stream after handling server function request
  // so that new render reflects updated state from server function call
  // to achieve single round trip to mutate and fetch from server.
  const rscPayload: RscPayload = { root: <Root />, formState, returnValue };
  const rscOptions = { temporaryReferences };
  const rscStream = renderToReadableStream<RscPayload>(rscPayload, rscOptions);

  // Respond RSC stream without HTML rendering as decided by `RenderRequest`
  if (renderRequest.isRsc) {
    return new Response(rscStream, {
      status: actionStatus,
      headers: {
        "content-type": "text/x-component;charset=utf-8",
      },
    });
  }

  const { renderHTML } = await import.meta.viteRsc.loadModule<typeof import("./entry.ssr.tsx")>(
    "ssr",
    "index",
  );
  return await renderHTML(rscStream, {
    request,
    formState,
    // allow quick simulation of javascript disabled browser
    debugNojs: renderRequest.url.searchParams.has("__nojs"),
  });
}

export default {
  fetch(request: Request) {
    return handler(request);
  },
};

if (import.meta.hot) {
  import.meta.hot.accept();
}
