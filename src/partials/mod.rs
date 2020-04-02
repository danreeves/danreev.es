use maud::{html, Markup, DOCTYPE};

fn title_string(title: &str) -> String {
    match title.chars().count() > 0 {
        true => format!("{} ⌁ Dan Reeves", title),
        false => String::from("Dan Reeves"),
    }
}

fn nav(loc: &str) -> Markup {
    let nav = html! {
        nav {
            a href="/" title="Home" { "Home" }
            " "
            a href="/contact" title="Contact" { "Mail" }
            " "
            a href="/writing" { "Writing" }
            " "
            a href="https://twitter.com/dnrvs" { "Tweets" }
            " "
            a href="https://github.com/danreeves" { "Code" }
        }
    };
    match loc {
        "header" => html! {
            header { (nav) }
        },
        "footer" => html! {
            footer {
                (nav)
            }
            script src="/static/js/script.js" {}
        },
        &_ => html! {},
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
                    link rel="icon" href="/static/favicon.ico";
                    link rel="apple-touch-icon" href="/static/favicon.png";
                    link rel="stylesheet" href="/static/css/style.css";
                }
                body {
                    @if page_title.chars().count() > 0 {
                        (nav("header"))
                    }
                    h1 { (page_title) }
                    (body)
                    (nav("footer"))
                }
            }
    }
}
