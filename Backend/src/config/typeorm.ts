import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig();

const isRender = process.env.RENDER === "true";

export const typeOrmConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.js,.ts}"],

  synchronize: false, // 🔥 importante
  logging: false,
  dropSchema: false,

  ssl: isRender ? { rejectUnauthorized: false } : false,
};

export default registerAs("typeorm", () => typeOrmConfig);

// 🔧 para migraciones
export const AppDataSource = new DataSource(typeOrmConfig);