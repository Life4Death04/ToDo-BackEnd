import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { 
    findUserByIdController, 
    loginUserController, 
    registeUserController, 
    updateUserDataController,  
    getUserController
} from '../controllers/userControllers.js';
const userRoutes = express.Router();

/* userRoutes.get('/find/all', findAllUsersController)
userRoutes.delete('/delete/:id', deleteUserController)
userRoutes.patch('/updatePassword', updateUserPasswordController) */

//Protected Routes - All protected functions are functions that has to be requested using the API (rout) protected
userRoutes.post('/register', registeUserController)
userRoutes.post('/login', loginUserController)
userRoutes.get('/find/:id', authMiddleware, findUserByIdController)
userRoutes.get('/getUser', authMiddleware, getUserController);
userRoutes.put('/update/:id', authMiddleware, updateUserDataController)

export default userRoutes;