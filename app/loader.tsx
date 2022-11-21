import {
	createContext,
	ReactElement,
	use,
	useContext,
	useEffect,
	useSyncExternalStore,
} from "react";
import isEqual from "https://esm.sh/v98/lodash.isequal@4.5.0/es2022/lodash.isequal.js";

type IsEqual = typeof isEqual;

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
	#keys: Map<string, Set<() => void>> = new Map();

	subscribe(key: string) {
		if (!this.#keys.has(key)) {
			this.#keys.set(key, new Set());
		}

		const listeners = this.#keys.get(key);

		return (rerender: () => void) => {
			listeners?.add(rerender);
			return () => listeners?.delete(rerender);
		};
	}

	update(key: string) {
		const listeners = this.#keys.get(key);
		if (listeners) {
			listeners.forEach((cb) => cb());
		}
	}
}

// class Cache {
// 	#items: Map<string, unknown> = new Map();
//
// 	set(key: string, value: unknown, ttl?: number) {
// 		this.#items.set(key, value);
//
// 		if (Number.isSafeInteger(ttl)) {
// 			setTimeout(() => {
// 				if (this.has(key)) {
// 					this.remove(key);
// 				}
// 			}, ttl);
// 		}
// 	}
//
// 	remove(key: string) {
// 		this.#items.delete(key);
// 	}
//
// 	has(key: string) {
// 		return this.#items.has(key);
// 	}
// }

const eb = new EventBus();

export function useData(
	url: string,
	{ poll, hasChanged }: {
		poll?: number;
		hasChanged?: (
			cachedData: unknown,
			newData: unknown,
		) => boolean;
	} = {},
) {
	const cache = useCache();
	const inCache = cache.get(url);
	useSyncExternalStore(
		eb.subscribe(url),
		() => cache.get(url),
		() => cache.get(url),
	);

	const neq = (a: unknown, b: unknown) => {
		return !isEqual(a, b);
	};
	const changed = hasChanged ?? neq;

	async function revalidate(showLoadingState = false) {
		const prevData = await cache.get(url);

		const promise = new Promise((resolve, reject) => {
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					resolve(data);
					if (changed(data, prevData)) {
						eb.update(url);
					}
				})
				.catch((error) => {
					reject(error);
					eb.update(url);
				});
		});

		cache.set(url, promise);

		if (showLoadingState) {
			eb.update(url);
		}
	}

	useEffect(() => {
		if (poll) {
			const interval = setInterval(
				revalidate,
				poll,
			);
			return () => clearInterval(interval);
		}
	}, [poll, revalidate]);

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
