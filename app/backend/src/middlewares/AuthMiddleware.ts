import { NextFunction, Request, Response } from 'express';
// import IRequest from '../interfaces/IRequest';
import Token from '../utils/JWTToken';

export default class AuthMiddleware {
  static validate = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    try {
      const decoded = await Token.validateToken(authorization);
      req.body.payload = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}
