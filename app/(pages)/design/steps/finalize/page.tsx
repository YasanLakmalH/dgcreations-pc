'use client'
import axios from 'axios';
import React from 'react';
import { useStore } from '@/store/useStore';
import { Design } from '@/types/types';

// Example usage:
const designDetails = {
  measurements: {
    width:10,
    height:10,
    depth:10
  },
    layout: "layout 1", 
    style: "style 1",   
    material: "Wood",
    addon: ["desk","chair"],
    additionalNotes: "dfaf",
    customerDetails: {
      name: "jhone",
      email: "Jhon@gmail.com",
      phone: "123456789",
      address: "address",
      location: "location",
      areaImgs: ["img1","img2"]
    }
};

const postDesignDetails = async (details:Design) => {
  try {
    const response = await axios.post('/api/design', details);
    console.log('Design details posted successfully:', response.data);
  } catch (error) {
    console.error('Error posting design details:', error);
  }
};

postDesignDetails(designDetails);




export default function Page() {
    const {design} = useStore();

  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-6 rounded-lg mb-8">
        <h4 className="text-lg font-medium text-green-900 mb-2">
          Design Complete!
        </h4>
        <p className="text-green-700">
          Your custom pantry design has been saved. Our team will review your design
          and contact you within 24 hours to discuss the next steps.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Whats Next?</h4>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-600">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-sm">1</span>
              Design Review Call
            </li>
            <li className="flex items-center text-gray-600">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-sm">2</span>
              Final Quote Preparation
            </li>
            <li className="flex items-center text-gray-600">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-sm">3</span>
              Manufacturing Process
            </li>
            <li className="flex items-center text-gray-600">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 text-sm">4</span>
              Installation Day
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Installation Details</h4>
          <div className="space-y-3 text-gray-600">
            
            <p>
              <strong>Contact:</strong>{' '}
              {design.customerDetails?.name}
            </p>
            <p>
              <strong>Email:</strong>{' '}
              {design.customerDetails?.email}
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              {design.customerDetails?.phone}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-medium text-gray-900 mb-2">Need Help?</h4>
        <p className="text-gray-600 mb-4">
          If you have any questions about your design or the next steps,
          our support team is here to help.
        </p>
        <button className="inline-flex items-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}