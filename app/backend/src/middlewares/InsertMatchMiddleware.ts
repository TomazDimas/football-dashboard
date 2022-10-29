import { NextFunction, Request, Response } from 'express';
import Team from '../database/models/Team';

export default class MatchMiddleware {
  static validateInsert = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      const message = 'It is not possible to create a match with two equal teams';
      return res.status(422).json({ message });
    }
    const teams = await Team.findAll();
    if (!teams.some((team) => Number(team.id) === Number(homeTeam))) {
      const message = 'There is no team with such id!';
      return res.status(404).json({ message });
    }
    if (!teams.some((team) => Number(team.id) === Number(awayTeam))) {
      const message = 'There is no team with such id!';
      return res.status(404).json({ message });
    }
    next();
  };
}
