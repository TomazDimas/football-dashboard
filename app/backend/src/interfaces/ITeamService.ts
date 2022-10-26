import Team from '../database/models/Team';

export default interface ITeamService {
  getAll(): Promise<
  { type: string; message: string } | { type: null; message: Team[] }
  >;
}
