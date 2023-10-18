const TeamSport = require('../models/TeamSport')
const User = require('../models/User')
const Sport = require('../models/Sport')
const Team = require('../models/Team')

async function returnTeamInfoObject (){
    var sportID = 0;
    var sportName = '';
    const Infos = [];

    const teams = await Team.findAll().then()
    teams.forEach(async(element) => {
        const teamSport = await TeamSport.findOne({where:{
            teamID: element.dataValues.id,
        }});

        if (teamSport){
            const mainSport = await Sport.findOne({where:{
                id: teamSport.dataValues.sportID,
            }});
            sportID = mainSport.dataValues.id;
            sportName = mainSport.dataValues.name;
        }

        const teamMembers = await User.count({where:{
                teamID: element.dataValues.id,
        }});

        Infos.push({
            teamID: element.dataValues.id,
            sportID: sportID,
            sportName: sportName,
            totalMembers: teamMembers,
        })
    })
    console.log(Infos)
    return Promise.resolve({teams, Infos});
};



module.exports = returnTeamInfoObject;