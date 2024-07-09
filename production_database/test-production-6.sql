-- Index to speed lookup on Listings table for specific car manufacturer, model
CREATE INDEX idx_manufacturer_model ON Listings (manufacturer, model);

-- Query to find number of listings for all car manufacturer, model pairs
SELECT 
    cm.manufacturer, 
    cm.model, 
    (SELECT COUNT(*) 
     FROM Listings l 
     WHERE l.manufacturer = cm.manufacturer AND l.model = cm.model) AS listing_count
FROM Cars cm
ORDER BY listing_count DESC
LIMIT 10;