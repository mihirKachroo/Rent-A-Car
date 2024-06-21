CREATE TABLE Listings (
    listing_id VARCHAR(50)  PRIMARY KEY,
    owner_id VARCHAR(50),
    manufacturer VARCHAR(100),
    model VARCHAR(100),
	state_id VARCHAR(2),
    year INT,
    rent_time INT CHECK (rent_time BETWEEN 1 AND 30),
    description TEXT,
    price DECIMAL(10,2) CHECK (price > 0),
    image_url VARCHAR(200),
    posting_date DATETIME,
    region VARCHAR(50),
    `condition` ENUM('fair', 'good', ‘excellent’, 'like new', 'new'),
    paint_color VARCHAR(20),
    mileage INT,
    status ENUM('active', 'inactive','archived'),
    CONSTRAINT chk_year CHECK (year > 1900)
);


CREATE TABLE States (
    state_id VARCHAR(2) PRIMARY KEY,
    state_name VARCHAR(20),
    time_zone VARCHAR(30)
);

CREATE TABLE Cars (
    manufacturer VARCHAR(50),
    model VARCHAR(100),
    drive ENUM('fwd', 'rwd', '4wd', 'awd'),
    cylinders INT,
    transmission ENUM('automatic', 'manual'),
    fuel ENUM('gas', 'diesel', 'hybrid'),
    PRIMARY KEY (manufacturer, model)
);


CREATE TABLE Owner (
    user_id VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(50),
    status ENUM('active', 'inactive', 'banned'),
    email VARCHAR(50) NOT NULL,
    date_of_birth DATETIME,
    dealer_rating FLOAT DEFAULT 0,
    dealer_num_ratings INT DEFAULT 0
);

DELIMITER //

CREATE TRIGGER check_owner_age
BEFORE INSERT ON Owner
FOR EACH ROW
BEGIN
    IF TIMESTAMPDIFF(YEAR, NEW.date_of_birth, CURDATE()) < 18 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Owner must be at least 18 years old.';
    END IF;
END //

DELIMITER ;


CREATE TABLE User (
    user_id VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    password VARCHAR(50),
    email VARCHAR(50),
    date_of_birth DATETIME
);

DELIMITER //

CREATE TRIGGER check_user_age
BEFORE INSERT ON User
FOR EACH ROW
BEGIN
    IF TIMESTAMPDIFF(YEAR, NEW.date_of_birth, CURDATE()) < 18 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'User must be at least 18 years old.';
    END IF;
END //

DELIMITER ;

CREATE TABLE Review (
    review_id VARCHAR(50) PRIMARY KEY,
    author VARCHAR(50),
    listing_id VARCHAR(50),
    rating INT,
    comments TEXT,
    CHECK (rating BETWEEN 1 AND 5)
);

-- Create the trigger to update the owner's dealer rating
DELIMITER //

CREATE TRIGGER update_owner_dealer_rating
AFTER INSERT ON Review
FOR EACH ROW
BEGIN
    DECLARE owner_id VARCHAR(50);
    DECLARE total_rating DECIMAL(10,2);
    DECLARE num_ratings INT;

    -- Get the owner_id from the Listings table using the listing_id from the new review
    SELECT owner_id INTO owner_id
    FROM Listings
    WHERE listing_id = NEW.listing_id;

    -- Get the current dealer rating and number of ratings for the owner
    SELECT dealer_rating * dealer_num_ratings, dealer_num_ratings
    INTO total_rating, num_ratings
    FROM Owner
    WHERE owner_id = owner_id;

    -- Update the owner's dealer_rating and dealer_num_ratings
    UPDATE Owner
    SET dealer_rating = (total_rating + NEW.rating) / (num_ratings + 1),
        dealer_num_ratings = num_ratings + 1
    WHERE owner_id = owner_id;
END //

DELIMITER ;


CREATE TABLE Rental (
    rental_id VARCHAR(50) PRIMARY KEY,
    listing_id VARCHAR(50),
    user_id VARCHAR(50),
    rent_date DATETIME,
    return_date DATETIME DEFAULT NULL,
    status ENUM('renting', 'returned'),
    FOREIGN KEY (listing_id) REFERENCES Listings(listing_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);



CREATE TABLE Favorite (
    user_id VARCHAR(50),
    listing_id VARCHAR(50),
    PRIMARY KEY (user_id, listing_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (listing_id) REFERENCES Listings(listing_id)
);



-- Alter the Listings table to add foreign keys
ALTER TABLE Listings
ADD CONSTRAINT fk_cars
FOREIGN KEY (manufacturer, model)
REFERENCES Cars(manufacturer, model),
ADD CONSTRAINT fk_states
FOREIGN KEY (state_id)
REFERENCES States(state_id);

-- Alter the Review table to add foreign keys
ALTER TABLE Review
ADD CONSTRAINT fk_review_author
FOREIGN KEY (author) REFERENCES User(user_id),
ADD CONSTRAINT fk_review_listing
FOREIGN KEY (listing_id) REFERENCES Listings(listing_id);


-- Create trigger to update Listings table when a new rental is added
DELIMITER //

CREATE TRIGGER rental_added_trigger
AFTER INSERT ON Rental
FOR EACH ROW
BEGIN
    UPDATE Listings
    SET status = 'inactive'
    WHERE listing_id = NEW.listing_id;
END //

DELIMITER ;
