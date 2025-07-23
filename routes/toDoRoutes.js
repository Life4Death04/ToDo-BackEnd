import express from 'express';
import { createTaskController, deleteTaskByIdController, getAllTasksController, getTaskByIdController, toggleTaskStateController } from "../controllers/toDoControllers.js";

const toDoRoutes = express.Router();

toDoRoutes.post('/create', createTaskController);
toDoRoutes.get('/findTask/:authorId', getAllTasksController);
toDoRoutes.get('/findTask/:authorId/:taskId', getTaskByIdController);
toDoRoutes.patch('/handleState/:authorId/:taskId', toggleTaskStateController);
toDoRoutes.delete('/deleteTask/:authorId/:taskId', deleteTaskByIdController);

export default toDoRoutes;