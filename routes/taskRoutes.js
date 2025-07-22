import express from 'express';
import { createTask, deleteTask, findRelatedTasks, handleTaskStatus } from "../controllers/taskControllers.js";

const taskRoutes = express.Router();

taskRoutes.post('/create', createTask);
taskRoutes.get('/findTasks/:id', findRelatedTasks)
taskRoutes.delete('/deleteTasks/:taskId/:authorId', deleteTask)
taskRoutes.patch('/toggleCheck/:taskId/:authorId', handleTaskStatus)


export default taskRoutes;