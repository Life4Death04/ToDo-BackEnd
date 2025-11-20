import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { getUserSettingsController, updateUserSettingsController } from '../controllers/settingsController.js';
const settingsRoutes = express.Router();

settingsRoutes.get('/', authMiddleware, getUserSettingsController);
settingsRoutes.put('/', authMiddleware, updateUserSettingsController);

export default settingsRoutes;