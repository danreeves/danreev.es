import { lazy, Suspense } from "react";

const About = lazy(() => import("./about.tsx"));
const Button = lazy(() => import("./button.tsx"));

export default function App() {
	return (
		<div>
			<h1>hello, planet.</h1>
			<Suspense fallback={<div>loading...</div>}>
				<About />
			</Suspense>
			<Suspense>
				<Button />
			</Suspense>
		</div>
	);
}
