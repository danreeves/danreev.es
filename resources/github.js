import fetch from 'isomorphic-fetch';

const endpoint = 'https://api.github.com/users/danreeves/repos?sort=updated';

export default async function getRepos() {
  const resp = await fetch(endpoint);
  const repos = await resp.json();
  return repos;
}
