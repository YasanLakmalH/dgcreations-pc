import React from 'react';
import { Package } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Product } from '@/types/types';

const storageOptions = [  
  {
    id: 'adjustable-shelves',
    name: 'Adjustable Shelves',
    description: 'Flexible shelving that can be modified to fit your needs',
    icon: '📚',
  },
  {
    id: 'pull-out-drawers',
    name: 'Pull-out Drawers',
    description: 'Smooth-gliding drawers for easy access to items',
    icon: '🗄️',
  },
  {
    id: 'spice-racks',
    name: 'Spice Racks',
    description: 'Organized storage for spices and small containers',
    icon: '🌶️',
  },
  {
    id: 'wine-rack',
    name: 'Wine Rack',
    description: 'Specialized storage for wine bottles',
    icon: '🍷',
  },
  {
    id: 'door-organizer',
    name: 'Door Organizer',
    description: 'Additional storage space on pantry doors',
    icon: '🚪',
  },
  {
    id: 'lazy-susan',
    name: 'Lazy Susan',
    description: 'Rotating shelves for corner spaces',
    icon: '🔄',
  }
];

const addOnList:Product[] = [];

export default function Page() {
  const {design} = useStore();
  const setAddon = useStore((state) => state.setAddon);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 text-2xl text-gray-800 mb-6">
        <Package className="w-8 h-8 text-indigo-600" />
        <h3 className="font-semibold">Storage Solutions</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {storageOptions.map((option) => (
          <div
            key={option.id}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              design.addon?.includes(option)
                ? 'bg-indigo-50 ring-2 ring-indigo-600'
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => addOnList.push(option)}
          >
            <div className="flex items-start space-x-4">
              <span className="text-2xl">{option.icon}</span>
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

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <button onClick={() => setAddon(addOnList)}>Confirm selected</button>
        <p className="text-gray-600">
          Choose the storage solutions that best fit your needs. You can combine multiple options.
        </p>
      </div>
    </div>
  );
}