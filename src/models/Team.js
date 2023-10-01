const { Model, DataTypes } = require('sequelize')

class Team extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            numberOfMembers: DataTypes.INTEGER,
        },{
            sequelize
        }
        )
    }
}

module.exports = Team;