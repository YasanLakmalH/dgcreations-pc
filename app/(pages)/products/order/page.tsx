'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from 'next/image';
import { BASE_API_URL } from '@/constants/constants';
import { Product } from '@/types/types';
import axios from 'axios';
import { sendOrderEmailFromClient } from '@/mailService';
import { AlertCircle } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Bottle Rack",
    category: "Kitchen Room",
    image: "/Products/BottleRack/1.webp",
    description: 'Stylish and space-saving storage for your bottles',
  },
  {
    id: 2,
    name: "Dining Table",
    category: "Dining Room",
    image: "/Products/DiningTable/7.webp",
    description: 'Integrated dining solution for compact spaces',
  },
  {
    id: 3,
    name: "Oven Cupboard",
    category: "Kitchen",
    image: "/Products/OvenCup/3.webp",
    description: 'Dedicated space for seamless oven placement',
  },
  {
    id: 4,
    name: "Refrigerator Cabinet",
    category: "Kitchen",
    image: "/Products/RefrigeratorCup/11.webp",
    description: "designed integrate a refrigerator seamlessly into a kitchen",
  },
  {
    id: 5,
    name: "Sety Back",
    category: "Living Room",
    image: "/Products/SetyBack/15.webp",
    description: "decorative or functional wall-mounted panel",
  },
  {
    id: 6,
    name: "Shop Tables",
    category: "Shop",
    image: "/Products/ShopTables/19.webp",
    description: "designed for retail spaces assist in workspace activities.",
  },
  {
    id: 7,
    name: "Storage Compartment",
    category: "Office",
    image: "/Products/StorageCompartments/13.webp",
    description: "organize and store items",
  },
  {
    id: 8,
    name: "TV Wall Panel",
    category: "Living Room",
    image: "/Products/TVWallPanel/4.webp",
    description: "stylish and functional designed to mount and display a television",
  },
];

export default function Page() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = Number(searchParams.get('id'));
  const [productOrder, setProductOrderDetails] = useState({ name: '', email: '', phone: '', address: '', productName: '' });
  const product = products.find((product) => product.id === productId);
  const [isSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    setProductOrderDetails((prevOrder) => ({
      ...prevOrder,
      productName: productId.toString(),
    }));
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setProductOrderDetails({
      ...productOrder,
      [name]: value,
    });
  }

  const submitOrder = async (productOrder: Product) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/api/productOrder`, productOrder);
      return response.data["orderId"];
    } catch (error) {
      console.error('Error posting design details:', error);
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!productOrder?.name.trim()) errors.name = 'Name is required';
    if (productOrder?.email && !/\S+@\S+\.\S+/.test(productOrder.email)) errors.email = 'Email is invalid';
    if (!productOrder.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(productOrder.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (!productOrder.address.trim()) errors.address = 'Address is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!BASE_API_URL) {
      return null;
    }
    const isValid = validateForm();
    if (!isValid) return setSubmitted(false);

    const id = await submitOrder(productOrder);

    await sendOrderEmailFromClient({
      orderId: id,
      fromName: productOrder.name ?? 'Unknown', // Fallback to 'Unknown' if no name
      customerName: productOrder.name ?? 'Unknown',
      customerPhone: productOrder.phone ?? 'No phone number',
    });
    router.push('/products/order/completed');
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Order Now</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You can customize the product to suit your preferences.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto py-10 px-4 sm:px-6 md:px-8 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex justify-center">
            <motion.div
              key={product?.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="w-full max-w-[400px] mx-auto">
                <CardContent>
                  <div className="text-center mb-6">
                    <Image
                      src={product?.image ?? '/ProductImages/default.jpg'}
                      alt={product?.name ?? 'product'}
                      className="rounded-lg"
                      width={500}
                      height={250}
                    />
                    <h3 className="text-lg font-semibold mt-4">{product?.name}</h3>
                    <p className="text-sm text-gray-500">{product?.category}</p>
                    <p className="text-sm ">{product?.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <div className="space-y-6">
            {Object.keys(errors).length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start text-red-700 animate-shake">
                <AlertCircle className="w-5 h-5 mr-2 mt-1" />
                <ul>
                  {Object.values(errors).map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className='mb-5'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Jhone doe"
              />
            </div>

            <div className='mb-5'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="example@gmail.com"
              />
            </div>
            <div className='mb-5'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone:</label>
              <input
                type="number"
                name="phone"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="0771234567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
              <input
                type="text"
                name="address"
                disabled={isSubmitted}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="1234 Main St"
              />
            </div>
            <button
              className='bg-green-500 rounded-lg w-full py-4 px-5 mt-8'
              onClick={handleSubmit}
            >
              {isSubmitted ? 'Submitting....' : 'Submit'}
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}
