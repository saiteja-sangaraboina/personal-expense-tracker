/**
 * keyboardNavigator.js - Safe keyboard focus cycling and dialog trap navigation
 */

export const getFocusableElements = (container) => {
  if (!container || typeof container.querySelectorAll !== 'function') return [];
  const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll(selector)).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  );
};

export const handleModalKeyDown = (event, { onEscape, onTabNext, onTabPrev }) => {
  if (!event || !event.key) return;

  if (event.key === 'Escape' && typeof onEscape === 'function') {
    event.preventDefault();
    onEscape();
  } else if (event.key === 'Tab') {
    if (event.shiftKey && typeof onTabPrev === 'function') {
      onTabPrev();
    } else if (!event.shiftKey && typeof onTabNext === 'function') {
      onTabNext();
    }
  }
};
