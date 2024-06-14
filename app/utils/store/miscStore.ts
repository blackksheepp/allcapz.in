import { create } from 'zustand'

interface MiscStore {
    showTransition: boolean
    setShowTransition: (x: boolean) => void
    preloader: boolean
    showPreloader: (x: boolean) => void
    
}

export const useMiscStore = create<MiscStore>((set) => ({
    showTransition: false,
    setShowTransition: (x: boolean) => set((state) => ({ showTransition: x })),
    preloader: true,
    showPreloader: (x: boolean) => set((state) => ({ preloader: x })),
}))
