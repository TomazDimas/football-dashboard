import Bcrypt from '../utils/Bcrypt';
import User from '../database/models/User';
import Token from '../utils/JWTToken';
import IService from '../interfaces/IService';

export default class LoginService implements IService {
  public authLogin = async (email: string, password: string) => {
    const hash = Bcrypt.encrypt(password);
    console.log('hash', hash);
    const user = await User.findOne({ where: { email } });

    const invalidMessage = { type: 'error', message: 'Incorrect email or password' };

    if (!user) return invalidMessage;

    if (!Bcrypt.checkPassword(password, user.password)) {
      return invalidMessage;
    }

    const payload = {
      email,
      password: hash,
    };
    const token = Token.generateToken(payload);
    return { type: null, message: token };
  };
}
