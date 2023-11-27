const express = require("express");
const userController = require("../controllers/user");
const isauth = require("../middleware/isauth");
const routes = express.Router();
routes.get("/", isauth, userController.getUser);
routes.post("/signup", userController.signup);
routes.post("/login", userController.login);
routes.put("/edit", isauth, userController.edit);
routes.post("/add/:id", isauth, userController.addFriend);
routes.get("/friend", isauth, userController.getFriends);
module.exports = routes;
