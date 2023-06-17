// Importación de express
import express from "express";

// Importaciones de todos los middlewares de (Reglas de validación) para las rutas de los comentario
import { validateGetTask, validateGetTaskComment } from "../../configurations/validationRules.js";

// Importaciones de todos los middlewares (Controladores) para la ruta de los comentarios
import { getAllTaskComment, getTaskComment, createTaskComment, editTaskComment, deleteTaskComment } from "../../controllers/commentController.js"

const router = express.Router();

// Ruta que trae todos los comentario de la tarea especificada (del id que se pasa por la url)
router.get("/tasks/:taskId/comments", getAllTaskComment);

// Ruta que trae el comentario especificado (:commentId) de la tarea especificada (:taskId)
router.get("/tasks/:taskId/comments/:commentId", validateGetTaskComment, getTaskComment);

// Ruta que crea un comentario a la tarea especificada (del id que se le pasa por la url)
router.post("/tasks/:taskId/comments", validateGetTask, createTaskComment);

// Ruta que permite actualizar un comentario en especifico de una tarea en especifico (de los IDs que se pasan por la url)
router.put("/tasks/:taskId/comments/:commentId",validateGetTaskComment, editTaskComment);

// Ruta que permite borrar un comentario en especifico de una tarea especificada (de los IDs que se pasan por la url)
router.delete("/tasks/:taskId/comments/:commentId", validateGetTaskComment, deleteTaskComment);

// Exportación de las rutas de los comentarios
export default router;