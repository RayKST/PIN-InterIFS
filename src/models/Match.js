import { Model, DataTypes } from 'sequelize';

class Match extends Model {
    static init(sequelize){
        super.init({
            tournamentID: DataTypes.INTEGER,
            teamOne: DataTypes.INTEGER,
            teamTwo: DataTypes.INTEGER,
            pointsTeamOne: DataTypes.FLOAT,
            pointsTeamTwo: DataTypes.FLOAT,
            matchStatus: DataTypes.STRING,
            matchLevel: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },{
            sequelize,
            tableName: "match"
        }
        )
    }
}
async()=>{
    await Match.sync()
}
export default Match;