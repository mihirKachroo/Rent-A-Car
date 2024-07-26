const favouriteController = (connection) => {
  const addFavourite = (req, res) => {
    const { userId, listingId } = req.body;
    console.log(`Adding favourite for user: ${userId}, listing: ${listingId}`);
    const query = "INSERT INTO Favorite (user_id, listing_id) VALUES (?, ?)";
    connection.query(query, [userId, listingId], (err, results) => {
      if (err) {
        console.error("Error adding favourite:", err);
        res.status(500).send("Server error");
        return;
      }
      res.status(201).send("Favorite added");
    });
  };

  const removeFavourite = (req, res) => {
    const { userId, listingId } = req.body; // Assuming data is sent in the request body
    console.log(`Removing favourite for user: ${userId}, listing: ${listingId}`);
    const query = "DELETE FROM Favorite WHERE user_id = ? AND listing_id = ?";
    connection.query(query, [userId, listingId], (err, results) => {
      if (err) {
        console.error("Error removing favourite:", err);
        res.status(500).send("Server error");
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).send("Favorite not found");
      } else {
        res.status(200).send("Favorite removed");
      }
    });
  };

  const getUserFavorites = (req, res) => {
    const { userId } = req.params;
    console.log(`Fetching favourites for user: ${userId}`);
    const query =
      "SELECT Listings.* FROM Favorite JOIN Listings ON Favorite.listing_id = Listings.listing_id WHERE Favorite.user_id = ?";
    connection.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching favourites:", err);
        res.status(500).send("Server error");
        return;
      }
      res.json(results);
    });
  };
  return { addFavourite, removeFavourite, getUserFavorites };
};

module.exports = favouriteController;
