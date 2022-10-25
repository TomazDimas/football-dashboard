import { Request, Response } from 'express';
import IService from '../interfaces/IService';

export default class LoginController {
  constructor(public service: IService) {}

  authLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { type, message } = await this.service.authLogin(email, password);

    if (type) return res.status(400).json({ message });

    res.status(200).json({ token: message });
  };
}
