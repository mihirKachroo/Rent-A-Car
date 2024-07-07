// server/src/controllers/listingController.js

const connection = require('../db');
const { v4: uuidv4 } = require('uuid');

const getListings = (req, res) => {
  const query = 'SELECT * FROM Listings';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching listings:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
};

const createListing = (req, res) => {
  const {
    ownerId,
    manufacturer,
    model,
    year,
    description,
    price,
    imageUrl,
    postingDate,
    region,
    condition,
    rentTime,
    paintColor,
    stateId,
    mileage,
  } = req.body;
  const listingId = uuidv4();

  const query =
    'INSERT INTO Listings (listing_id, owner_id, manufacturer, model, year, description, price, image_url, posting_date, region, `condition`, rent_time, paint_color, state_id, mileage, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(
    query,
    [
      listingId,
      ownerId,
      manufacturer,
      model,
      year,
      description,
      price,
      imageUrl,
      postingDate,
      region,
      condition,
      rentTime,
      paintColor,
      stateId,
      mileage,
      'active',
    ],
    (err, results) => {
      if (err) {
        console.error('Error creating listing:', err);
        res.status(500).send('Server error');
        return;
      }
      res.status(201).send('Listing created');
    }
  );
};

const updateListingStatus = (req, res) => {
  const { listingId, status } = req.body;

  const query = 'UPDATE Listings SET status = ? WHERE listing_id = ?';
  connection.query(query, [status, listingId], (err, results) => {
    if (err) {
      console.error('Error updating listing status:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Listing status updated');
  });
};

module.exports = { getListings, createListing, updateListingStatus };
