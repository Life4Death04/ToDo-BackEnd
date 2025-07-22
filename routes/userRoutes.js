import express from 'express';
import { createUser, deleteUser, findUserById, updateUserData } from '../controllers/userControllers.js';
const userRoutes = express.Router();

userRoutes.post('/create', createUser)
userRoutes.get('/find/:id', findUserById)
userRoutes.post('/update/:id', updateUserData)
userRoutes.delete('/delete/:id', deleteUser)

export default userRoutes;