use crate::models::oil::Oil;
use crate::models::power::Power;
use crate::models::water::Water;
use sqlx::PgPool;

pub async fn select_oil_sorted_date(pool: &PgPool) -> Result<Vec<Oil>, sqlx::Error> {
    Ok(sqlx::query_as!(Oil, "SELECT * FROM oil ORDER BY date ASC")
        .fetch_all(pool)
        .await?)
}

pub async fn select_power_sorted_date(pool: &PgPool) -> Result<Vec<Power>, sqlx::Error> {
    Ok(
        sqlx::query_as!(Power, "SELECT * FROM power ORDER BY date ASC")
            .fetch_all(pool)
            .await?,
    )
}

pub async fn select_water_sorted_date(pool: &PgPool) -> Result<Vec<Water>, sqlx::Error> {
    Ok(
        sqlx::query_as!(Water, "SELECT * FROM water ORDER BY date ASC")
            .fetch_all(pool)
            .await?,
    )
}
