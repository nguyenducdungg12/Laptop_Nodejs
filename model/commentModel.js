const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserModel = new Schema({
    username : {
        type : String,
        require : true,
        unique : true,
    },
    password : {
        type : String,
        require :true,
    },
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    image : {
        type : String,
    },
    role : {
        type : String,
    },
    enable : {
        type : Boolean,
    },
    verificationcode : {
        type : String,
    },
    forgotpassword : {
        type : String,
    },
    ngaysinh : {
        type : String,
    },
    sex : {
        type : String,
    }
})

const commentModel = new Schema({

    user : UserModel
    ,
    content : {
        type : String,
    },
    start : {
        type : Number,
    },
    reply : {
        type : Array,
    }
})

module.exports = mongoose.model("commentModel",commentModel,"commentModel");