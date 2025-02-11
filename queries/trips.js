const db = require("../db/dbConfig");

const createTrip = async (trip) => {
  try {
    const { user_id, destination, preference } = trip;
    return await db.one(
      "INSERT INTO trips (user_id, destination, preference) VALUES ($1, $2, $3) RETURNING *",
      [user_id, destination, preference]
    );
  } catch (error) {
    return error;
  }
};

const getTripsByUser = async (user_id) => {
  try {
    return await db.any("SELECT * FROM trips WHERE user_id = $1", [user_id]);
  } catch (error) {
    return [];
  }
};

module.exports = { createTrip, getTripsByUser };
