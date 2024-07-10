const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const listingController = (connection) => {
  
  const getListings = (req, res) => {
    const query = "SELECT * FROM Listings";
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching listings:", err);
        res.status(500).send("Server error");
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
    const formattedPostingDate = moment(postingDate).format('YYYY-MM-DD HH:mm:ss');

    console.log('Attempting to create listing for ' + manufacturer + ' ' + model + ' ' + year);
    const query =
      "INSERT INTO Listings (listing_id, owner_id, manufacturer, model, year, description, price, image_url, posting_date, region, `condition`, rent_time, paint_color, state_id, mileage, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
        formattedPostingDate,
        region,
        condition,
        rentTime,
        paintColor,
        stateId,
        mileage,
        "active",
      ],
      (err, results) => {
        if (err) {
          console.error("Error creating listing:", err);
          res.status(500).send("Server error");
          return;
        }
        res.status(201).send("Listing created");
      }
    );
  };
  
  const updateListingStatus = (req, res) => {
    const { listingId, status } = req.body;
  
    const query = "UPDATE Listings SET status = ? WHERE listing_id = ?";
    connection.query(query, [status, listingId], (err, results) => {
      if (err) {
        console.error("Error updating listing status:", err);
        res.status(500).send("Server error");
        return;
      }
      res.status(200).send("Listing status updated");
    });
  };

  // const searchListings = (req, res) => {
  //   const { query } = req.query;
  
  //   const searchQuery = `
  //     SELECT * FROM Listings
  //     WHERE MATCH(manufacturer, model, description, region, condition, paint_color)
  //     AGAINST (? IN NATURAL LANGUAGE MODE) AND status = 'active';
  //   `;
  
  //   connection.query(searchQuery, [query], (err, results) => {
  //     if (err) {
  //       console.error("Error searching listings:", err);
  //       res.status(500).send("Server error");
  //       return;
  //     }
  //     res.json(results);
  //   });
  // };
  
  const searchListingsWithFilters = (req, res) => {
    console.log(req.query);
    const { condition, state_id, max_price, order_filter, number_of_listings } = req.query;
    const query = `SELECT * FROM Listings
                   WHERE \`condition\` = ? AND state_id = ? AND price <= ? AND status = 'active'
                   ORDER BY ${connection.escapeId(order_filter)}
                   LIMIT ?`;
    connection.query(query, [condition, state_id, max_price, parseInt(number_of_listings)], (err, results) => {
      if (err) {
        console.error("Error searching listings:", err);
        res.status(500).send("Server error");
        return;
      }
      console.log(results);
      res.json(results);
    });
  };

  return { getListings, createListing, updateListingStatus, searchListingsWithFilters }
}

module.exports = listingController;
