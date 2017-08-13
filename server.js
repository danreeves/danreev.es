const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const lrucache = new LRUCache({
    max: 100,
    maxAge: 1000 * 60 * 60, // 1hour
});

app.prepare().then(() => {
    const server = express();

    server.get('*', (req, res) => {
        if (req.path.includes('_next')) {
            return handle(req, res);
        }
        return renderAndCache(req, res, req.path);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});

function getCacheKey(req) {
    return `${req.url}`;
}

function renderAndCache(req, res, pagePath, queryParams) {
    const key = getCacheKey(req);

    // If we have a page in the cache, let's serve it
    if (lrucache.has(key)) {
        console.log(`CACHE HIT: ${key}`);
        res.send(lrucache.get(key));
        return;
    }

    // If not let's render the page into HTML
    app
        .renderToHTML(req, res, pagePath, queryParams)
        .then(html => {
            // Let's cache this page
            console.log(`CACHE MISS: ${key}`);
            lrucache.set(key, html);

            res.send(html);
        })
        .catch(err => {
            app.renderError(err, req, res, pagePath, queryParams);
        });
}
