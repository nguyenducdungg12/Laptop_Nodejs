const express = require("express");
const Router = express.Router();
const ProductController = require("../controllers/ProductController")
const Authentication= require("../middleware/Auth");
Router.get("/products",ProductController.getAllProduct);  //get product by search or get all product
Router.get("/products/:category",ProductController.getProductByCategory); // get product by category 
Router.get("/detailproducts/:id",ProductController.getProductById) // get product by ID
Router.post("/detailproducts/:id/comment",Authentication.isUserValid,ProductController.postComment)
Router.get("/detailproducts/:id/comment",ProductController.getComment)
Router.post("/detailproducts/:id/reply/:idcomment",Authentication.isUserValid,ProductController.postReply)
module.exports=Router;