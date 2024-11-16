import { LucideIcon } from 'lucide-react';

export type Step = {
    id: number;
    title: string;
    icon: LucideIcon;
    path:string;
  }
  interface Customer {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    location?: string;
    areaImgs?: string[];
}

export type Measurements = {
    width:number;
    height:number;
    depth:number;
}
export type Product = {
    id:string;
    name:string;
}
export interface Design {
    measurements: Measurements;
    layout: string;   
    style: string;    
    material: string; 
    addon: string[];
    additionalNotes: string;
    customerDetails: Customer;
    
}
export interface DesignState{
    design:Design;
    setMeasurements:(measurements:Measurements) => void;
    setLayout:(layout:string) => void;
    setStyle:(style:string) => void;
    setColorPalette:(color:string) => void;
    setMaterial:(material:string) => void;
    setCustomerDetails:(details:Customer) => void;
    setAdditionalNotes:(note:string) => void;
    setAddon:(item:string) => void;
    reset:(design:Design) => void;
}
export interface StepState{
    currentStep:number;
    goToNextStep:(currentStep:number) => void;
    goToPreviousStep:(currentStep:number) => void;
    reset: () => void;
}