#![feature(proc_macro_non_items)]

#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate lazy_static;
extern crate actix_web;
extern crate comrak;
extern crate dissolve;
extern crate listenfd;
extern crate maud;
extern crate pretty_env_logger;
extern crate regex;

use actix_web::middleware::Logger;
use actix_web::{fs, http::Method, server, App};
use listenfd::ListenFd;

mod pages;
mod partials;
mod utils;
use pages::{article, contact, index, writing};

fn main() {
    std::env::set_var("RUST_LOG", "actix_web=info");
    pretty_env_logger::init();
    let server_timeout = if cfg!(debug_assertions) { 0 } else { 30 };
    let mut listenfd = ListenFd::from_env();
    let mut server = server::new(|| {
        App::new()
            .middleware(Logger::new("%a %r %s %bb %Dms"))
            .resource("/", |r| r.method(Method::GET).with(index))
            .resource("/contact", |r| r.method(Method::GET).with(contact))
            .resource("/writing", |r| r.method(Method::GET).with(writing))
            .resource("/writing/{slug}", |r| r.method(Method::GET).with(article))
            .handler("/", fs::StaticFiles::new("static"))
    }).shutdown_timeout(server_timeout);

    server = if let Some(listener) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(listener)
    } else {
        server.bind("0.0.0.0:3000").unwrap()
    };

    server.run();
}
