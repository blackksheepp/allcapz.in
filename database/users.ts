import prisma from "@/lib/prisma";

export interface UserType {
    name: string;
    email: string;
}

export const createUser = async (user: UserType) => {
    try {
        await prisma.users.create({
            data: user,
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const getUsers = async () => {
    try {
        return await prisma.users.findMany({});
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const getUser = async (email: string) => {
    try {
        return await prisma.users.findFirst({
            where: {
                email: email,
            },
        }) as UserType;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateName = async (email: string, name: string) => {
    try {
        await prisma.users.update({
            where: {
                email: email,
            },
            data: {
                name: name,
            },
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}