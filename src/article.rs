use chrono::{Date, Utc, MIN_DATE};
use comrak::{format_html, nodes::NodeValue};
use comrak::{markdown_to_html, parse_document, Arena};
use dissolve::strip_html_tags;
use regex::Regex;
use std::fs::read_to_string;
use toml::from_str;
use utils::comrak_options;

lazy_static! {
    static ref PAGE_RE: Regex =
        Regex::new(r"^[[:space:]]*\+\+\+\r?\n((?s).*?(?-s))\+\+\+\r?\n?((?s).*(?-s))$").unwrap();
}

#[derive(Debug, Clone)]
pub struct Article {
    pub pathname: String,
    pub title: String,
    pub excerpt: String,
    pub body: String,
    pub frontmatter: Frontmatter,
}

#[derive(Deserialize, Debug, Clone)]
pub struct Frontmatter {
    #[serde(with = "into_date")]
    pub published: Date<Utc>,
}

impl Frontmatter {
    pub fn new() -> Frontmatter {
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

        // Remove the H1 from the AST before we render it to HTML
        &root
            .children()
            .find(|node| match node.data.borrow().value {
                NodeValue::Heading(_node) => true,
                _ => false,
            }).unwrap() // TODO: Panics
            .detach();

        let mut body = vec![];
        // TODO: Handle this result?
        format_html(&root, &options, &mut body);
        let body = String::from_utf8(body).unwrap_or("".to_string());

        Article {
            pathname,
            title,
            excerpt,
            frontmatter,
            body,
        }
    }

    pub fn is_published(&self) -> bool {
        self.frontmatter.published.ne(&MIN_DATE)
    }
}
