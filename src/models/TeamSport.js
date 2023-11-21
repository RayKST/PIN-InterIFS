import { Model, DataTypes } from 'sequelize'

class TeamSports extends Model {
    static init(sequelize){
        super.init({
            sportID: DataTypes.INTEGER,
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

export default TeamSports;