import { validationResult } from "express-validator";
import {
  getTaskCommentService,
  getAllTaskCommentService,
  updateTaskCommentService,
  createTaskCommentService,
  deleteTaskCommentService,
} from "../services/commentService.js";

// Controlador para traer todos los comentarios de una tarea especificada
const getAllTaskComment = async (req, res) => {
  let validated = validate(req);

  if (validated !== null || !validated === undefined) {
    let taskId = req.params.taskId;

    let allTaskComment = await getAllTaskCommentService(taskId);

    switch (allTaskComment["status"]) {
      case "Ok":
        return res.status(200).json(allTaskComment);

      case "No Content":
        return res.status(200).json(allTaskComment);

      case "Bad Request":
        return res.status(400).json(allTaskComment);

      default:
        return res.status(500).json({
          status: "Internal Server Error",
          message: "Algo malo sucedio en el servidor",
        });
    }
  }

  return res.status(400).json({
    status: "Bad Request",
    errors: validated["errors"],
  });
};

// Controlador para traer algun comentario en especifico de una tarea en especifico
const getTaskComment = async (req, res) => {
  let validated = validate(req);

  if (validated !== null || validated === undefined) {
    let taskId = req.params.taskId;
    let commentId = req.params.commentId;
    let getComment = await getTaskCommentService(taskId, commentId);
    switch (getComment["status"]) {
      case "Ok":
        return res.status(200).json(getComment);

      case "Not Found":
        return res.status(404).json(getComment);

      default:
        return res.status(500).json({
          status: "Internal Server Error",
          message: "Algo malo sucedio en el servidor",
        });
    }
  }

  return res.status(400).json({
    status: "Bad Request",
    errors: validated["errors"],
  });
};

// Controlador para crear un comentario de una tarea en especifico
const createTaskComment = async (req, res) => {
  let validated = validate(req, res);

  if (validated !== null || validated === undefined) {
    let taskId = req.params.taskId;
    let newComment = await createTaskCommentService(taskId, req.body);
    switch (newComment["status"]) {
      case "Created":
        return res.status(201).json(newComment);

      case "Bad Request":
        return res.status(400).json(newComment);

      case "Not Found":
        return res.status(404).json(newComment);

      default:
        return res.status(500).json({
          status: "Internal Server Error",
          message: "Algo malo sucedio en el servidor",
        });
    }
  }

  return res.status(400).json({
    status: "Bad Request",
    errors: validated["errors"],
  });
};

// Controlador para actualizar un comentario en especifico de una tarea especificada
const editTaskComment = async (req, res) => {
  let validated = validate(req, res);

  if (validated !== null || validated === undefined) {
    let taskId = req.params.taskId;
    let commentId = req.params.commentId;
    let updateComment = await updateTaskCommentService(
      taskId,
      commentId,
      req.body
    );
    switch (updateComment["status"]) {
      case "Ok":
        return res.status(200).json(updateComment);

      case "Bad Request":
        return res.status(400).json(updateComment);

      case "Not Modified":
        return res.status(304).json(updateComment);

      default:
        return res.status(500).json({
          status: "Internal Server Error",
          message: "Algo malo sucedio en el servidor",
        });
    }
  }

  return res.status(400).json({
    status: "Bad Request",
    errors: validated["errors"],
  });
};

// Controlador para eliminar un comentario de una tarea 
const deleteTaskComment = async (req, res) => {
  let validated = validate(req);

  if (validated !== null || validated === undefined) {
    let taskId = req.params.taskId;
    let commentId = req.params.commentId;
    let deleteComment = await deleteTaskCommentService(taskId, commentId);
    switch (deleteComment["status"]) {
      case "Ok":
        return res.status(200).json(deleteComment);

      case "Bad Request":
        return res.status(400).json(deleteComment);

      case "Not Found":
        return res.status(404).json(deleteComment);

      default:
        return res.status(500).json({
          status: "Internal Server Error",
          message: "Algo malo sucedio en el servidor",
        });
    }
  }

  return res.status(400).json({
    status: "Bad Request",
    errors: validated["errors"],
  });
};

// Funcion provisional para el manejo de las reglas de validación
function validate(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return {
      errors: errors.array(),
    };
  }
}

// Exportaciones de todos los controladores de los comentarios
export {
  getAllTaskComment,
  getTaskComment,
  createTaskComment,
  editTaskComment,
  deleteTaskComment,
};
