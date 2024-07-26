const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const listingController = (connection) => {

  const getListingById = async (req, res) => {
    const { listingId } = req.params;
  
    const query = 'SELECT * FROM Listings WHERE listing_id = ?';
    
    connection.query(query, [listingId], (err, listingResults) => {
      if (err) {
        console.error('Error fetching listing:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (listingResults.length === 0) {
        return res.status(404).json({ error: 'Listing not found' });
      }
  
      const listing = listingResults[0];

    // Assuming you have a reviews table and want to include reviews in the response
    const reviewsQuery = 'SELECT * FROM Review WHERE listing_id = ?';
    connection.query(reviewsQuery, [listingId], (err, reviewsResults) => {
      if (err) {
        console.error('Error fetching reviews:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const response = {
        listing,
        reviews: reviewsResults
      };
      console.log(response)
      res.json(response);
      });
    });
  };
  
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
    console.log('Received query parameters:', req.query);
    const { condition, state_id, max_price, order_filter, number_of_listings } = req.query;
  
    // Base query
    let query = `SELECT * FROM Listings WHERE status = 'active'`;
    let queryParams = [];
  
    // Add filters conditionally
    if (condition) {
      query += ` AND \`condition\` = ?`;
      queryParams.push(condition);
    }
  
    if (state_id) {
      query += ` AND state_id = ?`;
      queryParams.push(state_id);
    }
  
    if (max_price) {
      query += ` AND price <= ?`;
      queryParams.push(Number(max_price));
    }
  
    // Add ORDER BY clause if order_filter is not empty
    if (order_filter) {
      query += ` ORDER BY ${connection.escapeId(order_filter)}`;
    }
  
    // Add LIMIT clause
    query += ` LIMIT ?`;
    queryParams.push(parseInt(number_of_listings));
  
    // Log the query and parameters
    console.log('Final query:', query);
    console.log('Query parameters:', queryParams);
  
    connection.query(query, queryParams, (err, results) => {
      if (err) {
        console.error("Error searching listings:", err);
        res.status(500).send("Server error");
        return;
      }
      console.log('Query results:', results);
      res.json(results);
    });
  };
  
  const getAveragePriceByCondition = (req, res) => {
    const { manufacturer } = req.query;
    console.log(`Fetching average price for manufacturer: ${manufacturer}`);
    const query = `
      SELECT \`condition\`, AVG(price) AS average_price
      FROM Listings
      WHERE status = 'active' AND manufacturer = ?
      GROUP BY \`condition\`;
    `;
    connection.query(query, [manufacturer], (err, results) => {
      if (err) {
        console.error("Error fetching average prices:", err);
        res.status(500).send("Server error");
        return;
      }
      res.json(results);
    });
  }; 

  const getModelListingFrequency = (req, res) => {
    console.log('Fetching model listing frequency');
    const query = `
      SELECT 
        cm.manufacturer, 
        cm.model, 
        (SELECT COUNT(*) 
         FROM Listings l 
         WHERE l.manufacturer = cm.manufacturer AND l.model = cm.model AND l.status = 'active') AS listing_count
      FROM Cars cm
      ORDER BY listing_count DESC
      LIMIT 10;
    `;
    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching model listing frequency:", err);
        res.status(500).send("Server error");
        return;
      }
      res.json(results);
    });
  };

  return { getListingById, getListings, createListing, updateListingStatus, searchListingsWithFilters, getAveragePriceByCondition, getModelListingFrequency }
}

module.exports = listingController;
