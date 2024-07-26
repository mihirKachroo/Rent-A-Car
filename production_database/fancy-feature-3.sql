WITH RecursiveRentalTime AS (
    SELECT user_id, 
           rental_id,
           DATEDIFF(COALESCE(return_date, CURRENT_DATE), rent_date) AS rental_days
    FROM Rental
    WHERE user_id = 'f4235ef1'
)
SELECT user_id, SUM(rental_days) AS total_rental_days
FROM RecursiveRentalTime
GROUP BY user_id;
