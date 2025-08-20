import express from 'express';
import { deleteUserController, findAllUsersController, findUserByIdController, loginUserController, registeUserController, updateUserDataController, updateUserPasswordController } from '../controllers/userControllers.js';
import { authMiddleware } from '../middlewares/auth.js';
const userRoutes = express.Router();

userRoutes.post('/register', registeUserController)
/* userRoutes.post('/login', loginUserController) */
userRoutes.get('/find/all', findAllUsersController)
userRoutes.get('/find/:id', findUserByIdController)
userRoutes.put('/update/:id', updateUserDataController)
userRoutes.patch('/updatePassword', updateUserPasswordController)
userRoutes.delete('/delete/:id', deleteUserController)

//Protected Routes - All protected functions are functions that has to be requested using the API (rout) protected
userRoutes.post('/login', /* authMiddleware, */ loginUserController)

export default userRoutes;