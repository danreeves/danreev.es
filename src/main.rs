#![feature(proc_macro_non_items)]

extern crate actix_web;
extern crate comrak;
extern crate dissolve;
extern crate listenfd;
extern crate maud;

use actix_web::{fs, http::Method, server, App};
use listenfd::ListenFd;

mod pages;
mod partials;
use pages::{contact, index, writing};

fn main() {
    let server_timeout = if cfg!(debug_assertions) { 0 } else { 30 };
    let mut listenfd = ListenFd::from_env();
    let mut server = server::new(|| {
        App::new()
            .resource("/", |r| r.method(Method::GET).with(index))
            .resource("/contact", |r| r.method(Method::GET).with(contact))
            .resource("/writing", |r| r.method(Method::GET).with(writing))
            .handler("/", fs::StaticFiles::new("static"))
    }).shutdown_timeout(server_timeout);

    server = if let Some(listener) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(listener)
    } else {
        server.bind("0.0.0.0:3000").unwrap()
    };

    server.run();
}
