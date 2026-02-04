type IsCommentActiveProps = {
  commentTime: number;
  currentVideoTime: number;
};

export const isCommentActive = ({ commentTime, currentVideoTime }: IsCommentActiveProps) => {
  return Math.abs(commentTime - currentVideoTime) < 1;
};

export const getRelativeTime = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';

  return `${days} days ago`;
};
