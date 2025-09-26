"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_DATABASE || 'sombriya',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: true,
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map