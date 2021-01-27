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
    link({rel: "stylesheet", href: "/css/style.css"}),
    link({rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=VT323&display=swap"}),
  )
end

def nav
  nav(
    a({href: "/"}, "Home"),
    a({href: "/writing"}, "Writing"),
    a({href: "https://dnrvs.photo"}, "Photography"),
    a({href: "/contact"}, "Contact"),
    script({src: "/js/script.js"}, ""),
  )
end
