"use server"
import axios, { AxiosRequestConfig } from 'axios';
import { OrderType } from '../database/orders';
import { randomBytes } from 'crypto';



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
        return response.data.token;
    } catch (error) {
        console.log(error);
    }
}


export async function CheckServiceAvailability(postalCode: number) {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/courier/serviceability/',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: {
            pickup_postcode: 121001,
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

const GetOrder = async (order_id: string, token: string): Promise<string | null> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://apiv2.shiprocket.in/v1/external/orders',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    try {
        const response = await axios(config);
        const data = response.data.data.map((d:any) => {
            return {
                id: d.id,
                order_id: d.channel_order_id
            }
        });
        const result = data.filter((d:any) => d.order_id.toLowerCase() === order_id.toLowerCase())
        if (result.length > 0) return result[0].id as string;
    } catch (error) {
        console.error(error);
    }
    return null;
};

export async function CreateCustomOrder(order: OrderType) {
    const token = await GetToken();
    const address = order.address;
    if (!address || !token) return

    const order_id = await GetOrder(order.id.replace('order_', ''), token);
    if (order_id) {
        return `https://app.shiprocket.in/seller/orders/details/${order_id}` 
    }

    const products = order.products.flatMap((product) => {
        function generateSKU(): string {
            return `PO${product.id.toUpperCase().slice(0, 6)}${randomBytes(4).toString('hex').slice(0, 4).toUpperCase()}`
        }
        return {
            name: `${product.size === "Small" ? "A4 Size" : product.size === "Medium" ? "A5 Size" : ""} Poster of ${product.title}`,
            sku: generateSKU(),
            units: product.quantity || 1,
            selling_price: product.price,
        }
    });

    var body = JSON.stringify({
        order_id: order.id.replace("order_", "").toUpperCase(),
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
        length: 44,
        breadth: 36,
        height: 5,
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
        console.log(data, "DATAAAAA")
        if (data) {
            return `https://app.shiprocket.in/seller/orders/details/${data.order_id}` 
        }
        return data
    } catch (error) {
        console.log(error, "createOrder");
    }
}