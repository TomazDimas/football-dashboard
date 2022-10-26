export default interface IService {
  authLogin(
    email: string,
    password: string
  ): Promise<{ type: string; message: string } | { type: null; message: string }>;

  getAll(
    email: string,
  ): Promise<{ type: string; message: string } | { type: null; message: string }>;
}
