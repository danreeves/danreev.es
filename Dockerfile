FROM clux/muslrust:1.31.0-nightly as build
WORKDIR /usr/src
COPY . .
RUN cargo build --release

FROM scratch
COPY --from=build /usr/src/target/x86_64-unknown-linux-musl/release/my-web-site /
COPY --from=build /usr/src/static/ /static
COPY --from=build /usr/src/writing/ /writing
EXPOSE 80
CMD ["/my-web-site"]
