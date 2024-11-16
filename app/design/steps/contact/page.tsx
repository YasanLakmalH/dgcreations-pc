'use client'

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';



export default function Page() {
    const { design } = useStore();
    const setCustomerDetails = useStore((state) => state.setCustomerDetails);

    // State for each field
    const [name, setName] = useState(design.customerDetails?.name || '');
    const [email, setEmail] = useState(design.customerDetails?.email || '');
    const [phone, setPhone] = useState(design.customerDetails?.phone || '');
    const [address, setAddress] = useState(design.customerDetails?.address || '');
    const [photo, setPhoto] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            setPhoto(selectedFile);
        }
    };

    const handleSubmit = () => {
        // Handle submit logic, e.g., update global state or send to server
        const updatedCustomerDetails = {
            name,
            email,
            phone,
            address,
            photo, // You can send photo or its URL to the backend
            location: design.customerDetails?.location || '',
            areaImgs: design.customerDetails?.areaImgs || [],
        };

        setCustomerDetails(updatedCustomerDetails);  // Store updated details
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                                name="imgs"
                                onChange={handleFileChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Optional: Display the selected file */}
            {photo && (
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Selected File: {photo.name}</p>
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
