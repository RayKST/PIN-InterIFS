const sequelize = require("../database");
const Match = require("../models/Match");

Match.init(sequelize)

async function testas(){
    const matches = await Match.findAll();
    console.log(await Match.count())
    console.log(matches);
    return matches
}
async function testasss(){
    const matches = await Match.destroy({
        where: {},
        truncate: true
      });
    return matches
}

console.log(testas().dataValues)
// console.log(testasss());