const sequelize = require('../database');
const Match = require('../models/Match')

Match.init(sequelize)

async function returnTournamentInfoObject (tournamentID){
   const match = await Match.findAll({
    where:{
      tournamentID: tournamentID
    }
   })
  
  return match;
}

module.exports = returnTournamentInfoObject;