-- Query to update a listing into an active rental
-- add to it the rental table with user's specifications and "renting" status
-- rent date and return date are info from user interaction and listing info
INSERT INTO Rental (rental_id, listing_id, user_id, rent_date, status)
VALUES ('7384c7a7', '7315770787', '67cab03c', '2024-06-05', 'renting');

-- update the listing in the listings table as a current rental
UPDATE Listings
SET status = 'inactive'
WHERE listing_id = '7315770787';

-- show all rental data of current user
SELECT Rental.*
FROM User
JOIN Rental ON User.user_id = Rental.user_id
WHERE User.user_id = '67cab03c';
