import { DesignState, Measurements, Customer, Product, StepState} from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create<DesignState>()(
  persist(
    (set) => ({
      design: {
        measurements: {
          width: 0,
          height: 0,
          depth: 0,
        },
        layout: '',
        style: '',
        material: '',
        addon: [],
        additionalNotes: '',
        customerDetails: {
            name: '',
            email: '',
            phone: '',
            location: '',
            areaImgs: undefined
          }       
        
      },
      setMeasurements: (measurements: Measurements) => set((state) => ({
        design: {
          ...state.design,
          measurements,
        },
      })),
      setLayout: (layout: string) => set((state) => ({
        design: {
          ...state.design,
          layout,
        },
      })),
      setStyle: (style: string) => set((state) => ({
        design: {
          ...state.design,
          style,
        },
      })),
      setColorPalette: (color: string) => set((state) => ({
        design: {
          ...state.design,
          color,
        },
      })),
      setMaterial: (material: string) => set((state) => ({
        design: {
          ...state.design,
          material,
        },
      })),
      setCustomerDetails: (customerDetails: Customer) => set((state) => ({
        design: {
          ...state.design,
            customerDetails
        },
      })),
    
    setAdditionalNotes: (note: string) => set((state) => ({
      design: {
        ...state.design,
        additionalNotes: note,
      },
    })),
    setAddon: (item: string) => set((state) => ({
      design: {
        ...state.design, // Spread the rest of the design object
        addon: state.design.addon.includes(item)
          ? state.design.addon.filter((addonItem) => addonItem !== item)  // Remove the item if it already exists
          : [...state.design.addon, item]  // Add the item if it doesn't exist
      }
    })),
    reset: () => set({
      design: {
        measurements: {
          width: 0,
          height: 0,
          depth: 0,
        },
        layout: '',
        style: '',
        material: '',
        addon: [],
        additionalNotes: '',
        customerDetails: {
          name: '',
          email: '',
          phone: '',
          location: '',
          areaImgs: undefined
        }
      }
    }),
    
  }),
  { name: 'store-storage' }
));


export const useStep = create<StepState>()(
  persist(
    (set) => ({
      currentStep: 1,
      goToNextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      goToPreviousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
      reset: () => set({ currentStep: 1 })
    }),
    
    { name: 'step-storage' }
  )
);