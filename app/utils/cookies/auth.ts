"use server"
import { cookies } from "next/headers";

export const SetSessionCookie = async (token: string) => {
    const response = cookies().set("session", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30, // 30 Days
        sameSite: true,
    });
    return response.has("session");
}

export const GetSessionCookie = async () => {
    return cookies().get("session")?.value;
}

export const ClearSessionCookie = async () => {
    cookies().delete("session");
}