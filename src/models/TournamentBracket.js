import { Model, DataTypes } from 'sequelize'

class TournamentBracket extends Model {
    static init(sequelize){
        super.init({
            tournamentID: DataTypes.INTEGER,
            teamID: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },{
            sequelize,
            tableName: "tournamentbracket"
        }
        )
    }
}
async()=>{
    await TournamentBracket.sync()
}
export default TournamentBracket;