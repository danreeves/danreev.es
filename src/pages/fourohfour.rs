use actix_web::{error::ResponseError, HttpRequest, HttpResponse};
use failure::Fail;
use maud::html;
use partials::page;

fn fourohfour_response() -> HttpResponse {
    let body = html! {
        (page("404 Not found", html! { p { "" }}))
    };
    HttpResponse::NotFound().body(body.into_string())
}

pub fn handler(_: &HttpRequest) -> HttpResponse {
    fourohfour_response()
}

#[derive(Fail, Debug)]
#[fail(display = "Not Found")]
pub struct NotFoundError {
    pub name: &'static str,
}

impl ResponseError for NotFoundError {
    fn error_response(&self) -> HttpResponse {
        fourohfour_response()
    }
}
