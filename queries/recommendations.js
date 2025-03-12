const db = require("../db/dbConfig");
const { generateEmbedding } = require("../lib/googleAi");

const findRecommendations = async (userPreferences) => {
  try {
    // Generate AI embedding for user preferences
    const embedding = await generateEmbedding(userPreferences);

    const sql = `
      SELECT name, category, description, (embedding <-> $1) AS similarity
      FROM destinations
      ORDER BY similarity ASC
      LIMIT 5;
    `;

    return await db.any(sql, [embedding]);
  } catch (error) {
    console.error('Error finding recommendations:', error.message);
    return [];
  }
};

module.exports = { findRecommendations };
