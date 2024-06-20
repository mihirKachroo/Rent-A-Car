-- Example UPDATE listing to inactive
UPDATE Listings
SET status = 'inactive'
WHERE listing_id = '7315770787';

-- Example fetch status of updated listing
Select listing_id, status from Listings WHERE listing_id = '7315770787';