import prisma from "../prisma/client.js";

export const fetchTasks = async(id) =>{
    const user = await prisma.user.findUnique({
        where: {id: parseInt(id)}
    })

    if(!user){
        throw new Error('User not found')
    }

    const tasks = await prisma.task.findMany({
        where: {authorId: parseInt(id)}
    })

    return {
        tasks: tasks
    }
}

export const createTaskItem = async ({authorId, taskName, description, dueDate, priority, status, listId}) =>{
    const existingUser = await prisma.user.findUnique({
        where: {id: parseInt(authorId)}
    })

    if(!existingUser){
        throw new Error("User not found!")
    }

    const newTask = await prisma.task.create({
        data:{
            taskName: taskName,
            description: description,
            dueDate: dueDate,
            priority: priority,
            status: status,
            authorId: parseInt(authorId),
            listId: parseInt(listId)
        }
    })

    return{
        message: "Task created successfully",
        data: newTask
    }
}

export const updateTask = async({id, taskName, description, status, dueDate, priority, authorId, listId}) =>{
    const existingUser = await prisma.user.findUnique({
        where: {id: parseInt(authorId)}
    })

    if(!existingUser){
        throw new Error("User not found!")
    }

    const task = await prisma.task.findUnique({
        where: {
            authorId: parseInt(authorId),
            id: parseInt(id)
        }
    })

    if(!task){
        throw new Error("Task not found!")
    }

    const updatedTask = await prisma.task.update({
        where: {
            authorId: task.authorId,
            id: task.id
        },
        data: {
            taskName: taskName,
            description: description,
            status: status,
            dueDate: dueDate,
            priority: priority,
            listId: parseInt(listId)
        }
    })

    return{
        message: `Task updated successfully`,
        data: updatedTask
    }
}

export const deleteTaskById = async(authorId, taskId) =>{
    const existingUser = await prisma.user.findUnique({
        where: {id: parseInt(authorId)}
    })

    if(!existingUser){
        throw new Error('User not found!')
    }

    const taskToDelete = await prisma.task.delete({
        where: {
            authorId: existingUser.id,
            id: parseInt(taskId)
        }
    })

    if(!taskToDelete){
        throw new Error('Task not found!')
    }

    return{
        message: `Task (${taskId}) deleted successfully`
    }
}

export const toggleTaskArchived = async(authorId, taskId) =>{
    const existingUser = await prisma.user.findUnique({
        where: {id: parseInt(authorId)}
    })

    if(!existingUser){
        throw new Error('User not found!')
    }

    const taskToToggle = await prisma.task.findUnique({
        where: {id: parseInt(taskId)}
    })

    if(!taskToToggle){
        throw new Error('Task not found!')
    }

    const updatedTask = await prisma.task.update({
        where: {id: taskToToggle.id},
        data: {archived: !taskToToggle.archived}
    })

    return{
        message: `Task (${taskId}) archived successfully`,
        data: updatedTask
    }
}

//----------------------Deprecated Tasks---------------------------//
export const getAllTasks = async (authorId) =>{
    const existingUser = await prisma.user.findUnique({
        where: {id: parseInt(authorId)}
    })

    if(!existingUser){
        throw new Error('User not found!')
    }

    const userTasks = await prisma.task.findMany({
        where: {authorId: existingUser.id}
    })

    /* return{
        message: `The tasks related to the user with the ID ${authorId} are: `,
        data: userTasks
    } */

    return userTasks;
}

export const getTaskById = async(authorId, taskId) =>{
    const existingUser = await prisma.user.findUnique({
        where: {id: parseInt(authorId)}
    })

    if(!existingUser){
        throw new Error('User not found!')
    }

    const userTask = await prisma.task.findUnique({
        where: {
            authorId: existingUser.id,
            id: taskId
        }
    })

    return{
        message: `Task related to the user with the ID ${authorId} are:`,
        data: userTask
    }
}