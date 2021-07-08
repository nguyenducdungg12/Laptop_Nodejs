const express = require("express");
const Router = express.Router();
const ProductController = require("../controllers/ProductController")

Router.get("/products",ProductController.getAllProduct);  //get product by search or get all product
Router.get("/products/:category",ProductController.getProductByCategory); // get product by category 
Router.get("/detailproducts/:id",ProductController.getProductById) // get product by ID
module.exports=Router;