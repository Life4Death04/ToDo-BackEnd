import prisma from "../prisma/client.js";

export const createTaskItem = async (itemData) =>{
    return await prisma.task.create({
        data: itemData
    })
}

export const getAllTasks = async (authorId) =>{
    return await prisma.task.findMany({
        where: {authorId: parseInt(authorId)}
    })
}

export const getTaskById = async(authorId, taskId) =>{
    return await prisma.task.findUnique({
        where: {
            authorId: parseInt(authorId),
            id: parseInt(taskId)
        }
    })
}

export const toggleTaskState = async(authorId, taskId) =>{
    const taskState = await prisma.task.findUnique({
        where: {
            authorId: parseInt(authorId),
            id: parseInt(taskId)
        }
    })

    return await prisma.task.update({
        where: {
            authorId: parseInt(authorId),
            id: parseInt(taskId)
        },
        data: {
            check: !taskState.check
        }
    })
}

export const deleteTaskById = async(authorId, taskId) =>{
    return await prisma.task.delete({
        where: {
            authorId: parseInt(authorId),
            id: parseInt(taskId)
        }
    })
}