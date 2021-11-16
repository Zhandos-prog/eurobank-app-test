import sequelize from "../services/db.js";
import DataTypes from "sequelize"

const File = sequelize.define('files',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fileName: {type: DataTypes.STRING, unique: true, allowNull: false},
})

export default File;
