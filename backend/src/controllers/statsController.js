const statsService =
require("../services/statsService");

const getStats = async (
    req,
    res
) => {

    try {

        const stats =
            await statsService
                .getStats();

        return res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getStats
};