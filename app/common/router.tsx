import {
  createContext,
  HTMLAttributes,
  ReactElement,
  useContext,
  useSyncExternalStore,
  cache,
} from "react";
import { Wave } from "./wave.tsx";

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

function useRoute(): string {
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
  currentPath,
  path,
  children,
}: {
  path: string;
  currentPath: string;
  children: ReactElement;
}) {
  if (path === currentPath) {
    return children;
  }
  return null;
}

interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: string;
}
export function Link({ to, children, ...rest }: LinkProps) {
  const isActive = false; //route === to;
  const className = `${rest.className} ${isActive ? "active" : ""}`;
  const isLocal = !to.startsWith("http");
  return (
    <a
      {...rest}
      href={to}
      className={className}
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
      <Wave text={children} hover />
    </a>
  );
}
