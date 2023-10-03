const User = require('../models/User');

async function enterTeam (teamID, userID){
    //User.init(sequelize);
    // console.log(teamID)
    // console.log(userID)
    await User.update({teamID: teamID}, {where:{
        id: userID // req.session.user.id
    }});
};

// document.getElementsByTagName("button").item().addEventListener("click", enterTeam(3, 1), false);