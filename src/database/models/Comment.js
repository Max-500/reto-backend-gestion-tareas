import { DataTypes, Model } from "sequelize";
import { db } from "../connection.js";

class Comment extends Model { }

Comment.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Comment',
    timestamps: false
})

export default Comment;