'use client'

import React from 'react';
import { Calendar } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Page() {
    const {design} = useStore();
    const setCustomerDetails = useStore((state) => state.setCustomerDetails);
    const setPrefferedDate = useStore((state) => state.setPreferredDate);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3 text-2xl text-gray-800 mb-6">
                <Calendar className="w-8 h-8 text-indigo-600" />
                <h3 className="font-semibold">Schedule Installation</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Contact Information</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={design.installation?.customerDetails?.name || ''}
                            onChange={(e) => setCustomerDetails({ ...design.installation.customerDetails, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={design.installation?.customerDetails?.email || ''}
                            onChange={(e) => setCustomerDetails({ ...design.installation.customerDetails, email: e.target.value })}
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
                            value={design.installation?.customerDetails?.phone || ''}
                            onChange={(e) => setCustomerDetails({ ...design.installation.customerDetails, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your phone number"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Installation Date</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Date
                        </label>
                        <input
                            type="date"
                            value={design.installation?.preferredDate || ''}
                            onChange={(e) => setPrefferedDate(e.target.value )}
                            min={minDate}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg mt-4">
                        <p className="text-sm text-gray-600">
                            Installation typically takes 1-2 days depending on the complexity of your design.
                            Our team will contact you to confirm the exact schedule.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}