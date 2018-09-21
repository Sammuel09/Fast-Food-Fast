import express from 'express';
import bodyParser from 'body-parser';
import orderValidator from '../middlewares/orderValidator';
import order from '../controllers/orderController';

const router = express.Router();


router.get('/orders', order.viewAll);

router.get('/orders/:orderId', order.view);

router.post('/orders', orderValidator.orderValidate, order.create);

router.put('/orders/:orderId', orderValidator.orderValidate, order.update);

router.delete('/orders/:orderId', orderValidator.orderValidate, order.remove);

module.exports = router;
