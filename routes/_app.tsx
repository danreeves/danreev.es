import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta httpEquiv="x-ui-compatible" content="ie-edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://use.typekit.net/wgj0akb.css" />
        <style>
          {`
      html {
        font-size: 2rem;
        margin: 1rem;
        background: #fbfbfa;
        background-image: radial-gradient(#c1c1c1 1px, transparent 0);
        background-size: 40px 40px;
        background-position: -19px -19px;
        font-family: 'felt-tip-woman';
        color: #1c201f;
      }
      body { max-width: 95%; width: 45ch; margin-left: auto; margin-right: auto; }
      img { max-width: 100%; }
      h1 { font-weight: 900; font-size: 3rem; line-height: 2.3rem; }
      pre { font-family: monospace !important; font-size: 0.6em; background: white;}
      dd { margin-top: 1rem; margin-bottom: 1rem; }
      a { color: #1c201f; }
      .js a { text-decoration: none; }
      [glow] { --glow-padding: .5em; }
      `}
        </style>
        <link
          rel="stylesheet"
          href="https://esm.sh/nue-glow@0.1.1/minified/glow.css"
        />

        <script type="module" src="/script.js" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
