const faqModel = require("../models/faqModels");

const determineRoute = async (query) => {

    const faqs = await faqModel.getAllFaqs();

    const lowerQuery = query.toLowerCase();

    const matched = faqs.some(faq =>
        lowerQuery.includes(
            faq.keyword.toLowerCase()
        )
    );

    return matched
        ? "RULE"
        : "LLM";
};

module.exports = {
    determineRoute
};