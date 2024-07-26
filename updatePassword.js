const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function updatePasswords() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'newpassword',
    database: 'payroll'
  });

  try {
    const [users] = await db.query('SELECT * FROM users');
    for (const user of users) {
      if (!user.password.startsWith('$2b$')) { 
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id]);
      }
    }
    console.log('Passwords updated successfully');
  } catch (err) {
    console.error('Error updating passwords:', err);
  } finally {
    await db.end();
  }
}

updatePasswords();
