import { Suspense } from "react";
import About from "./about.tsx";
import Button from "./button.tsx";
import { LoaderProvider } from "./loader.tsx";

export default function App() {
	return (
		<LoaderProvider>
			<div>
				<h1>hello, planet.</h1>
				<Suspense fallback={<div>loading...</div>}>
					<About />
				</Suspense>
				<Suspense>
					<Button />
				</Suspense>
			</div>
		</LoaderProvider>
	);
}
