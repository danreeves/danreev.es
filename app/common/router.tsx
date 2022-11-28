import {
	createContext,
	HTMLAttributes,
	ReactElement,
	useContext,
	useSyncExternalStore,
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
		},
	);
	return route || "/";
}

export function Route(
	{ path, children }: { path: string; children: ReactElement },
) {
	const route = useRoute();
	if (path === route) {
		return children;
	}
	return null;
}

interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
	to: string;
	children: string;
}
export function Link(
	{ to, children, ...rest }: LinkProps,
) {
	const route = useRoute();
	const isActive = route === to;
	const className = `${rest.className} ${isActive ? "active" : ""}`;
	return (
		<a
			{...rest}
			href={to}
			className={className}
			onClick={(event) => {
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
