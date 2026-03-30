const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'my-feedback-db',
  'postgres',
  'your_password_here', // Replace with your actual password
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to my-feedback-db successful!');
    
    // List tables
    const tables = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log('📊 Tables in database:', tables[0].map(t => t.table_name));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();