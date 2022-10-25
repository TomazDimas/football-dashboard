import * as express from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const router = express.Router();

const LoginContoller = new LoginController(new LoginService());

router.get('/', (req, res) => res.status(200).json('oi'));

router.post('/', LoginMiddleware.checkLogin, LoginContoller.authLogin);

export default router;
