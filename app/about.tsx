import { startTransition, useState } from "react";
import { useData } from "./loader.tsx";

export default function About() {
	const [pokemon, setPokemon] = useState(270);
	const [data] = useData(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

	// console.log("RENDER", data);

	return (
		<>
			<h2>About</h2>
			<h3>{data.name}</h3>
			<img src={data.sprites.front_default} height="96" width="96" />
			<img
				src={data.sprites.front_default.replace(`${pokemon}`, `${pokemon + 1}`)}
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
			<button
				onClick={() => {
					setPokemon((id) => id + 1);
				}}
			>
				Next pokemon
			</button>

			<button
				onClick={() => {
					startTransition(() => {
						setPokemon((id) => id + 1);
					});
				}}
			>
				Next pokemon no loading
			</button>
		</>
	);
}
