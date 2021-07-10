const express = require("express");
const Router = express.Router();
const UserController = require('../controllers/UserController');
const Auth = require("../middleware/Auth")
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/image')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({storage})

Router.post("/register",UserController.registerUser);
Router.post("/login",UserController.loginUser);
Router.get("/accountVerification/:code",UserController.verifyCode);
Router.get("/user",Auth.isUserValid,UserController.getUser);
Router.post("/user/update",upload.single('image'),Auth.isUserValid,UserController.updateUser);

module.exports = Router;