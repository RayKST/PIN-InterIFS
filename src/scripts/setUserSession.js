import { sequelize } from '../database/index.js';
import User from '../models/User.js';

User.init(sequelize);

async function setUserSession (userID){
    const user = await User.findOne({
        where: {
            id: userID
        }
    })

    return user.dataValues;
};

export default setUserSession;