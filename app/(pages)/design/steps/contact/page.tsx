// Import Firebase Storage and necessary dependencies
'use client';
import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import axios from 'axios';
import { Design } from '@/types/types';
import { sendOrderEmailFromClient } from '@/mailService';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStep } from '@/store/useStore';
import { BASE_API_URL } from '@/constants/constants';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '@/lib/firestore'; // Adjust path if needed

export default function Page() {
  const { design } = useStore();
  const setCustomerDetails = useStore((state) => state.setCustomerDetails);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { currentStep } = useStep();
  const goToNextStep = useStep((state) => state.goToNextStep);
  const clearDesign = useStore((state) => state.reset);
  const [isSubmitted, setSubmitted] = useState(false);
  const [isUploading, setUploading] = useState(false);

  const [customerDetails, setCustomerDetailsState] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
    areaImgs: string;
  }>({
    name: design.customerDetails?.name || '',
    email: design.customerDetails?.email || '',
    phone: design.customerDetails?.phone || '',
    address: design.customerDetails?.address || '',
    areaImgs: design.customerDetails?.areaImgs || '',
  });

  useEffect(() => {
    if (design.customerDetails) {
      setCustomerDetailsState({
        name: design.customerDetails.name || '',
        email: design.customerDetails.email || '',
        phone: design.customerDetails.phone || '',
        address: design.customerDetails.address || '',
        areaImgs: design.customerDetails.areaImgs || '',
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setUploading(true); // Set uploading state
      try {
        const storageRef = ref(storage, `images/${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        setCustomerDetailsState((prev) => ({
          ...prev,
          areaImgs: downloadURL,
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setUploading(false);
      }
    } else {
      alert('Please select an image file.');
    }
  };

  const submitOrder = async (details: Design) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/api/order`, details);
      console.log('data:', response.data);
      return response.data["orderId"];
    } catch (error) {
      console.error('Error posting design details:', error);
    }
  };
  
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!customerDetails.name.trim()) errors.name = 'Full Name is required';
    if (customerDetails.email && !/\S+@\S+\.\S+/.test(customerDetails.email)) errors.email = 'Email is invalid';
    if (!customerDetails.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerDetails.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (!customerDetails.address.trim()) errors.address = 'Address is required';
    if (!customerDetails.areaImgs) errors.areaImgs = 'Photo is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    if (!BASE_API_URL) return;

    const isValid = validateForm();
    if (!isValid) {
      setSubmitted(false);
      return;
    }

    setCustomerDetails(customerDetails);
    const id = await submitOrder({
      ...design,
      customerDetails: customerDetails,
    });
    
    await sendOrderEmailFromClient({
      orderId: id,
      fromName: customerDetails.name ?? 'Unknown',
      customerName: customerDetails.name ?? 'Unknown',
      customerPhone: customerDetails.phone ?? 'No phone number',
    });
    
    clearDesign();
    goToNextStep(currentStep);
    router.push('/design/steps/finalize');
  };

  return (
    <div className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start text-red-700 animate-shake">
          <AlertCircle className="w-5 h-5 mr-2 mt-1" />
          <ul>
            {Object.values(errors).map((error, index) => (
              <li key={index} className="text-sm">{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
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
              <p className="text-lg font-bold mb-2">Guidelines</p>
              <ul className="ml-5 list-disc list-inside text-red-600 font-light">
                <li>Ensure the entire area where the cupboard will be installed is visible in the photo.</li>
                <li>Include nearby walls, ceilings, and floors for better context.</li>
                <li>Use the highest quality possible.</li>
              </ul>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={isSubmitted || isUploading}
        className="mt-6 px-4 py-2 text-white rounded-md bg-green-500 w-full hover:shadow-md"
      >
        {isSubmitted ? 'Submitting....' : 'Submit'}
      </button>
    </div>
  );
}
