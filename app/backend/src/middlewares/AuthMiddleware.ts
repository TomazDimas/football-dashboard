import { NextFunction, Response } from 'express';
import IRequest from '../interfaces/IRequest';
import Token from '../utils/JWTToken';

export default class AuthMiddleware {
  validate = async (req: IRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });
    try {
      const decoded = await Token.validateToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Expired or invalid token' });
    }
  };
}
