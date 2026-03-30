import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  PORT: parseInt(process.env.PORT || '10000'),
  NODE_ENV: process.env.NODE_ENV || 'production',
  
  // Database - Render PostgreSQL
  DB_NAME: process.env.DB_NAME || 'myfeedback',
  DB_USER: process.env.DB_USER || 'my',
  DB_PASSWORD: process.env.DB_PASSWORD || 'rWnrxHt6770LFwgka3wZE8Sb0NAUsZUq',
  DB_HOST: process.env.DB_HOST || 'dpg-d756b71aae7s73bs35cg-a',
  DB_PORT: parseInt(process.env.DB_PORT || '5432'),
  DB_POOL_MAX: parseInt(process.env.DB_POOL_MAX || '10'),
  DB_POOL_MIN: parseInt(process.env.DB_POOL_MIN || '0'),
  DB_POOL_ACQUIRE: parseInt(process.env.DB_POOL_ACQUIRE || '30000'),
  DB_POOL_IDLE: parseInt(process.env.DB_POOL_IDLE || '10000'),
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // Admin
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@feedback.com',
  
  // CORS - Allow your Netlify frontend
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(',') || [
    'https://glowing-begonia-a1a72c.netlify.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  
  // Rate Limiting
  RATE_LIMIT_WINDOW: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'),
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
} as const;