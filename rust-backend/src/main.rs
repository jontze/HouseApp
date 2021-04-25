extern crate actix_cors;
extern crate actix_web;
#[macro_use]
extern crate diesel;
extern crate chrono;
extern crate dotenv;
extern crate env_logger;
extern crate serde;
extern crate serde_json;

use actix_cors::Cors;
use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use dotenv::dotenv;

mod models;
mod queries;
mod routes;
mod schema;
mod utils;

use crate::routes::{oil, power, water};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    dotenv().ok();

    let connspec = std::env::var("DATABASE_URL").expect("DATABASE_URL");
    let manager = ConnectionManager::<PgConnection>::new(connspec);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    HttpServer::new(move || {
        App::new()
            .data(pool.clone())
            .wrap(Logger::default())
            .wrap(Cors::permissive())
            .service(
                web::scope("/api")
                    .configure(oil::config)
                    .configure(water::config)
                    .configure(power::config),
            )
    })
    .bind("0.0.0.0:3000")?
    .run()
    .await
}
