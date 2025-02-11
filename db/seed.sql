\c next_entirary;

-- Insert some example users
INSERT INTO users (username, email, password_hash, first_name, last_name, bio, profile_picture)
VALUES 
('traveler_1', 'user1@example.com', '$2b$10$dummyhash1', 'John', 'Doe', 'I love traveling to beaches!', NULL),
('mountain_lover', 'user2@example.com', '$2b$10$dummyhash2', 'Jane', 'Smith', 'Adventure enthusiast', NULL);

-- Insert sample destinations
INSERT INTO destinations (name, country, description, image_url, category)
VALUES 
('Bali', 'Indonesia', 'A tropical paradise with stunning beaches and rich culture.', 'https://example.com/bali.jpg', 'beach'),
('Swiss Alps', 'Switzerland', 'Beautiful mountain ranges perfect for skiing and hiking.', 'https://example.com/alps.jpg', 'mountain'),
('Kyoto', 'Japan', 'Historic temples and beautiful cherry blossoms.', 'https://example.com/kyoto.jpg', 'city');

-- Insert sample trips (user preferences)
INSERT INTO trips (user_id, destination, preference)
VALUES 
(1, 'Bali', 'beach'),
(2, 'Swiss Alps', 'mountain');
