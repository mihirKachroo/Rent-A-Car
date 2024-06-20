-- Example UPDATE listing to archived
UPDATE Listings
SET status = 'archived'
WHERE listing_id = '7315770787';

-- Example fetch status of updated listing
Select listing_id, status from Listings WHERE listing_id = '7315770787';