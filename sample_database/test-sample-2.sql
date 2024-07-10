-- Example of basic search an filter feature to get top 3 good cars in california with price < 50 ordered by posting date
-- only show active listings for rentals
-- 67cab03c represents the current user's id
SELECT * FROM Listings
WHERE `condition` = 'good' AND state_id = 'ca' AND price <= 50 AND status = 'active'
ORDER BY posting_date ASC
Limit 3;
