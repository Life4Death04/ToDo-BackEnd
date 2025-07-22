import prisma from "../prisma/client.js";

export const createRecord = async (taskData) =>{
    return await prisma.task.create({
        data: taskData
    })
}

export const getRelatedRecordsById = async (id) =>{
    return await prisma.task.findMany({
        where: {authorId: parseInt(id)}
    })
}
