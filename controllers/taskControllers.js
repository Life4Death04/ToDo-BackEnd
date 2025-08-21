import { createTaskItem, deleteTaskById, fetchUserTodos, getAllTasks, getTaskById, toggleTaskState } from "../services/taskServices.js";

const genericMessageError = {
    message: `Internal Server Error`
}

export const createTaskController = async(req, res) =>{
    try{ 
        const taskData = req.body
        const newTask = await createTaskItem(taskData)
        res.json(newTask)
    }catch(error){
        console.error(error + error.message)
        console.log(req.body)
        res.status(500).json(genericMessageError)
    }
}

export const getAllTasksController = async(req, res) =>{
    try{
        const authorId = req.params.authorId
        const allUserTasks = await getAllTasks(authorId)
        res.json(allUserTasks);
    }catch(error){
        console.error(error + error.message)
        res.status(500).json(genericMessageError)
    }
}

export const getTaskByIdController = async(req, res) =>{
    try{
        const authorId = req.params.authorId
        const taskId = req.params.taskId
        const task = await getTaskById(authorId, taskId);
        res.json(task);
    }catch(error){
        console.error(error + error.message)
        res.status(500).json(genericMessageError)
    }
}

export const toggleTaskStateController = async(req, res) =>{
    try{
        const authorId = req.params.authorId
        const taskId = req.params.taskId
        const taskToUpdate = await toggleTaskState(authorId, taskId)
        res.json(taskToUpdate)
    }catch(error){
        console.error(error + error.message)
        res.status(500).json(genericMessageError)
    }
}

export const deleteTaskByIdController = async(req, res) =>{
    try{
        const authorId = req.params.authorId
        const taskId = req.params.taskId
        const taskToDelete = await deleteTaskById(authorId, taskId)
        res.json(taskToDelete)
    }catch(error){
        console.error(error + error.message)
        res.status(500).json(genericMessageError)
    }
}

//Protected task routes
export const fetchUserTodosController = async(req, res) =>{
    try{
        const userId = req.params.userId;
        const todos = await fetchUserTodos(userId)
        res.json(todos)
    }catch(error){
        console.error(error)
        res.status(500).json({message: error.message || 'Internal Server Error'})
    }
}