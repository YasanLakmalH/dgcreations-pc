'use client'
import React from 'react';
import { Palette, Paintbrush } from 'lucide-react';
import { useStore } from '@/store/useStore';


const styles = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean lines and minimalist design',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'traditional',
    name: 'Traditional',
    description: 'Classic design with timeless appeal',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Can be discussed',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=500&q=60'
  },
];

export default function Page() {
  const { design } = useStore();
  const setStyle = useStore((state) => state.setStyle);

  const styles = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean lines and minimalist design',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 'traditional',
      name: 'Traditional',
      description: 'Classic design with timeless appeal',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 'other',
      name: 'Other',
      description: 'Can be discussed',
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=500&q=60'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Style Selection */}
        <div className="lg:col-span-2 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map((style) => (
            <div
              key={style.id}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                design.style === style.name
                  ? 'ring-2 ring-indigo-600 shadow-lg'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setStyle(style.name)}
            >
              <img
                src={style.image}
                alt={style.name}
                className="w-full h-80 object-cover"
              />
              <div className="p-4 bg-white">
                <h4 className="font-medium text-gray-900">{style.name}</h4>
                <p className="mt-1 text-sm text-gray-500">{style.description}</p>
              </div>
            
            </div>
          ))}
        </div>

        {/* Right Section: Style Considerations */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-medium text-gray-900 mb-2">Style Considerations</h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Consider your homes existing style</li>
            <li>Think about long-term appeal</li>
            <li>Balance aesthetics with functionality</li>
            <li>Choose finishes that complement your space</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
