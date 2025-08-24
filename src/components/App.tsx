import { PropsWithChildren } from "hono/jsx";
import { Wave } from "./Wave.tsx";

export function App({ children }: PropsWithChildren) {
	return (
		<html className="m-4 bg-white font-mono text-black">
			<head>
				<meta charset="utf-8" />
				<meta httpEquiv="x-ui-compatible" content="ie-edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" href="/favicon.png" />
				<link rel="stylesheet" href="/tailwind.css" />
				<script type="module" src="/script.js" />
			</head>
			<body className="mx-auto max-w-[95%]">
				{children}
				<footer className="font-rx100 mt-4 text-center text-black">
					<Wave text="< danreev.es © forever >" />
				</footer>
			</body>
		</html>
	);
}
