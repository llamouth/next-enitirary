const db = require("../db/dbConfig");

const getAllDestinations = async () => {
  try {
    return await db.any("SELECT * FROM destinations");
  } catch (error) {
    return [];
  }
};

const getDestinationByCategory = async (category) => {
  try {
    return await db.any("SELECT * FROM destinations WHERE category = $1", [category]);
  } catch (error) {
    return [];
  }
};

module.exports = { getAllDestinations, getDestinationByCategory };
