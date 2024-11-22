import { NextRequest } from 'next/server';
import { Product, ProductOrder } from '@/types/types';
import { createProductOrder, getOrderCount } from '../model/order';

export const POST = async (req: NextRequest): Promise<Response> => {
    try {
        const id: number = await getOrderCount() + 1;
        const product: Product = await req.json(); 
        const order: ProductOrder = {
            orderId: `${id}`,
            product: product,
            createdAt: new Date().toISOString(),
        };
        
        await createProductOrder(order);
       
        return new Response(JSON.stringify({ message: 'Product order created successfully', data: order }), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : 'An unknown error occurred' }),
            { status: 500 }
        );
    }
};
