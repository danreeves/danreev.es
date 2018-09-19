use actix_web::Path;
use comrak::{markdown_to_html, ComrakOptions};
use maud::{html, Markup, PreEscaped, DOCTYPE};

const MD: &str = include_str!("contact.md");

pub fn contact(_params: Path<()>) -> Markup {
    let content: String = markdown_to_html(MD, &ComrakOptions::default());
    html! {
        (DOCTYPE)
            html {
                body style="font-family: monospace;" {
                    (PreEscaped(content))
                }
            }
    }
}
