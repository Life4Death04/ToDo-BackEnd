import express from 'express';
import { deleteUserController, findUserByIdController, loginUserController, registeUserController, updateUserDataController } from '../controllers/userControllers.js';
const userRoutes = express.Router();

userRoutes.post('/register', registeUserController)
userRoutes.post('/login', loginUserController)
userRoutes.get('/find/:id', findUserByIdController),
userRoutes.post('/update/:id', updateUserDataController)
userRoutes.delete('/delete/:id', deleteUserController)

export default userRoutes;