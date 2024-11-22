import { NextRequest } from 'next/server';
import { OrderType } from '@/types/types';
import { createOrder, getOrderCount } from '../model/order';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "@/lib/firestore";

export const POST = async (req: NextRequest): Promise<Response> => {
    try {
        console.log('Request', req);
        const id: number = await getOrderCount() + 1;
        const design: OrderType = await req.json(); 
       
        const { orderId, ...restOfDesign } = design;
        const order: OrderType = {
            orderId: `${id}`,
            ...restOfDesign,
            createdAt: new Date().toISOString().split("T")[0],
        };
        
        await createOrder(order);
       
        return new Response(JSON.stringify({ message: 'Order created successfully', data: order }), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : 'An unknown error occurred' }),
            { status: 500 }
        );
    }
};
