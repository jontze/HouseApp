#[macro_use]
extern crate rocket;
#[macro_use]
extern crate serde;
extern crate chrono;
extern crate config;
extern crate sqlx;

mod database;
mod handlers;
mod models;
mod settings;
mod utils;

use handlers::{register_avg, register_oil, register_power, register_water};
use rocket::{fairing::AdHoc, figment::providers, Config, Rocket};
use settings::headers::{Cors, SecureShield, Shield};
use settings::Settings;

#[rocket::main]
async fn main() {
    let config = Config::figment().merge(providers::Serialized::defaults(Settings::default()));
    let db_pool = database::create_pool()
        .await
        .expect("Db pool to be created");
    database::apply_migrations(&db_pool)
        .await
        .expect("Migrations to be applied");
    Rocket::custom(config)
        .manage(db_pool)
        .attach(AdHoc::config::<Settings>())
        .attach(Cors)
        .attach(Shield::secure())
        .mount("/api/oil/", register_oil())
        .mount("/api/power/", register_power())
        .mount("/api/water/", register_water())
        .mount("/api/avg/", register_avg())
        .launch()
        .await
        .expect("Server should start");
}
