import Match from '../database/models/Match';

export default interface IMatchService {
  getAll(): Promise<
  { type: string; message: string } | { type: null; message: Match[] }
  >;

  getByProgress(progress: string): Promise<
  { type: string; message: string } | { type: null; message: Match[] }
  >;

  create (
    homeTeam: string,
    awayTeam: string,
    homeTeamGoals: string,
    awayTeamGoals: string,
  ): Promise<{ type: null; message: Match }>;

  update(id: string): Promise<
  { type: string; message: string } | { type: null; message: string }
  >;
}
