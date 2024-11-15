'use client';
import { LayoutGrid } from 'lucide-react';
import { useStore } from '@/store/useStore';

const layouts = [
  {
    id: 'straight',
    name: 'Straight Layout',
    description: 'Perfect for narrow spaces and single wall installations',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'l-shaped',
    name: 'L-Shaped Layout',
    description: 'Ideal for corner spaces, maximizing storage capacity',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'u-shaped',
    name: 'U-Shaped Layout',
    description: 'Maximum storage capacity with easy access to all areas',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'galley',
    name: 'Galley Layout',
    description: 'Parallel storage walls for efficient organization',
    image: 'https://images.unsplash.com/photo-1600566752229-250ed26502a1?auto=format&fit=crop&w=500&q=60'
  }
];

export default function Page() {
    const {design} = useStore();
    const setLayout = useStore((state) => state.setLayout);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 text-2xl text-gray-800 mb-6">
        <LayoutGrid className="w-8 h-8 text-indigo-600" />
        <h3 className="font-semibold">Choose Layout</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {layouts.map((layout) => (
          <div
            key={layout.id}
            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
              design.layout === layout.id
                ? 'ring-2 ring-indigo-600'
                : 'hover:shadow-lg'
            }`}
            onClick={() => setLayout(layout.name)}
          >
            <img
              src={layout.image}
              alt={layout.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h4 className="font-medium text-gray-900">{layout.name}</h4>
              <p className="mt-1 text-sm text-gray-500">{layout.description}</p>
            </div>
            {design.layout === layout.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
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

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-medium text-gray-900 mb-2">Layout Considerations</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Consider the rooms shape and size</li>
          <li>Think about traffic flow and accessibility</li>
          <li>Account for door swings and other obstacles</li>
          <li>Plan for adequate workspace and storage needs</li>
        </ul>
      </div>
    </div>
  );
}