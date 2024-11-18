import { NextRequest } from 'next/server';
import { OrderType } from '@/types/types';
import { createOrder, getOrderCount } from '../model/order';

export const POST = async (req: NextRequest): Promise<Response> => {
    try {
        const id: number = await getOrderCount() + 1;
        const design: OrderType = await req.json(); 
        const order: OrderType = {
            ...design,
            orderId: `${id}`,
            createdAt: new Date().toISOString(),
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
