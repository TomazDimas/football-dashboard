import Bcrypt from '../utils/Bcrypt';
import User from '../database/models/User';
import Token from '../utils/JWTToken';
import IService from '../interfaces/ILoginService';

export default class LoginService implements IService {
  invalidMessage = {
    type: 'error',
    message: 'Incorrect email or password',
  };

  public authLogin = async (email: string, password: string) => {
    const hash = Bcrypt.encrypt(password);
    const user = await User.findOne({ where: { email } });

    if (!user) return this.invalidMessage;

    if (!Bcrypt.checkPassword(password, user.password)) {
      return this.invalidMessage;
    }

    const payload = {
      email,
      password: hash,
    };
    const token = Token.generateToken(payload);
    return { type: null, message: token };
  };

  public getAll = async (email: string) => {
    const userRole = await User.findOne({ where: { email } });

    if (!userRole) return this.invalidMessage;

    return { type: null, message: userRole.role };
  };
}
