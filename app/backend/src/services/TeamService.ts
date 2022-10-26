import Team from '../database/models/Team';
import ITeamService from '../interfaces/ITeamService';

export default class TeamService implements ITeamService {
  invalidMessage = {
    type: 'error',
    message: 'Error to get teams',
  };

  public getAll = async () => {
    const teams = await Team.findAll();

    if (!teams) return this.invalidMessage;

    return { type: null, message: teams };
  };
}
