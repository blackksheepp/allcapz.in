"use server";

export const verifyPassword = async (password: string) => {
  if (password == process.env.ADMIN_PASSWORD) {
    return true;
  } else {
    return false;
  }
};

