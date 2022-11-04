import * as express from 'express';
import MatchMiddleware from '../middlewares/InsertMatchMiddleware';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();

const MatchContoller = new MatchController(new MatchService());

router.get('/', MatchContoller.getAll);

router.post('/', AuthMiddleware.validate, MatchMiddleware.validateInsert, MatchContoller.create);

router.patch('/:id/finish', MatchContoller.update);

router.patch('/:id', MatchContoller.updateScore);

export default router;
