// Importación de Sequelize para la conexion a la base de datos
import { Sequelize } from "sequelize";

// Importación de dotenv para leer las variables de entorno .env
import dotenv from "dotenv";

// Cargo las variables de entorno del archivo .env
dotenv.config()

// Configuracion para la conexcion a la base de datos
const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    define: {
        strict: true
    }
})

// Autenticando la conexion a la base de datos
db.authenticate()
    .then(()=>{
        console.log("Conectado a la BDD")
    })
    .catch((error)=> {
        console.log("El error de la base de datos es: " + error)
    })

// Exportando la conexion de la base de datos
export { db }