import { cache } from "react";

const getGHUser = cache(async () => {
  const res = await fetch("https://api.github.com/users/danreeves");
  const data = await res.json();
  return data;
});

export async function Avatar() {
  const data = await getGHUser();
  return <img className="avatar" src={data.avatar_url} />;
}
