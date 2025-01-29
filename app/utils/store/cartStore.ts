import { create } from 'zustand'

interface CartState {
    showCart: boolean;
    setCart: (x: boolean) => void;
    switchCart: () => void;
    isFull: boolean;
    setIsFull: (x: boolean) => void;
    hasStickers: boolean;
    setHasStickers: (value: boolean) => void;
}

export const useCartStore = create<CartState>((set) => ({
    showCart: false,
    setCart: (x: boolean) => set((state) => ({ showCart: x })),
    isFull: false,
    hasStickers: false,
    switchCart: () => set((state) => ({ showCart: !state.showCart })),
    setIsFull: (value) => set({ isFull: value }),
    setHasStickers: (value) => set({ hasStickers: value }),
}))
