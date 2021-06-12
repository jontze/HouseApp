use crate::models::{InsertPower, Power};
use chrono::NaiveDateTime;
use diesel::prelude::*;
use diesel::result::Error;

pub fn find_all(conn: &PgConnection) -> Result<Vec<Power>, Error> {
    use crate::schema::power::dsl::*;
    let power_entrys = power.load::<Power>(conn)?;
    Ok(power_entrys)
}

pub fn find_by_id(conn: &PgConnection, db_id: i32) -> Result<Option<Power>, Error> {
    use crate::schema::power::dsl::*;
    let power_entry = power.filter(id.eq(db_id)).first::<Power>(conn).optional()?;
    Ok(power_entry)
}

pub fn insert(
    conn: &PgConnection,
    kwh_insert: f32,
    insert_date: NaiveDateTime,
) -> Result<Power, Error> {
    use crate::schema::power::dsl::*;
    let new_power = InsertPower {
        kwh: kwh_insert,
        date: insert_date,
    };
    let created_power = diesel::insert_into(power)
        .values(new_power)
        .get_result(conn)?;
    Ok(created_power)
}

pub fn drop(conn: &PgConnection, query_id: i32) -> Result<usize, Error> {
    use crate::schema::power::dsl::*;
    println!("{}", query_id);
    let deleted_oil = diesel::delete(power.filter(id.eq(query_id))).execute(conn)?;
    println!("{}", deleted_oil);
    Ok(deleted_oil)
}

pub fn update(
    conn: &PgConnection,
    query_id: i32,
    kwh_update: Option<f32>,
    date_update: Option<NaiveDateTime>,
) -> Result<Option<Power>, Error> {
    let mut update_counter: i32 = 0;
    use crate::schema::power::dsl::*;
    // Update kwh
    match kwh_update {
        Some(kwh_up) => {
            diesel::update(power.filter(id.eq(query_id)))
                .set(kwh.eq(kwh_up))
                .execute(conn)?;
        }
        None => {
            update_counter += 1;
        }
    }
    // Update date
    match date_update {
        Some(date_up) => {
            diesel::update(power.filter(id.eq(query_id)))
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
    let new_entry = power
        .filter(id.eq(query_id))
        .first::<Power>(conn)
        .optional()?;
    Ok(new_entry)
}
