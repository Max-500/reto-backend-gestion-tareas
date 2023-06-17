import { validationResult } from "express-validator";
import {
  getAllTaskService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/taskService.js";

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

function validate(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return {
      errors: errors.array(),
    };
  }
}

export { getAllTask, getTask, createTask, editTask, deleteTask };
