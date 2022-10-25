import * as express from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const router = express.Router();

const LoginContoller = new LoginController(new LoginService());

router.get('/', (req, res) => res.status(200).json('oi'));

router.post('/', LoginContoller.authLogin);

export default router;
