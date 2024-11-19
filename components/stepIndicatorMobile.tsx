import React from 'react';
import { LucideIcon } from 'lucide-react';
import {
    Ruler,
    LayoutGrid,
    Palette,
    Layers,
    Package,
    ClipboardCheck,
    Calendar,
    Save,
} from 'lucide-react';

interface Step {
    id: number;
    title: string;
    icon: LucideIcon;
    path: string;
}

interface Props {
    currentStep: number;
}

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


export default function StepIndicatorMobile({ currentStep }: Props) {
    const Icon = stepsList[currentStep].icon;
    return (
        <React.Fragment key={stepsList[currentStep].id}>
            <div className="md:hidden flex flex-col items-center">
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-indigo-600">
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <span
                    className="mt-2 text-sm text-indigo-600 font-medium">
                    {stepsList[currentStep].title}
                </span>
            </div>
            {currentStep - 1 < stepsList.length - 1 && (
                <div
                    className="flex-1 h-1 mx-4 rounded-full transition-colors"
                />
            )}
        </React.Fragment>
    );
}
