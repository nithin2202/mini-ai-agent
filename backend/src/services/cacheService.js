const embeddingService =
require("./embeddingService");

const semanticCacheModel =
require("../models/semanticCacheModel");

const cosineSimilarity =
require("../utils/cosineSimiliarity");

const THRESHOLD = 0.85;

const findSimilarResponse =
async (query) => {

    const queryEmbedding =
        await embeddingService
            .generateEmbedding(query);

    const cacheEntries =
        await semanticCacheModel
            .getAllCache();

    let bestMatch = null;

    let highestScore = 0;

    for (const entry of cacheEntries) {

        const storedEmbedding =
            JSON.parse(
                entry.embedding
            );

        const similarity =
            cosineSimilarity(
                queryEmbedding,
                storedEmbedding
            );

        if (
            similarity >
            highestScore
        ) {

            highestScore =
                similarity;

            bestMatch =
                entry;
        }
    }

    if (
        highestScore >= THRESHOLD
    ) {

        return {
            hit: true,
            response:
                bestMatch.response_text
        };
    }

    return {
        hit: false
    };
};

module.exports = {
    findSimilarResponse
};