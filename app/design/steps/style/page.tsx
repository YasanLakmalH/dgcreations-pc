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
    id: 'rustic',
    name: 'Rustic',
    description: 'Warm and natural materials',
    image: 'https://images.unsplash.com/photo-1600566752734-2a0cd26b956b?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    description: 'Current trends with a sophisticated touch',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=500&q=60'
  }
];

const colorPalettes = [
  {
    id: 'neutral',
    name: 'Neutral Elegance',
    colors: ['#F5F5F5', '#E0E0E0', '#9E9E9E', '#616161'],
    description: 'Timeless grays and whites'
  },
  {
    id: 'warm',
    name: 'Warm Natural',
    colors: ['#FDFBF3', '#E6D5AC', '#C8B6A6', '#8B7355'],
    description: 'Earth tones and warm woods'
  },
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    colors: ['#263238', '#455A64', '#78909C', '#CFD8DC'],
    description: 'Bold and sophisticated'
  },
  {
    id: 'coastal',
    name: 'Coastal Fresh',
    colors: ['#FFFFFF', '#E3F2FD', '#90CAF9', '#2196F3'],
    description: 'Light and airy blues'
  }
];

export default function Page() {

  const {design} = useStore();
  const setColorPalette = useStore((state) => state.setColorPalette);
  const setStyle = useStore((state) => state.setStyle);

  return (
    <div className="space-y-8">
      {/* Style Selection */}
      <div>
        <div className="flex items-center space-x-3 text-2xl text-gray-800 mb-6">
          <Palette className="w-8 h-8 text-indigo-600" />
          <h3 className="font-semibold">Select Style</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {styles.map((style) => (
            <div
              key={style.id}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                design.style === style.id
                  ? 'ring-2 ring-indigo-600 shadow-lg'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setStyle(style.name)}
            >
              <img
                src={style.image}
                alt={style.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-white">
                <h4 className="font-medium text-gray-900">{style.name}</h4>
                <p className="mt-1 text-sm text-gray-500">{style.description}</p>
              </div>
              {design.style === style.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center animate-scale-in">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette Selection */}
      <div className="mt-12">
        <div className="flex items-center space-x-3 text-2xl text-gray-800 mb-6">
          <Paintbrush className="w-8 h-8 text-indigo-600" />
          <h3 className="font-semibold">Choose Color Palette</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {colorPalettes.map((palette) => (
            <div
              key={palette.id}
              onClick={() => setColorPalette(palette.name)}
              className={`bg-white p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                design.color === palette.id
                  ? 'ring-2 ring-indigo-600 shadow-md'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="flex space-x-1 h-12 mb-3 rounded-md overflow-hidden">
                {palette.colors.map((color) => (
                  <div
                    key={color}
                    className="flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{palette.name}</h4>
              <p className="text-sm text-gray-500">{palette.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-medium text-gray-900 mb-2">Style Guide</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Consider your homes existing style</li>
          <li>Think about long-term appeal</li>
          <li>Balance aesthetics with functionality</li>
          <li>Choose finishes that complement your space</li>
        </ul>
      </div>
    </div>
  );
}