import express from 'express';
import { createTaskController, deleteTaskByIdController, fetchUserTodosController, getAllTasksController, getTaskByIdController, toggleTaskStateController } from "../controllers/taskControllers.js";
import { authMiddleware } from '../middlewares/auth.js';

const taskRoutes = express.Router();

taskRoutes.post('/create', createTaskController);
taskRoutes.get('/findTask/:authorId', getAllTasksController);
taskRoutes.get('/findTask/:authorId/:taskId', getTaskByIdController);
taskRoutes.patch('/handleState/:authorId/:taskId', toggleTaskStateController);
taskRoutes.delete('/deleteTask/:authorId/:taskId', deleteTaskByIdController);

//Protected Task Routes - All protected functions are functions that has to be requested using the API (rout) protected
taskRoutes.get('/:userId', authMiddleware, fetchUserTodosController)

export default taskRoutes;