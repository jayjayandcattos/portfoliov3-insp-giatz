import { create } from 'zustand';

// eslint-disable-next-line import/prefer-default-export
export const useStore = create((set) => ({
  lenis: undefined,
  setLenis: (lenis) => set({ lenis }),
  introOut: false,
  setIntroOut: (introOut) => set({ introOut }),
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  fluidColor: '#ff1a1a',
  setFluidColor: (fluidColor) => set({ fluidColor }),
  isAbout: false,
  setIsAbout: (isAbout) => set({ isAbout }),
}));
