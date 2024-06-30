"use server"
import { Order } from '@prisma/client';
import axios, { AxiosRequestConfig } from 'axios';
import { OrderType } from '../database/orders';
import { GetAddress } from '../database/addresses';

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
        // const filteredServices = data.data.available_courier_companies.filter((service: any) =>
        //     service.call_before_delivery === "Available" &&
        //     service.blocked === 0 && 
        //     service.min_weight <= 1 
        // ).sort((a: any, b: any) => a.etd_hours - b.etd_hours);

        return {
            city: recommendedService.city,
            state: recommendedService.state,
            // services: filteredServices.map((service: any) => ({
            //     rate: service.rate,
            //     etd: service.etd,
            //     etd_hours: service.etd_hours,
            //     estimated_delivery_days: service.estimated_delivery_days,
            //     courier_name: service.courier_name,
            //     courier_company_id: service.courier_company_id,
            //     courier_type: service.courier_type,
            //     rating: service.rating,
            //     ship_type: service.ship_type,
            //     suppression_dates: service.suppression_dates,
            //     suppress_date: service.suppress_date,
            //     suppress_text: service.suppress_text,
            // }))
        };
    } catch (error) {
        console.log(error)
    }
}

function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}


export async function CreateCustomOrder(order: OrderType) {
    const token = SHIPROCKET_API_TOKEN ?? await GetToken();
    const address = await GetAddress(order.address);
    if (!address) return
    
    const products = order.products.flatMap((product) => {
        return {
            name: product.title,
            sku: product.id,
            units: product.quantity || 1,
            selling_price: product.price,
        }
    });

    var axios = require('axios');
    var body = JSON.stringify({
        order_id: order.id.replace("order_", ""),
        order_date: formatDate(order.confirmedAt),
        pickup_location: "Primary",
        billing_customer_name: address.fname,
        billing_last_name: address.lname,
        billing_address: address.street,
        billing_address_2: address.address,
        billing_city: address.city,
        billing_pincode: address.postalCode,
        billing_state: address.state,
        billing_country: "India",
        billing_email: order.user,
        billing_phone: address.phone,
        shipping_is_billing: true,
        order_items: products,
        payment_method: "Prepaid",
        sub_total: order.pricing.subtotal,
        length: 10,
        breadth: 15,
        height: 20,
        weight: 0.5
    });

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: body
    };

    try {
        const response = await axios(config);
        const data = response.data;
        if (data) {
            return `https://app.shiprocket.in/seller/orders/details/${data.order_id}` 
        }
        return data
    } catch (error) {
        console.log(error, "createOrder");
    }
}