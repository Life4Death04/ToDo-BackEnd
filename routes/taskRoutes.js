import express from 'express';
import { createTaskController, deleteTaskByIdController, getAllTasksController, getTaskByIdController, toggleTaskStateController } from "../controllers/taskControllers.js";

const taskRoutes = express.Router();

taskRoutes.post('/create', createTaskController);
taskRoutes.get('/findTask/:authorId', getAllTasksController);
taskRoutes.get('/findTask/:authorId/:taskId', getTaskByIdController);
taskRoutes.patch('/handleState/:authorId/:taskId', toggleTaskStateController);
taskRoutes.delete('/deleteTask/:authorId/:taskId', deleteTaskByIdController);

export default taskRoutes;