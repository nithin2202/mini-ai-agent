const embeddingService = require("./src/services/embeddingService");

(async () => {
    const embedding =
        await embeddingService.generateEmbedding(
            "Explain JWT authentication"
        );

    console.log(embedding.length);
})();