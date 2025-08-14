'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FarmState, FarmActions } from './types';

/**
 * Farm store implementation
 *
 * Manages farm data including location, certifications, crops, and sustainability metrics
 */

const initialState: Omit<FarmState, 'isLoading' | 'error'> = {
  id: '',
  name: '',
  establishedDate: '',
  location: {
    latitude: 0,
    longitude: 0,
    address: '',
    city: '',
    state: '',
    country: '',
  },
  totalArea: {
    value: 0,
    unit: 'hectares',
  },
  images: [],
  certifications: [],
  farmingMethods: [],
  activeCrops: [],
  infrastructure: {
    equipment: [],
    storage: [],
    processing: [],
  },
  sustainabilityMetrics: {
    waterUsage: {
      amount: 0,
      unit: 'liters',
      period: 'day',
      percentage: 0,
    },
    carbonFootprint: {
      amount: 0,
      unit: 'kg',
      period: 'year',
      percentage: 0,
    },
    renewableEnergy: {
      percentage: 0,
      sources: [],
    },
    wasteManagement: {
      recyclingRate: 0,
      compostingRate: 0,
      methods: [],
    },
  },
  contactInfo: {
    phone: '',
    email: '',
  },
};

export const useFarmStore = create<FarmState & FarmActions>()(
  persist(
    (set) => ({
      ...initialState,
      isLoading: false,
      error: null,

      setFarmData: (data) => set((state) => ({ ...state, ...data })),

      updateLocation: (location) => set((state) => ({ ...state, location })),

      addCertification: (certification) =>
        set((state) => ({
          ...state,
          certifications: state.certifications.some((cert) => cert.id === certification.id)
            ? (set({ error: `Certification with ID ${certification.id} already exists` }),
              state.certifications)
            : [...state.certifications, certification],
        })),

      removeCertification: (id) =>
        set((state) => ({
          ...state,
          certifications: state.certifications.filter((cert) => cert.id !== id),
        })),

      updateCrop: (id, updates) =>
        set((state) => ({
          ...state,
          activeCrops: state.activeCrops.some((crop) => crop.id === id)
            ? state.activeCrops.map((crop) => (crop.id === id ? { ...crop, ...updates } : crop))
            : (set({ error: `Crop with ID ${id} not found` }), state.activeCrops),
        })),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      reset: () => set({ ...initialState, isLoading: false, error: null }),
    }),
    {
      name: 'farm-storage',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['isLoading', 'error'].includes(key))
        ),
    }
  )
);
