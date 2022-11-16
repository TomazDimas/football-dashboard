import IRanking from './IRanking';

export default interface ILeaderboardService {
  getHomeLeaderboard(): Promise<
  { type: string; message: string } | { type: null; message: IRanking[] }
  >;

  getAwayLeaderboard(): Promise<
  { type: string; message: string } | { type: null; message: IRanking[] }
  >;

}
