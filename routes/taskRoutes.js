import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { 
    createTaskController, 
    deleteTaskByIdController, 
    fetchTasksController, 
    getAllTasksController, 
    getTaskByIdController, 
    updateTaskController,
    toggleTaskArchivedController
} from "../controllers/taskControllers.js";

const taskRoutes = express.Router();

//Protected Task Routes - All protected functions are functions that has to be requested using the API (rout) protected
taskRoutes.get('/get', authMiddleware, fetchTasksController);
taskRoutes.post('/create', authMiddleware, createTaskController);
taskRoutes.delete('/delete/:authorId/:taskId', authMiddleware, deleteTaskByIdController);

//----------- Deprecated Task Routes ---------------//
taskRoutes.get('/findTask/:authorId', authMiddleware, getAllTasksController);
taskRoutes.get('/findTask/:authorId/:taskId', authMiddleware, getTaskByIdController);
taskRoutes.patch('/update', authMiddleware, updateTaskController);
taskRoutes.patch('/toggleArchived/:authorId/:taskId', authMiddleware, toggleTaskArchivedController);

export default taskRoutes;