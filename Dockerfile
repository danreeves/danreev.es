FROM clux/muslrust as build
WORKDIR /usr/src
COPY . .
RUN cargo build --release

FROM scratch
COPY --from=build /usr/src/target/x86_64-unknown-linux-musl/release/my-web-site /
CMD ["/my-web-site"]
