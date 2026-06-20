const db = require("../../config/mysqlDb");

const saveCache = async (
    query,
    embedding,
    response
) => {

    await db("semantic_cache")
        .insert({
            query_text: query,
            embedding: JSON.stringify(
                embedding
            ),
            response_text: response
        });
};

const getAllCache = async () => {

    return await db("semantic_cache")
        .select("*");
};

module.exports = {
    saveCache,
    getAllCache
};