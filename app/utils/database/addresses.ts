"use server"
import prisma from "@/lib/prisma";

export interface AddressType {
    id?: string;
    email: string;
    fname: string;
    lname: string;
    street: string;
    address: string;
    postalCode: string;
    city: string;
    phone: string;
}

export const SaveAddress = async (address: AddressType) => {
    try {
        return (await prisma.address.create({
            data: address,
        })).id
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const GetAddress = async (id: string) => {
    try {
        return await prisma.address.findUnique({
            where: {
                id
            }
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const GetAddresses = async (email: string) => {
    try {
        return await prisma.address.findMany({
            where: {
                email
            }
        });
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const UpdateAddress = async (address: AddressType) => {
    try {
        const addressId = address.id;
        delete address.id;
        await prisma.address.update({
            where: {
                id: addressId,
            },
            data: address,
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const DeleteAddress = async (id: string) => {
    try {
        await prisma.address.delete({
            where: {
                id
            }
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}