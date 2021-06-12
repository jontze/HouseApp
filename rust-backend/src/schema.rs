table! {
    migrations_typeorm (id) {
        id -> Int4,
        timestamp -> Int8,
        name -> Varchar,
    }
}

table! {
    oil (id) {
        id -> Int4,
        date -> Timestamp,
        filled -> Float4,
        createdAt -> Timestamp,
        updatedAt -> Timestamp,
    }
}

table! {
    power (id) {
        id -> Int4,
        date -> Timestamp,
        kwh -> Float4,
        createdAt -> Timestamp,
        updatedAt -> Timestamp,
    }
}

table! {
    water (id) {
        id -> Int4,
        date -> Timestamp,
        cubicmeter -> Float4,
        createdAt -> Timestamp,
        updatedAt -> Timestamp,
    }
}

allow_tables_to_appear_in_same_query!(migrations_typeorm, oil, power, water,);
