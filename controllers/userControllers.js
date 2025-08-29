import { createUser, deleteUser, getAllUsers, getUser, getUserById, loginUser, updateUserData, updateUserPassword } from "../services/userServices.js";

const messageError = 'Internal Server Error'

export const registeUserController = async(req, res) =>{
    try{
        const newUser = await createUser(req.body);
        res.json(newUser);
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message || 'Error Registering User'} )
    }
}

export const findAllUsersController = async(req, res) =>{
    try{
        const users = await getAllUsers()
        res.json(users)
    }catch(error){
        console.error(error)
        res.status(500).json({message: messageError})
    }
}

export const updateUserDataController = async(req, res) =>{
    try{
        const userToUpdate = req.params.id;
        const dataToUpdate = req.body
        const newData = await updateUserData(userToUpdate, dataToUpdate)
        /* if(!userToUpdate) return res.status(404).json({error: 'User not found'}) */
        res.json(newData);
    }catch(error){
        console.error(error);
        res.status(500).json({message: messageError + error.message})
    }
}

export const updateUserPasswordController = async(req, res) =>{
    try{
        const userData = req.body
        const passwordToChange = await updateUserPassword(userData)
        res.json(passwordToChange)
    }catch(error){
        console.error(error + error.code)
        res.status(500).json({message: messageError + error.message})
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
            res.status(500).json({message: messageError})
        }   
    }
}

//Login controller - Just a basic controller logic, nothing special
export const loginUserController = async(req, res) =>{
    try{
        const userData = req.body;
        const userToLogin = await loginUser(userData);
        res.status(200).json(userToLogin)
    }catch(error){
        console.error(error + error.code);
        res.status(500).json({message: error.message || messageError})
    }
}

export const findUserByIdController = async(req, res) =>{
    try{
        const userToFind = await getUserById(req.params.id);
        if (!userToFind) return res.status(404).json({error: 'User not found'})
        res.json(userToFind)
    }catch(error){
        console.error(error);
        console.log(req.params.id)
        res.status(500).json({message: messageError})
    }
}


export const getUserController = async(req, res)=>{
    try{
       const userId = req.user.userId;
       if(!userId) return res.status(400).json({message: 'User ID is required'});
       const user = await getUser(userId);
       if (!user) return res.status(404).json({message: 'User not found'});
       res.json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({message: messageError})
    }
}