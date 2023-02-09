import { useData } from "../loader.tsx";
import { Link } from "../common/router.tsx";

const inlineImageStyles = {
	display: "inline",
	height: "1.5em",
	width: "1.5em",
	verticalAlign: "middle",
};

export default function About() {
	const [weather] = useData(
		`https://coolweather.glitch.me/london`,
	);

	return (
		<>
			<h2>About</h2>
			<p>
				I’m Dan Reeves, Tech Lead on the Frontend team at{" "}
				<Link to="https://treasuredata.com">Treasure Data</Link>. My day job is
				mostly React &amp; TypeScript but I get up to a lot else.
			</p>
			<p>
				I live in London but I've worked fully async & remote since 2017.
			</p>
			<p>
				This site is currently a server side rendering react site with suspense
				data loading{" "}
				<Link to="https://github.com/danreeves/danreev.es">
					written from scratch
				</Link>{" "}
				on Deno.{" "}
				<img
					src="/img/deno.svg"
					style={{ ...inlineImageStyles, "verticalAlign": "bottom" }}
				/>
			</p>
			<p>
				I've been heavily involved in the{" "}
				<Link to="https://vmf-docs.verminti.de/">
					Vermintide Modding Community
				</Link>{" "}
				where I write a lot of{" "}
				<Link to="https://github.com/danreeves/vermintide-2-mods">lua</Link>.
				For a while I regularly livestreamed.
			</p>
			<p>
				Before that still, I worked on fullstack builds with php (WordPress) and
				python (Django), prototyping, ux testing, and much more for all variety
				of clients at <Link to="https://fffunction.co">fffunction</Link>.
			</p>
			<p>
				Outside of programming, I enjoy film photography. You can see my work on
				{" "}
				<Link to="https://instagram.com/dnrvs">Instagram</Link>.
			</p>
			<p className="box left">
				<img
					style={inlineImageStyles}
					src={`https://openweathermap.org/img/wn/${weather._meta.icon}@2x.png`}
				/>{" "}
				Weather in London: {weather.weather}, feels like{" "}
				{Math.round(weather.feelsLike)}
				{"°C"}.{" "}
			</p>
			<a className="box right" href="writing">See latest post {">"}</a>
			<img
				src="https://ghchart.rshah.org/fd9ff8/danreeves"
				style={{ width: "100%", marginTop: "1em" }}
			/>
		</>
	);
}
