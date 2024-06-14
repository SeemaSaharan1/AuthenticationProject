import dotenv from 'dotenv';
import mysql from 'mysql';
dotenv.config();

// Create MySQL connection pool
const dbConfig = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

export { dbConfig };
