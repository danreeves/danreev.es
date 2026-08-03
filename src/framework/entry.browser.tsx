import {
  createFromReadableStream,
  createFromFetch,
  setServerCallback,
  createTemporaryReferenceSet,
  encodeReply,
} from "@vitejs/plugin-rsc/browser";
import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { rscStream } from "rsc-html-stream/client";
import type { RscPayload } from "./entry.rsc";
import { GlobalErrorBoundary } from "./error-boundary";
import { createRscRenderRequest } from "./request";

const SCROLL_POSITIONS_KEY = "rsc-scroll-positions";
const HISTORY_KEY = "__rscKey";
const rscPayloadCache = new Map<string, RscPayload>();

function createHistoryKey() {
  return crypto.randomUUID();
}

function getHistoryKey() {
  return history.state?.[HISTORY_KEY] as string | undefined;
}

function saveScrollPosition() {
  const key = getHistoryKey();
  if (!key) return;

  try {
    const positions = JSON.parse(sessionStorage.getItem(SCROLL_POSITIONS_KEY) || "{}");
    positions[key] = [window.scrollX, window.scrollY];
    sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
  } catch {
    // Scroll restoration is best effort when sessionStorage is unavailable.
  }
}

function restoreScrollPosition() {
  const key = getHistoryKey();
  let position: [number, number] = [0, 0];

  try {
    const positions = JSON.parse(sessionStorage.getItem(SCROLL_POSITIONS_KEY) || "{}");
    position = positions[key] || position;
  } catch {
    // Scroll restoration is best effort when sessionStorage is unavailable.
  }

  window.scrollTo(...position);
}

function prepareHistory() {
  history.scrollRestoration = "manual";
  if (!getHistoryKey()) {
    history.replaceState({ ...history.state, [HISTORY_KEY]: createHistoryKey() }, "", location.href);
  }
  window.addEventListener("scroll", saveScrollPosition, { passive: true });
  saveScrollPosition();
}

async function main() {
  prepareHistory();

  // stash `setPayload` function to trigger re-rendering
  // from outside of `BrowserRoot` component (e.g. server function call, navigation, hmr)
  let setPayload: (v: RscPayload) => void;

  // deserialize RSC stream back to React VDOM for CSR
  const initialPayload = await createFromReadableStream<RscPayload>(
    // initial RSC stream is injected in SSR stream as <script>...FLIGHT_DATA...</script>
    rscStream,
  );
  rscPayloadCache.set(window.location.href, initialPayload);

  // browser root component to (re-)render RSC payload as state
  function BrowserRoot() {
    const [payload, setPayload_] = React.useState(initialPayload);

    React.useEffect(() => {
      setPayload = (v) => React.startTransition(() => setPayload_(v));
    }, [setPayload_]);

    // re-fetch/render on client side navigation
    React.useEffect(() => {
      return listenNavigation(() => {
        restoreScrollPosition();
        fetchRscPayload();
      });
    }, []);

    return payload.root;
  }

  // re-fetch RSC and trigger re-rendering
  async function fetchRscPayload() {
    const url = window.location.href;
    const cachedPayload = rscPayloadCache.get(url);
    if (cachedPayload) {
      setPayload(cachedPayload);
      requestAnimationFrame(restoreScrollPosition);
      return;
    }

    const renderRequest = createRscRenderRequest(url);
    const payload = await createFromFetch<RscPayload>(fetch(renderRequest));
    rscPayloadCache.set(url, payload);
    setPayload(payload);
    requestAnimationFrame(restoreScrollPosition);
  }

  // register a handler which will be internally called by React
  // on server function request after hydration.
  setServerCallback(async (id, args) => {
    const temporaryReferences = createTemporaryReferenceSet();
    const renderRequest = createRscRenderRequest(window.location.href, {
      id,
      body: await encodeReply(args, { temporaryReferences }),
    });
    const payload = await createFromFetch<RscPayload>(fetch(renderRequest), {
      temporaryReferences,
    });
    setPayload(payload);
    const { ok, data } = payload.returnValue!;
    if (!ok) throw data;
    return data;
  });

  // hydration
  const browserRoot = (
    <React.StrictMode>
      <GlobalErrorBoundary>
        <BrowserRoot />
      </GlobalErrorBoundary>
    </React.StrictMode>
  );
  if ("__NO_HYDRATE" in globalThis) {
    createRoot(document).render(browserRoot);
  } else {
    hydrateRoot(document, browserRoot, {
      formState: initialPayload.formState,
    });
  }

  // implement server HMR by triggering re-fetch/render of RSC upon server code change
  if (import.meta.hot) {
    import.meta.hot.on("rsc:update", () => {
      fetchRscPayload();
    });
  }
}

function onClick(e: MouseEvent) {
  let link = (e.target as Element).closest("a");
  if (
    link &&
    link instanceof HTMLAnchorElement &&
    link.href &&
    (!link.target || link.target === "_self") &&
    link.origin === location.origin &&
    !link.hasAttribute("download") &&
    e.button === 0 && // left clicks only
    !e.metaKey && // open in new tab (mac)
    !e.ctrlKey && // open in new tab (windows)
    !e.altKey && // download
    !e.shiftKey &&
    !e.defaultPrevented
  ) {
    e.preventDefault();
    saveScrollPosition();
    history.pushState({ [HISTORY_KEY]: createHistoryKey() }, "", link.href);
  }
}

// a little helper to setup events interception for client side navigation
function listenNavigation(onNavigation: () => void) {
  window.addEventListener("popstate", onNavigation);

  const oldPushState = window.history.pushState;
  window.history.pushState = function (...args) {
    const res = oldPushState.apply(this, args);
    onNavigation();
    return res;
  };

  const oldReplaceState = window.history.replaceState;
  window.history.replaceState = function (...args) {
    const res = oldReplaceState.apply(this, args);
    onNavigation();
    return res;
  };

  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    window.removeEventListener("popstate", onNavigation);
    window.history.pushState = oldPushState;
    window.history.replaceState = oldReplaceState;
  };
}

main();
