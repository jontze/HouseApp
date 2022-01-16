#![allow(non_snake_case)]

use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Water {
    pub id: i32,
    pub date: NaiveDateTime,
    pub cubicmeter: f32,
    pub createdAt: NaiveDateTime,
    pub updatedAt: NaiveDateTime,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct InsertWater {
    pub date: String,
    pub cubicmeter: f32,
}
