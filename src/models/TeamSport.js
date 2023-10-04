const { Model, DataTypes } = require('sequelize')

class TeamSports extends Model {
    static init(sequelize){
        super.init({
            sportID: DataTypes.UUIDV4,
            teamID: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },{
            sequelize,
            tableName: "teamsports"
        }
        )
    }
}
async()=>{
    await TeamSports.sync()
}
module.exports = TeamSports;