import { create } from 'zustand'

interface ImagesStore {
  images: { collection: string, url: string }[] | null;
  loadImage: (collection: string, url: string) => void;
  areLoaded: boolean;
  setAreLoaded: (x: boolean) => void;
}
export const useImagesStore = create<ImagesStore>((set) => ({
  images: null,
  loadImage: (key: string, url: string) => set((state) => ({ ...state, images: [...(state.images || []), { collection: key, url }] })),
  areLoaded: false,
  setAreLoaded: (x: boolean) => set((state) => ({ areLoaded: x })),
}))
