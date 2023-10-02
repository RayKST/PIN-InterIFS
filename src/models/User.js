const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize){
        super.init({
            // id: DataTypes.INTEGER,
            login: DataTypes.STRING,
            password: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
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
module.exports = User;