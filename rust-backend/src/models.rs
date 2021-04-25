#![allow(non_snake_case)]

use crate::schema::{oil, power, water};
use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize, Queryable, Identifiable)]
#[table_name = "oil"]
pub struct Oil {
    pub id: i32,
    pub date: NaiveDateTime,
    pub filled: f32,
    pub createdAt: NaiveDateTime,
    pub updatedAt: NaiveDateTime,
}

#[derive(Debug, Deserialize, Serialize, Insertable)]
#[table_name = "oil"]
pub struct InsertOil {
    pub date: NaiveDateTime,
    pub filled: f32,
}

#[derive(Debug, Serialize, Deserialize, Queryable, Identifiable)]
#[table_name = "water"]
pub struct Water {
    pub id: i32,
    pub date: NaiveDateTime,
    pub cubicmeter: f32,
    pub createdAt: NaiveDateTime,
    pub updatedAt: NaiveDateTime,
}

#[derive(Debug, Deserialize, Serialize, Insertable)]
#[table_name = "water"]
pub struct InsertWater {
    pub date: NaiveDateTime,
    pub cubicmeter: f32,
}

#[derive(Debug, Serialize, Deserialize, Queryable, Identifiable)]
#[table_name = "power"]
pub struct Power {
    pub id: i32,
    pub date: NaiveDateTime,
    pub kwh: f32,
    pub createdAt: NaiveDateTime,
    pub updatedAt: NaiveDateTime,
}

#[derive(Debug, Deserialize, Serialize, Insertable)]
#[table_name = "power"]
pub struct InsertPower {
    pub date: NaiveDateTime,
    pub kwh: f32,
}
