import { Suspense } from "react";
import About from "./about.tsx";
import { LoaderProvider } from "./loader.tsx";

export default function App() {
	return (
		<LoaderProvider>
			<div style={{ fontFamily: "system-ui, sans-serif" }}>
				<h1>hello, planet.</h1>
				<Suspense fallback={<div>loading...</div>}>
					<About />
				</Suspense>
				<hr />
				<Suspense fallback={<div>loading...</div>}>
					<About />
				</Suspense>
			</div>
		</LoaderProvider>
	);
}
