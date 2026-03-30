import { Sequelize } from 'sequelize';
import { config } from './environment';

console.log('📡 Database Configuration Check:');
console.log(`DB_HOST: ${config.DB_HOST}`);
console.log(`DB_PORT: ${config.DB_PORT}`);
console.log(`DB_NAME: ${config.DB_NAME}`);
console.log(`DB_USER: ${config.DB_USER}`);
console.log(`NODE_ENV: ${config.NODE_ENV}`);
// Password is intentionally not logged

export const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'postgres',
    logging: config.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
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
    console.log('🔄 Attempting database connection...');
    await sequelize.authenticate();
    console.log(`✅ Database connected successfully to ${config.DB_NAME}`);
    
    // Sync models (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synced');
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error name:', (error as Error).name);
    console.error('Error message:', (error as Error).message);
    if ((error as any).original) {
      console.error('Original error:', (error as any).original);
    }
    process.exit(1);
  }
};