use crate::models::power::{InsertPower, Power};
use crate::utils;
use rocket::{http, response::status, serde::json::Json, Route, State};
use sqlx::PgPool;

#[get("/")]
async fn all(pool: &State<PgPool>) -> Result<Json<Vec<Power>>, status::Custom<&str>> {
    sqlx::query_as!(Power, "SELECT * FROM power")
        .fetch_all(pool.inner())
        .await
        .map_err(|_err| status::Custom(http::Status::InternalServerError, "Something went wrong!"))
        .map(Json)
}

#[get("/<id>")]
async fn get_by_id(id: i32, pool: &State<PgPool>) -> Result<Json<Power>, status::Custom<&str>> {
    sqlx::query_as!(Power, "SELECT * FROM power WHERE id = $1", id)
        .fetch_one(pool.inner())
        .await
        .map_err(|err| {
            if let sqlx::Error::RowNotFound = err {
                status::Custom(http::Status::NotFound, "Not found!")
            } else {
                status::Custom(http::Status::InternalServerError, "Something went wrong!")
            }
        })
        .map(Json)
}

#[post("/", data = "<insert_power>")]
async fn create(
    insert_power: Json<InsertPower>,
    pool: &State<PgPool>,
) -> Result<Json<Power>, http::Status> {
    let parse_date_from_iso_string =
        utils::parse_date_string(&insert_power.date).expect("Date to be parsed");
    sqlx::query_as!(
        Power,
        "INSERT INTO power (date, kwh) VALUES ($1, $2) RETURNING *",
        parse_date_from_iso_string,
        insert_power.kwh
    )
    .fetch_one(pool.inner())
    .await
    .map_err(|_err| http::Status::InternalServerError)
    .map(Json)
}

#[delete("/<id>")]
async fn drop_by_id(id: i32, pool: &State<PgPool>) -> Result<http::Status, status::Custom<&str>> {
    sqlx::query!("DELETE FROM power WHERE id = $1", id)
        .execute(pool.inner())
        .await
        .map_err(|err| {
            if let sqlx::Error::RowNotFound = err {
                status::Custom(http::Status::NotFound, "Not found!")
            } else {
                status::Custom(http::Status::InternalServerError, "Something went wrong!")
            }
        })
        .map(|_deleted| http::Status::Ok)
}

pub fn register() -> Vec<Route> {
    routes![all, get_by_id, create, drop_by_id]
}
