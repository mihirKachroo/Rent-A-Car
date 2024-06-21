const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRouter');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware to parse JSON
app.use(express.json());

// Use authRouter for authentication routes
app.use('/auth', authRouter(connection));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
