export function calculateTimelinePosition(clientX: number, timelineElement: HTMLElement, duration: number) {
  const rect = timelineElement.getBoundingClientRect();
  const x = clientX - rect.left;
  const percentage = Math.max(0, Math.min(x / rect.width, 1));
  const time = percentage * duration;

  return {
    time,
    percentage,
  };
}

export function calculateSeekTime(clientX: number, timelineElement: HTMLElement, duration: number): number {
  const rect = timelineElement.getBoundingClientRect();
  const x = clientX - rect.left;
  const percentage = x / rect.width;
  const time = percentage * duration;

  return Math.max(0, Math.min(time, duration));
}
