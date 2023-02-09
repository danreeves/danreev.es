import { useData } from "../loader.tsx";
import { Link } from "../common/router.tsx";

export default function Writing() {
	const [posts] = useData(
		"/api/writing",
	);

	return (
		<ol>
			{posts.data.map((post) => (
				<li key={post.path}>
					<a href={post.path}>{post.path}</a>
				</li>
			))}
		</ol>
	);
}
