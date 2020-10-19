require "kemal"
require "temel"
require "markd"
require "../partials"
require "../imgur"
require "../slug"
require "./404"

get "/photography" do |env|
  begin
    markdown = File.read("./pages/photography.md")
    html = Markd.to_html(markdown, Markd::Options.new(smart: true))
    albums = Imgur.get_albums
  rescue ex
    halt env, status_code: 404, response: fourohfour
  end
  html(
    page_head(
      "photography | dan reeves"
    ),
    body(
      html,
      div({class: "albums"},
        albums.map do |album|
          div({class: "album"},
            a({href: "/photography/#{slugify(album.title)}"},
              img({src: album.cover_link, class: "cool-img"}),
              span(album.title),
            )
          )
        end.join("")
      )
    ),
    footer(nav()),
  )
end

get "/photography/:slug" do |env|
  album_slug = env.params.url["slug"]
  begin
    albums = Imgur.get_albums
    album = albums.find do |album|
      slugify(album.title) == album_slug
    end
    if !album
      raise "Album not found"
    end
  rescue ex
    halt env, status_code: 404, response: fourohfour
  end
  html(
    page_head(
      "#{album.title} | dan reeves"
    ),
    body(
      h1(album.title),
      album.images.map_with_index do |image, i|
        if image.id == album.cover
          ""
        else
          img({src: image.link, class: "album-img", loading: i < 3 ? "eager" : "lazy"})
        end
      end.join("")
    ),
    footer(nav()),
  )
end
