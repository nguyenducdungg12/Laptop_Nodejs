const mongoose = require("mongoose");
const {Schema} = mongoose;

const OrderModel = new Schema({
   products : {
       type : Array,
   },
   address : {
       type : String,
   },
   TotalPrice : {
       type : Number,
   },
   payment : {
       type : String,
   },
   timeorder : {
        type : Date,
   },
   cancelreason : {
       type : String,
   },
   status_order : {
       type : Boolean,
   },
   id_user : {
       type : mongoose.Types.ObjectId,
       ref : "Users"
   }
})

module.exports = mongoose.model("Orders",OrderModel,"Orders");