---
published: 2020-09-28
---

# Learning Crystal

This week I came across [Crystal](https://crystal-lang.org/) and decided I liked
the look of it enough to give it a go. I took a look around the ecosystem and
spotted [Kemal](https://kemalcr.com/), a simple looking webserver with support
for websockets. Websockets are something I had played around with in Rust and I
wanted to see if I could accomplish something with them easier than I found it
with Rust (though this was a while back and the ecosystem may have improved).
The results of this exploration can be seen in this simple chat server:
[danreeves/crystal-lang-web-test](https://github.com/danreeves/crystal-lang-web-test).

## what

Crystal is a compiled and statically type checked langauge with syntax inspired
by Ruby. I've never used ruby but apparently people think it has nice syntax. So
far I tend to think it's nice in most ways but has some idiosyncracies I'm not
used to, even as someone comfortable with lua and python.

The first problems I encountered was no built in "watch" command like I'm used
to in Rust and when using webpack for frontend work. I looked at the solutions I
could find and didn't spot anything that was to my liking, mostly binaries that
needed to be installed system wide and with custom yaml configuration files. I'm
a fan of the way [cargo watch](https://github.com/passcod/cargo-watch) builds
right into the cargo CLI and provides a holistic approach. As a solution, and a
decent excuse to learn how to write reusable modules in the crystal ecosystem, I
wrote [watch](https://github.com/danreeves/watch).

## Watch

Watch is a simple Crystal script which lets you define multiple file globs to
watch over with commands assigned to be run on changes.

```
require "watch"

Watch.watch "./**/*.cr", "crystal src/server.cr", opts: [:verbose, :log_changes, :on_start]

Watch.run
```

Since the default operation of the crystal compile CLI is to run the file you
can now run `crystal watch.cr` and it'll watch the `/src` directory, managing
the starting and ending of processes and piping stdout and stderr for you.

It's quite simple and probably highly inefficient at scale but it works for my
simple purposes.

The concurrency model of Crystal,
[fibers](https://crystal-lang.org/reference/guides/concurrency.html), enable
multiple processes to be run with highly readable code.

## The rewrite

In time honoured tradition, the next thing for me to do was rewrite this site.
Using Kemal again, but this time with [Temel](https://github.com/f/temel) for
the templating. Temel creates a simple DSL for generating markup, so my view
route handlers look something like:

```
get "/:page" do |env|
  page = env.params.url["page"]
  markdown = File.read("./pages/#{page}.md")
  html = Markd.to_html(markdown, Markd::Options.new(smart: true))
  html(
    page_head(
      "#{page} | dan reeves"
    ),
    body(
      header(nav()),
      div(
        html
      ),
    ),
  )
end
```

I like the simplicity of Crystal, Kemal, and Temel over the combination of
actix-web and maud I was using in the Rust version. The compile times are much
faster. I was able to rewrite the a lot of what I needed without bringing in
many dependencies because Crystal has a pretty broad
[standard library](https://crystal-lang.org/api/0.35.1/index.html).

## Handy resources:

- [The docs](https://crystal-lang.org/reference/): I found myself coming here
  pretty often when I was trying to figure out how something works, but it
  leaves a lot to be desired. More useful to me was reading the source of other
  open source libraries.
- [The standard library](https://crystal-lang.org/api/0.35.1/index.html):
  Everything is in there, you've just got to find it...
- [CrystalShards](http://crystalshards.xyz/): The current home for discovering
  Crystal Shards, the crystal term for package or module or ruby gem or whatever
