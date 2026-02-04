import { RefObject } from 'react';

import { useKeyPress } from '@/hooks';

export const useCommentShortcut = (inputRef: RefObject<HTMLTextAreaElement | null>) => {
  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useKeyPress('c', handleFocusInput);
};
