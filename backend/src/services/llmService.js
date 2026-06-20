const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateResponse = async (query) => {

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
        You are a support assistant.

        Answer briefly in 5-10 lines.

        User Question:
        ${query}
    `
        });

        return response.text;

    } catch (error) {

        console.error("LLM Error:", error);

        throw new Error(
            "Failed to generate AI response"
        );
    }
};

module.exports = {
    generateResponse
};