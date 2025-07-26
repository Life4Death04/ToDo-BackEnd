import express from 'express';
import { deleteUserController, findUserByIdController, loginUserController, registeUserController, updateUserDataController, updateUserPasswordController } from '../controllers/userControllers.js';
const userRoutes = express.Router();

userRoutes.post('/register', registeUserController)
userRoutes.post('/login', loginUserController)
userRoutes.get('/find/:id', findUserByIdController),
userRoutes.put('/update/:id', updateUserDataController)
userRoutes.patch('/updatePassword', updateUserPasswordController)
userRoutes.delete('/delete/:id', deleteUserController)

export default userRoutes;