import { createTaskItem, deleteTaskById, getAllTasks, getTaskById, toggleTaskState } from "../services/taskServices.js";

export const createTaskController = async(req, res) =>{
    try{ 
        const {content, authorId} = req.body
        const parseAuthorId = parseInt(authorId)

        if(isNaN(parseAuthorId)) return res.status(400).json({message: 'Something went wrong with AuthorId'})
        const newTask = await createTaskItem({content, authorId: parseAuthorId})

        res.send({message: 'Task successfully created', task: newTask})
    }catch(error){
        console.error(error + error.code)
        console.log(req.body)
        res.status(500).json({message: 'Internal server error', code: error.code})
    }
}

export const getAllTasksController = async(req, res) =>{
    try{
        const authorId = req.params.authorId
        const allUserTasks = await getAllTasks(authorId)
        res.send({author: authorId, content: allUserTasks});
    }catch(error){
        console.error(error + error.code)
        res.status(500).json({message: 'Internal Server Error', code: error.code})
    }
}

export const getTaskByIdController = async(req, res) =>{
    try{
        const authorId = req.params.authorId
        const taskId = req.params.taskId
        const task = await getTaskById(authorId, taskId);
        res.send({author: authorId, content: task});
    }catch(error){
        console.error(error + error.code)
        res.status(500).json({message: 'Internal Server Error', code: error.code})
    }
}

export const toggleTaskStateController = async(req, res) =>{
    try{
        const authorId = req.params.authorId
        const taskId = req.params.taskId
        const taskToUpdate = await toggleTaskState(authorId, taskId)
        res.send({message: 'Task state changed successfully'})
    }catch(error){
        console.error(error + error.code)
        res.status(500).json({message: 'Internal Server Error', code: error.code})
    }
}

export const deleteTaskByIdController = async(req, res) =>{
    try{
        const authorId = req.params.authorId
        const taskId = req.params.taskId
        const taskToDelete = await deleteTaskById(authorId, taskId)
        res.send({message: `Task (${taskId}) deleted successfully`})
    }catch(error){
        console.error(error + error.code)
        res.status(500).json({message: 'Internal Server Error', code: error.code})
    }
}