require "kemal"
require "temel"
require "../partials"

def fourohfour
  html(
    page_head(
      "nothing here | dan reeves"
    ),
    body(
      h1("Nothing here."),
      img({src: "/img/me.jpg", class: "cool-img"}),
    ),
    footer(nav())
  )
end

error 404 do
  fourohfour
end
