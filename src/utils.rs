use actix_web::{
    http::{header, StatusCode},
    HttpRequest, HttpResponse,
};
use comrak::ComrakOptions;
use regex::Regex;

pub fn comrak_options() -> ComrakOptions {
    ComrakOptions {
        ext_strikethrough: true,
        ext_header_ids: Some("".to_string()),
        ext_autolink: true,
        github_pre_lang: true,
        smart: true,
        ext_table: true,
        ..ComrakOptions::default()
    }
}

pub fn normalize_slashes(req: &HttpRequest) -> HttpResponse {
    let slashes = Regex::new("/+").unwrap();
    let path = req.uri().path();
    let path = slashes.replace_all(path, "/");
    let path = path.trim_right_matches("/");
    let path = match path.len() {
        0 => "/",
        _ => path,
    };
    HttpResponse::build(StatusCode::TEMPORARY_REDIRECT)
        .header(header::LOCATION, path)
        .finish()
}
