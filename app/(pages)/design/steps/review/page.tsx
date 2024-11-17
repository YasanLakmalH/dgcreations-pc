'use client';
import React from 'react';
import { ClipboardCheck, MessageSquare } from 'lucide-react';
import { Measurements, Product } from '@/types/types';
import { useStore } from '@/store/useStore';
import { OrderType } from '@/types/types';
import axios from 'axios';
import { sendOrderEmailFromClient } from '@/mailService';

const submitOrder = async (details:OrderType) => {
    try {
      const response = await axios.post('/api/order', details);

    //   sendOrderEmailFromClient(details)
      console.log('Design details posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting design details:', error);
    }
  };
  

export default function Page() {
    const {design} = useStore();
    const setAdditionalNotes = useStore((state) => state.setAdditionalNotes);
    const formatMeasurements = (measurements: Measurements) => {
        return `${measurements.width}" × ${measurements.height}" × ${measurements.depth}"`;
    };
console.log(design.addon);
   
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3 text-2xl text-gray-800 mb-6">
                <ClipboardCheck className="w-8 h-8 text-indigo-600" />
                <h3 className="font-semibold">Review Your Design</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg transform hover:scale-105 transition-transform">
                        <h4 className="font-medium text-gray-900 mb-2">Measurements</h4>
                        <p className="text-gray-600">{formatMeasurements(design.measurements)}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg transform hover:scale-105 transition-transform">
                        <h4 className="font-medium text-gray-900 mb-2">Layout</h4>
                        <p className="text-gray-600 capitalize">{design.layout?.replace('-', ' ')}</p>
                    </div>

                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg transform hover:scale-105 transition-transform">
                        <h4 className="font-medium text-gray-900 mb-2">Material</h4>
                        <p className="text-gray-600 capitalize">{design.material?.replace('-', ' ')}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg transform hover:scale-105 transition-transform">
                        <h4 className="font-medium text-gray-900 mb-2">Storage Solutions</h4>
                        <ul className="list-disc list-inside text-gray-600">
                            {design.addon?.map((item: string) => (
                                <li key={item} className="capitalize">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg transform hover:scale-105 transition-transform">
                        <div className="flex items-center space-x-2 mb-2">
                            <MessageSquare className="w-5 h-5 text-indigo-600" />
                            <h4 className="font-medium text-gray-900">Additional Notes</h4>
                        </div>
                        <textarea
                            value={design.additionalNotes}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                            placeholder="Add any special requirements or notes (optional)"
                            className="w-full h-24 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                <h4 className="text-lg font-medium text-indigo-900 mb-2">Ready to proceed?</h4>
                <p className="text-indigo-700">
                    Please review all details carefully before proceeding to installation scheduling.
                </p>
            </div>
        </div>
    );
}