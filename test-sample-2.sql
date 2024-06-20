-- Example SQL script to insert into User table
INSERT INTO User (user_id, first_name, last_name, password, email, date_of_birth)
VALUES
    ('58dce04d', 'Parsh', 'Parikh', '#wer$y456', 'parsh.parikh@example.com', '2004-03-24');

-- Example SQL script to search for user in User table by email and password
SELECT user_id, first_name, last_name
FROM User
WHERE email = 'parsh.parikh@example.com'
  AND password = '#wer$y456';
