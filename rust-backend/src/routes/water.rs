use crate::queries::water;
use crate::utils::{parse_date_string, DbPool};
use actix_web::{delete, get, post, put, web, Error, HttpRequest, HttpResponse};
use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct WaterInput {
    pub cubicmeter: f32,
    pub date: String,
}

#[derive(Deserialize, Debug)]
struct WaterUpdate {
    pub cubicmeter: Option<f32>,
    pub date: Option<String>,
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/water")
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
    let water_entrys = web::block(move || water::find_all(&conn))
        .await
        .map_err(|err| {
            eprintln!("{}", err);
            HttpResponse::InternalServerError().finish()
        })?;
    Ok(HttpResponse::Ok().json(water_entrys))
}

#[get("/{id}")]
async fn get_one(
    web::Path(id): web::Path<i32>,
    pool: web::Data<DbPool>,
    _req: HttpRequest,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let water = web::block(move || water::find_by_id(&conn, id))
        .await
        .map_err(|err| {
            eprintln!("{}", err);
            HttpResponse::InternalServerError().finish()
        })?;
    match water {
        Some(water) => Ok(HttpResponse::Ok().json(water)),
        None => Ok(HttpResponse::Ok().body("Nothing found!")),
    }
}

#[post("/")]
async fn create(
    body: web::Json<WaterInput>,
    pool: web::Data<DbPool>,
    _req: HttpRequest,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let parsed_date = parse_date_string(&body.date).map_err(|err| {
        eprintln!("{:?}", err);
        HttpResponse::InternalServerError().finish()
    })?;
    let inserted_water = web::block(move || water::insert(&conn, body.cubicmeter, parsed_date))
        .await
        .map_err(|err| {
            eprintln!("{}", err);
            HttpResponse::InternalServerError().finish()
        })?;
    Ok(HttpResponse::Ok().json(inserted_water))
}

#[delete("/{id}")]
async fn drop_one(
    pool: web::Data<DbPool>,
    web::Path(id): web::Path<i32>,
    _req: HttpRequest,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let deleted_entrys = web::block(move || water::drop(&conn, id))
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
    body: web::Json<WaterUpdate>,
) -> Result<HttpResponse, Error> {
    if (body.date.is_none()) && (body.cubicmeter.is_none()) {
        return Ok(HttpResponse::BadRequest().finish());
    };
    let parsed_date = body.date.clone().and_then(|i| parse_date_string(&i).ok());
    let conn = pool.get().expect("couldn't get db connection from pool");
    let updated_entry = web::block(move || water::update(&conn, id, body.cubicmeter, parsed_date))
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
