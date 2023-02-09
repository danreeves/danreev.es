import { Suspense } from "react";
import About from "./pages/about.tsx";
import Writing from "./pages/writing.tsx";
import { Footer } from "./common/footer.tsx";
import { Header } from "./common/header.tsx";
import { Route } from "./common/router.tsx";
import { LoaderProvider } from "./loader.tsx";

export default function App() {
	return (
		<LoaderProvider>
			<Header />
			<main>
				<Route path="/">
					<Suspense fallback={<div>loading...</div>}>
						<About />
					</Suspense>
				</Route>
				<Route path="/writing">
					<Suspense fallback={<div>loading...</div>}>
						<Writing />
					</Suspense>
				</Route>
			</main>
			<Footer />
		</LoaderProvider>
	);
}
