use crate::models::{InsertWater, Water};
use chrono::NaiveDateTime;
use diesel::prelude::*;
use diesel::result::Error;

pub fn find_all(conn: &PgConnection) -> Result<Vec<Water>, Error> {
    use crate::schema::water::dsl::*;
    let water_entrys = water.load::<Water>(conn)?;
    Ok(water_entrys)
}

pub fn find_by_id(conn: &PgConnection, db_id: i32) -> Result<Option<Water>, Error> {
    use crate::schema::water::dsl::*;
    let water_entry = water.filter(id.eq(db_id)).first::<Water>(conn).optional()?;
    Ok(water_entry)
}

pub fn insert(
    conn: &PgConnection,
    cubicmeter_insert: f32,
    insert_date: NaiveDateTime,
) -> Result<Water, Error> {
    use crate::schema::water::dsl::*;
    let new_water = InsertWater {
        cubicmeter: cubicmeter_insert,
        date: insert_date,
    };
    let created_water = diesel::insert_into(water)
        .values(new_water)
        .get_result(conn)?;
    Ok(created_water)
}

pub fn drop(conn: &PgConnection, query_id: i32) -> Result<usize, Error> {
    use crate::schema::water::dsl::*;
    let deleted_oil = diesel::delete(water.filter(id.eq(query_id))).execute(conn)?;
    Ok(deleted_oil)
}

pub fn update(
    conn: &PgConnection,
    query_id: i32,
    cubicmeter_update: Option<f32>,
    date_update: Option<NaiveDateTime>,
) -> Result<Option<Water>, Error> {
    let mut update_counter: i32 = 0;
    use crate::schema::water::dsl::*;
    // Update cubicmeter
    match cubicmeter_update {
        Some(cubicmeter_up) => {
            diesel::update(water.filter(id.eq(query_id)))
                .set(cubicmeter.eq(cubicmeter_up))
                .execute(conn)?;
        }
        None => {
            update_counter += 1;
        }
    }
    // Update date
    match date_update {
        Some(date_up) => {
            diesel::update(water.filter(id.eq(query_id)))
                .set(date.eq(date_up))
                .execute(conn)?;
        }
        None => {
            update_counter += 1;
        }
    }
    // Return None if no values were updated
    if update_counter == 2 {
        return Ok(None);
    }
    // Query new entry
    let new_entry = water
        .filter(id.eq(query_id))
        .first::<Water>(conn)
        .optional()?;
    Ok(new_entry)
}
