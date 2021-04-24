FROM crystallang/crystal:1.0.0-alpine-build
COPY . .
RUN apk add cmake
RUN shards install --ignore-crystal-version
RUN crystal build src/server.cr
CMD ["./server"]
