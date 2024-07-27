
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: '172.20.10.2',
  //port: 3306,
  user: 'root',
  password: 'newpassword',
  database: 'payroll',

  /*
  host: 'localhost',
  user: 'root',
  password: 'newpassword',
  database: 'payroll',
*/
  
});

module.exports = db;
