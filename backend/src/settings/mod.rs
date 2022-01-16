pub mod headers;

use config::{Config, Environment, File};
use rocket::figment::Profile;

#[derive(Deserialize, Serialize)]
pub struct Web {
    pub cors: String,
}

#[derive(Deserialize, Serialize)]
pub struct Settings {
    pub profile_name: String,
    pub address: String,
    pub port: i32,
    pub log_level: String,
    pub web: Web,
}

impl Default for Settings {
    fn default() -> Self {
        let current_profile: Profile = Profile::from_env_or("APP_PROFILE", "local");
        let mut conf = Config::default();
        conf.set("profile_name", current_profile.to_string())
            .expect("Failed to set current profile");
        conf.merge(File::with_name(&format!("config/{}", current_profile)))
            .expect("Failed to load profile of config");
        // Override with environment settings
        conf.merge(
            Environment::with_prefix("APP")
                .ignore_empty(true)
                .separator("__"),
        )
        .expect("Failed to load environment variables");
        conf.try_into().expect("Failed to parse config")
    }
}
