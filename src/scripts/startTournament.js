const Team = require('../models/Team');
const TournamentBracket = require('../models/TournamentBracket');
const Match = require('../models/Match');
const sequelize = require('../database');

Team.init(sequelize);
TournamentBracket.init(sequelize);
Match.init(sequelize);

async function startTournament (tournamentID){

    const tournamentBracket = await TournamentBracket.findAll({
        where:{
        tournamentID: tournamentID
        }
    })

    var previousTeam = null;

    await Promise.all(tournamentBracket.map(async (bracket, index) => {
        const team = await Team.findOne({
            where:{
                id: bracket.dataValues.teamID
            }
        });
        if ((index + 1) % 2 == 0){
            const match = await Match.create({
                tournamentID: tournamentID,
                teamOne: team.dataValues.id,
                teamTwo: previousTeam,
                matchStatus: "Iniciado",
                matchLevel: 0,
            });
        }else{
            previousTeam = team.dataValues.id;
        }
    }));

    return true;
}

module.exports = startTournament;