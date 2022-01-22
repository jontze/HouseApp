use crate::models::oil::Oil;
use sqlx::PgPool;

pub async fn select_oil_sorted_date(pool: &PgPool) -> Result<Vec<Oil>, sqlx::Error> {
    Ok(sqlx::query_as!(Oil, "SELECT * FROM oil ORDER BY date DESC").fetch_all(pool).await?)
}
