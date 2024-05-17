import { create } from 'zustand'

interface LoginStore {
    showLogin: boolean;
    setLogin: (x: boolean) => void;
}
export const useLoginStore = create<LoginStore>((set) => ({
    showLogin: false,
    setLogin: (x: boolean) => set((state) => ({ showLogin: x }))
}))
