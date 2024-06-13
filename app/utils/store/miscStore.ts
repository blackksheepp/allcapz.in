import { create } from 'zustand'

interface MiscStore {
    showTransition: boolean
    setShowTransition: (x: boolean) => void
    
}

export const useMiscStore = create<MiscStore>((set) => ({
    showTransition: false,
    setShowTransition: (x: boolean) => set((state) => ({ showTransition: x })),
}))
