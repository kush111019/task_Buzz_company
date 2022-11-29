const orderModel=require("../models/order.js");
const mongoose=require("mongoose");


const createOrder=async (req, res) => {
try{
let data=req.body;
console.log(data)


let orderId=data.order_id;

let orderIdExists=await orderModel.findOne({order_id:orderId});
if(orderIdExists){
  return res.status(400).send({status:false,message:"order_id already exists"});
}

let record=await orderModel.create(data);

if(record)
{
   return res.status(201).send({status:true,message:"record inserted",insertedDate:record});
}

}catch(error){
    return res.status(500).send({ status: false, message: error.message });
}
}



const updateOrder=async (req, res) => {
try{
let data=req.body;

let orderId=data.order_id;
let deliveryDate=data.delivery_data;

let orderIdExists=await orderModel.findOne({order_id:orderId});


if(!orderIdExists){
    return res.status(400).send({status:false,message:"order_id does not exists"});
}

let updateOrder=await orderModel.findOneAndUpdate(
{order_id:orderId},
{$set:{delivery_date:deliveryDate}},
{new:true}
)


if(updateOrder){
    return res.status(200).send({status:true,message:"record updated successfully",updatedOrder:updateOrder});
}

}catch(error){
    return res.status(500).send({ status: false, message: error.message });
}
}



const listOrders=async (req, res) => {
try{
let data=req.body;

let date=data.order_date;

let orderByOrderDate=await orderModel.find({order_date:date});

if(!orderByOrderDate){
    return res.status(400).send({status:false,message:"no order exists with this order_date"});
}

return res.status(200).send({status:true,message:"list",data:orderByOrderDate});

}catch(error){
    return res.status(500).send({ status: false, message: error.message });
}

}

const orderByOrderId=async (req,res)=>{
try{
let data=req.body;

let orderId=data.order_id;

let orderExistsByOrderId=await orderModel.findOne({order_id:orderId});

if(!orderExistsByOrderId){
    return res.status(400).send({status:false,message:"order does not exists with this order_id"});
}

return res.status(200).send({status:true,message:"order list",data:orderExistsByOrderId});
}catch(error){
    return res.status(500).send({ status: false, message: error.message });
}
}

const deleteOrder=async (req, res)=>{
try{
let data=req.body;
let orderId=data.order_id;

let orderExistsByOrderId=await orderModel.findOne({order_id:orderId});

if(!orderExistsByOrderId){
    return res.status(400).send({status:false,message:"order does not exist with this order_id"});
}
let deletedRecord=await orderModel.remove({order_id:orderId});

if(deletedRecord){
    return res.status(200).send({status:true,message:"record is deleted successfully",deletedRecord:deletedRecord});
}
}catch(error){
    return res.status(500).send({ status: false, message: error.message });
}
}

module.exports={createOrder,updateOrder,listOrders,orderByOrderId,deleteOrder}