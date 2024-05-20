"use server"
import axios, { AxiosRequestConfig } from 'axios';

let SHIPROCKET_API_TOKEN: string | undefined;

export async function GetToken() {
    const data = JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD
    });

    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const response = await axios(config);
        SHIPROCKET_API_TOKEN = response.data.token;
        return SHIPROCKET_API_TOKEN;
    } catch (error) {
        console.log(error);
    }
}




export async function CheckServiceAvailability(postalCode: number) {
    const token = SHIPROCKET_API_TOKEN ?? await GetToken();

    const config: AxiosRequestConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/courier/serviceability/',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: {
            pickup_postcode: 110001,
            delivery_postcode: postalCode,
            weight: "0.5",
            length: 45,
            width: 35,
            height: 10,
            cod: 0
        }
    };

    try {
        const response = await axios(config);
        const data = response.data.data;
        return {
            city: data.available_courier_companies[0].city
        }
    } catch (error) {
    }
}