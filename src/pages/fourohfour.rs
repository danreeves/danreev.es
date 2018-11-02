use maud::html;
use partials::page;

pub fn fourohfour(_: &actix_web::HttpRequest) -> actix_web::HttpResponse {
    let body = html! {
        (page("404 Not found", html! { p { "" }}))
    };
    actix_web::HttpResponse::NotFound().body(body.into_string())
}
