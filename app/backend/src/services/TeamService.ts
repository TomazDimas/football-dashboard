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

  public getOne = async (id: string) => {
    const team = await Team.findByPk(id);

    if (!team) return this.invalidMessage;

    return { type: null, message: team };
  };
}
