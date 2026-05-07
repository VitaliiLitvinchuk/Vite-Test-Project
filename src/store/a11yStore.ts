import { create } from 'zustand';

export interface A11yState {
  isOpen: boolean;
  fontSize: number; // 1, 1.2, 1.4, 1.6
  lineHeight: number; // 1.5, 1.75, 2.0
  letterSpacing: number; // 0, 0.05, 0.1 (em)
  textAlign: 'initial' | 'left' | 'center' | 'right';
  textTransform: 'none' | 'uppercase';
  
  contrast: 'normal' | 'high' | 'dark';
  invertColors: boolean;
  saturation: 'normal' | 'high' | 'low' | 'desaturate';
  monochrome: boolean;
  
  highlightLinks: boolean;
  bigCursor: boolean;
  pauseAnimations: boolean;

  // Actions
  togglePanel: () => void;
  setFontSize: (val: number) => void;
  setLineHeight: (val: number) => void;
  setLetterSpacing: (val: number) => void;
  setTextAlign: (val: 'initial' | 'left' | 'center' | 'right') => void;
  setTextTransform: (val: 'none' | 'uppercase') => void;
  
  setContrast: (val: 'normal' | 'high' | 'dark') => void;
  setInvertColors: (val: boolean) => void;
  setSaturation: (val: 'normal' | 'high' | 'low' | 'desaturate') => void;
  setMonochrome: (val: boolean) => void;
  
  setHighlightLinks: (val: boolean) => void;
  setBigCursor: (val: boolean) => void;
  setPauseAnimations: (val: boolean) => void;
  
  resetAll: () => void;
}

const initialState = {
  isOpen: false,
  fontSize: 1,
  lineHeight: 1.5,
  letterSpacing: 0,
  textAlign: 'initial' as const,
  textTransform: 'none' as const,
  
  contrast: 'normal' as const,
  invertColors: false,
  saturation: 'normal' as const,
  monochrome: false,
  
  highlightLinks: false,
  bigCursor: false,
  pauseAnimations: false,
};

export const useA11yStore = create<A11yState>((set) => ({
  ...initialState,
  
  togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
  setFontSize: (fontSize) => set({ fontSize }),
  setLineHeight: (lineHeight) => set({ lineHeight }),
  setLetterSpacing: (letterSpacing) => set({ letterSpacing }),
  setTextAlign: (textAlign) => set({ textAlign }),
  setTextTransform: (textTransform) => set({ textTransform }),
  
  setContrast: (contrast) => set({ contrast }),
  setInvertColors: (invertColors) => set({ invertColors }),
  setSaturation: (saturation) => set({ saturation }),
  setMonochrome: (monochrome) => set({ monochrome }),
  
  setHighlightLinks: (highlightLinks) => set({ highlightLinks }),
  setBigCursor: (bigCursor) => set({ bigCursor }),
  setPauseAnimations: (pauseAnimations) => set({ pauseAnimations }),
  
  resetAll: () => set(initialState),
}));
