use crate::queries::oil;
use crate::utils::{parse_date_string, DbPool};
use actix_web::{delete, get, post, put, web, Error, HttpRequest, HttpResponse};
use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct OilInput {
    pub filled: f32,
    pub date: String,
}

#[derive(Debug, Deserialize, Clone)]
struct OilUpdate {
    pub filled: Option<f32>,
    pub date: Option<String>,
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/oil")
            .service(get_all)
            .service(get_one)
            .service(create)
            .service(drop_one)
            .service(update_one),
    );
}

#[get("/")]
async fn get_all(pool: web::Data<DbPool>, _req: HttpRequest) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    // use web::block to offload blocking Diesel code without blocking server thread
    let oil = web::block(move || oil::find_all(&conn))
        .await
        .map_err(|err| {
            eprintln!("{}", err);
            HttpResponse::InternalServerError().finish()
        })?;
    Ok(HttpResponse::Ok().json(oil))
}

#[get("/{id}")]
async fn get_one(
    pool: web::Data<DbPool>,
    web::Path(id): web::Path<i32>,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    println!("{}", id);
    // use web::block to offload blocking Diesel code without blocking server thread
    let oil = web::block(move || oil::find_by_id(&conn, id))
        .await
        .map_err(|err| {
            eprintln!("{}", err);
            HttpResponse::InternalServerError().finish();
        })?;
    match oil {
        Some(oil) => Ok(HttpResponse::Ok().json(oil)),
        None => Ok(HttpResponse::NotFound().finish()),
    }
}

#[post("/")]
async fn create(
    pool: web::Data<DbPool>,
    body: web::Json<OilInput>,
    _req: HttpRequest,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let parsed_date = parse_date_string(&body.date).map_err(|err| {
        eprintln!("{:?}", err);
        HttpResponse::InternalServerError().finish()
    })?;
    println!("{:?}", parsed_date);
    // use web::block to offload blocking Diesel code without blocking server thread
    let inserted_oil = web::block(move || oil::insert(&conn, body.filled, parsed_date))
        .await
        .map_err(|err| {
            eprintln!("{:?}", err);
            HttpResponse::InternalServerError().finish()
        })?;
    Ok(HttpResponse::Ok().json(inserted_oil))
}

#[delete("/{id}")]
async fn drop_one(
    pool: web::Data<DbPool>,
    web::Path(id): web::Path<i32>,
    _req: HttpRequest,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let deleted_entrys = web::block(move || oil::drop(&conn, id))
        .await
        .map_err(|err| {
            eprintln!("{:?}", err);
            HttpResponse::InternalServerError().finish()
        })?;
    if deleted_entrys > 0 {
        Ok(HttpResponse::Ok().finish())
    } else {
        Ok(HttpResponse::NotFound().finish())
    }
}

#[put("/{id}")]
async fn update_one(
    pool: web::Data<DbPool>,
    web::Path(id): web::Path<i32>,
    body: web::Json<OilUpdate>,
) -> Result<HttpResponse, Error> {
    if (body.date.is_none()) && (body.filled.is_none()) {
        return Ok(HttpResponse::BadRequest().finish());
    };
    let parsed_date = body.date.clone().and_then(|i| parse_date_string(&i).ok());
    let conn = pool.get().expect("couldn't get db connection from pool");
    let updated_entry = web::block(move || oil::update(&conn, id, body.filled, parsed_date))
        .await
        .map_err(|err| {
            eprintln!("{}", err);
            HttpResponse::InternalServerError().finish()
        })?;
    match updated_entry {
        Some(updated) => Ok(HttpResponse::Ok().json(updated)),
        None => Ok(HttpResponse::NotFound().finish()),
    }
}
