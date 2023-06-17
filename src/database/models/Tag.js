// Importaciones para la inicialiazacion y configuracion de la tabla
import { DataTypes, Model } from "sequelize";

// Importación de la conexion de la base de datos
import { db } from "../connection.js";

// Definición del modelo Tag
class Tag extends Model{}

// Inicialización del modelo Tag con los atributos de la tabla
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
    sequelize: db, // Conexion a la base de datos 
    modelName: 'Tag', // Poniendo el nombre al modelo (Tag)
    timestamps: false // Desactivando los campos de timestamps que trae por defecto ("createAt" y "updateAd")
})

// Exportando el modelo Tag
export default Tag;