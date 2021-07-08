const express = require("express");
const Router = express.Router();
const UserController = require('../controllers/UserController');
const Auth = require("../middleware/Auth")


Router.post("/register",UserController.registerUser);
Router.post("/login",UserController.loginUser);
Router.get("/accountVerification/:code",UserController.verifyCode);
Router.get("/user",Auth.isUserValid,UserController.getUser);

module.exports = Router;