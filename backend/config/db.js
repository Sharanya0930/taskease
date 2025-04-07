require("dotenv").config();
const mysql = require("mysql2/promise"); // Use promise-based MySQL

const db = mysql.createPool({ // Use connection pool
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Max connections
    queueLimit: 0
});

db.getConnection()
    .then(() => console.log("MySQL Connected..."))
    .catch(err => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });

module.exports = db;
