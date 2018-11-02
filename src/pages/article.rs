use actix_web::Path;
use article::Article;
use maud::{html, Markup, PreEscaped};
use pages::fourohfour::NotFoundError;
use partials::page;

#[derive(Deserialize)]
pub struct Params {
    pub slug: String,
}

pub fn article(params: Path<Params>) -> Result<Markup, NotFoundError> {
    let file_path = format!("writing/{}.md", params.slug);
    let article = Article::new(file_path)?;

    Ok(html! {
        (page(&article.title, html! {
            div.article {
                small.published-at {
                    time datetime=(article.frontmatter.published.format("%Y-%m-%d")) {
                        (article.frontmatter.published.format("%e %b %Y"));
                    }
                }
                (PreEscaped(article.body))
            }
        }))
    })
}
