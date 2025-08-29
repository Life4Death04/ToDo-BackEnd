import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { 
    createListController, 
    getListsByUserIdController, 
    getSingleListByIdController, 
    updateListByIdController, 
    deleteListByIdController 
} from '../controllers/listControllers.js';

const listRoutes = express.Router();

listRoutes.post('/', authMiddleware, createListController);
listRoutes.get('/', authMiddleware, getListsByUserIdController);
listRoutes.get('/:id', authMiddleware, getSingleListByIdController);
listRoutes.put('/:id', authMiddleware, updateListByIdController);
listRoutes.delete('/:id', authMiddleware, deleteListByIdController);

export default listRoutes;