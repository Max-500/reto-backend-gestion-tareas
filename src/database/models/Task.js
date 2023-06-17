// Importaciones para la inicialiazacion y configuracion de la tabla
import { DataTypes, Model } from "sequelize";

// Importación de la conexion a la base de datos
import { db } from "../connection.js";

// Definición del modelo Task
class Task extends Model { }

// Inicialización del modelo Task con los atributos de la tabla
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
    sequelize: db, // Conexion a la base de datos
    modelName: 'Task', // Poniendo nombre al modelo (Task)
    timestamps: false // Desactivando los campos de timestamps que trae por defecto ("createAt" y "updateAd")
})

// Exportando el modelo Task
export default Task;