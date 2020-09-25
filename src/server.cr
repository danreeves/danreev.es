require "kemal"
require "temel"

get "/" do
  html(
    head(
      title "Hello, planet!"
    ),
    body(
      div h1 "Hello, planet!"
    ),
  )
end

Kemal.run
