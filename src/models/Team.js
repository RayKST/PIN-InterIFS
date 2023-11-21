import { Model, DataTypes } from 'sequelize'

class Team extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            numberOfMembers: DataTypes.INTEGER,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
            creatorID: DataTypes.INTEGER,
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

export default Team;