const orderModel=require("../models/order.js");
const mongoose=require("mongoose");
const validator=require("../validators/validations.js");




//..............crete order API....................


const createOrder=async (req, res) => {
try{
let data=req.body;
if(!validator.isValidDetails(data)){

    return res.status(400).send({status:false,message:"body is empty"})
 
}

let orderId=data.order_id;
let itemName=data.item_name;
let cost=data.cost;
let orderDate=data.order_date;
let deliveryDate=data.delivery_date;

if(!validator.isValidValue(orderId)){

    return res.status(400).send({status:false,message:"order_id is invalid"})

}

if(!validator.isValidValue(itemName)){

    return res.status(400).send({status:false,message:"invalid item_name"});

}

if(!validator.isValidIntegerValue(cost)){

    return res.status(400).send({status:false,message:"invalid cost"});

}

if(!validator.isValidValue(orderDate)){

    return res.status(400).send({status:false,message:"invalid order_date"});

}

if(!validator.isValidValue(deliveryDate)){

    return res.status(400).send({status:false,message:"invalid delivery-date"});

}



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



//.............UPDATE ORDER API..............



const updateOrder=async (req, res) => {
try{
let data=req.body;

if(!validator.isValidDetails(data)){

    return res.status(400).send({status:false,message:"body is empty"})
 
}

let orderId=data.order_id;
if(!validator.isValidValue(orderId)){

    return res.status(400).send({status:false,message:"order_id is invalid"})

}

let deliveryDate=data.delivery_data;


if(!validator.isValidValue(deliveryDate)){

    return res.status(400).send({status:false,message:"delivery_date is invalid"})

}



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

//..........LIST API.....



const listOrders=async (req, res) => {
try{
let data=req.body;

if(!validator.isValidDetails(data)){

    return res.status(400).send({status:false,message:"body is empty"})
 
}

let date=data.order_date;

if(!validator.isValidValue(date)){

    return res.status(400).send({status:false,message:"order_date is invalid"})

}

let orderByOrderDate=await orderModel.find({order_date:date});

if(!orderByOrderDate){
    return res.status(400).send({status:false,message:"no order exists with this order_date"});
}

return res.status(200).send({status:true,message:"list",data:orderByOrderDate});

}catch(error){
    return res.status(500).send({ status: false, message: error.message });
}

}


//.........ORDER BY ORDER_ID API....




const orderByOrderId=async (req,res)=>{
try{
let data=req.body;

if(!validator.isValidDetails(data)){

    return res.status(400).send({status:false,message:"body is empty"})
 
}


let orderId=data.order_id;

if(!validator.isValidValue(orderId)){

    return res.status(400).send({status:false,message:"order_id is invalid"})

}

let orderExistsByOrderId=await orderModel.findOne({order_id:orderId});

if(!orderExistsByOrderId){
    return res.status(400).send({status:false,message:"order does not exists with this order_id"});
}

return res.status(200).send({status:true,message:"order list",data:orderExistsByOrderId});
}catch(error){
    return res.status(500).send({ status: false, message: error.message });
}
}

//.....DELETE ORDER BY ORDER_ID API...




const deleteOrder=async (req, res)=>{
try{
let data=req.body;

if(!validator.isValidDetails(data)){

    return res.status(400).send({status:false,message:"body is empty"})
 
}
let orderId=data.order_id;

if(!validator.isValidValue(orderId)){

    return res.status(400).send({status:false,message:"order_id is invalid"})

}


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



// In this task it was not mentioned that whether we have to create user also or not that is why I didn't make any user model using which a particular user can log in and log out and so I didnt do authentication and authorization(middlewares) checks for that user model and thus i kept every API public and not private.If it was mentioned that I would have done the task accordingly.Further if their is any issue in the database connectivity or connectivity issues with the server please let me know about it as this application is successfully running at my local machine
//Thanks
