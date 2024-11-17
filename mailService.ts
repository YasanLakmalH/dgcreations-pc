require('dotenv').config();

import emailjs from '@emailjs/browser';
import { Email } from './types/types';

emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
    blockHeadless: true,
    blockList: {
      list: [],
    },
    limitRate: {
      throttle: 1000, // 1s
    },
  });
if( !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ){
    console.log("key is missing")
}
export const sendEmailFromClient = async (data: Email) => {
    const { name, email, subject, message } = data;

    if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        throw new Error('Email configuration is missing');
    }
    
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
    };

    try {
        const response = await emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '', 
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '', 
          templateParams, 
          { publicKey: process.env.NEXT_EMAILJS_PUBLIC_PUBLIC_KEY || '' }
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
