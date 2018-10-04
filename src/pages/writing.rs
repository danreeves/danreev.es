use actix_web::Path;
use chrono::{Date, Utc, MIN_DATE};
use comrak::nodes::NodeValue;
use comrak::{markdown_to_html, parse_document, Arena};
use dissolve::strip_html_tags;
use maud::{html, Markup, PreEscaped};
use partials::page;
use regex::Regex;
use std::fs::{read_dir, read_to_string, ReadDir};
use toml::from_str;
use utils::comrak_options;

const MD: &str = include_str!("writing.md");

lazy_static! {
    static ref PAGE_RE: Regex =
        Regex::new(r"^[[:space:]]*\+\+\+\r?\n((?s).*?(?-s))\+\+\+\r?\n?((?s).*(?-s))$").unwrap();
}

#[derive(Debug, Clone)]
struct Article {
    pathname: String,
    title: String,
    excerpt: String,
    frontmatter: Frontmatter,
}

#[derive(Deserialize, Debug, Clone)]
struct Frontmatter {
    #[serde(with = "into_date")]
    published: Date<Utc>,
}

impl Frontmatter {
    fn new() -> Frontmatter {
        Frontmatter {
            published: MIN_DATE,
        }
    }
}

mod into_date {
    use chrono::{Date, NaiveDate, Utc};
    use serde::{self, Deserialize, Deserializer};

    const FORMAT: &'static str = "%Y-%m-%d";

    pub fn deserialize<'de, D>(deserializer: D) -> Result<Date<Utc>, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        let dt = NaiveDate::parse_from_str(&s, FORMAT).map_err(serde::de::Error::custom)?;
        Ok(Date::from_utc(dt, Utc))
    }
}

impl Article {
    pub fn new(mut path: String) -> Article {
        let arena = Arena::new();
        let options = comrak_options();
        let file_content = read_to_string(&path).unwrap_or("".to_string());
        let caps = PAGE_RE.captures(&file_content).unwrap();
        let frontmatter =
            from_str::<Frontmatter>(&caps[1].to_string()).unwrap_or(Frontmatter::new());
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

        let path_len = path.len();
        path.truncate(path_len - 3);
        let pathname = format!("/{}", path);

        Article {
            pathname,
            title,
            excerpt,
            frontmatter,
        }
    }

    pub fn is_published(&self) -> bool {
        self.frontmatter.published.ne(&MIN_DATE)
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

    let mut articles = paths
        .iter()
        .map(move |path| Article::new(path.to_owned()))
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
