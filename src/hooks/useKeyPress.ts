import { useCallback } from 'react';

import { useEventListener } from './useEventListener';

export const useKeyPress = (key: string, callback: () => void, enabled = true) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const targetElement = event.target as HTMLElement;
      const isTyping =
        targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA' || targetElement.isContentEditable;

      if (isTyping) {
        return;
      }

      if (event.key === key) {
        event.preventDefault();

        callback();
      }
    },
    [enabled, key, callback],
  );

  useEventListener('keydown', handleKeyDown);
};
