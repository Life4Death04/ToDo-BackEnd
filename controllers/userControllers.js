import { createUser, deleteUser, getUserById, loginUser, updateUserData } from "../services/userServices.js";

export const registeUserController = async(req, res) =>{
    try{
        const newUser = await createUser(req.body);
        res.send(newUser);
    }catch(error){
        console.error(error + error.code);
        if(error.code === 'P2002'){
            res.status(409).json({error: `This email is already in use`})
        }
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const loginUserController = async(req, res) =>{
    try{
        const data = req.body
        const userToLogin = await loginUser(data)
        res.status(200).json({message: 'Logged In', data: userToLogin})
    }catch(error){
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export const findUserByIdController = async(req, res) =>{
    try{
        const userToFind = await getUserById(req.params.id);
        if (!userToFind) return res.status(404).json({error: 'User not found'})
        res.send(userToFind)
    }catch(error){
        console.error(error);
        console.log(req.params.id)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const updateUserDataController = async(req, res) =>{
    try{
        const userToUpdate = req.params.id;
        const newData = await updateUserData(userToUpdate, req.body)
        if(!userToUpdate) return res.status(404).json({error: 'User not found'})
        res.send(newData);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const deleteUserController = async(req, res) =>{
    try{
        const userId = req.params.id;
        const userToDelete = await deleteUser(userId);
        res.status(200).json({message: 'User was deleted successfully'})
    }catch(error){
        console.error(error);
        if(error.code === 'P2025'){
            return res.status(404).json({error: `User doesn't exist or is already deleted`})
        }else{
            res.status(500).json({error: 'Internal Server Error'})
        }   
    }
}