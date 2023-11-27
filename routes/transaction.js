const express = require("express");
const transactionController = require("../controllers/transaction");
const isauth = require("../middleware/isauth");
const routes = express.Router();
routes.post("/create", isauth, transactionController.create);
routes.get("/", isauth, transactionController.getTransactions);
routes.get("/debt", isauth, transactionController.getDebts);

module.exports = routes;
