import express from 'express';
import menuValidator from '../middlewares/menuValidator';
import menuController from '../controllers/menuController';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/menu', menuValidator.validateMenu, auth.verifyAdmin, menuController.createMenu);

router.get('/menu', auth.verifyAuth, menuController.getAllMenu);

export default router;
