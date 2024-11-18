'use client'

import React from 'react';
import { useStore,useStep } from '@/store/useStore';
import { useRouter } from 'next/navigation';
const storageOptions = [  
  {
    id: 'adjustable-shelves',
    name: 'Adjustable Shelves',
    description: 'Flexible shelving that can be modified to fit your needs',
  },
  {
    id: 'pull-out-drawers',
    name: 'Pull-out Drawers',
    description: 'Smooth-gliding drawers for easy access to items',
  },
  {
    id: 'spice-racks',
    name: 'Spice Racks',
    description: 'Organized storage for spices and small containers',
  },
  {
    id: 'wine-rack',
    name: 'Wine Rack',
    description: 'Specialized storage for wine bottles',
  },
  {
    id: 'door-organizer',
    name: 'Door Organizer',
    description: 'Additional storage space on pantry doors',
  },
  {
    id: 'lazy-susan',
    name: 'Lazy Susan',
    description: 'Rotating shelves for corner spaces',
  },
  {
    id: 'fridge',
    name: 'Door Organizer',
    description: 'Additional storage space on pantry doors',
  },
  {
    id: 'washine-machine',
    name: 'Lazy Susan',
    description: 'Rotating shelves for corner spaces',
  }
];

export default function Page() {
  const { currentStep } = useStep();
  const goToNextStep = useStep((state) => state.goToNextStep);
  const [addOnList, setAddOnList] = React.useState<string[]>([]);
  const setAddOn = useStore((state) => state.setAddon);
  const router = useRouter();

const confirmAddons = () => { 
  addOnList.forEach((addOn) => setAddOn(addOn));
  goToNextStep(currentStep);
  router.push('/design/steps/review');  
}
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {storageOptions.map((option) => (
          <div
            key={option.id}
            className={`p-4 rounded-lg shadow-lg cursor-pointer transition-all duration-200 ${
              addOnList?.includes(option.id)
                ? 'bg-indigo-50 ring-2 ring-indigo-600'
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => {
              setAddOnList((prevList) => {
                if (prevList.includes(option.id)) {
                  // Remove the option id if it's already in the list
                  return prevList.filter((id) => id !== option.id);
                } else {
                  // Add the option id if it's not in the list
                  return [...prevList, option.id];
                }
              });
            }}
            
          >
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">{option.name}</h4>
                  
                </div>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`${addOnList.length > 0 ? 'block' : 'hidden'} mt-8 flex justify-center`}>
        <a href='/design/steps/review' className='w-full'>
          <button onClick={confirmAddons} className='text-white w-full bg-green-500 p-4 rounded-lg '>Confirm selected</button>
        </a>
      </div>
    </div>
  );  
}