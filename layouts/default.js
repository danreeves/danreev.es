import Link from 'next/link';
import Head from 'next/head';
import styled, { injectGlobal } from 'styled-components';
import Box from '../components/box.js';

injectGlobal`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
        background: #121010;
        color: #fff;
        font-size: 2em;
        font-family: monospace;
        padding: 1em;
    }
    body::before {
        position: fixed;
        content: " ";
        display: block;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: linear-gradient(
                rgba(18, 16, 16, 0) 50%,
                rgba(0, 0, 0, 0.25) 50%
            ),
            linear-gradient(
                90deg,
                rgba(255, 0, 0, 0.06),
                rgba(0, 255, 0, 0.02),
                rgba(0, 0, 255, 0.06)
            );
        z-index: 2;
        background-size: 100% 2px, 3px 100%;
        pointer-events: none;
    }
    a {
        color: white;
    }
    ul, ol {
        list-style-type: none;
    }
    li {
        /*padding-left: 1em;*/
    }
    li:before {
        content: '- ';
    }
`;

const Body = styled.div`
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-wrap: wrap;

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-auto-rows: minmax(150px, auto);
    grid-gap: 0.5rem;
    grid-auto-flow: dense;

    border: 2px solid white;
    padding: 0.5rem;

    @media (max-width: 630px) {
        display: flex;
    }
`;

export default ({ children, title = 'This is the default title' }) =>
    <Body>
        <Head>
            <meta charset="utf-8" />
            <meta http-equiv="x-ua-compatible" content="ie=edge" />
            <title>{title}</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link
                rel="apple-touch-icon"
                sizes="57x57"
                href="/assets/favicons/apple-icon-57x57.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="60x60"
                href="/assets/favicons/apple-icon-60x60.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="72x72"
                href="/assets/favicons/apple-icon-72x72.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="76x76"
                href="/assets/favicons/apple-icon-76x76.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="114x114"
                href="/assets/favicons/apple-icon-114x114.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="120x120"
                href="/assets/favicons/apple-icon-120x120.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="144x144"
                href="/assets/favicons/apple-icon-144x144.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="152x152"
                href="/assets/favicons/apple-icon-152x152.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/assets/favicons/apple-icon-180x180.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="/assets/favicons/android-icon-192x192.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/assets/favicons/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="96x96"
                href="/assets/favicons/favicon-96x96.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/assets/favicons/favicon-16x16.png"
            />
            <link rel="manifest" href="/assets/favicons/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta
                name="msapplication-TileImage"
                content="/assets/favicons/ms-icon-144x144.png"
            />
            <meta name="theme-color" content="#121010" />
            <meta
                name="google-site-verification"
                content="kgIjoP-G9lKdG0RAaoLHMUwgxv5cLtIOZZfVdtTJvhY"
            />
        </Head>
        <Box>
            <nav>
                <a href="/" title="home">home</a>{` — `}
                <a href="/" title="home">projects</a>{` — `}
                <a href="/" title="home">posts</a>{` — `}
                <a href="https://twitter.com/dnrvs">twitter</a>{` — `}
                <a href="https://github.com/danreeves">github</a>{` — `}
                <a href="mailto:hey@danreev.es">email</a>
            </nav>
        </Box>
        {children}
    </Body>;
