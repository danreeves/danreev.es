const endpoint = 'https://api.github.com/users/danreeves/repos?sort=updated';

export async function getRepos() {
    const resp = await fetch(endpoint);
    const repos = await resp.json();
    return repos;
}
