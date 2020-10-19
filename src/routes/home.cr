require "kemal"
require "temel"
require "markd"
require "../partials"

get "/" do
  markdown = File.read("./pages/index.md")
  html = Markd.to_html(markdown, Markd::Options.new(smart: true))
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
