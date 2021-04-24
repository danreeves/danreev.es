require "temel"

def page_head(page_title : String)
  head(
    title(page_title),
    meta({charset: "utf-8"}),
    meta({"http-equiv": "x-ui-compatible", content: "ie-edge"}),
    meta({name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no"}),
    link({rel: "icon", href: "/favicon.ico"}),
    link({rel: "apple-touch-icon", href: "/favicon.png"}),
    link({rel: "stylesheet", href: "/cartograph/cartograph.css"}),
    style("
      * { font-family: \"Cartograph CF\"; }
      html { margin: 1rem; }
      body { width: 600px; margin-left: auto; margin-right: auto; }
      img { max-width: 100%; }
      h1 { font-weight: 900; font-size: 3rem; line-height: 2.3rem; text-transform: capitalize; }
    "),
  )
end

def nav
  div(
    a({href: "/"}, "~/dnrvs"),
    script({src: "/js/script.js"}, ""),
  )
end
