import {
  createContext,
  HTMLAttributes,
  ReactElement,
  useContext,
  useSyncExternalStore,
  cache,
} from "react";

export const ServerRoute = createContext<string | null>(null);

function subscribeToRoute(notify: () => void) {
  if ("document" in window) {
    self.addEventListener("popstate", notify);
    self.addEventListener("pushstate", notify);
    return () => {
      self.removeEventListener("popstate", notify);
      self.removeEventListener("pushstate", notify);
    };
  }
  return () => {};
}

export function useRoute(): string {
  const serverRoute = useContext(ServerRoute);
  const route = useSyncExternalStore(
    subscribeToRoute,
    () => {
      return window.location.pathname;
    },
    () => {
      return serverRoute;
    }
  );
  return route || "/";
}

export function Route({
  path,
  children,
}: {
  path: string;
  children: ReactElement;
}) {
  const currentPath = useRoute();
  const pattern = new URLPattern(path, "https://example.com");

  if (pattern.test(new URL(currentPath, "https://example.com"))) {
    return children;
  }
  return null;
}

interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: string;
}
export function Link({ to, children, ...rest }: LinkProps) {
  const route = useRoute();
  const current = route === to;
  const isLocal = !to.startsWith("http");
  return (
    <a
      {...rest}
      href={to}
      className={current ? "current" : ""}
      onClick={(event) => {
        if (!isLocal) return;
        event.preventDefault();
        if ("history" in self) {
          // @ts-ignore -- this only runs in the browser
          self.history.pushState(null, null, to);
          self.dispatchEvent(new Event("pushstate"));
        }
      }}
    >
      {children}
    </a>
  );
}
