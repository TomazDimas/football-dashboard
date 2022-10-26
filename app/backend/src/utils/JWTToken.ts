import { sign, verify } from 'jsonwebtoken';
import IPayload from '../interfaces/IPayload';
import ILogin from '../interfaces/ILogin';

export default class Token {
  static secret = process.env.JWT_SECRET || 'jwt_secret';

  static generateToken = (payload: ILogin) => sign(payload, Token.secret);

  static validateToken = async (token: string): Promise<IPayload> => {
    if (!token) throw new Error('Token não informado');

    try {
      const decoded = verify(token, Token.secret);
      return decoded as IPayload;
    } catch ({ message }) {
      throw new Error(message as string);
    }
  };
}
