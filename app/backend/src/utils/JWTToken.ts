import { sign, verify } from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';

export default class Token {
  static secret = process.env.JWT_SECRET || 'jwt_secret';

  static generateToken = (payload: ILogin) => sign(payload, Token.secret);

  static validateToken = async (token: string):Promise<string> => {
    if (!token) throw new Error('Token não informado');

    try {
      const decoded = verify(token, Token.secret);
      return decoded as string;
    } catch (error) {
      throw new Error('Falha em verificar Token.');
    }
  };
}
