const express = require("express");
const expenseController = require("../controllers/expense");
const isauth = require("../middleware/isauth");
const routes = express.Router();
routes.post("/create", isauth, expenseController.create);
routes.get("/", isauth, expenseController.getExpenses);

module.exports = routes;
