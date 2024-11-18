import {OrderType} from '@/types/types';
import { db } from '@/lib/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';

export const createOrder = async (newOrder: OrderType)=> {
    const ordersCollection = collection(db, 'orders');
    await addDoc(ordersCollection, newOrder);
};

export const getOrderCount = async ()=> {
    const ordersCollection = collection(db, 'orders');
    const ordersSnapshot = await getDocs(ordersCollection);
    return ordersSnapshot.size;
};