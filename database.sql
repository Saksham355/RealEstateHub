-- 1. OWNER Table
CREATE TABLE OWNER (
    OID INT PRIMARY KEY,
    Name VARCHAR(100),
    Contact VARCHAR(100),
    Address VARCHAR(255)
);

-- 2. AGENT Table
CREATE TABLE AGENT (
    AID INT PRIMARY KEY,
    Name VARCHAR(100),
    Contact VARCHAR(100)
);

-- 3. PROPERTY Table
CREATE TABLE PROPERTY (
    PID INT PRIMARY KEY,
    Type VARCHAR(50),
    Size FLOAT,
    Status VARCHAR(50),
    Price BIGINT,
    Address VARCHAR(255),
    OID INT,
    AID INT,
    FOREIGN KEY (OID) REFERENCES OWNER(OID),
    FOREIGN KEY (AID) REFERENCES AGENT(AID)
);

-- 4. CLIENT Table
CREATE TABLE CLIENT (
    CID INT PRIMARY KEY,
    Name VARCHAR(100),
    Address VARCHAR(255),
    Contact VARCHAR(100),
    Preferred_Type VARCHAR(50),
    Preferred_Price BIGINT
);

-- 5. TRANSACTION Table
CREATE TABLE TRANSACTION (
    TID INT PRIMARY KEY,
    Status VARCHAR(50),
    Mode VARCHAR(50),
    AID INT,
    CID INT,
    PID INT,
    FOREIGN KEY (AID) REFERENCES AGENT(AID),
    FOREIGN KEY (CID) REFERENCES CLIENT(CID),
    FOREIGN KEY (PID) REFERENCES PROPERTY(PID)
);

-- 6. CONTRACT Table
CREATE TABLE CONTRACT (
    CONTRACT_ID INT PRIMARY KEY,
    PID INT,
    CID INT,
    AID INT,
    OID INT,
    Type VARCHAR(50),
    Start_Date DATE,
    End_Date DATE,
    Terms TEXT,
    Status VARCHAR(50),
    FOREIGN KEY (PID) REFERENCES PROPERTY(PID),
    FOREIGN KEY (CID) REFERENCES CLIENT(CID),
    FOREIGN KEY (AID) REFERENCES AGENT(AID),
    FOREIGN KEY (OID) REFERENCES OWNER(OID)
);

-- 7. LEGAL_CASE Table
CREATE TABLE LEGAL_CASE (
    LCID INT PRIMARY KEY,
    PID INT,
    OID INT,
    Issue TEXT,
    Status VARCHAR(50),
    FOREIGN KEY (PID) REFERENCES PROPERTY(PID),
    FOREIGN KEY (OID) REFERENCES OWNER(OID)
);

-- 8. MANAGES Table
CREATE TABLE MANAGES (
    AID INT,
    CID INT,
    PRIMARY KEY (AID, CID),
    FOREIGN KEY (AID) REFERENCES AGENT(AID),
    FOREIGN KEY (CID) REFERENCES CLIENT(CID)
);

-- 9. BIDS Table
CREATE TABLE BIDS (
    CID INT,
    PID INT,
    Amount BIGINT,
    Status VARCHAR(50),
    Date DATE,
    PRIMARY KEY (CID, PID),
    FOREIGN KEY (CID) REFERENCES CLIENT(CID),
    FOREIGN KEY (PID) REFERENCES PROPERTY(PID)
);

-- 10. MEDIATES Table
CREATE TABLE MEDIATES (
    CID INT,
    AID INT,
    TID INT,
    PRIMARY KEY (CID, AID, TID),
    FOREIGN KEY (CID) REFERENCES CLIENT(CID),
    FOREIGN KEY (AID) REFERENCES AGENT(AID),
    FOREIGN KEY (TID) REFERENCES TRANSACTION(TID)
);

-- 11. INVOLVED_IN Table
CREATE TABLE INVOLVED_IN (
    PID INT,
    LCID INT,
    PRIMARY KEY (PID, LCID),
    FOREIGN KEY (PID) REFERENCES PROPERTY(PID),
    FOREIGN KEY (LCID) REFERENCES LEGAL_CASE(LCID)
);-- Your provided schema remains the same

