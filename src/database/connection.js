import { Sequelize } from "sequelize";

const db = new Sequelize('gestion_tareas', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
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