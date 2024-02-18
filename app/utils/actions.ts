"use server";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export const verifyPassword = async (inputPassword: string) => {
  if (inputPassword == "saul") {
    return true;
  } else {
    return false;
  }
};

export const GetCurrentUserName = async (): Promise<string> => {
  try {
    const user = await currentUser();
    if (user && user.username) {
      return user.username;
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    return "";
  }
};