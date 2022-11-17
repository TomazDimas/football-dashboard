import IMatchData from '../interfaces/IMatchData';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import IRanking from '../interfaces/IRanking';

export default class LeaderboardUctil {
  public rankingModel = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  public getTeamNames = async (): Promise<string[]> => {
    const teams = await Team.findAll();
    const teamNames = teams.map((teamObject) => teamObject.teamName);
    return teamNames;
  };

  public getMatches = async (): Promise<IMatchData[]> => {
    const matches = await Match.findAll({
      where: { inProgress: 0 },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    const matchResults = matches.map((matchObject) => ({
      id: matchObject.id,
      homeTeam: matchObject.homeTeam,
      homeTeamGoals: matchObject.homeTeamGoals,
      awayTeam: matchObject.awayTeam,
      awayTeamGoals: matchObject.awayTeamGoals,
      inProgress: matchObject.inProgress,
      teamHome: matchObject.teamHome.teamName,
      teamAway: matchObject.teamAway.teamName,
    }));
    return matchResults;
  };

  sortLeaderboard = (leaderboard: IRanking[]) => {
    const sorted = leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return b.goalsOwn - a.goalsOwn;
    });
    return sorted;
  };

  public createLeaderboard = async (): Promise<IRanking[]> => {
    const teams = await this.getTeamNames();
    const ranking = teams.map((teamName) => {
      const newModel = { ...this.rankingModel };
      newModel.name = teamName;
      return newModel;
    });
    return ranking;
  };

  public addHomePoints = async () => {
    const leaderboard = await this.createLeaderboard(); const matches = await this.getMatches();
    const withPoints = leaderboard.map((teamRank) => {
      let totalPoints = 0;
      let totalGames = 0;
      matches.forEach((matchData) => {
        if (teamRank.name === matchData.teamHome) {
          totalGames += 1;
          if (matchData.homeTeamGoals > matchData.awayTeamGoals) totalPoints += 3;
          else if (matchData.homeTeamGoals === matchData.awayTeamGoals) totalPoints += 1;
        }
      });
      const currentTeam = teamRank;
      currentTeam.totalPoints = totalPoints;
      currentTeam.totalGames = totalGames;
      return currentTeam;
    });
    return withPoints;
  };

  public addHomeGames = async () => {
    const leaderboard = await this.addHomePoints();
    const matches = await this.getMatches();
    const withGames = leaderboard.map((teamRank) => {
      let totalVictories = 0; let totalDraws = 0; let totalLosses = 0;
      matches.forEach((matchData) => {
        if (teamRank.name === matchData.teamHome) {
          if (matchData.homeTeamGoals > matchData.awayTeamGoals) totalVictories += 1;
          else if (matchData.homeTeamGoals === matchData.awayTeamGoals) totalDraws += 1;
          else totalLosses += 1;
        }
      });
      const currentTeam = teamRank;
      currentTeam.totalVictories = totalVictories; currentTeam.totalDraws = totalDraws;
      currentTeam.totalLosses = totalLosses;
      return currentTeam;
    });
    return withGames;
  };

  public addHomeGoals = async () => {
    const leaderboard = await this.addHomeGames(); const matches = await this.getMatches();
    const withGoals = leaderboard.map((teamRank) => {
      let goalsFavor = 0; let goalsOwn = 0;
      matches.forEach((matchData) => {
        if (teamRank.name === matchData.teamHome) {
          goalsFavor += matchData.homeTeamGoals; goalsOwn += matchData.awayTeamGoals;
        }
      });
      const currentTeam = teamRank;
      currentTeam.goalsFavor = goalsFavor; currentTeam.goalsOwn = goalsOwn;
      currentTeam.goalsBalance = goalsFavor - goalsOwn;
      currentTeam.efficiency = +((currentTeam.totalPoints / (currentTeam.totalGames * 3)) * 100)
        .toFixed(2);
      return currentTeam;
    });
    console.log(withGoals);
    return withGoals;
  };

  public addAwayPoints = async () => {
    const leaderboard = await this.addHomeGoals(); const matches = await this.getMatches();
    const withPoints = leaderboard.map((teamRank) => {
      let { totalPoints } = teamRank; let { totalGames } = teamRank;
      matches.forEach((matchData) => {
        if (teamRank.name === matchData.teamAway) {
          totalGames += 1;
          if (matchData.awayTeamGoals > matchData.homeTeamGoals) totalPoints += 3;
          else if (matchData.awayTeamGoals === matchData.homeTeamGoals) totalPoints += 1;
        }
      });
      const currentTeam = teamRank;
      currentTeam.totalPoints = totalPoints;
      currentTeam.totalGames = totalGames;
      return currentTeam;
    });
    return withPoints;
  };

  public addAwayGames = async () => {
    const leaderboard = await this.addAwayPoints();
    const matches = await this.getMatches();
    const withGames = leaderboard.map((teamRank) => {
      let { totalVictories } = teamRank; let { totalDraws } = teamRank;
      let { totalLosses } = teamRank;
      matches.forEach((matchData) => {
        if (teamRank.name === matchData.teamAway) {
          if (matchData.awayTeamGoals > matchData.homeTeamGoals) totalVictories += 1;
          else if (matchData.awayTeamGoals === matchData.homeTeamGoals) totalDraws += 1;
          else totalLosses += 1;
        }
      });
      const currentTeam = teamRank;
      currentTeam.totalVictories = totalVictories; currentTeam.totalDraws = totalDraws;
      currentTeam.totalLosses = totalLosses;
      return currentTeam;
    });
    return withGames;
  };

  public addAwayGoals = async () => {
    const leaderboard = await this.addAwayGames(); const matches = await this.getMatches();
    // console.log('LEADERBOARD:', leaderboard);
    const withGoals = leaderboard.map((teamRank) => {
      let { goalsFavor } = teamRank; let { goalsOwn } = teamRank;
      // console.log('TIME:', teamRank, 'GOLS FAVOR:', goalsFavor);
      matches.forEach((matchData) => {
        if (teamRank.name === matchData.teamAway) {
          goalsFavor += matchData.awayTeamGoals; goalsOwn += matchData.homeTeamGoals;
        }
      });
      const currentTeam = teamRank;
      currentTeam.goalsFavor = goalsFavor; currentTeam.goalsOwn = goalsOwn;
      currentTeam.goalsBalance = goalsFavor - goalsOwn;
      currentTeam.efficiency = +((currentTeam.totalPoints / (currentTeam.totalGames * 3)) * 100)
        .toFixed(2);
      return currentTeam;
    });
    return this.sortLeaderboard(withGoals);
  };
}
