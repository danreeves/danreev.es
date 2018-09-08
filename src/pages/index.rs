use actix_web::Path;
use maud::{html, Markup};

pub fn index(_params: Path<()>) -> Markup {
    html! {
        div style="font-family: monospace;" {
            h1 { "Hello, planet!" }
            a href="/contact" { "Say hello!" }
        }
    }
}
