
-- changeset create-marketplace-table:1
CREATE TABLE offering (
     id int IDENTITY(1,1) PRIMARY KEY,
     name varchar(255) NOT NULL
);

-- changeset create-partner-table:1
CREATE TABLE partner_offerings (
      id int IDENTITY(1,1) PRIMARY KEY,
      partnerid varchar(255) NOT NULL,
      firstName NVARCHAR(255) NOT NULL,
      lastName NVARCHAR(255) NOT NULL,
      offeringId int FOREIGN KEY REFERENCES offering(id),
      gender varchar(6) NOT NULL CHECK (gender IN ('male', 'female')),
      age INT,
      phonenumber VARCHAR(20),
      service NVARCHAR(255),
      address NVARCHAR(500),
      perhourbaseprice DECIMAL(10, 2),
      fieldexperience INT,
      companyorganization NVARCHAR(255)
);

-- changeset create-lead-table:1
CREATE TABLE lead(
    id int IDENTITY(1,1) PRIMARY KEY,
    userid varchar(255) NOT NULL,
    partnerid varchar(255) NOT NULL,
    serviceid int NOT NULL,
    name varchar(255),
    phone_number varchar(15),
    address varchar(255),
    date_of_service date,
    status varchar(255) NOT NULL CHECK (status IN ('pending', 'accepted','rejected', 'in_service', 'serviced', 'payment_pending', 'complete', 'feedback_complete')),
    totalAmount decimal(15, 3)
);

CREATE TABLE feedback (
    feedbackid INT IDENTITY(1,1) PRIMARY KEY,
    partnerid varchar(255) NOT NULL,
    serviceid INT NOT NULL,
    leadid INT NOT NULL,
    username varchar(255) NOT NULL,
    feedbacktext NVARCHAR(MAX),
    rating DECIMAL(3, 2),
    feedbackDate DATETIME DEFAULT GETDATE(),
);



--changeset insert-offerings:1
insert into offering(name) values('Electrician'), ('Plumber'), ('Carpenter'),('Salon for Women'),('Salon for kids & men'),('Pest Control'),('Painter'),('HomeMaid'),('Home Cleaning'),('Appliances Repair')