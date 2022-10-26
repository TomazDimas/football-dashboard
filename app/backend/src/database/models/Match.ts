import { INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  id: number;
  teamName: string;
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
  foreignKey: 'homeTeam', as: 'commandTeam',
});
Match.belongsTo(Team, {
  foreignKey: 'awayTeam', as: 'visitingTeam',
});

Team.hasMany(Match, {
  foreignKey: 'homeTeam', as: 'awayMatch',
});
Team.hasMany(Match, {
  foreignKey: 'awayTeam', as: 'homeMatch',
});

export default Match;
