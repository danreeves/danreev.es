require "kemal"
require "temel"
require "../partials"

def fourohfour
  html(
    page_head(
      "/dev/null"
    ),
    body(
      h1("Nothing here."),
    ),
    footer(nav())
  )
end

error 404 do
  fourohfour
end
