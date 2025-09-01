import prisma from '../prisma/client.js'

export const createList = async ({ title, color, userId }) => {
    const existingUser = await prisma.user.findUnique({ 
        where: { id: parseInt(userId) } 
    });

    if (!existingUser) {
        throw new Error('User not found');
    }

    const newList = await prisma.list.create(
        {
            data: {
                title: title,
                color: color,
                author: {
                    connect: { id: userId }
                }
            }
        }
    )

    return {
        message: 'List created successfully',
        list: newList
    }
}

export const getListsByUserId = async (userId) => {
    const existingUser = await prisma.user.findUnique(
        { where: { id: parseInt(userId) } }
    );

    if (!existingUser) {
        throw new Error('User not found');
    }

    const lists = await prisma.list.findMany({
        where: { authorId: parseInt(userId) },
        select: { id: true, title: true, color: true }
    });

    return {
        message: 'Lists retrieved successfully',
        lists
    };
}

export const getSingleListById = async (listId, userId) => {
    const existingUser = await prisma.user.findUnique(
        { where: { id: parseInt(userId) } }
    );

    if (!existingUser) {
        throw new Error('User not found');
    }

    const list = await prisma.list.findUnique({
        where: { id: parseInt(listId), authorId: parseInt(userId) },
        select: { id: true, title: true, tasks: true }
    });

    if (!list) {
        throw new Error('List not found');
    }

    return {
        message: 'List retrieved successfully',
        list
    };
}

export const updateListById = async (listId, userId, title) => {
    const existingUser = await prisma.user.findUnique(
        { where: { id: parseInt(userId) } }
    );

    if (!existingUser) {
        throw new Error('User not found');
    }

    const list = await prisma.list.findUnique({
        where: { id: parseInt(listId), authorId: parseInt(userId) }
    });

    if (!list) {
        throw new Error('List not found');
    }

    const updatedList = await prisma.list.update({
        where: { id: parseInt(listId) },
        data: { name: title }
    });

    return {
        message: 'List updated successfully',
        list: updatedList
    };
}

export const deleteListById = async (listId, userId) => {
    const existingUser = await prisma.user.findUnique(
        { where: { id: parseInt(userId) } }
    );

    if (!existingUser) {
        throw new Error('User not found');
    }

    const list = await prisma.list.findUnique({
        where: { id: parseInt(listId), authorId: parseInt(userId) }
    });

    if (!list) {
        throw new Error('List not found');
    }

    await prisma.list.delete({
        where: { id: parseInt(listId) }
    });

    return {
        message: 'List deleted successfully'
    };
}
