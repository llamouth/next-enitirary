const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini client with your API key
const genAI = new GoogleGenerativeAI('YOUR_API_KEY'); // Replace with your actual API key

// Get the model to generate embeddings
const model = genAI.getGenerativeModel({ model: 'gemini-embedding-exp-03-07' });

async function generateEmbedding(text) {
  try {
    // Generate embedding using the API
    const response = await model.embedContent({
      contents: text,
    });

    // The embeddings are available in the response object
    const embeddings = response.embeddings;

    return embeddings; // Return the embeddings array
  } catch (error) {
    console.error('Error generating embedding:', error.message);
    throw new Error('Failed to generate embedding');
  }
}

module.exports = { generateEmbedding };
