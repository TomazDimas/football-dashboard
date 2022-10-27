import { Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';

export default class MatchController {
  constructor(public service: IMatchService) {}

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const { type, message } = await this.service.getByProgress(inProgress);

      if (type) return res.status(401).json({ message });

      return res.status(200).json(message);
    }

    const { type, message } = await this.service.getAll();

    if (type) return res.status(401).json({ message });

    res.status(200).json(message);
  };

  create = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const { type, message } = await this.service.create(
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    );

    if (type) return res.status(401).json({ message });

    res.status(201).json(message);
  };
}
