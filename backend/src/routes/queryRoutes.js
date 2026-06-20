const express = require("express");

const {
    handleQuery
} = require(
    "../controllers/queryController"
);

const router = express.Router();

router.post("/api/query", handleQuery);

module.exports = router;