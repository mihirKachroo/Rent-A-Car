const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const authRouter = require('./routes/authRouter');
const listingRouter = require('./routes/listingRouter');
const favoriteRouter = require('./routes/favoriteRouter');
const rentalRouter = require('./routes/rentalRouter');

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
app.use('/listings', listingRouter);
app.use('/favorites', favoriteRouter);
app.use('/rentals', rentalRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
