
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'newpassword',
  database: 'payroll',
});

module.exports = db;
