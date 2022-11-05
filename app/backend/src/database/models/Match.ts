import { INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Match.belongsTo(Team, {
  foreignKey: 'homeTeam', as: 'teamHome',
});
Match.belongsTo(Team, {
  foreignKey: 'awayTeam', as: 'teamAway',
});

Team.hasMany(Match, {
  foreignKey: 'homeTeam', as: 'awayMatch',
});
Team.hasMany(Match, {
  foreignKey: 'awayTeam', as: 'homeMatch',
});

export default Match;
