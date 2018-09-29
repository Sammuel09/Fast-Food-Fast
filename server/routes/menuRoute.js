import express from 'express';
import menuValidator from '../middlewares/menuValidator';
import menuController from '../controllers/menuController';
import jwtCheck from '../middlewares/jwtCheck';
import Auth from '../middlewares/Auth';

const router = express.Router();

router.post('/menu', menuValidator.validateMenu, Auth.verifyAdmin, menuController.createMenu);

export default router;
