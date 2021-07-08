const mongoose = require("mongoose");
const {Schema} = mongoose;
const commentModel = require('./commentModel')
const ProductModel = new Schema({
    title : {
        type : String,
    },
    oldprice : {
        type : Number,
    },
    newprice : {
        type : Number,
    },
    image : {
        type : String,
    },
    ListImage : {
        type : Array,

    },
    category : {
        type : String,
    },
    content : {
        type : String, 
        
    },
    quantity : {
        type : Number , 
    },
    type : {
        type : String , 
    },
    comment : [{
        type : Schema.Types.ObjectId,
        ref : "commentModel"
    }]
})

module.exports = mongoose.model("Products",ProductModel,"Products");