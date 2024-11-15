import React from 'react';
import { Layers } from 'lucide-react';
import { useStore } from '@/store/useStore';

const materials = [
  {
    id: 'solid-wood',
    name: 'Solid Wood',
    description: 'Natural beauty and durability',
    price: 'High',
    maintenance: 'Moderate',
    image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'mdf',
    name: 'MDF with Finish',
    description: 'Versatile and cost-effective',
    price: 'Medium',
    maintenance: 'Low',
    image: 'https://images.unsplash.com/photo-1600566753225-3c64b565d2c4?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'laminate',
    name: 'Laminate',
    description: 'Durable and easy to clean',
    price: 'Low',
    maintenance: 'Very Low',
    image: 'https://images.unsplash.com/photo-1600566752289-8d091cc7a6dc?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'thermofoil',
    name: 'Thermofoil',
    description: 'Seamless finish and moisture resistant',
    price: 'Medium',
    maintenance: 'Low',
    image: 'https://images.unsplash.com/photo-1600566752826-461c1b5c2a3b?auto=format&fit=crop&w=500&q=60'
  }
];

export default function Page() {
    const {design} = useStore();
    const setMaterial = useStore((state) => state.setMaterial)

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 text-2xl text-gray-800 mb-6">
        <Layers className="w-8 h-8 text-indigo-600" />
        <h3 className="font-semibold">Select Material</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {materials.map((material) => (
          <div
            key={material.id}
            className={`bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
              design.material === material.id
                ? 'ring-2 ring-indigo-600'
                : 'hover:shadow-lg'
            }`}
            onClick={() => setMaterial(material.id)}
          >
            <img
              src={material.image}
              alt={material.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="font-medium text-gray-900">{material.name}</h4>
              <p className="mt-1 text-sm text-gray-500">{material.description}</p>
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-gray-600">Price: {material.price}</span>
                <span className="text-gray-600">Maintenance: {material.maintenance}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-medium text-gray-900 mb-2">Material Guide</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Consider your budget and long-term value</li>
          <li>Think about maintenance requirements</li>
          <li>Factor in durability needs</li>
          <li>Match material to your usage patterns</li>
        </ul>
      </div>
    </div>
  );
}