-- Example to register a new User after checking they don't exist and generating a unique userid
INSERT INTO User (user_id, first_name, last_name, password, email, date_of_birth)
VALUES
    ('58dce04d', 'Parsh', 'Parikh', '#wer$y456', 'parsh.parikh@example.com', '2004-03-24');

-- Example query for when a user tries to log in
SELECT user_id, first_name, last_name
FROM User
WHERE email = 'parsh.parikh@example.com'
  AND password = '#wer$y456';
