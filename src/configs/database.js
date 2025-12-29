require('dotenv').config(); // Delete this when connecting to main program

// Get the client
const mysql = require('mysql2/promise');

// Create the connection to database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
});

// Test the connection (Not required)
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connected successfully!');
    connection.release();
  } catch (error) {
    console.error('MySQL connection error:', error);
    process.exit(1);
  }
})();

// Exports connection pool
module.exports = pool;