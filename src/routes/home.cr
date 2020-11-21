require "kemal"
require "temel"
require "../partials"
require "../markdown"

get "/" do
  markdown = File.read("./pages/index.md")
  html = md_to_html(markdown)
  html(
    page_head(
      "dan reeves"
    ),
    body({class: "home"},
      html
    ),
    footer(nav())
  )
end
