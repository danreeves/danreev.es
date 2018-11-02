use actix_web::Path;
use article::Article;
use comrak::markdown_to_html;
use maud::{html, Markup, PreEscaped};
use partials::page;
use std::fs::{read_dir, ReadDir};
use utils::comrak_options;

const MD: &str = include_str!("writing.md");

fn post_list_from_dir(dir: ReadDir) -> Markup {
    let paths: Vec<String> = dir
        .filter(|file| file.is_ok())
        .map(|file| file.unwrap().path())
        .filter(|path| path.to_str().is_some())
        .map(|path| path.to_str().unwrap().to_string())
        .filter(|path| path.ends_with(".md"))
        .collect();

    let mut articles = paths
        .iter()
        .map(move |path| Article::new(path.to_owned()).unwrap())
        .filter(|article| article.is_published())
        .collect::<Vec<Article>>();

    articles.sort_by(|a, b| b.frontmatter.published.cmp(&a.frontmatter.published));

    html! {
        ul.writing-list {
            @for article in articles {
                    li {
                        time datetime=(article.frontmatter.published.format("%Y-%m-%d")) {
                            (article.frontmatter.published.format("%e %b %Y"));
                        }
                        " - "
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
    let options = comrak_options();
    let content: String = markdown_to_html(MD, &options);
    let body = html! {
        (PreEscaped(content))
        (post_list)
    };
    html! {
        (page("Writing", body))
    }
}
