use rocket::Route;
use crate::utils;

mod calc;
mod queries;

pub fn register() -> Vec<Route> {
    routes![
        utils::manage_preflight,
        utils::manage_preflight_with_id
    ]
}
