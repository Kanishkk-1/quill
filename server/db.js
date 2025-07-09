const { Pool } = require('pg');
require('dotenv').config();

// Create connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // Connection pool settings
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection cannot be established
});

// Test the connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection established successfully');
    console.log(`Connected to database: ${process.env.DB_NAME}`);
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit if database connection fails
  }
};

// Export the pool and test function
module.exports = {
  pool,
  testConnection
};
