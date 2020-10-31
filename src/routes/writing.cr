require "kemal"
require "temel"
require "markd"
require "../partials"
require "../front"
require "./404"

get "/writing" do |env|
  markdown = File.read("./pages/writing.md")
  body = Markd.to_html(markdown, Markd::Options.new(smart: true))
  articles = Dir.glob("./writing/*.md")

  list = articles.map do |file|
    content = File.read(file)
    front, markdown = split_frontmatter(content)
    html = Markd.to_html(markdown, Markd::Options.new(smart: true))
    title = markdown.match(/# (?<title>.+)\n/).not_nil!.named_captures["title"]
    slug = file.match(/\.\/writing\/(?<slug>.*)\.md/).not_nil!.named_captures["slug"]
    {front, html, title, slug}
  end

  sorted_list = list.sort do |a, b|
    b[0].published <=> a[0].published
  end

  html(
    page_head(
      "writing | dan reeves"
    ),
    body(
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
      img({src: "/img/yef.jpg", class: "cool-img"}),
      footer(nav()),
    ),
  )
end

get "/writing/:slug" do |env|
  slug = env.params.url["slug"]
  begin
    content = File.read("./writing/#{slug}.md")
    _, markdown = split_frontmatter(content)
    html = Markd.to_html(markdown, Markd::Options.new(smart: true))
    title = markdown.match(/# (?<title>.+)\n/).not_nil!.named_captures["title"].to_s
  rescue ex
    halt env, status_code: 404, response: fourohfour
  end
  html(
    page_head("#{title.downcase} | dan reeves"),
    body(
      div({class: "article"}, html),
      footer(nav()),
    )
  )
end