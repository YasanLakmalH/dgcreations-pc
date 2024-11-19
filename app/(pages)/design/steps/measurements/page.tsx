'use client';
import { Ruler } from 'lucide-react';
import { useStore, useStep } from '@/store/useStore'; // Adjust the import path
import { use, useEffect } from 'react';

export default function Page() {
  const design = useStore((state) => state.design);
  const setMeasurements = useStore((state) => state.setMeasurements);
  const clearDesign = useStore((state) => state.reset);
  const resetStep = useStep((state) => state.reset);

  useEffect(() => {
    if(design){
      clearDesign();
      resetStep();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements({
      ...design.measurements,
      [name]: parseInt(value, 10),
    });
  };

  return (
    <div className="space-y-6 my-10">

      <div className="grid md:grid-cols-2 gap-6">
        <div className='grid'>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Width (inches)
            </label>
            <input
              type="number"
              name="width"
              value={design.measurements.width}
              onChange={handleChange}
              min={0}
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
              min={0}
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
              min={0}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter depth"
            />
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg ">
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Measurement Tips
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-600 ">
            <li>Measure at multiple points to account for any variations</li>
            <li>Include any trim or molding in your measurements</li>
            <li>Double-check all measurements for accuracy</li>
            <li>Consider door swing clearance in your depth measurement</li>
          </ul>
       
        </div>


      </div>


    </div>
  );
}
