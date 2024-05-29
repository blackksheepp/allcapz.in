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
        const data = response.data;
        const recommendedServiceId = data.data.recommended_courier_company_id;
        const recommendedService = data.data.available_courier_companies.find((service: any) => service.courier_company_id === recommendedServiceId);
        const filteredServices = data.data.available_courier_companies.filter((service: any) =>
            service.call_before_delivery === "Available" &&
            service.blocked === 0 && 
            service.min_weight <= 1 
        ).sort((a: any, b: any) => a.etd_hours - b.etd_hours);

        return {
            city: recommendedService.city,
            services: filteredServices.map((service: any) => ({
                rate: service.rate,
                etd: service.etd,
                etd_hours: service.etd_hours,
                estimated_delivery_days: service.estimated_delivery_days,
                courier_name: service.courier_name,
                courier_company_id: service.courier_company_id,
                courier_type: service.courier_type,
                rating: service.rating,
                ship_type: service.ship_type,
                suppression_dates: service.suppression_dates,
                suppress_date: service.suppress_date,
                suppress_text: service.suppress_text,
            }))
        };
        
       
    } catch (error) {
        console.log(error)
    }
}