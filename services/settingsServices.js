import prisma from '../prisma/client.js';

export const getUserSettings = async({userId}) =>{
    const settings = await prisma.userSettings.findUnique({
        where: {userId: parseInt(userId)},
        select: {
            theme: true,
            dateFormat: true,
            language: true,
            defaultPriority: true,
            defaultStatus: true,
        }
    })

    if(!settings) throw new Error('Settings not found')

    return settings;
}

export const updateUserSettings = async({userId, theme, dateFormat, language, defaultPriority, defaultStatus}) => {
    const existingUser = await prisma.user.findUnique({
        where: {id: parseInt(userId)}
    })

    if(!existingUser) throw new Error('User not found')

    const updatedSettings = await prisma.userSettings.update({
        where: {userId: parseInt(userId)},
        data: {
            theme,
            dateFormat,
            language,
            defaultPriority,
            defaultStatus
        }
    })

    return({
        message: 'Settings updated successfully',
        settings: updatedSettings
    });
}