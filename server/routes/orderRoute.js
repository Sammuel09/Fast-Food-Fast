import express from 'express';
import orderValidator from '../middlewares/orderValidator';
import order from '../controllers/orderController';

const router = express.Router();


router.get('/orders', order.viewAll);

router.get('/orders/:id', order.view);

router.post('/orders', orderValidator.orderValidate, order.create);

router.put('/orders/:id', orderValidator.orderValidate, order.update);

router.delete('/orders/:id', orderValidator.orderValidate, order.remove);

module.exports = router;
