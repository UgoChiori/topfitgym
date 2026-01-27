/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface GymState {
  step: number;
  isYearly: boolean;
  formData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    goals: string[];
    selectedPlan: any; 
  };
  setStep: (step: number) => void;
  setPlan: (plan: any, isYearly: boolean) => void;
  updateDetails: (details: any) => void;
  reset: () => void;
}

export const useGymStore = create<GymState>()(
  persist(
    (set) => ({
      step: 1,
      isYearly: false,
      formData: {
        fullName: '',
        email: '',
        phoneNumber: '',
        goals: [],
        selectedPlan: null,
      },
      setStep: (step) => set({ step }),
      setPlan: (plan, isYearly) => set({ 
        formData: { fullName: '', email: '', phoneNumber: '', goals: [], selectedPlan: plan },
        isYearly,
        step: 1 
      }),
      updateDetails: (details) => set((state) => ({ 
        formData: { ...state.formData, ...details } 
      })),
      reset: () => set({ step: 1, isYearly: false, formData: { fullName: '', email: '', phoneNumber: '', selectedPlan: null, goals: [] } }),
    }),
    { name: 'gym-membership-storage' }
  )
);