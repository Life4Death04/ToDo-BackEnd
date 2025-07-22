import { createRecord, getRelatedRecordsById } from "../services/taskServices.js";

export const createTask = async(req, res) =>{
    try{
        const newTask = await createRecord(req.body);
        res.send(newTask);
    }catch(error){
        console.error(error)
        console.error(error.code)
        res.status(500).json({error: 'Internal Server Error'})
    }
}

export const findRelatedTasks = async(req, res) =>{
    try{
        const authorId = req.params.id
        const foundTasks = await getRelatedRecordsById(authorId)
        res.status(200).json(foundTasks)
    }catch(error){
        console.error(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
}
