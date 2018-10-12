import express from 'express';
import userValidator from '../middlewares/userValidator';
import userController from '../controllers/userController';
import orderController from '../controllers/orderController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/auth/signup', userValidator.validateFirstTimeUser, userController.createUser);

router.post('/auth/login', userValidator.validateReturningUser, userController.signinUser);

router.get('/users/:id/orders', auth.verifyAuth, orderController.getOrderHistory);

export default router;
