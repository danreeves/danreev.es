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
				<Suspense fallback={<div>loading...</div>}>
					<Route path="/">
						<About />
					</Route>
					<Route path="/writing">
						<Writing />
					</Route>
				</Suspense>
			</main>
			<Footer />
		</LoaderProvider>
	);
}
