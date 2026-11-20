import { useEffect } from 'react';

/**
 * Custom hook to listen for application-wide keyboard shortcuts
 */
export const useKeyboardShortcuts = ({ onNewTransaction, onToggleTheme, onSearchFocus, onHelpModal }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        if (e.key === 'Escape') {
          e.target.blur();
        }
        return;
      }

      // Ctrl + N or Alt + N: New Transaction
      if ((e.ctrlKey || e.metaKey || e.altKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        if (onNewTransaction) onNewTransaction();
      }

      // / or Ctrl + K: Search
      if (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        if (onSearchFocus) onSearchFocus();
      }

      // Shift + T: Toggle Theme
      if (e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        if (onToggleTheme) onToggleTheme();
      }

      // ? : Show keyboard shortcut cheat sheet
      if (e.key === '?') {
        e.preventDefault();
        if (onHelpModal) onHelpModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNewTransaction, onToggleTheme, onSearchFocus, onHelpModal]);
};
