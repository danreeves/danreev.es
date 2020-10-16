require "temel"

def page_head(page_title : String)
  head(
    title(page_title),
    meta({charset: "utf-8"}),
    meta({"http-equiv": "x-ui-compatible", content: "ie-edge"}),
    meta({name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no"}),
    link({rel: "icon", href: "/favicon.ico"}),
    link({rel: "apple-touch-icon", href: "/favicon.png"}),
    link({rel: "stylesheet", href: "/css/stolen.css"}),
    link({rel: "stylesheet", href: "/css/style.css"}),
    link({rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=VT323&display=swap"}),
    script({src: "/js/script.js"}, ""),
  )
end

def nav
  nav(
    a({href: "/", title: "Home"}, "Home"),
    a({href: "/contact", title: "Contact"}, "Contact"),
    a({href:"/writing"},  "Writing"),
    a({href:"https://twitter.com/dnrvs"}, "Twitter"),
    a({href:"https://github.com/danreeves"}, "GitHub"),
  )
end
