const db = require("./db");

async function findSimilarVectors(embedding) {
  const sql = `
    SELECT name, category, description, (embedding <-> $1) AS similarity
    FROM destinations
    ORDER BY similarity ASC
    LIMIT 5;
  `;

  try {
    const results = await db.any(sql, [embedding]);
    return results;
  } catch (error) {
    console.error("Error finding similar vectors:", error);
    return [];
  }
}

module.exports = { findSimilarVectors };
