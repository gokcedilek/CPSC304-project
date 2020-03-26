-- DROP TABLE purchases;
-- DROP TABLE purchaser;
-- DROP TABLE purchase_location;

-- CREATE TABLE purchases (
-- 	id SERIAL,
-- 	quantity INTEGER NOT NULL,
-- 	blueprint_size CHAR(2) NOT NULL,
--     purchaser_username 	VARCHAR(64) NOT NULL,
	
--     PRIMARY KEY (id),
--     -- FOREIGN KEY (blueprint_size) REFERENCES ChairBlueprint
--     --     ON DELETE NO ACTION
--     --     ON UPDATE CASCADE,
--     FOREIGN KEY (purchaser_username) REFERENCES purchaser
--         ON DELETE CASCADE
--         ON UPDATE CASCADE
-- )

CREATE TABLE purchaser (
    username VARCHAR(64),
    user_password VARCHAR(32),
    full_name VARCHAR(32),
    country VARCHAR(100) NOT NULL,
    city VARCHAR(200) NOT NULL,

    PRIMARY KEY (username),
    FOREIGN KEY (country, city) REFERENCES purchase_location
    ON UPDATE CASCADE
    ON DELETE NO ACTION
)

CREATE TABLE purchase_location (
    country VARCHAR(100),
    city VARCHAR(200),

    PRIMARY KEY (country, city)
)