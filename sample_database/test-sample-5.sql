-- Query to find average price of listing for each condition group on specific manufacturer
SELECT `condition`, AVG(price) AS average_price
FROM Listings
WHERE status = 'active' AND manufacturer='ford'
GROUP BY `condition`;