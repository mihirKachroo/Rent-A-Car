-- Example INSERT statement for Favorite table
-- 67cab03c represents current user's id
INSERT INTO Favorite (user_id, listing_id)
VALUES ('67cab03c', '7303585413');

-- Example show all listings user has favorited
SELECT Listings.*
FROM Favorite
JOIN Listings ON Favorite.listing_id = Listings.listing_id
WHERE Favorite.user_id = '67cab03c';
