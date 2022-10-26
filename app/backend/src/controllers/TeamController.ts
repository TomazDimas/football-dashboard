import { Request, Response } from 'express';
import ITeamService from '../interfaces/ITeamService';

export default class TeamController {
  constructor(public service: ITeamService) {}

  getAll = async (req: Request, res: Response) => {
    const { type, message } = await this.service.getAll();

    if (type) return res.status(401).json({ message });

    res.status(200).json(message);
  };

  getOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { type, message } = await this.service.getOne(id);

    if (type) return res.status(401).json({ message });

    res.status(200).json(message);
  };
}
