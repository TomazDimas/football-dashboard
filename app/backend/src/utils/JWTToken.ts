import { sign, verify } from 'jsonwebtoken';
import IPayload from '../interfaces/IPayload';
import ILogin from '../interfaces/ILogin';

export default class Token {
  static secret = process.env.JWT_SECRET || 'jwt_secret';

  static generateToken = (payload: ILogin) => sign(payload, Token.secret);

  static validateToken = async (token: string): Promise<any> => {
    if (!token) throw new Error('Token não informado');

    try {
      console.log(token, 'JWT UTIL');
      const decoded = verify(token, Token.secret);
      return decoded as IPayload;
    } catch (error) {
      console.log(error);
    }
  };
}
