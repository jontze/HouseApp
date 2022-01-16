FROM lukemathwalker/cargo-chef:latest-rust-1.56 as planner
WORKDIR /service
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM lukemathwalker/cargo-chef:latest-rust-1.56 as cacher
WORKDIR /service
COPY --from=planner /service/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json

FROM lukemathwalker/cargo-chef:latest-rust-1.56 as builder
ENV SQLX_OFFLINE=true
WORKDIR /service
COPY . .
COPY --from=cacher /service/target target
COPY --from=cacher $CARGO_HOME $CARGO_HOME
RUN cargo build --release --bin backend

FROM ubuntu:21.10 as runtime
WORKDIR /service
COPY ./config ./config
COPY --from=builder /service/target/release/backend backend
CMD [ "./backend" ]