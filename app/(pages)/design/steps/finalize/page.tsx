'use client'
import React from 'react';
import { useStep} from '@/store/useStore';
import { useRouter } from 'next/navigation';

export default function Page() {
    const resetStep = useStep((state) => state.reset);
    const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="space-y-6">
       <div className='flex justify-center w-full'>
      <h1 className='text-3xl font-bold text-green-500'>Thank You For Your Order!</h1>
      </div>
      <div className="bg-green-50 p-6 rounded-lg mb-8">
        <h4 className="text-lg font-medium text-green-900 mb-2">
          Design Complete!
        </h4>
        <p className="text-green-700">
          Your custom pantry design has been saved. Our team will review your design
          and contact you within 24 hours to discuss the next steps.
        </p>
      </div>
        <div className='flex justify-center'>
      <a href='/'> <button
       className=' mt-6 px-4 py-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700' 
        onClick={handleGoHome}
       >Go To Home</button></a>
      </div>
      <div className="flex justify-center w-full">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full">
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