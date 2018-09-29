import express from 'express';
import orderValidator from '../middlewares/orderValidator';
import orderController from '../controllers/orderController';
import auth from '../middlewares/auth';

const router = express.Router();
router.post('/orders', orderValidator.validatePostOrder, auth.verifyAuth, orderController.createOrder);

router.get('/orders', auth.verifyAdmin, orderController.getAllOrders);

router.get('/orders/:id', auth.verifyAdmin, orderController.getOneOrder);

router.put('/orders/:id', orderValidator.validateUpdateOrder, auth.verifyAdmin, orderController.updateOneOrder);

export default router;
