import { LucideIcon } from 'lucide-react';

export type Step = {
    id: number;
    title: string;
    icon: LucideIcon;
    path:string;
  }
export type Customer = {
    name:string;
    email:string;
    phone:string;
    location:string;
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
    color: string;   
    material: string; 
    addon: Product[];
    additionalNotes: string;
    installation: {
        customerDetails: Customer;
        preferredDate: string;
    };
}
export interface DesignState{
    design:Design;
    setMeasurements:(measurements:Measurements) => void;
    setLayout:(layout:string) => void;
    setStyle:(style:string) => void;
    setColorPalette:(color:string) => void;
    setMaterial:(material:string) => void;
    setCustomerDetails:(details:Customer) => void;
    setPreferredDate:(date:string) => void;
    setAdditionalNotes:(note:string) => void;
    setAddon:(items:Product[]) => void;
}
export interface StepState{
    currentStep:number;
    goToNextStep:(currentStep:number) => void;
    goToPreviousStep:(currentStep:number) => void;
    reset: () => void;
}