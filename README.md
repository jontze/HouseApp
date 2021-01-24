# House App

## Requirements

- Docker and docker-compose
- Possibility to set local DNS records (e.g. with an PiHole)

## Installation

1. Clone Repo
2. Create an .env file in the root directory based on [.env.example](.env.example)
3. Go in the backend folder `cd backend` and create an `.env.production` file based on the [example](./backend/ormconfig.env.example). Use the username, password and db-name of step 2 and `postgres` as connection with the default postgres port (`5432`).
4. Go in the frontend folder and modify the server_name in the [nginx.conf](./frontend/nginx.conf) to your demand.
5. Add local DNS records in your network to match the server_name in step 4.
6. docker-compose up