INSERT INTO OWNER (OID, Name, Contact, Address) VALUES
(1, 'Manish Kapoor', 'manish.kapoor@gmail.com', '45, Connaught Place, Delhi'),
(2, 'Pooja Bhatia', 'pooja.bhatia@yahoo.co.in', '12, Golf Course Road, Gurgaon'),
(3, 'Arvind Malhotra', 'arvind.malhotra@hotmail.com', '34, Greater Kailash 2, Delhi'),
(4, 'Ritika Sharma', 'ritika.sharma@gmail.com', '67, Sector 50, Noida'),
(5, 'Sandeep Verma', 'sandeep.verma@hotmail.com', '23, Dwarka Sector 10, Delhi'),
(6, 'Nikhil Choudhary', 'nikhil.choudhary@yahoo.co.in', '23, Vaishali Nagar, Jaipur'),
(7, 'Anjali Khanna', 'anjali.khanna@gmail.com', '55, Salt Lake City, Kolkata'),
(8, 'Rajiv Mehta', 'rajiv.mehta@hotmail.com', '33, Satellite Road, Ahmedabad'),
(9, 'Shruti Joshi', 'shruti.joshi@yahoo.co.in', '71, Gomti Nagar, Lucknow'),
(10, 'Kunal Rathore', 'kunal.rathore@gmail.com', '19, Arera Colony, Bhopal');

INSERT INTO AGENT (AID, Name, Contact) VALUES
(1, 'Rajesh Sharma', 'rajesh.sharma@yahoo.co.in'),
(2, 'Priya Verma', 'priya.verma@gmail.com'),
(3, 'Amit Kumar', 'amit.kumar@hotmail.com'),
(4, 'Neha Singh', 'neha.singh@yahoo.co.in'),
(5, 'Vikram Joshi', 'vikram.joshi@gmail.com'),
(6, 'Ananya Iyer', 'ananya.iyer@hotmail.com'),
(7, 'Rahul Mehta', 'rahul.mehta@hotmail.com'),
(8, 'Pooja Nair', 'pooja.nair@gmail.com'),
(9, 'Arjun Patel', 'arjun.patel@yahoo.co.in'),
(10, 'Sanya Kapoor', 'sanya.kapoor@gmail.com');

INSERT INTO PROPERTY (PID, Type, Size, Status, Price, Address, OID, AID) VALUES
(1, 'Apartment', 1300.0, 'Available', 12000000, '45, Connaught Place, Delhi', 1, 1),
(2, 'Villa', 4000.0, 'Sold', 65000000, '12, Golf Course Road, Gurgaon', 2, 2),
(3, 'Condo', 950.0, 'On Hold', 9500000, '34, Greater Kailash 2, Delhi', 3, 3),
(4, 'Townhouse', 1700.0, 'Available', 18000000, '67, Sector 50, Noida', 4, 4),
(5, 'Studio', 700.0, 'Sold', 6500000, '23, Dwarka Sector 10, Delhi', 5, 5),
(6, 'Penthouse', 2800.0, 'Leased', 42000000, '89, DLF Phase 3, Gurgaon', 6, 6),
(7, 'Duplex', 2200.0, 'Available', 25000000, '56, Sector 137, Noida', 7, 7),
(8, 'Farmhouse', 5500.0, 'Sold', 120000000, '101, Chattarpur, Delhi', 8, 8),
(9, 'Loft', 1100.0, 'On Hold', 11000000, '78, Vasant Kunj, Delhi', 9, 9),
(10, 'Bungalow', 2000.0, 'Available', 28000000, '90, Sohna Road, Gurgaon', 10, 10);

INSERT INTO CLIENT (CID, Name, Address, Contact, Preferred_Type, Preferred_Price) VALUES
(1, 'Aditya Malhotra', '120, Hauz Khas, Delhi', 'aditya.malhotra@gmail.com', 'Villa', 45000000),
(2, 'Simran Sharma', '55, Lajpat Nagar, Delhi', 'simran.sharma@hotmail.com', 'Condo', 18000000),
(3, 'Kabir Choudhary', '78, Sushant Lok, Gurgaon', 'kabir.c@yahoo.co.in', 'Apartment', 28000000),
(4, 'Neha Kapoor', '14, Sector 62, Noida', 'neha.kapoor@gmail.com', 'Townhouse', 32000000),
(5, 'Aryan Verma', '89, Rajouri Garden, Delhi', 'aryan.verma@yahoo.co.in', 'Studio', 12000000),
(6, 'Ishita Mehta', '23, MG Road, Gurgaon', 'ishita.mehta@hotmail.com', 'Penthouse', 85000000),
(7, 'Rajat Khanna', '10, Sector 21, Faridabad', 'rajat.khanna@gmail.com', 'Duplex', 42000000),
(8, 'Tanya Bansal', '33, Civil Lines, Delhi', 'tanya.bansal@yahoo.co.in', 'Farmhouse', 110000000),
(9, 'Vikas Joshi', '71, Indirapuram, Ghaziabad', 'vikas.joshi@hotmail.com', 'Loft', 24000000),
(10, 'Megha Rathore', '19, Vaishali, Ghaziabad', 'megha.rathore@gmail.com', 'Bungalow', 38000000);

