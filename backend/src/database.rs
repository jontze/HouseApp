use sqlx::{migrate, PgPool};

pub async fn create_pool() -> Result<PgPool, sqlx::Error> {
    let database_url = &std::env::var("DATABASE_URL").expect("DATABASE_URL in environment");
    Ok(sqlx::PgPool::connect(database_url).await?)
}

pub async fn apply_migrations(pool: &PgPool) -> Result<(), migrate::MigrateError> {
    sqlx::migrate!().run(pool).await?;
    Ok(())
}
