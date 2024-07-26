// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();




// Registration route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt received:', { email, password });

  try {
      const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      console.log('Database query result:', results);

      if (results.length === 0) {
          console.log('No user found with the provided email');
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = results[0];
      console.log('User found:', { id: user.id, email: user.email });

      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', passwordMatch);

      if (passwordMatch) {
          return res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email } });
      } else {
          console.log('Password does not match');
          return res.status(401).json({ message: 'Invalid email or password' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error', error });
  }
});


module.exports = router;

