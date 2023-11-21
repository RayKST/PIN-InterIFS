import { Model, DataTypes } from 'sequelize'

class Sport extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            numberOfPlayers: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },{
            sequelize,
            tableName: "sports"
        }
        )
    }
}
async()=>{
    await Sport.sync()
}
export default Sport;