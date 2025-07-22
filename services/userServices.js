import prisma from "../prisma/client.js";

export const createUser = async (userData) =>{
    return prisma.user.create({
        data: userData
    })
}

export const getRecordById = async (id) =>{
    return prisma.user.findFirst({
        where: {id: parseInt(id)}
    })
}

export const updateUser = async (id, userData) =>{
    return prisma.user.update({
        where: {id: parseInt(id)},
        data: userData
    })
}

export const deleteRecord = async (id) =>{
    return prisma.user.delete({
        where: {id: parseInt(id)}
    })
}