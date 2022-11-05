import LeaderboardUctil from '../utils/LeaderboardUctil';

export default class LeaderboardService {
  public uctil = new LeaderboardUctil();

  invalidMessage = {
    type: 'error',
    message: 'Error to get ranking',
  };

  getHomeLeaderboard = async () => {
    const ranking = await this.uctil.addGoals();

    if (!ranking) return this.invalidMessage;

    return { type: null, message: ranking };
  };
}
