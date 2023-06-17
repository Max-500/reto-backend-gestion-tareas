// Importación de express y dotenv
import express from "express";
import dotenv from "dotenv";

// Importacin de las rutas de las tareas y comentarios
import taskRoutes from "./v1/routes/taskRoutes.js";
import commentRoutes from "./v1/routes/commentRoutes.js";

// Importación del middleware para limitar la API
import limiter from "./configurations/rateLimiter.js";

// Importación del archivo asociations.js para la creacion de las tablas en dado caso que no esten creadas
import "./database/asociations.js";

// Cargo las variables de entorno del archivo .env
dotenv.config();

const app = express();

// Parsear cuerpos JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aplicar limite de peticiones para que la API no sea tirada por exceso de solicitudes
app.use(limiter);

// Ruta para las tareas y tags al mismo tiempo ya que una tarea al crearse se puede añadir tags y los comentarios se hacen despues de que ya se
// realizo la tarea
app.use("/api/v1", taskRoutes);

// Ruta para los comentarios
app.use("/api/v1", commentRoutes);

// Esperamos el valor de nuestro env y en dado caso que no este se levanta en el puerto 3000
const port = process.env.PORT || 3000;

// Ponemos a la escucha a express
app.listen(port, (error) => {
  if (error) {
    console.log(`Error starting the server: ${error}`);
  } else {
    console.log(`Server listening on http://127.0.0.1:${port}`);
  }
});
