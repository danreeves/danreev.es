use actix_web::Path;
use comrak::nodes::NodeValue;
use comrak::{markdown_to_html, parse_document, Arena, ComrakOptions};
use dissolve::strip_html_tags;
use maud::{html, Markup, PreEscaped};
use partials::page;
use std::fs::{read_dir, read_to_string, ReadDir};

struct Article {
    pathname: String,
    title: String,
    excerpt: String,
}

impl Article {
    pub fn new(path: String) -> Article {
        let arena = Arena::new();
        let options = ComrakOptions {
            ext_strikethrough: true,
            ..ComrakOptions::default()
        };
        let content = read_to_string(&path).unwrap_or("".to_string());
        let root = parse_document(&arena, &content, &options);

        let heading_node = &root
            .children()
            .find(|node| match node.data.borrow().value {
                NodeValue::Heading(_node) => true,
                _ => false,
            }).unwrap() // TODO: Panics
            .data
            .borrow();
        let title =
            String::from_utf8(heading_node.content.clone()).unwrap_or("Untitled".to_string());

        let para_node = &root
            .children()
            .find(|node| match node.data.borrow().value {
                NodeValue::Paragraph => true,
                _ => false,
            }).unwrap() // TODO: Panics
            .data
            .borrow();

        let excerpt = String::from_utf8(para_node.content.clone()).unwrap_or("".to_string());

        let mut excerpt = strip_html_tags(&markdown_to_html(&excerpt, &options))
            .join("")
            .chars()
            .take(128 - 3)
            .collect::<String>();

        excerpt.push_str("...");

        Article {
            pathname: format!("/{}", path),
            title,
            excerpt,
        }
    }
}

fn post_list_from_dir(dir: ReadDir) -> Markup {
    let paths: Vec<String> = dir
        .filter(|file| file.is_ok())
        .map(|file| file.unwrap().path())
        .filter(|path| path.to_str().is_some())
        .map(|path| path.to_str().unwrap().to_string())
        .filter(|path| path.ends_with(".md"))
        .collect();

    let articles = paths.iter().map(move |path| Article::new(path.to_owned()));

    html! {
        ul.writing-list {
            @for article in articles {
                    li {
                        a href=(article.pathname) { (article.title) }
                        blockquote cite=(article.pathname) {
                            (PreEscaped(article.excerpt))
                        }
                    }
            }
        }
    }
}

pub fn writing(_params: Path<()>) -> Markup {
    let dir = read_dir("writing");
    let post_list = match dir {
        Ok(dir) => post_list_from_dir(dir),
        Err(_err) => {
            html! { div { "Looks like there's nothing here..." } }
        }
    };
    html! {
        (page("Writing", post_list))
    }
}
