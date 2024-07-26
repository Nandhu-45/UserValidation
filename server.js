const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3009;

app.use(cors({
  origin: 'http://localhost:3000',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  
}));

app.use(bodyParser.json());

app.use('/auth', authRoutes);


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error', error: err });
});


app.listen(3009, () => {
  console.log(`Server is running on ${port}`);
});
