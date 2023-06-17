import { validationResult } from "express-validator";
import {
  getAllTaskService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/taskService.js";

// Controlador que trae informacion breve de todas las tareas
const getAllTask = async (req, res) => {
  let allTask = await getAllTaskService();

  switch (allTask["status"]) {
    case "Ok":
      return res.status(200).json(allTask);

    case "No Content":
      return res.status(200).json(allTask);

    case "Bad Request":
      return res.status(400).json(allTask);

    default:
      return res.status(500).json({
        status: "Internal Server Error",
        message: "Algo malo sucedio en el servidor",
      });
  }
};

// Controlador que trae toda la informacion de una tarea en especifico (tambien trae las etiquetas y comentarios de esa tarea)
const getTask = async (req, res) => {
  let validated = validate(req, res);
  if (validated !== null || validated === undefined) {
    let id = req.params.taskId;
    let task = await getTaskService(id);

    switch (task["status"]) {
      case "Ok":
        return res.status(200).json(task);

      case "Not Found":
        return res.status(404).json(task);

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

// Controlador que crea una tarea (tambien es opcional si quieres agregar etiquetas)
const createTask = async (req, res) => {
  let validated = validate(req, res);
  if (validated !== null || validated === undefined) {
    let tagArray = req.body["tags"];
    delete req.body["tags"]

    let newTask = await createTaskService(req.body, tagArray);

    switch (newTask["status"]) {
      case "Created":
        return res.status(201).json(newTask);

      case "Bad Request":
        return res.status(400).json(newTask);

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

// Controlador que permite editar lo relacionado a una tarea, como la tarea y etiquetas de la tarea
const editTask = async (req, res) => {
  let validated = validate(req, res);
  if (validated !== null || validated === undefined) {
    const updatedTaskTagData = req.body.tags
    delete req.body["tags"];
    const taskId = req.params.taskId; // Obtengo el ID del parámetro de la URL
    const updatedTaskData = req.body; // Obtengo los datos actualizados del cuerpo de la solicitud
    let updateTask = await updateTaskService(taskId, updatedTaskData, updatedTaskTagData); // Instancio el servicio para actualizar el registro

    switch (updateTask["status"]) {
      case "Ok":
        return res.status(200).json(updateTask);

      case "Bad Request":
        return res.status(400).json(updateTask);

      case "Not Modified":
        return res.status(200).json(updateTask);

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

// Controlador que elimina todo la tarea y lo relacionado a esta (incluye las etiquetas de la tarea y comentarios de esta)
const deleteTask = async (req, res) => {
  let validated = validate(req, res);
  if (validated !== null || validated === undefined) {
    let deleteTask = await deleteTaskService(req.params.taskId);

    switch (deleteTask["status"]) {
      case "Ok":
        return res.status(200).json(deleteTask);

      case "Bad Request":
        return res.status(400).json(deleteTask);

      case "Not Found":
        return res.status(404).json(deleteTask);

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

// Funcion provision para el manejo de errores
function validate(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return {
      errors: errors.array(),
    };
  }
}

// Exportaciones de los controladores de las tareas
export { getAllTask, getTask, createTask, editTask, deleteTask };
