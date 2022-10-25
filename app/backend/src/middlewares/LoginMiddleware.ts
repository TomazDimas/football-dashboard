import { NextFunction, Request, Response } from 'express';

export default class LoginMiddleware {
  static checkLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const re = /\S+@\S+\.\S+/;
    if (!email || !password) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    if (!re.test(email)) return res.status(400).json({ message: 'Invalid email' });

    if (password.length < 6) return res.status(400).json({ message: 'Invalid password' });
    next();
  };
}
