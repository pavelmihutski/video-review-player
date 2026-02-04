import { useRef, useState } from 'react';
import { toast } from 'sonner';
import styled from 'styled-components';

import { useCurrentTime } from '@/data';
import { useCreateComment } from '@/data/comments';
import { media } from '@/theme';
import { formatTime } from '@/utils';

import { useCommentShortcut } from './hooks';

export function CommentInput() {
  const { create } = useCreateComment();
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const currentVideoTime = useCurrentTime();

  useCommentShortcut(inputRef);

  const handleSubmit = async () => {
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await create({
        text: text.trim(),
        time: currentVideoTime,
        author: 'Current User',
        timestamp: Date.now(),
        resolved: false,
      });
      setText('');

      toast.success('Comment added successfully');
    } catch {
      toast.error('Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();

      await handleSubmit();
    }
  };

  return (
    <Container>
      <InputWrapper>
        <Avatar>C</Avatar>
        <TextArea
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Add a comment at ${formatTime(currentVideoTime)}`}
          rows={3}
          disabled={isSubmitting}
        />
      </InputWrapper>
      <SubmitButton onClick={handleSubmit} disabled={!text.trim() || isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${media.mobile} {
    padding: 12px;
    gap: 8px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;

  ${media.mobile} {
    gap: 8px;
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  margin-top: 4px;
`;

const TextArea = styled.textarea`
  flex: 1;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 12px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.quaternary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${media.mobile} {
    padding: 10px;
    font-size: 13px;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${media.mobile} {
    padding: 8px 20px;
    font-size: 13px;
  }
`;
