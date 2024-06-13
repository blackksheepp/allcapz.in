import { create } from 'zustand'

interface TransitionStore {
    show: boolean
    set: (x: boolean) => void
}

export const useTransitionStore = create<TransitionStore>((set) => ({
    show: false,
    set: (x: boolean) => set((state) => ({ show: x })),
}))
