export function getProgress(currentTime: number, duration: number): number {
  return duration > 0 ? (currentTime / duration) * 100 : 0;
}

export function canStepFrame(isPlaying: boolean, hasVideoElement: boolean): boolean {
  return !isPlaying && hasVideoElement;
}

export function isVideoReady(hasVideoElement: boolean, duration: number): boolean {
  return hasVideoElement && duration > 0;
}

export function getRemainingTime(currentTime: number, duration: number): number {
  return Math.max(0, duration - currentTime);
}

export function isVideoEnded(currentTime: number, duration: number): boolean {
  return duration > 0 && currentTime >= duration;
}
