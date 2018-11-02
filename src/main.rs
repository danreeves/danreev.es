#![feature(proc_macro_hygiene)]

#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate lazy_static;
extern crate actix_web;
extern crate chrono;
extern crate comrak;
extern crate dissolve;
extern crate listenfd;
extern crate maud;
extern crate pretty_env_logger;
extern crate regex;
extern crate serde;
extern crate toml;

use actix_web::middleware::Logger;
use actix_web::{fs, http::Method, server, App};
use listenfd::ListenFd;

mod article;
mod pages;
mod partials;
mod utils;
use pages::{article, contact, fourohfour, index, writing};
use utils::normalize_slashes;

fn redirect_or_404(req: &actix_web::HttpRequest) -> actix_web::HttpResponse {
    let uri = req.uri();
    match uri.path().ends_with("/") {
        true => normalize_slashes(req),
        false => fourohfour(req),
    }
}

fn main() {
    std::env::set_var("RUST_LOG", "actix_web=info");
    pretty_env_logger::init();
    let server_timeout = if cfg!(debug_assertions) { 0 } else { 30 };
    let mut listenfd = ListenFd::from_env();
    let mut server = server::new(|| {
        App::new()
            .middleware(Logger::new("%a %r %s %bb %Dms"))
            .handler(
                "/static",
                fs::StaticFiles::new("static")
                    .unwrap()
                    .default_handler(fourohfour),
            )
            .resource("/", |r| r.method(Method::GET).with(index))
            .resource("/contact", |r| r.method(Method::GET).with(contact))
            .resource("/writing", |r| r.method(Method::GET).with(writing))
            .resource("/writing/{slug}", |r| r.method(Method::GET).with(article))
            .default_resource(|r| r.h(redirect_or_404))
    })
    .shutdown_timeout(server_timeout);

    server = if let Some(listener) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(listener)
    } else {
        server.bind("0.0.0.0:3000").unwrap()
    };

    server.run();
}
