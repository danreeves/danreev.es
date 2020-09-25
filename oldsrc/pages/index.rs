use actix_web::Path;
use comrak::markdown_to_html;
use maud::{html, Markup, PreEscaped};
use partials::page;
use utils::comrak_options;

const MD: &str = include_str!("index.md");

pub fn index(_params: Path<()>) -> Markup {
    let options = comrak_options();
    let content: String = markdown_to_html(MD, &options);
    html! {
        (page("", PreEscaped(content)))
    }
}
