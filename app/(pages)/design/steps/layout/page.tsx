'use client';
import { LayoutGrid } from 'lucide-react';
import { useStore } from '@/store/useStore';

const layouts = [
  
  {
    id: 'Top',
    name: 'Top Cupboard',
    description: 'fdfsdfdsfs',
    image: '/layout/top.webp'
  },
  {
    id: 'Bottom',
    name: 'Bottom Cupboard',
    description: 'lorum ipsum',
    image: '/layout/bottom.webp'
  },
  {
    id: 'Both',
    name: 'Both Cupboard',
    description: 'fdsfdsfs',
    image: '/layout/both.webp'
  }
];
export default function Page() {
  const { design } = useStore();
  const setLayout = useStore((state) => state.setLayout);

  return (
    <div className='col-span-2'>
        {/* Left Section: Layout Selection */}
        <div className="lg:col-span-2 grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {layouts.map((layout) => (
            <div
              key={layout.id}
              className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                design.layout === layout.name
                  ? 'ring-2 ring-indigo-600'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setLayout(layout.name)}
            >
              <img
                src={layout.image}
                alt={layout.name}
                className="w-full h-80 object-cover"
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

        
      </div>
  );
}
