import express from 'express';
import { deleteUserController, findUserByIdController, registeUserController, updateUserDataController } from '../controllers/userControllers.js';
const userRoutes = express.Router();

userRoutes.post('/create', registeUserController)
userRoutes.get('/find/:id', findUserByIdController)
userRoutes.post('/update/:id', updateUserDataController)
userRoutes.delete('/delete/:id', deleteUserController)

export default userRoutes;