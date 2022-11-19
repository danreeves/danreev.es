import {
	createContext,
	ReactElement,
	use,
	useContext,
	useSyncExternalStore,
} from "react";
import isEqual from "https://esm.sh/v98/lodash.isequal@4.5.0/es2022/lodash.isequal.js";

const LoaderContext = createContext<Map<string, unknown> | null>(null);

function useCache() {
	const cache = useContext(LoaderContext);
	if (!cache) throw new Error("Used outside of LoaderContext");
	return cache;
}

export function LoaderProvider({ children }: { children: ReactElement }) {
	return (
		<LoaderContext.Provider value={new Map()}>
			{children}
		</LoaderContext.Provider>
	);
}

class EventBus {
	#busses = new Map();

	subscribe(key: string) {
		if (!this.#busses.has(key) && "document" in window) {
			this.#busses.set(key, window.document.createElement("fakeelement"));
		}

		const bus = this.#busses.get(key);

		return (rerender: () => void) => {
			bus.addEventListener("update", () => {
				rerender();
			});
			return () => bus.removeEventListener("update", rerender);
		};
	}

	/**
	 * Dispatch an event.
	 */
	dispatchEvent(key: string) {
		const bus = this.#busses.get(key);
		if (bus) {
			bus.dispatchEvent(new CustomEvent("update"));
		}
	}
}

const eb = new EventBus();

export function useData(url: string) {
	const cache = useCache();
	const inCache = cache.get(url);
	useSyncExternalStore(
		eb.subscribe(url),
		() => cache.get(url),
		() => cache.get(url),
	);

	async function revalidate(showLoadingState = false) {
		const prevData = await cache.get(url);

		const promise = new Promise((resolve, reject) => {
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					resolve(data);
					if (!isEqual(data, prevData)) {
						eb.dispatchEvent(url);
					}
				})
				.catch((error) => {
					reject(error);
					eb.dispatchEvent(url);
				});
		});

		cache.set(url, promise);

		if (showLoadingState) {
			eb.dispatchEvent(url);
		}
	}

	if (inCache) {
		const data = use(inCache);
		return [data, revalidate];
	}

	const promise = new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => resolve(data))
			.catch((error) => reject(error));
	});

	cache.set(url, promise);

	const data = use(promise);

	return [data, revalidate];
}
