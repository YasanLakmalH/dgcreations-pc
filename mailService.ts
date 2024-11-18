require('dotenv').config();

import emailjs from '@emailjs/browser';
import { Email, OrderEmail } from './types/types';

emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID,
    blockHeadless: true,
    blockList: {
        list: [],
    },
    limitRate: {
        throttle: 10000,
    },
});

export const sendEmailFromClient = async (data: Email) => {
    const { name, email, subject, message } = data;

    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
    };
    console.log({
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
    });
    try {
        const response = await emailjs
            .send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
                templateParams,
                { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID }
            )
            .then(
                (response) => {
                    console.log('SUCCESS!', response.status, response.text);
                },
                (err) => {
                    console.log('FAILED...', err);
                },
            );

        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error('Error sending email:', error);
        if (error instanceof Error) {
            throw new Error('Failed to send email: ' + error.message);
        } else {
            throw new Error('Failed to send email');
        }
    }
};

export const sendOrderEmailFromClient = async (data: OrderEmail) => {
    const { orderId, customerName, customerPhone } = data;
    console.log('MAIL SERVICE COMING:', data);
    const templateParams = {
        order_id: orderId,
        from_name: customerName,
        customer_name: customerName,
        customer_phone: customerPhone,
    };

    try {
        const response = await emailjs
            .send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
                process.env.NEXT_PUBLIC_EMAILJS_ORDER_TEMPLATE_ID as string,
                templateParams,
                { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID }
            )
            .then(
                (response) => {
                    console.log('SUCCESS!', response.status, response.text);
                },
                (err) => {
                    console.log('FAILED...', err);
                },
            );

        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error('Error sending email:', error);
        if (error instanceof Error) {
            throw new Error('Failed to send email: ' + error.message);
        } else {
            throw new Error('Failed to send email');
        }
    }
};
