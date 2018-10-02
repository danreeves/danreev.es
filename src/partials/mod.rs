use maud::{html, Markup, DOCTYPE};

fn title_string(title: &str) -> String {
    match title.chars().count() > 0 {
        true => format!("{} ⌁ Dan Reeves", title),
        false => String::from("Dan Reeves"),
    }
}

fn footer() -> Markup {
    html! {
        footer {
            nav {
                a href="/" title="Home" { "⌂" }
                " "
                a href="https://twitter.com/dnrvs" { "Twitter" }
                " "
                a href="https://github.com/danreeves" { "GitHub" }
                " "
                a href="/contact" { "Contact" }
                " "
                a href="/writing" { "Writing" }
            }
            p { "A world wide web site by Dan Reeves." }
        }
    }
}

pub fn page(page_title: &str, body: Markup) -> Markup {
    html! {
        (DOCTYPE)
            html lang="en-GB" {
                head {
                    meta charset="utf-8";
                    meta http-equiv="x-ua-compatible" content="ie=edge";
                    title { (title_string(&page_title)) }
                    meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no";
                    link rel="icon" href="/favicon.ico";
                    link rel="apple-touch-icon" href="/favicon.png";
                    link rel="stylesheet" href="/css/style.css";
                }
                body {
                    @if page_title.chars().count() > 0 {
                        a href="/" class="home-link" title="Go home" { "⇦" }
                    }
                    h1 { (page_title) }
                    (body)
                    (footer())
                }
            }
    }
}
