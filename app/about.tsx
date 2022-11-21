import { startTransition, useState } from "react";
import { useData } from "./loader.tsx";

export default function About() {
	const [pokemon, setPokemon] = useState(270);
	const [data] = useData(
		`https://pokeapi.co/api/v2/pokemon/${pokemon}`,
	);

	const [weather, revalidate] = useData(
		`https://coolweather.glitch.me/london`,
	);

	console.log("RENDER");

	return (
		<>
			<h2>About</h2>
			<h3>{data.name}</h3>
			<img src={data.sprites.front_default} height="96" width="96" />

			<PreloadImg
				src={data.sprites.front_default.replace(`${pokemon}`, `${pokemon + 1}`)}
			/>
			<PreloadImg
				src={data.sprites.front_default.replace(`${pokemon}`, `${pokemon - 1}`)}
			/>

			<button
				onClick={() => {
					startTransition(() => {
						setPokemon((id) => id - 1);
					});
				}}
			>
				Prev pokemon
			</button>
			<button
				onClick={() => {
					startTransition(() => {
						setPokemon((id) => id + 1);
					});
				}}
			>
				Next pokemon
			</button>
			<p>
				<small>
					<button onClick={() => revalidate()}>Refresh</button>{" "}
					Weather in London: {weather.weather}, feels like {weather.feelsLike}
					{"℃"}
				</small>
			</p>
		</>
	);
}

function PreloadImg({ src }: { src: string }) {
	return (
		<img
			src={src}
			style={{
				height: 1,
				width: 1,
				opacity: 0,
				pointerEvents: "none",
				position: "fixed",
				top: 0,
				left: 0,
			}}
			aria-hidden
		/>
	);
}
