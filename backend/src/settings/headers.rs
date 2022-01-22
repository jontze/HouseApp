use super::Settings;
use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::request::Request;
pub use rocket::shield::Shield;
use rocket::shield::{Feature, Permission, Prefetch, Referrer};
use rocket::Response;

pub struct Cors;

#[rocket::async_trait]
impl Fairing for Cors {
    fn info(&self) -> Info {
        Info {
            name: "Allow origins based on cors settings",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, request: &'r Request<'_>, response: &mut Response<'r>) {
        let settings = request.rocket().state::<Settings>();
        if let Some(set) = settings {
            response.set_header(Header::new("Access-Control-Allow-Origin", &set.web.cors));
            response.set_header(Header::new(
                "Access-Control-Allow-Methods",
                "GET, POST, DELETE, PUT, OPTIONS",
            ));
            response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        }
    }
}

pub trait SecureShield {
    fn secure() -> Self;
}

impl SecureShield for Shield {
    fn secure() -> Shield {
        Shield::default()
            .enable(Referrer::NoReferrer)
            .enable(Prefetch::Off)
            .enable(
                Permission::default()
                    .block(Feature::Camera)
                    .block(Feature::Usb)
                    .block(Feature::Microphone)
                    .block(Feature::Geolocation)
                    .block(Feature::Payment),
            )
    }
}
