import {
	createContext,
	ReactElement,
	use,
	useContext,
	useReducer,
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

export function useData(url: string) {
	const cache = useCache();
	const [, render] = useReducer((s) => s + 1, 0);
	const inCache = cache.get(url);

	async function revalidate(showLoadingState = false) {
		const prevData = await cache.get(url);

		const promise = new Promise((resolve, reject) => {
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					resolve(data);
					if (!isEqual(data, prevData)) {
						render();
					}
				})
				.catch((error) => {
					reject(error);
					render();
				});
		});

		cache.set(url, promise);

		if (showLoadingState) {
			render();
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
