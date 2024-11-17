
import emailjs from 'emailjs-com';
import { NextResponse } from 'next/server';

export const POST = async (req:Request) => {
    const { name, email, message } = await req.json();
        try {
            const result = await emailjs.send(
                process.env.SERVICE_ID || '', 
                process.env.TEMPLATE_ID || '',  
                {
                    from_name: name,
                    from_email: email,
                    message: message,
                },
                process.env.USER_ID || '' 
            );

            return new NextResponse(JSON.stringify({message: 'Order created successfully'}), {status: 201});
        } catch (err) {
            if (err instanceof Error) {
                return new NextResponse(JSON.stringify({error: err.message}), {status: 500});
            }
        }
}
