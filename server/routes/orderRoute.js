import express from 'express';
import orderValidator from '../middlewares/orderValidator';
import order from '../controllers/orderController';

const router = express.Router();


router.get('/orders', order.viewAll);

router.get('/orders/:id', orderValidator.validateGetOrder, order.viewOne);

router.post('/orders', orderValidator.validatePostOrder, order.create);

router.put('/orders/:id', orderValidator.validateGetOrder, orderValidator.validatePostOrder, order.update);

router.delete('/orders/:id', orderValidator.validateGetOrder, order.remove);

export default router;
