const express = require("express");
const router = express.Router();
const requiresToken = require("./requiresToken");

const db = require("../../models");

module.exports = router;
