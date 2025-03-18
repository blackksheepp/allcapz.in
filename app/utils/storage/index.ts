"use server"
import axios from "axios";

export const StoreImage = async (Body: Buffer, Key: string) => {
    try {
        var options = {
            method: "PUT",
            url: "https://storage.bunnycdn.com/allcapz-media/" + Key,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/octet-stream",
                "AccessKey": process.env.STORAGE_API_KEY
            },
            data: Body,
        };

        const response = await axios.request(options);
        return response.status === 201;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const DeleteImage = async (Key: string) => {
    try {
        var options = {
            url: "https://storage.bunnycdn.com/allcapz-media/" + Key,
            method: "DELETE",
            headers: {
                "AccessKey": process.env.STORAGE_API_KEY
            }
        }

        const response = await axios.request(options);
        return response.status === 200;
    } catch (error) {
        console.log(error);
        return false;
    }
}
