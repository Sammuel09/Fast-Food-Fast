import express from 'express';
import userValidator from '../middlewares/userValidator';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/auth/signup', userValidator.validateUser, userController.createUser);

export default router;
