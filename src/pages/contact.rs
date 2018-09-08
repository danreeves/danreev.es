use actix_web::Path;
use maud::{html, Markup};

pub fn contact(_params: Path<()>) -> Markup {
    html! {
        div style="font-family: monospace;" {
            h1 { "Say hello!" }
            a href="/" { "Go home!" }
        }
    }
}
