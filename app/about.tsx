import { use, useReducer } from "react";

const map = new Map();

function loader(url: string) {
	const inCache = map.get(url);

	if (inCache) {
		return use(inCache);
	}

	const promise = new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => resolve(data))
			.catch((error) => reject(error));
	});

	map.set(url, promise);

	return use(promise);
}

export default function About() {
	const data = loader("https://coolweather.glitch.me/london");
	const [, render] = useReducer((s) => s + 1, 0);
	return (
		<>
			<h2>About</h2>
			<p>{data.weather}</p>
			<p>{data.feelsLike}</p>
			<button
				onClick={() => {
					map.delete("https://coolweather.glitch.me/london");
					render();
				}}
			>
				Refresh
			</button>
		</>
	);
}
