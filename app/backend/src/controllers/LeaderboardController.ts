import { Request, Response } from 'express';
import ILeaderboardService from '../interfaces/ILeaderboardService';

export default class LeaderboardController {
  constructor(public service: ILeaderboardService) {}

  getHomeLeaderboard = async (req: Request, res: Response) => {
    const { type, message } = await this.service.getHomeLeaderboard();

    if (type) return res.status(401).json({ message });

    return res.status(200).json(message);
  };

  getAwayLeaderboard = async (req: Request, res: Response) => {
    const { type, message } = await this.service.getAwayLeaderboard();

    if (type) return res.status(401).json({ message });

    return res.status(200).json(message);
  };
}
