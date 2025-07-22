import { createUser, deleteRecord, getRecordById, updateUser } from "../services/userServices.js";

export const registerUser = async(req, res) =>{
    try{
        const newUser = await createUser(req.body);
        res.send(newUser);
    }catch(error){
        console.error(error + error.code);
        if(error.code === 'P2002'){
            res.status(409).json({error: `Duplicated Unique Values in the Request`})
        }
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const findUserById = async(req, res) =>{
    try{
        const userToFind = await getRecordById(req.params.id);
        if (!userToFind) return res.status(404).json({error: 'User not found'})
        res.send(userToFind)
    }catch(error){
        console.error(error);
        console.log(req.params.id)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const updateUserData = async(req, res) =>{
    try{
        const userToUpdate = req.params.id;
        const newData = await updateUser(userToUpdate, req.body)
        if(!userToUpdate) return res.status(404).json({error: 'User not found'})
        res.send(newData);
    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const deleteUser = async(req, res) =>{
    try{
        const userId = req.params.id;
        const userToDelete = await deleteRecord(userId);
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