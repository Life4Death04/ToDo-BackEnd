import prisma from "../prisma/client.js";
import bcrypt from 'bcrypt'

export const createUser = async ({firstName, lastName, email, password}) =>{
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(existingUser) throw new Error('Email already in use');

    const userPassword = password;
    const hashedPassword = await bcrypt.hash(userPassword, 10)

    const newUser = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword
        }
    })

    return{
        message: 'User registered successfully',
        user: newUser
    }
}

export const loginUser = async ({email, password}) =>{
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(!user){
        throw new Error('Email not found')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
        throw new Error('Invalid Credentials')
    }

    return{
        message: 'Login Successful',
        user: user.email
    }
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