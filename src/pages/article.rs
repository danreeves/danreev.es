use actix_web::Path;
use comrak::nodes::NodeValue;
use comrak::{format_html, parse_document, Arena};
use maud::{html, Markup, PreEscaped};
use partials::page;
use regex::Regex;
use std::fs::read_to_string;
use utils::comrak_options;

lazy_static! {
    static ref PAGE_RE: Regex =
        Regex::new(r"^[[:space:]]*\+\+\+\r?\n((?s).*?(?-s))\+\+\+\r?\n?((?s).*(?-s))$").unwrap();
}

#[derive(Deserialize)]
pub struct Article {
    pub slug: String,
}

pub fn article(params: Path<Article>) -> Markup {
    let file_path = format!("writing/{}.md", params.slug);
    let arena = Arena::new();
    let options = comrak_options();
    let file_content = read_to_string(&file_path).unwrap_or("".to_string());
    let caps = PAGE_RE.captures(&file_content).unwrap();
    let frontmatter = caps[1].to_string();
    let content = caps[2].to_string();
    let root = parse_document(&arena, &content, &options);

    let heading_node = &root
        .children()
        .find(|node| match node.data.borrow().value {
            NodeValue::Heading(_node) => true,
            _ => false,
        }).unwrap() // TODO: Panics
        .data
        .borrow();
    let title = String::from_utf8(heading_node.content.clone()).unwrap_or("Untitled".to_string());

    let heading_node = &root
        .children()
        .find(|node| match node.data.borrow().value {
            NodeValue::Heading(_node) => true,
            _ => false,
        }).unwrap(); // TODO: Panics

    // Remove the H1 from the AST before we render it to HTML
    heading_node.detach();

    let mut body = vec![];
    // TODO: Handle this result?
    format_html(&root, &options, &mut body);
    let body = String::from_utf8(body).unwrap_or("".to_string());

    html! {
        (page(&title, html! { div.article { (PreEscaped(body)) } }))
    }
}
