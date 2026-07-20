const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

let ensureUsersTablePromise;

pool.ensureUsersTable = () => {
  if (!ensureUsersTablePromise) {
    ensureUsersTablePromise = pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(12) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        joining_date DATE NOT NULL,
        inactive_on DATE NULL,
        status VARCHAR(24) NOT NULL DEFAULT 'Active',
        message VARCHAR(500) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
  }

  return ensureUsersTablePromise;
};

module.exports = pool;
