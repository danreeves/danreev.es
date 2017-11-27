import fetch from 'isomorphic-fetch';

const endpoint = 'https://medium.com/@dnrvs/latest?format=json';

export default async function getPosts() {
    const resp = await fetch(endpoint, { mode: 'no-cors' });
    const body = await resp.text();
    return Object.values(
        JSON.parse(body.replace('])}while(1);</x>', '')).payload.references.Post
    );
}
