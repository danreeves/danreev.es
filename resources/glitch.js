import fetch from 'isomorphic-fetch';
const user = 'https://api.glitch.com/users/270168';

export async function getProjects() {
    const response = await fetch(user);
    const data = await response.json();
    return data.projects;
}
