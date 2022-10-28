import * as express from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const router = express.Router();

const MatchContoller = new MatchController(new MatchService());

router.get('/', MatchContoller.getAll);

router.post('/', MatchContoller.create);

router.patch('/:id/finish', MatchContoller.update);

export default router;
