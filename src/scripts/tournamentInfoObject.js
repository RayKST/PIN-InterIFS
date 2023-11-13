const Team = require('../models/Team')
const TournamentBracket = require('../models/TournamentBracket')

async function returnTournamentInfoObject (tournamentID){
    const tournamentBracket = await TournamentBracket.findAll({
        where:{
          tournamentID: tournamentID
        }
      })

    const allTeamsData = []

    await Promise.all(tournamentBracket.map(async (bracket) => {
        const team = await Team.findOne({
            where:{
            id: bracket.dataValues.teamID
            }
        })
        allTeamsData.push(team.dataValues)
      })
    )

    return allTeamsData;
}

module.exports = returnTournamentInfoObject;