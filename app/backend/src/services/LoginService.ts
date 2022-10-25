import Bcrypt from '../utils/Bcrypt';
import User from '../database/models/User';
import Token from '../utils/JWTToken';
import IService from '../interfaces/IService';

export default class LoginService implements IService {
  public authLogin = async (email: string, password: string) => {
    const hash = Bcrypt.encrypt(password);

    const user = await User.findOne({ where: { email, password: hash } });
    if (!user) return { type: 'error', message: 'User does not exists' };

    const payload = {
      email,
      password: hash,
    };
    const token = Token.generateToken(payload);
    return { type: null, message: token };
  };
}
