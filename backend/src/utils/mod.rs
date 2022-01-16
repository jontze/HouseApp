use chrono::{DateTime, NaiveDateTime, ParseError};

pub fn parse_date_string(date_string: &str) -> Result<NaiveDateTime, ParseError> {
    Ok(DateTime::parse_from_rfc3339(date_string)?.naive_utc())
}

#[cfg(test)]
mod test {
    use super::*;
    use chrono::Datelike;

    #[test]
    fn it_parse_iso8601_date_to_naive_date_time() {
        let iso8601_date = "2021-01-13T16:20:08.661Z";
        let parsed = parse_date_string(iso8601_date).unwrap();
        assert_eq!(parsed.year(), 2021);
        assert_eq!(parsed.month(), 1);
        assert_eq!(parsed.day(), 13);
    }
}
