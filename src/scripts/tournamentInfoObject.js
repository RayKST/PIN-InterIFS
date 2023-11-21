import {sequelize} from '../database/index.js'
import Match from '../models/Match.js'

Match.init(sequelize)

async function returnTournamentInfoObject (tournamentID){
  const match = await Match.findAll({
    where:{
      tournamentID: tournamentID
    }
  })
  
  return match;
}

export default returnTournamentInfoObject;