import express from "express";
import { getAllTaskComment, getTaskComment, createTaskComment, editTaskComment, deleteTaskComment } from "../../controllers/commentController.js"
import { validateGetTask, validateGetTaskComment } from "../../configurations/validationRules.js";

const router = express.Router();

router.get("/tasks/:taskId/comments", getAllTaskComment);
router.get("/tasks/:taskId/comments/:commentId", validateGetTaskComment, getTaskComment);
router.post("/tasks/:taskId/comments", validateGetTask, createTaskComment);
router.put("/tasks/:taskId/comments/:commentId",validateGetTaskComment, editTaskComment);
router.delete("/tasks/:taskId/comments/:commentId", validateGetTaskComment, deleteTaskComment);

export default router;