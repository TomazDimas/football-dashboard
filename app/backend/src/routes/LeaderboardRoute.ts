import * as express from 'express';
import LeaderboardService from '../services/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const router = express.Router();

const LeaderboardContoller = new LeaderboardController(new LeaderboardService());

router.get('/home', LeaderboardContoller.getHomeLeaderboard);

router.get('/away', LeaderboardContoller.getAwayLeaderboard);

export default router;
