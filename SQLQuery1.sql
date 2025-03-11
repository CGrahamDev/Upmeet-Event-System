CREATE DATABASE UpMeetEventDB;
GO

CREATE TABLE Events (
EventID INT IDENTITY(1,1) PRIMARY KEY,
Title NVARCHAR(255) NOT NULL,
Description NVARCHAR(MAX) NOT NULL,
Date DATETIME NOT NULL,
Location NVARCHAR(255) NOT NULL
);

SELECT * FROM Events;

CREATE TABLE Favorites (
FavoriteID INT IDENTITY(1,1) PRIMARY KEY,
UserID INT NOT NULL,
EventID INT NOT NULL,
FOREIGN KEY (EventID) REFERENCES Events(EventID)
);

SELECT * FROM Favorites;

INSERT INTO Events (Title, Description, Date, Location)
VALUES
('Tech Conference', 'A conference about the latest in tech.', '2025-04-15', 'New York'),
('Music Festival', 'A festival with live performances', '2025-06-10', 'Los Angeles'),
('Startup Meetup', 'Networking event for startups.', '2025-07-20', 'San Francisco');

INSERT INTO Favorites (UserID, EventID)
VALUES
(1, 1),
(2, 2),
(1, 3);

SELECT * FROM Events;
SELECT * FROM Favorites;