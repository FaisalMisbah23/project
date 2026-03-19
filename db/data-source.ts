import { DataSource } from "typeorm"
import type { DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
dotenv.config({path: ".env"})

const requiredEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: requiredEnv('DB_HOST'),
    port: Number(requiredEnv('DB_PORT')),
    username: requiredEnv('DB_USER'),
    password: requiredEnv('DB_PASSWORD'),
    database: requiredEnv('DB_NAME'),
    synchronize: false,
    entities: ["dist/src/**/*.entity.js"],
    migrations: ["dist/db/*-migrations.js"],
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource