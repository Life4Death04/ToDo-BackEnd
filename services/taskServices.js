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

export const deleteRelatedTasks = async (taskId, authorId) =>{
    return await prisma.task.delete({
        where: {
            id: parseInt(taskId),
            authorId: parseInt(authorId)
        }
    })
}

export const toggleTaskStatus = async (taskId, authorId) =>{
    const task = await prisma.task.findUnique({
        where: {
            id: parseInt(taskId),
            authorId: parseInt(authorId)
        }
    })

    return await prisma.task.update({
        where: {
            id: parseInt(taskId),
            authorId: parseInt(authorId)
        },
        data: {check: !task.check}
    })
}