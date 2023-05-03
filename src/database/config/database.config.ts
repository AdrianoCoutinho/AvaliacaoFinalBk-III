import * as dontenv from "dotenv";
import { DataSource } from "typeorm";

dontenv.config();

let entities = "src/database/entities/**/*.ts";
let migrations = "src/database/migrations/**/*.ts";

if (process.env.API_ENV === "production") {
  entities = "build/database/entities/**/*.js";
  migrations = "build/database/migrations/**/*.js";
}

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  entities: [entities],
  migrations: [migrations],
  schema: "reccadosMi",
});
