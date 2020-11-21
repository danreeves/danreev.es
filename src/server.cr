require "file"
require "dotenv"
require "kemal"
require "kemal-watcher"
require "./routes/**"

begin
  Dotenv.load
rescue ex
  puts ".env not found"
end

static_headers do |response, filepath, filestat|
  response.headers.add("Cache-Control", "max-age=3600")
end

Kemal.run
