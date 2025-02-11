\c next_entirary;

\copy user_profiles (
    age, gender, income, education_level, travel_frequency, preferred_activities, 
    vacation_budget, location, proximity_to_mountains, proximity_to_beaches, 
    favorite_season, pets, environmental_concerns, preference
) FROM 'data/travel_preferences.csv' DELIMITER ',' CSV HEADER;