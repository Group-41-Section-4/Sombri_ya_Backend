import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config(); // Load .env file

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_DATABASE || 'sombriya',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: true, // Never use TRUE in production!
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
