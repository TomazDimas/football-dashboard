import Match from '../database/models/Match';

export default interface IMatchService {
  getAll(): Promise<
  { type: string; message: string } | { type: null; message: Match[] }
  >;
}
