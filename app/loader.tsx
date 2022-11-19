import {
	createContext,
	ReactElement,
	startTransition,
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

export function Img({ src, ...props }: React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>) {
	const img = loadImage(src);
	console.log(img);
	return <img src={img.src} {...props} />;
}

function loadImage(src: string | undefined) {
	if (!src || !("Image" in window)) return;

	const key = `IMG:${src}`;
	const cache = useCache();
	const inCache = cache.get(key);

	if (inCache) {
		return use(inCache);
	} else {
		const promise = new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = () => reject();
			img.src = src;
		});
		cache.set(key, promise);
		return use(promise);
	}
}
