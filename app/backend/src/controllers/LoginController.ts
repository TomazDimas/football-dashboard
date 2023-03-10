import { Request, Response } from 'express';
import ILoginService from '../interfaces/ILoginService';

export default class LoginController {
  constructor(public service: ILoginService) {}

  authLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { type, message } = await this.service.authLogin(email, password);

    if (type) return res.status(401).json({ message });

    res.status(200).json({ token: message });
  };

  getAll = async (req: Request, res: Response) => {
    const { email } = req.body.payload;
    const { type, message } = await this.service.getAll(email);

    if (type) return res.status(401).json({ message });

    res.status(200).json({ role: message });
  };
}
