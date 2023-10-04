const Sport = require('../models/Sport')
const sequelize = require('../database/index')

Sport.init(sequelize)

async function CreateSport(){
    const sport = await Sport.create({
        name: 'Basquete',
        description: 'O verdadeiro maior esporte do globo',
        numberOfPlayers: 5
    });
    if (!sport){
        console.log("Erro ao criar novo esporte.")
    } else{
        console.log("Esporte criado: ", sport.dataValues)
    }
}

CreateSport()