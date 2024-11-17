import { Email } from '@/types/types';
import axios from 'axios';

export const POST = async ({ name, email, subject, message }:Email) => {
    const payload = {
        service_id: process.env.SERVICE_ID,
        template_id: process.env.TEMPLATE_ID,
        user_id: process.env.USER_ID,
        template_params: {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
        },
    };

    try {
        const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload);
        console.log('Email sent successfully:', response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error sending email:', error.response?.data || error.message);
            throw new Error(error.response?.data || 'Failed to send email');
        } else {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
};
