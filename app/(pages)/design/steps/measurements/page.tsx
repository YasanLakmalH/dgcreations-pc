'use client';
import { useStore, useStep } from '@/store/useStore'; // Adjust the import path
import { useEffect } from 'react';

export default function Page() {
  const design = useStore((state) => state.design);
  const setMeasurements = useStore((state) => state.setMeasurements);
  const clearDesign = useStore((state) => state.reset);
  const resetStep = useStep((state) => state.reset);

  useEffect(() => {
    if (design) {
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

    <div className='grid gird-rows-1 col-span-2 px-10 '>
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
  );
}
