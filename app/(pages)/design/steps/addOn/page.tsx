'use client'

import React from 'react';
import { useStore,useStep } from '@/store/useStore';
import { useRouter } from 'next/navigation';


const addOns = [{
  id: 'bottlerack',
  name: 'Bottle Rack',
  description: 'Stylish and space-saving storage for your bottles',
},
{
  id: 'cookerhood',
  name: 'Cooker Hood',
  description: 'Sleek design to keep your kitchen fresh and smoke-free',
},
{
  id: 'barcounter',
  name: 'Bar Counter',
  description: 'Add a touch of elegance with a functional bar area',
},
{
  id: 'diningtable',
  name: 'Dining Table',
  description: 'Integrated dining solution for compact spaces',
},
{
  id: 'ovencupboard',
  name: 'Oven Cupboard',
  description: 'Dedicated space for seamless oven placement',
},
{
  id: 'larderrack',
  name: 'Larder Rack',
  description: 'Optimize storage with a pull-out larder rack',
},
{
  id: 'lighting',
  name: 'Lighting',
  description: 'Enhance your pantry with modern, customizable lighting',
},
{
  id: 'None',
  name: 'None',
  description: 'Keep it simple without adding extra features',
}
]

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
    <div >
      <div className="grid md:grid-cols-2 gap-4">
        {addOns.map((option) => (
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