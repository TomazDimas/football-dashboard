import * as express from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const router = express.Router();

const LoginContoller = new TeamController(new TeamService());

router.get('/', LoginContoller.getAll);

export default router;
