DROP DATABASE IF EXISTS next_entirary;

CREATE DATABASE next_entirary;

\c next_entirary;

-- Enable vector extension for AI embeddings
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    bio TEXT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    age INTEGER,
    gender TEXT,
    income INTEGER,
    education_level TEXT,
    travel_frequency INTEGER,
    preferred_activities TEXT,
    vacation_budget INTEGER,
    location TEXT,
    proximity_to_mountains INTEGER,
    proximity_to_beaches INTEGER,
    favorite_season TEXT,
    pets BOOLEAN,
    environmental_concerns BOOLEAN,
    preference BOOLEAN,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS trips (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    preference TEXT NOT NULL, -- e.g., "mountains", "beaches", "adventure"
    destination TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    country VARCHAR(100),
    description TEXT,
    image_url TEXT,
    category TEXT NOT NULL -- e.g., "beach", "mountain", "city"
);

-- Recommendations Table (AI-Generated)
CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    destination_id INTEGER REFERENCES destinations(id) ON DELETE CASCADE,
    score DECIMAL(5,2) NOT NULL, -- AI confidence score
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
