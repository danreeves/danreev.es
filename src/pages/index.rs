use actix_web::Path;
use maud::{html, Markup};
use partials::page;

fn hello_planet() -> Markup {
    html! {
        @for (i, char) in "planet!".chars().enumerate() {
            span.b[i % 2 == 0].g[i % 2 != 0] { (char) }
        }
    }
}

pub fn index(_params: Path<()>) -> Markup {
    html! {
        (page("", html! {
            h1 { "Hello, " (hello_planet()) }
            p {
                "I'm Dan Reeves, Frontend Engineer at "
                a href="https://treasuredata.com" { "Arm" }
                "."

                r#" I like writing JavaScript & Rust.
                You'll sometimes find me playing video games or reading books.
                I also organise
                "#
                a href="https://join.cornwallgeeks.net" { "Cornwall Geeks" }
                "."
            }
            p {
                "Want to talk? "
                a href="/contact" { "Get in touch!" }
            }
        }))
    }
}
