-- Example INSERT statement for Favorite table
INSERT INTO Favorite (user_id, listing_id)
VALUES ('67cab03c', '7303585413');

-- Example LISTING all listings user has favorited
SELECT Listings.*
FROM Favorite
JOIN Listings ON Favorite.listing_id = Listings.listing_id
WHERE Favorite.user_id = '67cab03c';
