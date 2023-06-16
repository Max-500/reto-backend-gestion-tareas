import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config()

const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    define: {
        strict: true
    }
})

db.authenticate()
    .then(()=>{
        console.log("Conectado a la BDD")
    })
    .catch((error)=> {
        console.log("El error de la base de datos es: " + error)
    })

export { db }