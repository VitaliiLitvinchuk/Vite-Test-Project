import React, { useEffect } from 'react';
import { useA11yStore } from '../../store/a11yStore';

export const A11yProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useA11yStore();

  useEffect(() => {
    const root = document.documentElement;
    
    // Візуальна адаптація
    root.style.setProperty('--a11y-font-size', `${state.fontSize}rem`);
    root.style.setProperty('--a11y-line-height', `${state.lineHeight}`);
    root.style.setProperty('--a11y-letter-spacing', `${state.letterSpacing}em`);
    root.style.setProperty('--a11y-text-align', state.textAlign);
    root.style.setProperty('--a11y-text-transform', state.textTransform);

    // Контраст
    root.classList.remove('a11y-high-contrast', 'a11y-dark-contrast');
    if (state.contrast === 'high') {
      root.classList.add('a11y-high-contrast');
    } else if (state.contrast === 'dark') {
      root.classList.add('a11y-dark-contrast');
    }

    // Інверсія
    if (state.invertColors) {
      root.classList.add('a11y-invert-colors');
    } else {
      root.classList.remove('a11y-invert-colors');
    }

    // Насиченість
    root.classList.remove('a11y-saturation-high', 'a11y-saturation-low', 'a11y-saturation-desaturate');
    if (state.saturation !== 'normal') {
      root.classList.add(`a11y-saturation-${state.saturation}`);
    }

    // Монохром
    if (state.monochrome) {
      root.classList.add('a11y-monochrome');
    } else {
      root.classList.remove('a11y-monochrome');
    }

    // Навігація
    if (state.highlightLinks) {
      root.classList.add('a11y-highlight-links');
    } else {
      root.classList.remove('a11y-highlight-links');
    }

    if (state.bigCursor) {
      root.classList.add('a11y-big-cursor');
    } else {
      root.classList.remove('a11y-big-cursor');
    }

    if (state.pauseAnimations) {
      root.classList.add('a11y-pause-animations');
    } else {
      root.classList.remove('a11y-pause-animations');
    }

  }, [
    state.fontSize, state.lineHeight, state.letterSpacing, state.textAlign, state.textTransform,
    state.contrast, state.invertColors, state.saturation, state.monochrome,
    state.highlightLinks, state.bigCursor, state.pauseAnimations
  ]);

  return <>{children}</>;
};
