import { Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';

export default class MatchController {
  constructor(public service: IMatchService) {}

  getAll = async (req: Request, res: Response) => {
    const { type, message } = await this.service.getAll();

    if (type) return res.status(401).json({ message });

    res.status(200).json(message);
  };
}
