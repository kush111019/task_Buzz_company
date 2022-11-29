const express = require('express');
const router = express.Router();
const orderController=require("../controllers/orderController.js");

 router.post("/orders/create",orderController.createOrder);

 router.post("/orders/update",orderController.updateOrder);

 router.get("/orders/list",orderController.listOrders);

 router.get("/orders/search",orderController.orderByOrderId);

router.delete("/orders/delete",orderController.deleteOrder);






module.exports = router;