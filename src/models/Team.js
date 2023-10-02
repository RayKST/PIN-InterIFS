const { Model, DataTypes } = require('sequelize')

class Team extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            numberOfMembers: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },{
            sequelize,
            tableName: "teams"
        }
        )
    }
}
async()=>{
    await Team.sync()
}
module.exports = Team;