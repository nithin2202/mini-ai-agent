const faqModel = require("../models/faqModels");

const getAnswer = async (query) => {

    const faqs = await faqModel.getAllFaqs();

    const lowerQuery = query.toLowerCase();

    for (const faq of faqs) {

        if (
            lowerQuery.includes(
                faq.keyword.toLowerCase()
            )
        ) {
            return faq.answer;
        }
    }

    return null;
};

module.exports = {
    getAnswer
};