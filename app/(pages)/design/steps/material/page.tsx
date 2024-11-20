'use client'

import React from 'react';
import { Layers } from 'lucide-react';
import { useStore } from '@/store/useStore';

const materials = [
  {
    id: 'plywood',
    name: 'Plywood',
    description: 'Versatile and durable engineered wood',
    image: '/material/plywood.webp'
  },
  {
    id: 'melamine',
    name: 'Melamine',
    description: 'Easy-to-clean, affordable surface with a smooth finish',
    image: '/material/melamine.webp'
  },
  {
    id: 'pvc',
    name: 'PVC',
    description: 'Lightweight, waterproof, and versatile plastic material',
    image: '/material/pvc.webp'
  },
  {
    id: 'polyester',
    name: 'Polyester',
    description: 'Affordable and durable synthetic finish',
    image: '/material/polyester.webp'
  },
  {
    id: 'mdf',
    name: 'MDF',
    description: 'Smooth and stable engineered wood, great for painting',
    image: '/material/mdf.webp'
  },
  {
    id: 'other',
    name: 'Other',
    description: 'discuss with professionals',
    image: '/material/plywoodkc.webp'
  }
];

export default function Page() {
  const { design } = useStore();
  const setMaterial = useStore((state) => state.setMaterial);

  return (
    <div className="col-span-2">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Material Selection */}
        <div className="lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-1">
          {materials.map((material) => (
            <div
              key={material.id}
              className={`bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${design.material === material.id
                  ? 'ring-2 ring-indigo-600'
                  : 'hover:shadow-lg'
                }`}
              onClick={() => setMaterial(material.id)}
            >
              <img
                src={material.image}  
                alt={material.name}
                className="w-full h-20 object-cover"
              />
              <div className="p-4">
                <h4 className="font-medium text-gray-900">{material.name}</h4>
                <p className="mt-1 text-sm text-gray-500">{material.description}</p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
