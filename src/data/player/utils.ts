type CalculateFrameStepTimeProps = {
  currentTime: number;
  duration: number;
  fps: number;
  direction: 1 | -1;
};

export function getFrameDuration(fps: number): number {
  return 1 / fps;
}

export function calculateFrameStepTime({ currentTime, duration, fps, direction }: CalculateFrameStepTimeProps): number {
  const frameDuration = getFrameDuration(fps);
  return Math.max(0, Math.min(currentTime + frameDuration * direction, duration));
}
