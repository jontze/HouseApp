use crate::queries::power;
use crate::utils::{parse_date_string, DbPool};
use actix_web::{delete, get, post, put, web, Error, HttpRequest, HttpResponse};
use serde::Deserialize;

#[derive(Deserialize, Debug)]
struct PowerInput {
    pub kwh: f32,
    pub date: String,
}

#[derive(Deserialize, Debug)]
struct PowerUpdate {
    pub kwh: Option<f32>,
    pub date: Option<String>,
}

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/power")
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
    let power_entrys = web::block(move || power::find_all(&conn))
        .await
        .map_err(|err| {
            eprintln!("{}", err);
            HttpResponse::InternalServerError().finish()
        })?;
    Ok(HttpResponse::Ok().json(power_entrys))
}

#[get("/{id}")]
async fn get_one(
    web::Path(id): web::Path<i32>,
    pool: web::Data<DbPool>,
    _req: HttpRequest,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let power = web::block(move || power::find_by_id(&conn, id))
        .await
        .map_err(|err| {
            eprintln!("{}", err);
            HttpResponse::InternalServerError().finish()
        })?;
    match power {
        Some(power) => Ok(HttpResponse::Ok().json(power)),
        None => Ok(HttpResponse::Ok().body("Nothing found")),
    }
}

#[post("")]
async fn create(
    body: web::Json<PowerInput>,
    pool: web::Data<DbPool>,
    _req: HttpRequest,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let parsed_date = parse_date_string(&body.date).map_err(|err| {
        eprintln!("{:?}", err);
        HttpResponse::InternalServerError().finish()
    })?;
    let inserted_power = web::block(move || power::insert(&conn, body.kwh, parsed_date))
        .await
        .map_err(|err| {
            eprintln!("{}", err);
            HttpResponse::InternalServerError().finish();
        })?;
    Ok(HttpResponse::Ok().json(inserted_power))
}

#[delete("/{id}")]
async fn drop_one(
    pool: web::Data<DbPool>,
    web::Path(id): web::Path<i32>,
    _req: HttpRequest,
) -> Result<HttpResponse, Error> {
    let conn = pool.get().expect("couldn't get db connection from pool");
    let deleted_entrys = web::block(move || power::drop(&conn, id))
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
    body: web::Json<PowerUpdate>,
) -> Result<HttpResponse, Error> {
    if (body.date.is_none()) && (body.kwh.is_none()) {
        return Ok(HttpResponse::BadRequest().finish());
    };
    let parsed_date = body.date.clone().and_then(|i| parse_date_string(&i).ok());
    let conn = pool.get().expect("couldn't get db connection from pool");
    let updated_entry = web::block(move || power::update(&conn, id, body.kwh, parsed_date))
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
