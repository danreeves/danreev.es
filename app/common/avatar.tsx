import { cache } from "react";

const getGHUser = cache(async () => {
  const res = await fetch("https://api.github.com/users/danreeves");
  const data = await res.json();
  return data;
});

export async function Avatar() {
  // const data = await getGHUser();
  const data = {
    avatar_url: "https://avatars.githubusercontent.com/u/1973559?v=4",
  };
  return <img className="avatar" src={data.avatar_url} />;
}
