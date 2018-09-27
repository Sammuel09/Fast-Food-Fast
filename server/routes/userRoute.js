import express from 'express';
import userValidator from '../middlewares/userValidator';
import userController from '../controllers/userController';

const router = express.Router();

router.post('/auth/signup', userValidator.validateFirstTimeUser, userController.createUser);

router.post('/auth/login', userValidator.validateReturningUser, userController.signinUser);

export default router;
