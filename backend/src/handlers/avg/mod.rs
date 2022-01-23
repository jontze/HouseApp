use crate::utils;
use rocket::{http, response::status, serde::json::Json, Route, State};
use sqlx::PgPool;

mod calc;
mod queries;

#[get("/power")]
async fn all_power_avg(
    pool: &State<PgPool>,
) -> Result<Json<Vec<calc::AvgConsumption>>, status::Custom<&str>> {
    queries::select_power_sorted_date(pool.inner())
        .await
        .map_err(|_err| status::Custom(http::Status::InternalServerError, "Something went wrong!"))
        .map(|sorted_power| Json(calc::avg_consumption_power(sorted_power)))
}

#[get("/water")]
async fn all_water_avg(
    pool: &State<PgPool>,
) -> Result<Json<Vec<calc::AvgConsumption>>, status::Custom<&str>> {
    queries::select_water_sorted_date(pool.inner())
        .await
        .map_err(|_err| status::Custom(http::Status::InternalServerError, "Something went wrong!"))
        .map(|sorted_water| Json(calc::avg_consumption_water(sorted_water)))
}

#[get("/oil")]
async fn all_oil_avg(
    pool: &State<PgPool>,
) -> Result<Json<Vec<calc::AvgConsumption>>, status::Custom<&str>> {
    queries::select_oil_sorted_date(pool.inner())
        .await
        .map_err(|_err| status::Custom(http::Status::InternalServerError, "Something went wrong!"))
        .map(|sorted_oil| Json(calc::avg_consumption_oil(sorted_oil)))
}

pub fn register() -> Vec<Route> {
    routes![
        all_power_avg,
        all_water_avg,
        all_oil_avg,
        utils::manage_preflight,
        utils::manage_preflight_with_id
    ]
}
