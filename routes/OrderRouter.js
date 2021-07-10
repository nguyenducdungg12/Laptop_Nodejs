const express = require("express");
const Router = express.Router();
const OrderController = require("../controllers/OrderController")
const Authentication= require("../middleware/Auth");

Router.post("/payment/create",Authentication.isUserValid,OrderController.paymentOnline);  //get product by search or get all product
Router.post("/order",Authentication.isUserValid,OrderController.paymentOffline);  //get product by search or get all product
Router.get("/order",Authentication.isUserValid,OrderController.getOrder);  //get product by search or get all product

module.exports=Router;