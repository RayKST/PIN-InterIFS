import { Model, DataTypes } from 'sequelize'

class User extends Model {
    static init(sequelize){
        super.init({
            // id: DataTypes.INTEGER,
            login: DataTypes.STRING,
            password: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
            teamID: DataTypes.INTEGER,
        },{
            sequelize,
            tableName: "users"
        }
        )
    }
}
async()=>{
 await User.sync()
}

export default User;