use chrono::NaiveDateTime;
use std::convert::TryFrom;

fn avg_consumption_per_day(data_t: (NaiveDateTime, f32), data_t1: (NaiveDateTime, f32)) -> f64 {
    let days_different = data_t1.0.signed_duration_since(data_t.0).num_days();
    let value_different = f64::try_from(data_t1.1 - data_t.1).expect("Convert f32 to f64");
    value_different / days_different as f64
}

#[cfg(test)]
mod test {
    use super::*;
    use chrono::DateTime;

    #[test]
    fn calc_avg_of_value_per_day() {
        let data_t = (
            DateTime::parse_from_rfc3339("2022-01-22T18:13:32.856Z").unwrap().naive_utc(),
             40_f32             
        );
        let data_t1 = (
            DateTime::parse_from_rfc3339("2022-01-24T19:13:32.856Z").unwrap().naive_utc(),
            60_f32
        );
        let avg_value_per_day = avg_consumption_per_day(data_t, data_t1);
        assert_eq!(avg_value_per_day, 10_f64);
    }
}
