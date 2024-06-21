const { v4: uuidv4 } = require('uuid');
const connection = require('../db'); // Assuming you have a db.js file to handle DB connection

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

const getFilteredListings = (req, res) => {
  const { condition, stateId, price, ownerId } = req.query;

  const query = `
    SELECT * FROM Listings
    WHERE \`condition\` = ? AND state_id = ? AND price <= ? AND owner_id != ? AND status = 'active'
    ORDER BY posting_date ASC
  `;
  connection.query(query, [condition, stateId, price, ownerId], (err, results) => {
    if (err) {
      console.error('Error fetching filtered listings:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
};

module.exports = { getListings, createListing, updateListingStatus, getFilteredListings };
