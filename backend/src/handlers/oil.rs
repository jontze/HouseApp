use crate::models::oil::{InsertOil, Oil};
use crate::utils;
use rocket::{http, response::status, serde::json::Json, Route, State};
use sqlx::PgPool;

#[get("/")]
async fn all(pool: &State<PgPool>) -> Result<Json<Vec<Oil>>, status::Custom<&str>> {
    sqlx::query_as!(Oil, "SELECT * FROM oil")
        .fetch_all(pool.inner())
        .await
        .map_err(|_err| status::Custom(http::Status::InternalServerError, "Something went wrong!"))
        .map(Json)
}

#[get("/<id>")]
async fn get_by_id(id: i32, pool: &State<PgPool>) -> Result<Json<Oil>, status::Custom<&str>> {
    sqlx::query_as!(Oil, "SELECT * FROM oil WHERE id = $1", id)
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

#[post("/", data = "<insert_oil>")]
async fn create(
    insert_oil: Json<InsertOil>,
    pool: &State<PgPool>,
) -> Result<Json<Oil>, http::Status> {
    let parse_date_from_iso_string =
        utils::parse_date_string(&insert_oil.date).expect("Date to be parsed");
    sqlx::query_as!(
        Oil,
        "INSERT INTO oil (date, filled) VALUES ($1, $2) RETURNING *",
        parse_date_from_iso_string,
        insert_oil.filled
    )
    .fetch_one(pool.inner())
    .await
    .map_err(|_err| http::Status::InternalServerError)
    .map(Json)
}

#[delete("/<id>")]
async fn drop_by_id(id: i32, pool: &State<PgPool>) -> Result<http::Status, status::Custom<&str>> {
    sqlx::query!("DELETE FROM oil WHERE id = $1", id)
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

#[put("/<id>", data = "<update_oil>")]
async fn edit_by_id(
    id: i32,
    update_oil: Json<Oil>,
    pool: &State<PgPool>,
) -> Result<Json<Oil>, status::Custom<&str>> {
    sqlx::query_as!(
        Oil,
        "UPDATE oil SET date = $2, filled = $3 WHERE id = $1 RETURNING *",
        id,
        update_oil.date,
        update_oil.filled
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
