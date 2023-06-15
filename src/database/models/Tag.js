import { DataTypes, Model } from "sequelize";
import { db } from "../connection.js";
import TaskModel from "./Task.js";

class Tag extends Model{}

Tag.init({
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: db,
    modelName: 'Tag',
    timestamps: false
})

export default Tag;