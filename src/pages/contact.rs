use actix_web::Path;
use comrak::{markdown_to_html, ComrakOptions};
use maud::{html, Markup, PreEscaped};
use partials::page;

const MD: &str = include_str!("contact.md");

pub fn contact(_params: Path<()>) -> Markup {
    let options = ComrakOptions {
        ext_strikethrough: true,
        ..ComrakOptions::default()
    };
    let content: String = markdown_to_html(MD, &options);
    html! {
        (page("Contact", PreEscaped(content)))
    }
}
