import { use, useReducer } from "react";
import { loader } from "./loader.tsx";

export default function About() {
	const data = loader("https://coolweather.glitch.me/london");
	const [, render] = useReducer((s) => s + 1, 0);
	return (
		<>
			<h2>About</h2>
			<p>hello</p>
			<p>{data.weather}</p>
			<p>{data.feelsLike}</p>
			<button
				onClick={() => {
					// map.delete("https://coolweather.glitch.me/london");
					// render();
				}}
			>
				Refresh
			</button>
		</>
	);
}
