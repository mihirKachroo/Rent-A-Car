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
  return { addFavourite, getUserFavorites };
};

module.exports = favouriteController;
