import { PropsWithChildren } from "hono/jsx";
import { Wave } from "./Wave.tsx";

export function App({ children }: PropsWithChildren) {
	return (
		<html>
			<head>
				<meta charset="utf-8" />
				<meta httpEquiv="x-ui-compatible" content="ie-edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" href="/favicon.png" />
				<link rel="stylesheet" href="/style.css" />
				<script type="module" src="/script.js" />
			</head>
			<body>
				{children}
				<footer>
					<Wave text="< danreev.es © forever >" />
				</footer>
			</body>
		</html>
	);
}
