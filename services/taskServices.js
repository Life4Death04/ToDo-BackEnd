import prisma from "../prisma/client.js";

export const createTaskItem = async ({authorId, content}) =>{
    const existingUser = await prisma.user.findUnique({
        where: {id: parseInt(authorId)}
    })

    if(!existingUser){
        throw new Error("User not found!")
    }

    const newTask = await prisma.task.create({
        data:{
            content: content,
            authorId: parseInt(authorId)
        }
    })

    return{
        message: "Task created successfully",
        data: newTask
    }
}

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

export const toggleTaskState = async(authorId, taskId) =>{
    const existingUser = await prisma.user.findUnique({
        where: {id: parseInt(authorId)}
    })

    if(!existingUser){
        throw new Error("User not found!")
    }

    const task = await prisma.task.findUnique({
        where: {
            authorId: parseInt(authorId),
            id: parseInt(taskId)
        }
    })

    if(!task){
        throw new Error("Task not found!")
    }

    const taskState = await prisma.task.update({
        where: {
            authorId: task.authorId,
            id: task.id
        },
        data: {
            check: !task.check
        }
    })

    return{
        message: `Task state updated successfully`,
        data: taskState
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

//Protected tasks services - All protected functions are functions that has to be requested using the API (rout) protected
export const fetchUserTodos = async(id) =>{
    const user = await prisma.user.findUnique({
        where: {id: parseInt(id)}
    })

    if(!user){
        throw new Error('User not found')
    }

    const todos = await prisma.task.findMany({
        where: {authorId: parseInt(id)}
    })

    return {
        todos: todos
    }
}