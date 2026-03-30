import { Sequelize } from 'sequelize';
import { config } from './environment';

export const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'postgres',
    logging: config.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: config.DB_POOL_MAX,
      min: config.DB_POOL_MIN,
      acquire: config.DB_POOL_ACQUIRE,
      idle: config.DB_POOL_IDLE
    }
  }
);

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connected successfully to ${config.DB_NAME}`);
    
    // Sync models (creates tables if they don't exist)
    // Note: This will NOT drop existing tables
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synced');
  } catch (error) {
    console.error('❌ Database connection failed:', (error as Error).message);
    process.exit(1);
  }
};