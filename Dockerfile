FROM crystallang/crystal:0.35.1-alpine-build
COPY . .
RUN apk add cmake
RUN shards install
RUN crystal build src/server.cr
CMD ["./server"]
