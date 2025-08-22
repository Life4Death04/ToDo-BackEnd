import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { 
    createTaskController, 
    deleteTaskByIdController, 
    fetchTasksController, 
    getAllTasksController, 
    getTaskByIdController, 
    updateTaskController 
} from "../controllers/taskControllers.js";

const taskRoutes = express.Router();

//Protected Task Routes - All protected functions are functions that has to be requested using the API (rout) protected
taskRoutes.get('/:userId', authMiddleware, fetchTasksController);
taskRoutes.post('/create', authMiddleware, createTaskController);
taskRoutes.patch('/update', authMiddleware, updateTaskController);
taskRoutes.delete('/delete/:authorId/:taskId', authMiddleware, deleteTaskByIdController);

//----------- Deprecated Task Routes ---------------//
taskRoutes.get('/findTask/:authorId', authMiddleware, getAllTasksController);
taskRoutes.get('/findTask/:authorId/:taskId', authMiddleware, getTaskByIdController);

export default taskRoutes;