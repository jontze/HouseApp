#![allow(non_snake_case)]

use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct Oil {
    pub id: i32,
    pub date: NaiveDateTime,
    pub filled: f32,
    pub createdAt: NaiveDateTime,
    pub updatedAt: NaiveDateTime,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct InsertOil {
    pub date: String,
    pub filled: f32,
}
