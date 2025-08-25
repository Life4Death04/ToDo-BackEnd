import prisma from "../prisma/client.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
        },
        select:{
            email: true
        }
    })

    return{
        message: 'User registered successfully',
        user: newUser
    }
}

/* export const loginUser = async ({email, password}) =>{
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
} */

export const getAllUsers = async() =>{
    return await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
        }
    })
}

export const getUserById = async (id) =>{
    const existingUser = await prisma.user.findFirst({
        where: {id: parseInt(id)},
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true,
            phoneNumber: true,
            createdAt: true,
            emailVerified: true
        }
    })

    if(!existingUser) {
        throw new Error('User not found')
    }

    return existingUser;
}

export const getUser = async(userId) =>{
    const user = await prisma.user.findUnique({
        where: {id: parseInt(userId)},
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true,
        }
    })
    
    if(!user) throw new Error('User not found')

    return user;
}

export const updateUserData = async (id, {firstName, lastName, email}) =>{
    const existingUser = await prisma.user.findUnique({
        where: {id: parseInt(id)}
    })

    if(!existingUser) {
        throw new Error('User not found')
    }

    const updatingData = await prisma.user.update({
        where: {id: parseInt(id)},
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email
        },
        select: {
            firstName: true,
            lastName: true,
            email: true
        }
    })

    return{
        message: 'User updated successfully',
        data: updatingData
    }
}

export const updateUserPassword = async ({email, password}) =>{
    const existingUser = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    if(!existingUser) {throw new Error('User not found')}

    const hashedPassword = await bcrypt.hash(password, 10);

    const changingPassword = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            password: hashedPassword
        }
    })

    return{
        message: "Password changed"
    }
}

export const deleteUser = async (id) =>{
    return prisma.user.delete({
        where: {id: parseInt(id)}
    })
}


//Login Service
/*STEPS:
    1* First make searches about email and password hashed in the DB (If they exists and they are correct we can proceed)
    2* Creating the special token setting some values (Ask for explanation)
    3* Return the response

    !!!IMPORTANT: Add a value for our secret key in the .env
*/
export const loginUser = async({email, password}) => {
    const user = await prisma.user.findUnique({
        where: {email: email}
    })

    if(!user){
        throw new Error("Email not registered")
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error("Invalid password or email")
    }

    //Creating special token - Ask for explanation
    const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    return({
        message: "Login successful",
        token,
        user: {
            id: user.id,
            email: user.email
        }
    })
}