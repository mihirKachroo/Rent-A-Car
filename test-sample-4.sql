-- Example of basic search to get top 3 good cars in california with price < 50 ordered by posting date
SELECT * FROM Listings
WHERE `condition` = 'good' AND state_id = 'ca' AND price <= 50 AND owner_id != '67cab03c' AND status = 'active'
ORDER BY posting_date ASC
Limit 3;
