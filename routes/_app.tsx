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
      * { font-family: 'felt-tip-woman'; }
      html {
        font-size: 2rem;
        margin: 1rem;
        background: white;
        background-image: radial-gradient(#c1c1c1 1px, transparent 0);
        background-size: 40px 40px;
        background-position: -19px -19px;
      }
      body { max-width: 95%; width: 45ch; margin-left: auto; margin-right: auto; }
      img { max-width: 100%; }
      h1 { font-weight: 900; font-size: 3rem; line-height: 2.3rem; }
      pre { background: #fff; padding: 1rem; overflow-x: scroll; }
      dd { margin-top: 1rem; margin-bottom: 1rem; }
      code { background: #fff; font-family: monospace; font-size: .75em; }
      a { color: #000; }
      .js a { text-decoration: none; }
      `}
        </style>
        <script type="module" src="/script.js" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
