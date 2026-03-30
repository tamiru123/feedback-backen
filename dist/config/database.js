"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const environment_1 = require("./environment");
exports.sequelize = new sequelize_1.Sequelize(environment_1.config.DB_NAME, environment_1.config.DB_USER, environment_1.config.DB_PASSWORD, {
    host: environment_1.config.DB_HOST,
    port: environment_1.config.DB_PORT,
    dialect: 'postgres',
    logging: environment_1.config.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: environment_1.config.DB_POOL_MAX,
        min: environment_1.config.DB_POOL_MIN,
        acquire: environment_1.config.DB_POOL_ACQUIRE,
        idle: environment_1.config.DB_POOL_IDLE
    }
});
const connectDatabase = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log(`✅ Database connected successfully to ${environment_1.config.DB_NAME}`);
        // Sync models (creates tables if they don't exist)
        // Note: This will NOT drop existing tables
        await exports.sequelize.sync({ alter: true });
        console.log('✅ Database tables synced');
    }
    catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=database.js.map