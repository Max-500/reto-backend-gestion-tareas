// Importación de express
import express from "express";

// Importaciones de todos los middlewares de (Reglas de validación) para las rutas de las tareas
import { validateGetTask, validateCreateTask, updateTask } from "../../configurations/validationRules.js";

// Importaciones de todos los middlewares (Controladores) para la ruta de las tareas
import { getAllTask, getTask, createTask, editTask, deleteTask } from "../../controllers/taskController.js";

const router = express.Router();

// Ruta que trae informacion breve de todas las tareas id, título, descripcion, status, dia de vigencia y responsable de la tarea
router.get("/tasks", getAllTask);

// Ruta que trae toda la unformacion de una tarea (del id especificado de la url) incluyendo etiquetas y comentarios
router.get("/tasks/:taskId",validateGetTask, getTask);

// Ruta que permite crear una tarea id, título, descripción, status, dia de vigencia, responsable y etiquetas
router.post("/tasks", validateCreateTask , createTask);

// Ruta que permite actualizar una tarea (del id especificado de la url) id, título, descripción, status, dia de vigencia, responsable y etiquetas
router.put("/tasks/:taskId", updateTask, editTask);

// Ruta que permite borrar la tarea (del id especificado de la url) junto a las etiquetas y comentarios de esa actividad
router.delete("/tasks/:taskId", validateGetTask, deleteTask);

// Exportacion de la ruta de las tareas
export default router;