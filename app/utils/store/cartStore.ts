import { stat } from 'fs';
import { create } from 'zustand'

interface CartStore {
    showCart: boolean;
    setCart: (x: boolean) => void;
    switchCart: () => void;
    isFull: boolean;
    setIsFull: (x: boolean) => void;
}

export const useCartStore = create<CartStore>((set) => ({
    showCart: false,
    setCart: (x: boolean) => set((state) => ({ showCart: x })),
    switchCart: () => set((state) => ({ showCart: !state.showCart })),
    isFull: false,
    setIsFull: (x: boolean) => set((state) => ({ isFull: x })),
}))
