import express from 'express';
import bodyParser from 'body-parser';
import order from '../controllers/orderController.js';
const router = express.Router();


router.get("/orders", order.viewAll);

router.get("/orders/:orderId", order.view);

router.post("/orders", order.create)

router.put("/orders/:orderId", order.update)

router.delete("/orders/:orderId", order.remove)

module.exports = router;