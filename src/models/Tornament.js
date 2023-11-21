import { Model, DataTypes } from 'sequelize'

class Tornament extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            numberOfTeams: DataTypes.INTEGER,
            teamsTornament: DataTypes.BOOLEAN,
            startTornament: DataTypes.DATE,
            endTornament: DataTypes.DATE,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },{
            sequelize,
            tableName: "tornament"
        }
        )
    }
}
async()=>{
    await Tornament.sync()
}

export default Tornament;
// module.exports = Tornament;