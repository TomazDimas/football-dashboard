import { genSaltSync, compareSync, hashSync } from 'bcryptjs';

export default class Bcrypt {
  static salt = genSaltSync();

  static encrypt = (password: string) => hashSync(password, Bcrypt.salt);

  static checkPassword = (password: string, hash: string) => compareSync(password, hash);
}
