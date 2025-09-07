import { getUserSettings, updateUserSettings } from "../services/settingsServices.js";

const errorMessage = 'Internal Server Error'

export const getUserSettingsController = async(req, res) =>{
    try{
         const userId = req.user.userId;
         if(!userId) return res.status(400).json({message: 'User ID is required'});
         const settings = await getUserSettings({userId});
         if (!settings) return res.status(404).json({message: 'Settings not found'});
         res.json(settings);
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message || errorMessage})
    }
}

export const updateUserSettingsController = async(req, res) =>{
    try{
        const userId = req.user.userId;
        if(!userId) return res.status(400).json({message: 'User ID is required'});
        const data = req.body;
        const updatedSettings = await updateUserSettings({...data, userId});
        res.json(updatedSettings);
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message || errorMessage})
    }
}