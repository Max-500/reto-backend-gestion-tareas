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
    case "Bad Request":
      return res.status(400).json(allTask);

    case "No Content":
      return res.status(204).json(allTask);

    case "Ok":
      return res.status(200).json(allTask);

    default:
      return res.status(404).json({
        status: "Not Found",
        message: "El recurso no pudo ser encontrado",
      });
  }
};

const getTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let id = req.params.taskId;
  let task = await getTaskService(id);

  if (task["status"] === "Not Found") {
    return res.status(404).json(task);
  }

  return res.status(200).json(task);
};

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let newTask = await createTaskService(req.body);
  if (newTask["status"] === "Bad Request") {
    return res.status(400).json(newTask);
  }

  return res.status(201).json(newTask);
};

const editTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const taskId = req.params.taskId; // Obtengo el ID del parámetro de la URL
  const updatedTaskData = req.body; // Obtengo los datos actualizados del cuerpo de la solicitud

  let updateTask = await updateTaskService(taskId, updatedTaskData); // Instancio el servicio para actualizar el registro

  if (updateTask["status"] === "Bad Request") {
    return res.status(400).json(updateTask);
  }

  if (updateTask["status"] === "Not Found") {
    return res.status(404).json(updateTask);
  }

  return res.status(200).json(updateTask);
};

const deleteTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let deleteTask = await deleteTaskService(req.params.taskId);

  if (deleteTask["status"] === "Bad Request") {
    return res.status(400).json(deleteTask);
  }

  if (deleteTask["status"] === "Not Found") {
    return res.status(404).json(deleteTask);
  }

  return res.status(200).json(deleteTask);
};

export { getAllTask, getTask, createTask, editTask, deleteTask };
