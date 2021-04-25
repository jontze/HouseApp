use crate::models::{InsertOil, Oil};
use chrono::NaiveDateTime;
use diesel::prelude::*;
use diesel::result::Error;

pub fn find_all(conn: &PgConnection) -> Result<Vec<Oil>, Error> {
    use crate::schema::oil::dsl::*;
    let oil_entrys = oil.load::<Oil>(conn)?;
    Ok(oil_entrys)
}

pub fn find_by_id(conn: &PgConnection, db_id: i32) -> Result<Option<Oil>, Error> {
    use crate::schema::oil::dsl::*;
    let oil_entry = oil.filter(id.eq(db_id)).first::<Oil>(conn).optional()?;
    Ok(oil_entry)
}

pub fn insert(
    conn: &PgConnection,
    filled_tank: f32,
    insert_date: NaiveDateTime,
) -> Result<Oil, Error> {
    use crate::schema::oil::dsl::*;
    let new_oil = InsertOil {
        date: insert_date,
        filled: filled_tank,
    };
    let created_oil = diesel::insert_into(oil).values(&new_oil).get_result(conn)?;
    Ok(created_oil)
}

pub fn drop(conn: &PgConnection, query_id: i32) -> Result<usize, Error> {
    use crate::schema::oil::dsl::*;
    let deleted_oil = diesel::delete(oil.filter(id.eq(query_id))).execute(conn)?;
    Ok(deleted_oil)
}

pub fn update(
    conn: &PgConnection,
    query_id: i32,
    filled_update: Option<f32>,
    date_update: Option<NaiveDateTime>,
) -> Result<Option<Oil>, Error> {
    let mut update_counter: i32 = 0;
    use crate::schema::oil::dsl::*;
    // Update filled
    match filled_update {
        Some(filled_up) => {
            diesel::update(oil.filter(id.eq(query_id)))
                .set(filled.eq(filled_up))
                .execute(conn)?;
        }
        None => {
            update_counter += 1;
        }
    }
    // Update date
    match date_update {
        Some(date_up) => {
            diesel::update(oil.filter(id.eq(query_id)))
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
    let new_entry = oil.filter(id.eq(query_id)).first::<Oil>(conn).optional()?;
    Ok(new_entry)
}
