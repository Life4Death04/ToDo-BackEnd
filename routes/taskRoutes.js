import express from 'express';
import { createTask, findRelatedTasks } from "../controllers/taskControllers.js";

const taskRoutes = express.Router();

taskRoutes.post('/create', createTask);
taskRoutes.get('/findTasks/:id', findRelatedTasks)


export default taskRoutes;