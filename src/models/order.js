const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    order_id:{type:String,required:true,unique:true},
    item_name: { type: String,required: true},
   
    cost:{type:Number,required:true},
    order_date:{type:String,required:true},
    delivery_date:{type:String,required:true}
   },
    {timestamps:true});

module.exports = mongoose.model('Orders', orderSchema)