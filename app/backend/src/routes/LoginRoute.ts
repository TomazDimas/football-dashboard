import * as express from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();

const LoginContoller = new LoginController(new LoginService());

router.get('/validate', AuthMiddleware.validate, LoginContoller.getAll);

router.post('/', LoginMiddleware.checkLogin, LoginContoller.authLogin);

export default router;
