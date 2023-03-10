import LeaderboardUctil from '../utils/LeaderboardUctil';
import AwayLeaderboardUctil from '../utils/AwayLeaderboardUctil';
import HomeLeaderboardUctil from '../utils/HomeLeaderboardUctil';

export default class LeaderboardService {
  public homeUctil = new HomeLeaderboardUctil();
  public awayUctil = new AwayLeaderboardUctil();
  public uctil = new LeaderboardUctil();

  invalidMessage = {
    type: 'error',
    message: 'Error to get ranking',
  };

  getHomeLeaderboard = async () => {
    const ranking = await this.homeUctil.addGoals();

    if (!ranking) return this.invalidMessage;

    return { type: null, message: ranking };
  };

  getAwayLeaderboard = async () => {
    const ranking = await this.awayUctil.addGoals();

    if (!ranking) return this.invalidMessage;

    return { type: null, message: ranking };
  };

  getLeaderboard = async () => {
    const ranking = await this.uctil.addAwayGoals();

    if (!ranking) return this.invalidMessage;

    return { type: null, message: ranking };
  };
}
