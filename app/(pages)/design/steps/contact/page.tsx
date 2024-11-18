'use client';
import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import axios from 'axios';
import { Design, OrderType } from '@/types/types';

export default function Page() {
    const { design } = useStore();
    const setCustomerDetails = useStore((state) => state.setCustomerDetails);

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

            console.log('Design details posted successfully:', response.data);
        } catch (error) {
            console.error('Error posting design details:', error);
        }
    };

    const handleSubmit = () => {
        // Debugging: Log the customer details before saving them
        console.log('Customer details before submission:', customerDetails);

        // Check if any required fields are empty before submitting
        if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
            console.error('Required fields are missing!');
            return;
        }

        setCustomerDetails(customerDetails);
        submitOrder({
            ...design,
            customerDetails: customerDetails
        });
    };

    return (
        <div className="space-y-6">
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
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
                Submit
            </button>
        </div>
    );
}
