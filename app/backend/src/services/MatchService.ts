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
}
