DROP TABLE Purchases;
DROP TABLE Employee;
DROP TABLE Purchaser;
DROP TABLE PurchaseLocation;
DROP TABLE Equipment;
DROP TABLE Station;
DROP TABLE ChairInspection;
DROP TABLE Chair;
DROP TABLE ChairBlueprintRequiresPartType;
DROP TABLE ChairBlueprint;
DROP TABLE PartType;
DROP TABLE Manufacturer;

CREATE TABLE PurchaseLocation (
    city VARCHAR(200),
    country VARCHAR(100),

    PRIMARY KEY (city, country)
);

CREATE TABLE Purchaser (
    username VARCHAR(64),
    user_password VARCHAR(32),
    full_name VARCHAR(32),
    city VARCHAR(200) NOT NULL,
    country VARCHAR(100) NOT NULL,

    PRIMARY KEY (username),
    FOREIGN KEY (city, country) REFERENCES PurchaseLocation
    ON UPDATE CASCADE
    ON DELETE NO ACTION
);

CREATE TABLE Station (
	number INTEGER,
	description VARCHAR(256),

    PRIMARY KEY (number)
);

CREATE TABLE Employee (
    username VARCHAR(64),
    employee_password VARCHAR(32),
    full_name VARCHAR(32),
    salary INTEGER,
    station_number INTEGER,

    PRIMARY KEY (username),
    FOREIGN KEY (station_number) REFERENCES Station
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE TABLE ChairBlueprint (
	size CHAR(2),
    cost INTEGER,
    msrp INTEGER,

	PRIMARY KEY (size)
);


CREATE TABLE Chair (
	id SERIAL,
	blueprint_size CHAR(2) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (blueprint_size) REFERENCES ChairBlueprint
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE ChairInspection (
	date DATE,
	chair_id INTEGER,
	passed BOOLEAN,

	PRIMARY KEY (date, chair_id),
	FOREIGN KEY (chair_id) REFERENCES Chair
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Purchases (
    id SERIAL,
    quantity INTEGER NOT NULL,
    blueprint_size CHAR(2) NOT NULL,
    purchaser_username 	VARCHAR(64) NOT NULL,

    PRIMARY KEY (id),
	FOREIGN KEY (blueprint_size) REFERENCES ChairBlueprint
		ON DELETE NO ACTION
		ON UPDATE CASCADE,
	FOREIGN KEY (purchaser_username) REFERENCES Purchaser
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE Equipment (
	id SERIAL,
	description VARCHAR(256),
	station_number INTEGER,

    PRIMARY KEY (id),
	FOREIGN KEY (station_number) REFERENCES Station
		ON DELETE SET NULL
		ON UPDATE CASCADE
);

CREATE TABLE Manufacturer (
	manufacturer VARCHAR(64),
	manufacturer_address VARCHAR(256),

	PRIMARY KEY (manufacturer)
);

CREATE TABLE PartType (
	id SERIAL,
	name VARCHAR(128),
	quantity_in_stock INTEGER,
	manufacturer VARCHAR(64),

    PRIMARY KEY (id),
    FOREIGN KEY (manufacturer) REFERENCES Manufacturer
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

CREATE TABLE ChairBlueprintRequiresPartType (
	blueprint_size CHAR(2),
	part_id INTEGER,
	quantity INTEGER,

	PRIMARY KEY (blueprint_size, part_id),
	FOREIGN KEY (blueprint_size) REFERENCES ChairBlueprint
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (part_id) REFERENCES PartType
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

--sample data
insert into purchaselocation values ('Amsterdam', 'Netherlands');
insert into purchaselocation values ('Singapore', 'Singapore');
insert into purchaselocation values ('Bangkok', 'Thailand');
insert into purchaselocation values ('Izmir', 'Turkey');
insert into purchaselocation values ('Vancouver', 'Canada');

insert into purchaser values ('user1', 'pass1', 'User_1', 'Amsterdam', 'Netherlands');
insert into purchaser values ('user2', 'pass2', 'User_2', 'Amsterdam', 'Netherlands');
insert into purchaser values ('user3', 'pass3', 'User_3', 'Singapore', 'Singapore');
insert into purchaser values ('user4', 'pass4', 'User_4', 'Bangkok', 'Thailand');
insert into purchaser values ('user5', 'pass5', 'User_5', 'Izmir', 'Turkey');
insert into purchaser values ('user6', 'pass6', 'User_6', 'Bangkok', 'Thailand');
insert into purchaser values ('user7', '123456', 'User_7', 'Vancouver', 'Canada');

insert into chairblueprint values ('S', '5', '4');
insert into chairblueprint values ('M', '10', '9');
insert into chairblueprint values ('L', '15', '14');

insert into manufacturer values ('IKEA', 'Vancouver');

insert into parttype (name, quantity_in_stock, manufacturer) values ('p1', '100', 'IKEA');
insert into parttype (name, quantity_in_stock, manufacturer) values ('p2', '200', 'IKEA');
insert into parttype (name, quantity_in_stock, manufacturer) values ('p3', '300', 'IKEA');
insert into parttype (name, quantity_in_stock, manufacturer) values ('p4', '400', 'IKEA');
insert into parttype (name, quantity_in_stock, manufacturer) values ('p5', '500', 'IKEA');

insert into chairblueprintrequiresparttype values ('S', 1, 10);
insert into chairblueprintrequiresparttype values ('S', 4, 10);
insert into chairblueprintrequiresparttype values ('S', 3, 10);
insert into chairblueprintrequiresparttype values ('M', 1, 10);
insert into chairblueprintrequiresparttype values ('M', 3, 10);
insert into chairblueprintrequiresparttype values ('M', 4, 10);
insert into chairblueprintrequiresparttype values ('L', 1, 10);
insert into chairblueprintrequiresparttype values ('L', 2, 10);
insert into chairblueprintrequiresparttype values ('L', 3, 10);
insert into chairblueprintrequiresparttype values ('L', 4, 10);
insert into chairblueprintrequiresparttype values ('L', 5, 10);

insert into station values (20001, 'Production Station');
insert into station values (20002, 'Assembly Station');
insert into station values (20003, 'Repairs Station');
insert into station values (20004, 'Finishing Station');
insert into station values (20005, 'Shipping Station');

insert into equipment (description, station_number) values ('Wood Glue', 20002);

insert into purchases (quantity, blueprint_size, purchaser_username) values (1, 'S', 'user1');
insert into purchases (quantity, blueprint_size, purchaser_username) values (2, 'S', 'user2');
insert into purchases (quantity, blueprint_size, purchaser_username) values (3, 'M', 'user3');
insert into purchases (quantity, blueprint_size, purchaser_username) values (4, 'L', 'user4');
insert into purchases (quantity, blueprint_size, purchaser_username) values (5, 'L', 'user5');

insert into employee (username, employee_password, full_name, salary, station_number) values ('bobsmith', 'SuperSecret', 'Bob Smith', 100000, 20001);
insert into employee (username, employee_password, full_name, salary, station_number) values ('robjones', 'topsecret', 'Rob Jones', 100000, 20001);
insert into employee (username, employee_password, full_name, salary, station_number) values ('neilparsons', '012345', 'Neil Parsons', 100000, 20001);

insert into chair (blueprint_size) values ('S');
insert into chair (blueprint_size) values ('M');
insert into chair (blueprint_size) values ('L');

insert into chairinspection (date, chair_id, passed) values ('2019-09-10', 1, true);
insert into chairinspection (date, chair_id, passed) values ('2019-06-23', 2, true);
insert into chairinspection (date, chair_id, passed) values ('2019-09-01', 3, false);