import { describe, it, expect, vi } from 'vitest';
import { handleModalKeyDown } from '../keyboardNavigator';

describe('keyboardNavigator utility', () => {
  it('triggers onEscape handler on Escape key press', () => {
    const onEscape = vi.fn();
    const event = { key: 'Escape', preventDefault: vi.fn() };

    handleModalKeyDown(event, { onEscape });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(onEscape).toHaveBeenCalled();
  });

  it('triggers onTabNext on forward tab and onTabPrev on shift+tab', () => {
    const onTabNext = vi.fn();
    const onTabPrev = vi.fn();

    handleModalKeyDown({ key: 'Tab', shiftKey: false }, { onTabNext, onTabPrev });
    expect(onTabNext).toHaveBeenCalled();
    expect(onTabPrev).not.toHaveBeenCalled();

    handleModalKeyDown({ key: 'Tab', shiftKey: true }, { onTabNext, onTabPrev });
    expect(onTabPrev).toHaveBeenCalled();
  });
});
