-- Example INSERT into rental table information regarding the user renting the listing
INSERT INTO Rental (rental_id, listing_id, user_id, rent_date, return_date, status)
VALUES ('7384c7a7', '7315770787', '67cab03c', '2024-06-05', '2024-06-19', 'renting');

-- Example UPDATE listing to archived
UPDATE Listings
SET status = 'archived'
WHERE listing_id = '7315770787';

-- Example fetch status of updated listing
Select listing_id, status from Listings WHERE listing_id = '7315770787';