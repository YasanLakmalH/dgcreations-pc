'use client';
import { Ruler } from 'lucide-react';
import { useStore } from '@/store/useStore'; // Adjust the import path

export default function Page() {
  const design = useStore((state) => state.design);
  const setMeasurements = useStore((state) => state.setMeasurements);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements({
      ...design.measurements,
      [name]: parseInt(value, 10),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 text-2xl text-gray-800 mb-6">
        <Ruler className="w-8 h-8 text-indigo-600" />
        <h3 className="font-semibold">Enter Measurements</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Width (inches)
          </label>
          <input
            type="number"
            name="width"
            value={design.measurements.width}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter width"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (inches)
          </label>
          <input
            type="number"
            name="height"
            value={design.measurements.height}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter height"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Depth (inches)
          </label>
          <input
            type="number"
            name="depth"
            value={design.measurements.depth}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter depth"
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-medium text-gray-900 mb-2">
          Measurement Tips
        </h4>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Measure at multiple points to account for any variations</li>
          <li>Include any trim or molding in your measurements</li>
          <li>Double-check all measurements for accuracy</li>
          <li>Consider door swing clearance in your depth measurement</li>
        </ul>
      </div>

      <div className="flex items-center mt-6 p-4 bg-blue-50 rounded-lg">
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Request Professional Measurement
        </button>
      </div>
    </div>
  );
}
