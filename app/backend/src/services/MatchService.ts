import IMatchService from '../interfaces/IMatchService';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

export default class MatchService implements IMatchService {
  invalidMessage = {
    type: 'error',
    message: 'Error to get teams',
  };

  getAll = async () => {
    const matches = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    if (!matches) return this.invalidMessage;

    return { type: null, message: matches };
  };

  getByProgress = async (progress: string) => {
    const progressNum = progress === 'true' ? 1 : 0;
    const matches = await Match.findAll({
      where: { inProgress: progressNum },
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    if (!matches) return this.invalidMessage;

    return { type: null, message: matches };
  };

  create = async (
    homeTeam: string,
    awayTeam: string,
    homeTeamGoals: string,
    awayTeamGoals: string,
  ) => {
    const created = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return { type: null, message: created };
  };

  update = async (id: string) => {
    const updated = await Match.update({ inProgress: 0 }, { where: { id } });
    if (!updated) return this.invalidMessage;

    return { type: null, message: 'Finished' };
  };
}
