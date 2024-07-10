const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const listingRouter = require('./routes/listingRouter');
const favouriteRouter = require('./routes/favouriteRouter');
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

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001', // Replace with your client's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/auth', authRouter(connection));
app.use('/listings', listingRouter(connection));
app.use('/favourites', favouriteRouter(connection));
app.use('/rentals', rentalRouter(connection));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
