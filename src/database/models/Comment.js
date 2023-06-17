// Importaciones para la inicialiazacion y configuracion de la tabla
import { DataTypes, Model } from "sequelize";

// Importación de la conexion a la base de datos
import { db } from "../connection.js";

// Definición del modelo Comment
class Comment extends Model { }

// Inicialización del modelo Comment con los atributos de la tabla
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
    sequelize: db, // Conexion a la base de datos
    modelName: 'Comment', // Poniendo nombre al modelo (Comment)
    timestamps: false // Desactivando los campos de timestamps que trae por defecto ("createAt" y "updateAd")
})

// Exportando el modelo Comment
export default Comment;