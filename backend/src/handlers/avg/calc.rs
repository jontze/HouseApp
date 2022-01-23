use crate::models::oil::Oil;
use crate::models::power::Power;
use crate::models::water::Water;
use chrono::NaiveDateTime;
use std::convert::TryFrom;

#[derive(Serialize)]
pub struct AvgConsumption {
    start_date: NaiveDateTime,
    end_date: NaiveDateTime,
    value: f64,
}

pub fn avg_consumption_power(list: Vec<Power>) -> Vec<AvgConsumption> {
    let mut avg_collection: Vec<AvgConsumption> = Vec::new();
    for (index, current) in list.iter().enumerate() {
        match list.get(index + 1) {
            Some(next) => {
                let avg_consumption =
                    avg_consumption_per_day((current.date, current.kwh), (next.date, next.kwh));
                avg_collection.push(AvgConsumption {
                    start_date: current.date,
                    end_date: next.date,
                    value: avg_consumption,
                });
            }
            None => {
                continue;
            }
        };
    }
    return avg_collection;
}

pub fn avg_consumption_water(list: Vec<Water>) -> Vec<AvgConsumption> {
    let mut avg_collection: Vec<AvgConsumption> = Vec::new();
    for (index, current) in list.iter().enumerate() {
        match list.get(index + 1) {
            Some(next) => {
                let avg_consumption = avg_consumption_per_day(
                    (current.date, current.cubicmeter),
                    (next.date, next.cubicmeter),
                );
                avg_collection.push(AvgConsumption {
                    start_date: current.date,
                    end_date: next.date,
                    value: avg_consumption,
                });
            }
            None => {
                continue;
            }
        };
    }
    return avg_collection;
}

pub fn avg_consumption_oil(list: Vec<Oil>) -> Vec<AvgConsumption> {
    let mut avg_collection: Vec<AvgConsumption> = Vec::new();
    for (index, current) in list.iter().enumerate() {
        match list.get(index + 1) {
            Some(next) => {
                let avg_consumption = avg_consumption_per_day(
                    (current.date, current.filled),
                    (next.date, next.filled),
                );
                avg_collection.push(AvgConsumption {
                    start_date: current.date,
                    end_date: next.date,
                    value: avg_consumption.abs(),
                });
            }
            None => {
                continue;
            }
        };
    }
    return avg_collection;
}

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
            DateTime::parse_from_rfc3339("2022-01-22T18:13:32.856Z")
                .unwrap()
                .naive_utc(),
            40_f32,
        );
        let data_t1 = (
            DateTime::parse_from_rfc3339("2022-01-24T19:13:32.856Z")
                .unwrap()
                .naive_utc(),
            60_f32,
        );
        let avg_value_per_day = avg_consumption_per_day(data_t, data_t1);
        assert_eq!(avg_value_per_day, 10_f64);
    }

    #[test]
    fn calc_avg_vector_power() {
        let date1 = DateTime::parse_from_rfc3339("2022-01-22T18:13:32.856Z")
            .unwrap()
            .naive_utc();
        let date2 = DateTime::parse_from_rfc3339("2022-01-30T18:13:32.856Z")
            .unwrap()
            .naive_utc();
        let date3 = DateTime::parse_from_rfc3339("2022-02-15T18:13:32.856Z")
            .unwrap()
            .naive_utc();
        let power_date = vec![
            Power {
                id: 1,
                date: date1,
                kwh: 100_f32,
                createdAt: date1,
                updatedAt: date1,
            },
            Power {
                id: 1,
                date: date2,
                kwh: 200_f32,
                createdAt: date2,
                updatedAt: date2,
            },
            Power {
                id: 1,
                date: date3,
                kwh: 300_f32,
                createdAt: date3,
                updatedAt: date3,
            },
        ];
        let avg_power = avg_consumption_power(power_date);
        assert_eq!(avg_power.len(), 2);
        assert_eq!(avg_power[0].start_date, date1);
        assert_eq!(avg_power[0].end_date, date2);
        // 8 Days between date1 and date2
        // Therefore 100 / 8 = 12.5
        assert_eq!(avg_power[0].value, 12.5_f64);
    }

    #[test]
    fn calc_avg_vector_water() {
        let date1 = DateTime::parse_from_rfc3339("2022-01-22T18:13:32.856Z")
            .unwrap()
            .naive_utc();
        let date2 = DateTime::parse_from_rfc3339("2022-01-30T18:13:32.856Z")
            .unwrap()
            .naive_utc();
        let date3 = DateTime::parse_from_rfc3339("2022-02-15T18:13:32.856Z")
            .unwrap()
            .naive_utc();
        let water_date = vec![
            Water {
                id: 1,
                date: date1,
                cubicmeter: 100_f32,
                createdAt: date1,
                updatedAt: date1,
            },
            Water {
                id: 1,
                date: date2,
                cubicmeter: 200_f32,
                createdAt: date2,
                updatedAt: date2,
            },
            Water {
                id: 1,
                date: date3,
                cubicmeter: 300_f32,
                createdAt: date3,
                updatedAt: date3,
            },
        ];
        let avg_water = avg_consumption_water(water_date);
        assert_eq!(avg_water.len(), 2);
        assert_eq!(avg_water[0].start_date, date1);
        assert_eq!(avg_water[0].end_date, date2);
        // 8 Days between date1 and date2
        // Therefore 100 / 8 = 12.5
        assert_eq!(avg_water[0].value, 12.5_f64);
    }

    #[test]
    fn calc_avg_vector_oil() {
        let date1 = DateTime::parse_from_rfc3339("2022-01-22T18:13:32.856Z")
            .unwrap()
            .naive_utc();
        let date2 = DateTime::parse_from_rfc3339("2022-01-30T18:13:32.856Z")
            .unwrap()
            .naive_utc();
        let date3 = DateTime::parse_from_rfc3339("2022-02-15T18:13:32.856Z")
            .unwrap()
            .naive_utc();
        let oil_date = vec![
            Oil {
                id: 1,
                date: date1,
                filled: 100_f32,
                createdAt: date1,
                updatedAt: date1,
            },
            Oil {
                id: 1,
                date: date2,
                filled: 50_f32,
                createdAt: date2,
                updatedAt: date2,
            },
            Oil {
                id: 1,
                date: date3,
                filled: 50_f32,
                createdAt: date3,
                updatedAt: date3,
            },
        ];
        let avg_oil = avg_consumption_oil(oil_date);
        assert_eq!(avg_oil.len(), 2);
        assert_eq!(avg_oil[0].start_date, date1);
        assert_eq!(avg_oil[0].end_date, date2);
        // 8 Days between date1 and date2
        // Therefore 50 / 8 = 6.25
        assert_eq!(avg_oil[0].value, 6.25_f64);
    }
}
