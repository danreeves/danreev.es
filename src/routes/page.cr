require "kemal"
require "temel"
require "../markdown"
require "../partials"
require "./404"

get "/:page" do |env|
  page = env.params.url["page"]
  begin
    markdown = File.read("./pages/#{page}.md")
    html = md_to_html(markdown)
  rescue ex
    halt env, status_code: 404, response: fourohfour
  end
  html(
    page_head(
      "#{page} | dan reeves"
    ),
    body(
      html
    ),
    footer(nav()),
  )
end
