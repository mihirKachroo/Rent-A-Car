const createRental = (req, res) => {
    const { listingId, userId, rentDate, returnDate } = req.body;
    const rentalId = uuidv4();
  
    const query = 'INSERT INTO Rental (rental_id, listing_id, user_id, rent_date, return_date, status) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [rentalId, listingId, userId, rentDate, returnDate, 'renting'], (err, results) => {
      if (err) {
        console.error('Error creating rental:', err);
        res.status(500).send('Server error');
        return;
      }
  
      const updateQuery = 'UPDATE Listings SET status = ? WHERE listing_id = ?';
      connection.query(updateQuery, ['inactive', listingId], (updateErr, updateResults) => {
        if (updateErr) {
          console.error('Error updating listing status:', updateErr);
          res.status(500).send('Server error');
          return;
        }
        res.status(201).send('Rental created and listing status updated');
      });
    });
  };
  
  const getUserRentals = (req, res) => {
    const { userId } = req.params;
  
    const query = 'SELECT Rental.* FROM User JOIN Rental ON User.user_id = Rental.user_id WHERE User.user_id = ?';
    connection.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching rentals:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  };
  
  module.exports = { createRental, getUserRentals };
  