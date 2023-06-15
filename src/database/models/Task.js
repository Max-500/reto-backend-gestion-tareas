import { DataTypes, Model } from "sequelize";
import { db } from "../connection.js";

class Task extends Model { }

Task.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('En Progreso', 'Terminada'),
        allowNull: false
    },
    effective_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    responsible: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Task',
    timestamps: false
})

export default Task;