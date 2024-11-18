'use client';
import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import axios from 'axios';
import { Design} from '@/types/types';
import { sendOrderEmailFromClient } from '@/mailService';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStep } from '@/store/useStore';

export default function Page() {
    const { design } = useStore();
    const setCustomerDetails = useStore((state) => state.setCustomerDetails);
    const [error, setError] = useState('');
    const router = useRouter();
    const { currentStep } = useStep();
    const goToNextStep = useStep((state) => state.goToNextStep);

    // State for the entire customer form
    const [customerDetails, setCustomerDetailsState] = useState({
        name: design.customerDetails?.name || '',
        email: design.customerDetails?.email || '',
        phone: design.customerDetails?.phone || '',
        address: design.customerDetails?.address || '',
        photo: design.customerDetails?.areaImgs || null
    });

    // Update state when design.customerDetails changes
    useEffect(() => {
        if (design.customerDetails) {
            setCustomerDetailsState({
                name: design.customerDetails.name || '',
                email: design.customerDetails.email || '',
                phone: design.customerDetails.phone || '',
                address: design.customerDetails.address || '',
                photo: design.customerDetails.areaImgs || null
            });
        }
    }, [design.customerDetails]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerDetailsState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        setCustomerDetailsState((prev) => ({
            ...prev,
            photo: selectedFile,
        }));
    };

    const submitOrder = async (details: Design) => {
        try {
            const response = await axios.post('/api/order', details);
            await sendOrderEmailFromClient({
                orderId:response.data.orderId, 
                fromName:response.data.design.customerDetails.name ?? '',
                customerName:response.data.design.customerDetails.name ?? '',
                customerPhone: response.data.design.design.customerDetails.phone ?? ''
            });
        } catch (error) {
            console.error('Error posting design details:', error);
        }
    };
    const validateForm = () => {
        setError('');
        if (!customerDetails.name) {
            setError('Full Name is required');
        }
        if (customerDetails.email && !/\S+@\S+\.\S+/.test(customerDetails.email)) {
            setError('Email is invalid');
        }
        if (!customerDetails.phone.trim()) {
            setError('Phone number is required');
        } else if (!/^\d{10}$/.test(customerDetails.phone)) {
            setError('Phone number must be 10 digits');
        }

        if (!customerDetails.address.trim()) {
            setError('Address is required');
        }
        if (!customerDetails.photo) {
            setError('Photo is required');
        }
    };

    const handleSubmit = () => {
        validateForm();
        if (Object.keys(error).length > 0) {
            console.log('Validation errors:', error);
            return false;
        }

        setCustomerDetails(customerDetails);
        submitOrder({
            ...design,
            customerDetails: customerDetails
        });
        goToNextStep(currentStep);  
        router.push('/design/steps/finalize');

    };
 

    return (
        <div className="space-y-6">
             {error && (
        <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700 animate-shake">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={customerDetails.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email (Optional)
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={customerDetails.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={customerDetails.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={customerDetails.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="25/2 Baker St. UK"
                        />
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="p-4 bg-red-100 rounded-lg mt-4">
                        <div className="text-red-600 mb-3">
                            <p className="text-lg font-bold mb-2">
                                Guidelines
                            </p>
                            <ul className="ml-5 list-disc list-inside text-red-600 font-light">
                                <li>Ensure the entire area where the cupboard will be installed is visible in the photo.</li>
                                <li>Include nearby walls, ceilings, and floors for better context.</li>
                                <li>Avoid clutter; clear the area before taking the photo.</li>
                                <li>Use good lighting to capture details accurately.</li>
                                <li>Take the photo from multiple angles if needed for clarity.</li>
                            </ul>
                        </div>
                        <div className="flex items-center">
                            <label className="block text-md font-bold text-gray-700 mb-1 w-1/4 text-center">
                                Upload Photo:
                            </label>
                            <input
                                type="file"
                                name="photo"
                                onChange={handleFileChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Optional: Display the selected file */}
            {customerDetails.photo && (
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Selected File: {customerDetails.photo.name}</p>
                </div>
            )}
            <button
                onClick={handleSubmit}
                className="mt-6 px-4 py-2 text-white rounded-md bg-green-500 w-full hover:shadow-md"
            >
                Submit
            </button>
        </div>
    );
}
