const queryService =
require("../services/queryServices");

const handleQuery = async (req,res) => {
    try {
        const { query } = req.body;

        if (!query) {

            return res.status(400).json({
                success: false,
                message:
                    "Query is required"
            });
        }

        const result = await queryService.processQuery(query);

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { handleQuery};