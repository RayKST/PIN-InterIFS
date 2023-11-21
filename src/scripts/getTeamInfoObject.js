import TeamSport from '../models/TeamSport.js'
import User from '../models/User.js'
import Sport from '../models/Sport.js'
import Team from '../models/Team.js'

async function returnTeamInfoObject() {
    var sportID = 0;
    var sportName = '';
    const Infos = [];

    const teams = await Team.findAll();

    await Promise.all(teams.map(async (element) => {
        const teamSport = await TeamSport.findOne({
            where: {
                teamID: element.dataValues.id,
            },
        });

        if (teamSport) {
            const mainSport = await Sport.findOne({
                where: {
                    id: teamSport.dataValues.sportID,
                },
            });
            sportID = mainSport.dataValues.id;
            sportName = mainSport.dataValues.name;
        }

        const teamMembers = await User.count({
            where: {
                teamID: element.dataValues.id,
            },
        });
        
        const teamCreator = (element.dataValues.creatorID ? await User.findOne({
            where: {
                id: element.dataValues.creatorID,
            },
        }) : '');

        Infos.push({
            teamID: element.dataValues.id,
            sportID: sportID,
            creatorID: (element.dataValues.creatorID ? teamCreator.dataValues.id : null),
            sportName: sportName,
            creatorName: (element.dataValues.creatorID ? teamCreator.dataValues.login : teamCreator),
            totalMembers: teamMembers,
        });
    }));

    return { teams, Infos };
}



export default returnTeamInfoObject;