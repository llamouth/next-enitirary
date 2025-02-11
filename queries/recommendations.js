const db = require("../db/dbConfig");
const { generateEmbedding } = require("../lib/openai");

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
    return [];
  }
};

module.exports = { findRecommendations };
