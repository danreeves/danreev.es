import { useData } from "../loader.tsx";

export function Avatar() {
	// const [data] = useData("https://api.github.com/users/danreeves");
	const data = {
		avatar_url: "https://avatars.githubusercontent.com/u/1973559?v=4",
	};
	return <img className="avatar" src={data.avatar_url} />;
}
