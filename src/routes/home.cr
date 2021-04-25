require "kemal"
require "temel"
require "../markdown"
require "../partials"
require "../front"
require "./404"

page_content = File.read("./pages/index.md")
articles = Dir.glob("./writing/*.md")

get "/" do |env|
  body = md_to_html(page_content)

  list = articles.map do |file|
    content = File.read(file)
    front, markdown = split_frontmatter(content)
    html = md_to_html(markdown)
    title = markdown.match(/# (?<title>.+)\n/).not_nil!.named_captures["title"]
    slug = file.match(/\.\/writing\/(?<slug>.*)\.md/).not_nil!.named_captures["slug"]
    {front, html, title, slug}
  end

  sorted_list = list.sort do |a, b|
    b[0].published <=> a[0].published
  end

  html(
    page_head(
      "~/dnrvs.txt"
    ),
    body(
      {class: "home"},
      body,
      ol({class: "writing-list", reversed: ""},
        sorted_list.map do |item|
          front, html, title, slug = item
          li(
            a({href: "/writing/#{slug}"},
              title
            )
          )
        end.join("")
      ),
      footer(nav()),
    ),
  )
end

get "/writing/:slug" do |env|
  slug = env.params.url["slug"]
  begin
    content = File.read("./writing/#{slug}.md")
    front, markdown = split_frontmatter(content)
    html = md_to_html(markdown)
    print(front.published)
  rescue ex
    halt env, status_code: 404, response: fourohfour
  end
  html(
    page_head("~/dnrvs/#{slug}.md"),
    body(
      p(
        a({href: "/"}, "~/dnrvs"),
        " ",
        "Published: #{front.published}",
      ),
      div({class: "article"}, html),
      footer(nav()),
    )
  )
end
