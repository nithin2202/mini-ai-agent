const db = require("../../config/mysqlDb");

const getAllFaqs = async () => {
    return await db("faqs").select("*");
};

module.exports = {getAllFaqs};