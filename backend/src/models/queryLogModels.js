const db = require("../../config/mysqlDb");

const createLog = async (data) => {

    return await db("query_logs")
        .insert({
            query_text: data.query_text,
            route_type: data.route_type,
            cache_hit: data.cache_hit,
            response_text: data.response_text,
            response_time_ms: data.response_time_ms || 0,
            estimated_cost: data.estimated_cost || 0,
            prompt_tokens: data.prompt_tokens || 0,
            completion_tokens: data.completion_tokens || 0
        });
};

const getStats = async () => {

    const [total] = await db("query_logs")
        .count("* as count");

    const [rule] = await db("query_logs")
        .where("route_type", "RULE")
        .count("* as count");

    const [llm] = await db("query_logs")
        .where("route_type", "LLM")
        .count("* as count");

    const [cacheHits] = await db("query_logs")
        .where("cache_hit", 1)
        .count("* as count");

    const [avgResponseTime] = await db("query_logs")
        .avg("response_time_ms as avg");

    const [totalCost] = await db("query_logs")
        .sum("estimated_cost as total");

    const totalQueries = Number(total.count);
    const cacheCount = Number(cacheHits.count);

    const cacheHitRate =
        totalQueries > 0
            ? ((cacheCount / totalQueries) * 100).toFixed(2)
            : 0;

    return {
        totalQueries,
        ruleQueries: Number(rule.count),
        llmQueries: Number(llm.count),
        cacheHits: cacheCount,
        cacheHitRate: `${cacheHitRate}%`,
        averageResponseTime:
            Number(avgResponseTime.avg || 0).toFixed(2) + " ms",
        totalEstimatedCost:
            Number(totalCost.total || 0).toFixed(6)
    };
};

module.exports = {
    createLog,
    getStats
};