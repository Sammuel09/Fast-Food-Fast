import express from 'express';
import menuValidator from '../middlewares/menuValidator';
import menuController from '../controllers/menuController';

const router = express.Router();

router.post('/menu', menuValidator.validateMenu, menuController.createMenu);

// router.post('/auth/login', userValidator.validateReturningUser, userController.signinUser);

export default router;