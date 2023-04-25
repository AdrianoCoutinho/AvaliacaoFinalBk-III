import * as dontenv from "dotenv";
import { DataSource } from "typeorm";

dontenv.config();

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
  entities: ["src/database/entities/**/*.ts"],
  schema: "reccados",
});
