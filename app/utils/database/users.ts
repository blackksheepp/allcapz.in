"use server"
import prisma from "@/lib/prisma";

export interface UserType {
    name: string;
    email: string;
    alterEmail?: string;
    phone?: string;
    alterPhone?: string;
}

export const CreateUser = async (user: UserType) => {
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

export const GetUsers = async () => {
    try {
        return await prisma.users.findMany({});
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const GetUser = async (email: string) => {
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

export const UpdateName = async (email: string, name: string) => {
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

export const UpdateUser = async (user: UserType) => {
    try {
        await prisma.users.update({
            where: {
                email: user.email,
            },
            data: user,
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}