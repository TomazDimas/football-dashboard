import User from '../database/models/User';

export default class LoginService {
  authLogin = async (email: string, password: string) => {
    if (!email || !password) return { type: 'error', message: 'Some required fields are missing' };

    const user = await User.findOne({ where: { email, password }})
  };
}
