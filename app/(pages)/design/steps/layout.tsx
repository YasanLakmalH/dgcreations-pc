'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStep, useStore } from '@/store/useStore';
import StepIndicator from '../../../../components/StepIndicator';
import TipsCarousel from '@/components/tipsCarousel';
import { Step } from '@/types/types';
import {
  AlertCircle,
  Ruler,
  LayoutGrid,
  Palette,
  Layers,
  Package,
  ClipboardCheck,
  Calendar,
  Save,
} from 'lucide-react';
import StepIndicatorMobile from '@/components/stepIndicatorMobile';
const stepsList: Step[] = [
  { id: 1, title: 'Measurements', icon: Ruler, path: '/design/steps/measurements' },
  { id: 2, title: 'Layout', icon: LayoutGrid, path: '/design/steps/layout' },
  { id: 3, title: 'Style', icon: Palette, path: '/design/steps/style' },
  { id: 4, title: 'Material', icon: Layers, path: '/design/steps/material' },
  { id: 5, title: 'Add', icon: Package, path: '/design/steps/addOn' },
  { id: 6, title: 'Review', icon: ClipboardCheck, path: '/design/steps/review' },
  { id: 7, title: 'contact', icon: Calendar, path: '/design/steps/contact' },
  { id: 8, title: 'Finalize', icon: Save, path: '/design/steps/finalize' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { design } = useStore();
  const { currentStep } = useStep();
  const goToNextStep = useStep((state) => state.goToNextStep);
  const goToPreviousStep = useStep((state) => state.goToPreviousStep);
  const [error, setError] = useState('');

  const validateStep = () => {
    setError('');
    switch (currentStep) {
      case 1:
        const { width, height, depth } = design.measurements;
        if (!width || !height || !depth || width <= 0 || height <= 0 || depth <= 0) {
          setError('Please enter all measurements greater than 0');
          return false;
        }
        break;
      case 2:
        if (!design.layout) {
          setError('Please select a layout');
          return false;
        }
        break;
      case 3:
        if (!design.style) {
          setError('Please select style');
          return false;
        }
        break;
      case 4:
        if (!design.material) {
          setError('Please select a material');
          return false;
        }
        break;
      case 5:
        if (!design.addon.length) {
          setError('Please select at least one storage solution');
          return false;
        }
        break;
      case 7: ;
        const { name, email, phone, address, areaImgs } = design.customerDetails;
        if (!name || !email || !phone || !address || !areaImgs) {
          setError('Please complete all required customer details');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep() && currentStep <= stepsList.length) {
      goToNextStep(currentStep); 
      router.push(stepsList[currentStep].path);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      goToPreviousStep(currentStep);
      router.push(stepsList[currentStep - 2].path); // Navigate to the previous step's path
    }
  };
  return (

    <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in p-8 mt-16">
      <StepIndicator steps={stepsList} currentStep={currentStep} />
      <StepIndicatorMobile currentStep={currentStep} />
      {error && (
        <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700 animate-shake">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <div className="px-4 py-11 sm:px-6 transition-all duration-300 animate-fade-in">
        <div className={`grid ${currentStep < 5 ? 'md:grid-cols-3':'' } `}> 
          {children} 
          <div className='lg:px-10 sm:h-full md:full lg:h-32'>
          {currentStep < 5 ? (<TipsCarousel currentStepId={stepsList[currentStep - 1].id} title={stepsList[currentStep-1].title} />):''}
          </div>
        </div>

      </div>

      <div className="px-4 sm:px-6">
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-105
               bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:shadow-sm ${currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : currentStep === stepsList.length ? 'hidden' : 'block'} }
                `}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === stepsList.length + 1}
            className={`px-6 py-2 rounded-md transition-all duration-200 transform hover:scale-105 ${currentStep === stepsList.length+1
                ? 'hidden'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
              }`}
          >
            {currentStep === stepsList.length ? 'Finish' : 'Next'}
            `${currentStep}`
          </button>
        </div>
      </div>
    </div>
  );
}
