use crate::models::water::{InsertWater, Water};
use crate::utils;
use rocket::{http, response::status, serde::json::Json, Route, State};
use sqlx::PgPool;

#[get("/")]
async fn all(pool: &State<PgPool>) -> Result<Json<Vec<Water>>, status::Custom<&str>> {
    sqlx::query_as!(Water, "SELECT * FROM water")
        .fetch_all(pool.inner())
        .await
        .map_err(|_err| status::Custom(http::Status::InternalServerError, "Something went wrong!"))
        .map(Json)
}

#[get("/<id>")]
async fn get_by_id(id: i32, pool: &State<PgPool>) -> Result<Json<Water>, status::Custom<&str>> {
    sqlx::query_as!(Water, "SELECT * FROM water WHERE id = $1", id)
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

#[post("/", data = "<insert_water>")]
async fn create(
    insert_water: Json<InsertWater>,
    pool: &State<PgPool>,
) -> Result<Json<Water>, http::Status> {
    let parse_date_from_iso_string =
        utils::parse_date_string(&insert_water.date).expect("Date to be parsed");
    sqlx::query_as!(
        Water,
        "INSERT INTO water (date, cubicmeter) VALUES ($1, $2) RETURNING *",
        parse_date_from_iso_string,
        insert_water.cubicmeter
    )
    .fetch_one(pool.inner())
    .await
    .map_err(|_err| http::Status::InternalServerError)
    .map(Json)
}

#[delete("/<id>")]
async fn drop_by_id(id: i32, pool: &State<PgPool>) -> Result<http::Status, status::Custom<&str>> {
    sqlx::query!("DELETE FROM water WHERE id = $1", id)
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

#[put("/<id>", data = "<update_water>")]
async fn edit_by_id(
    id: i32,
    update_water: Json<Water>,
    pool: &State<PgPool>,
) -> Result<Json<Water>, status::Custom<&str>> {
    sqlx::query_as!(
        Water,
        "UPDATE water SET date = $2, cubicmeter = $3 WHERE id = $1 RETURNING *",
        id,
        update_water.date,
        update_water.cubicmeter
    )
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

pub fn register() -> Vec<Route> {
    routes![
        all,
        get_by_id,
        create,
        drop_by_id,
        edit_by_id,
        utils::manage_preflight,
        utils::manage_preflight_with_id
    ]
}
