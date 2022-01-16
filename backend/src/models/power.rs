#![allow(non_snake_case)]

use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Power {
    pub id: i32,
    pub date: NaiveDateTime,
    pub kwh: f32,
    pub createdAt: NaiveDateTime,
    pub updatedAt: NaiveDateTime,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct InsertPower {
    pub date: String,
    pub kwh: f32,
}
