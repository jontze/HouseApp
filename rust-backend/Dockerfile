FROM lukemathwalker/cargo-chef as planner
WORKDIR /backend
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM lukemathwalker/cargo-chef as cacher
WORKDIR /backend
COPY --from=planner /backend/recipe.json recipe.json
RUN cargo chef cook --release --recipe-path recipe.json

FROM rust:1.52 as builder
WORKDIR /backend
COPY . .
COPY --from=cacher /backend/target target
COPY --from=cacher $CARGO_HOME $CARGO_HOME
RUN cargo build --release --bin house-backend

FROM debian:buster-slim AS runtime
WORKDIR /backend
# Install Project dependencies
RUN apt-get update -y \ 
    && apt-get install -y --no-install-recommends openssl libpq-dev \
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*
COPY --from=builder /backend/target/release/house-backend backend
CMD [ "./backend" ]
