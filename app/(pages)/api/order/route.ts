import { NextRequest, NextResponse } from 'next/server';
import { OrderType } from '@/types/types';
import { createOrder, getOrderCount } from '../model/order';

export const POST = async (req: NextRequest) => {
    try {
        const id: number = await getOrderCount() + 1;
        const design: OrderType = await req.json(); 
        const order: OrderType = {
            ...design,
            orderId: `${id}`,
            createdAt: new Date().toISOString(),
        };
        await createOrder(order);
        return new NextResponse(JSON.stringify({message: 'Order created successfully', data:order}), {status: 200});
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse(JSON.stringify({error: error.message}), {status: 500});
        }
    }
};