INSERT INTO TRANSACTION (TID, Status, Mode, AID, CID,PID) VALUES
(2, 'Pending', 'Bank Transfer', 2, 2,2),
(5, 'Pending', 'Bank Transfer', 5, 5,5),
(8, 'Pending', 'Cash', 8, 8,8);

UPDATE transaction
SET PID = 5
WHERE tid = 5;

INSERT INTO CONTRACT (CONTRACT_ID, PID, CID, AID, OID, Type, Start_Date, End_Date, Terms, Status) VALUES
(1, 1, 1, 1, 1, 'Sale', '2024-01-01', '2024-12-31', 'Standard contract terms', 'Active'),
(2, 2, 2, 2, 2, 'Lease', '2024-02-01', '2025-01-31', 'Lease agreement terms', 'Expired'),
(3, 3, 3, 3, 3, 'Rental Agreement', '2024-03-01', '2024-12-31', 'Rental contract terms', 'Active'),
(4, 4, 4, 4, 4, 'Sale', '2024-04-01', '2025-04-01', 'Legal sale terms', 'Active'),
(5, 5, 5, 5, 5, 'Lease', '2024-05-01', '2025-05-01', 'Standard lease agreement', 'Expired'),
(6, 6, 6, 6, 6, 'Rental Agreement', '2024-06-01', '2024-12-01', 'Tenant contract terms', 'Active'),
(7, 7, 7, 7, 7, 'Sale', '2024-07-01', '2025-07-01', 'Real estate contract', 'Active'),
(8, 8, 8, 8, 8, 'Lease', '2024-08-01', '2025-08-01', 'Business lease terms', 'Expired'),
(9, 9, 9, 9, 9, 'Rental Agreement', '2024-09-01', '2024-12-01', 'Vacation rental terms', 'Active'),
(10, 10, 10, 10, 10, 'Sale', '2024-10-01', '2025-10-01', 'Property sale contract', 'Active');

INSERT INTO LEGAL_CASE (LCID, PID, OID, Issue, Status) VALUES
(1, 1, 1, 'Boundary dispute', 'Pending'),
(2, 2, 2, 'Title fraud', 'Resolved'),
(3, 3, 3, 'Lease violation', 'Pending'),
(4, 4, 4, 'Unauthorized construction', 'Resolved'),
(5, 5, 5, 'Rent dispute', 'Pending'),
(6, 6, 6, 'Ownership conflict', 'Resolved'),
(7, 7, 7, 'Zoning violation', 'Pending'),
(8, 8, 8, 'False listing', 'Resolved'),
(9, 9, 9, 'Contract breach', 'Pending'),
(10, 10, 10, 'Illegal eviction', 'Resolved');

INSERT INTO MANAGES (AID, CID) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10);

INSERT INTO BIDS (CID, PID, Amount, Status, Date) VALUES
(1, 1, 260000.00, 'Pending', '2024-01-10'),
(2, 2, 780000.00, 'Accepted', '2024-02-15'),
(3, 3, 175000.00, 'Rejected', '2024-03-20'),
(4, 4, 320000.00, 'Pending', '2024-04-12'),
(5, 5, 150000.00, 'Accepted', '2024-05-18'),
(6, 6, 920000.00, 'Rejected', '2024-06-22'),
(7, 7, 410000.00, 'Pending', '2024-07-14'),
(8, 8, 1550000.00, 'Accepted', '2024-08-16'),
(9, 9, 225000.00, 'Rejected', '2024-09-19'),
(10, 10, 370000.00, 'Pending', '2024-10-21');

INSERT INTO INVOLVED_IN (PID, LCID) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10);