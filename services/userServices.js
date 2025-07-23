import prisma from "../prisma/client.js";

export const createUser = async (userData) =>{
    return prisma.user.create({
        data: userData
    })
}

export const getUserById = async (id) =>{
    return prisma.user.findFirst({
        where: {id: parseInt(id)}
    })
}

export const updateUserData = async (id, userData) =>{
    return prisma.user.update({
        where: {id: parseInt(id)},
        data: userData
    })
}

export const deleteUser = async (id) =>{
    return prisma.user.delete({
        where: {id: parseInt(id)}
    })
}