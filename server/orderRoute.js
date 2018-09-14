import express from 'express';
import bodyParser from 'body-parser';
import order from './orderController.js';
const router = express.Router();


router.get("/order", order.viewAll);

router.get("/order/:orderId", order.view);

router.post("/order", order.create)

router.put("/order/:orderId", order.update)

router.delete("/order/:orderId", order.remove)

module.exports = router;