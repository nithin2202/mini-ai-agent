const routerService =
require("./routerServices");

const faqService =
require("./faqService");

const llmService =
require("./llmService");

const cacheService =
require("./cacheService");

const embeddingService =
require("./embeddingService");

const queryLogModel =
require("../models/queryLogModels");

const semanticCacheModel =
require("../models/semanticCacheModel");

const processQuery = async (query) => {

    const startTime = Date.now();

    // 1. Check Semantic Cache
    const cacheResult =
        await cacheService
            .findSimilarResponse(query);

    if (cacheResult.hit) {

        const responseTime =
            Date.now() - startTime;

        await queryLogModel.createLog({
            query_text: query,
            route_type: "CACHE",
            cache_hit: true,
            response_text:
                cacheResult.response,
            response_time_ms:
                responseTime
        });

        return {
            route: "CACHE",
            cached: true,
            answer:
                cacheResult.response
        };
    }

    // 2. Determine Route
    const route =
        await routerService
            .determineRoute(query);

    let answer;

    // 3. RULE Based Response
    if (route === "RULE") {

        answer =
            await faqService
                .getAnswer(query);
    }

    // 4. LLM Response
    else {

        answer =
            await llmService
                .generateResponse(query);

        // Generate Embedding
        const embedding =
            await embeddingService
                .generateEmbedding(query);

        // Save Semantic Cache
        await semanticCacheModel
            .saveCache(
                query,
                embedding,
                answer
            );
    }

    const responseTime =
        Date.now() - startTime;

    // 5. Log Query
    await queryLogModel.createLog({
        query_text: query,
        route_type: route,
        cache_hit: false,
        response_text: answer,
        response_time_ms: responseTime,
        estimated_cost: 0,
        prompt_tokens: 0,
        completion_tokens: 0
    });

    return {
        route,
        cached: false,
        answer
    };
};

module.exports = {
    processQuery
};