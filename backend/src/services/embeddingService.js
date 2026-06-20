const { GoogleGenAI } = require("@google/genai");
console.log('KEY1',process.env.GEMINI_API_KEY);


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateEmbedding = async (text) => {

    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: text
    });

    return response.embeddings[0].values;
};

module.exports = {
    generateEmbedding
};