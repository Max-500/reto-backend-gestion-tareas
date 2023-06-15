import express from "express";
import { getAllTask, getTask, createTask, editTask, deleteTask } from "../../controllers/taskController.js";
import { validateGetTask, validateCreateTask, updateTask } from "../../configurations/validationRules.js";

const router = express.Router();

router.get("/tasks", getAllTask);
router.get("/tasks/:taskId",validateGetTask, getTask);
router.post("/tasks", validateCreateTask , createTask);
router.put("/tasks/:taskId", updateTask, editTask);
router.delete("/tasks/:taskId", validateGetTask, deleteTask);


export default router;