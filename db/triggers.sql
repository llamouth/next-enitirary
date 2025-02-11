\c next_entirary;

-- FUNCTION: Update `updated_at` column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION: Remove low-scoring AI recommendations
CREATE OR REPLACE FUNCTION remove_low_score_recommendations()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.score < 50 THEN
        DELETE FROM recommendations WHERE id = NEW.id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER: Auto-update `updated_at` column for `trips`
CREATE TRIGGER update_trips_updated_at
BEFORE UPDATE ON trips
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- TRIGGER: Auto-remove low-score AI recommendations
CREATE TRIGGER remove_low_score_recommendations_trigger
AFTER INSERT ON recommendations
FOR EACH ROW
WHEN (NEW.score < 50)
EXECUTE FUNCTION remove_low_score_recommendations();
