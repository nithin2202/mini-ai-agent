const queryLogModel =
require("../models/queryLogModels");

const getStats = async () => {

    return await queryLogModel
        .getStats();
};

module.exports = {
    getStats
};