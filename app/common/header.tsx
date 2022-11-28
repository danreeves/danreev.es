import { Link } from "./router.tsx";
import { Wave } from "./wave.tsx";
export function Header() {
	return (
		<>
			<header>
				<small>
					<Wave text="hello, planet." />
				</small>
				<nav>
					<Link to="/">
						About
					</Link>
					<Link to="/writing">
						Writing
					</Link>
				</nav>
			</header>
		</>
	);
}
