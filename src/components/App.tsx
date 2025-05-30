import { PropsWithChildren } from "hono/jsx";

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

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						margin: 32,
						gap: 12,
					}}
				>
					{[0, 1, 2].map((i) => (
						<svg
							key={i}
							width={48}
							height={48}
							viewBox="0 0 48 48"
							style={{
								animation: `spin 1s linear infinite`,
								animationDelay: `${i * 0.15}s`,
								display: "block",
								transform: `rotate(${i * 10 - 10}deg)`,
							}}
						>
							<polygon
								points="24,4 28,20 44,24 28,28 24,44 20,28 4,24 20,20"
								fill="none"
								stroke="#d90429"
								strokeWidth={4}
								strokeLinejoin="miter"
							/>
						</svg>
					))}
					<style>
						{`
            @keyframes spin {
              100% { transform: rotate(360deg); }
            }
          `}
					</style>
				</div>
				<footer>
					danreev.es © forever
				</footer>
			</body>
		</html>
	);
}
