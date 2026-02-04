import { create } from 'zustand';

import { PlayerError } from './errors';
import { calculateFrameStepTime } from './utils';

type PlayerState = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isBuffering: boolean;
  fps: number;
  videoElement: HTMLVideoElement | null;
};

type PlayerActions = {
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  seek: (time: number) => void;
  jump: (seconds: number) => void;
  stepFrame: (direction: 1 | -1) => void;
  toggleMute: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setIsBuffering: (isBuffering: boolean) => void;
  setFps: (fps: number) => void;
  setVideoElement: (element: HTMLVideoElement | null) => void;
  reset: () => void;
};

type PlayerStore = PlayerState & {
  actions: PlayerActions;
};

const initialState: PlayerState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isBuffering: false,
  fps: 30,
  videoElement: null,
};

const usePlayerStore = create<PlayerStore>()((set, get) => ({
  ...initialState,

  actions: {
    play: async () => {
      const { videoElement } = get();

      if (!videoElement) {
        throw new PlayerError('PLAYER_LOADING_ERROR', 'Video element not found');
      }

      try {
        await videoElement.play();
      } catch (error) {
        throw new PlayerError('PLAYER_LOADING_ERROR', 'Failed to play video', {
          error,
        });
      }

      set({ isPlaying: true });
    },

    pause: () => {
      const { videoElement } = get();
      if (!videoElement) {
        return;
      }

      videoElement.pause();

      set({ isPlaying: false });
    },

    togglePlay: async () => {
      const { isPlaying, actions } = get();

      if (isPlaying) {
        actions.pause();
        return;
      }

      await actions.play();
    },

    stepFrame: (direction: 1 | -1) => {
      const { videoElement, isPlaying, fps, currentTime, duration } = get();
      if (!videoElement || isPlaying) {
        return;
      }

      const newTime = calculateFrameStepTime({ currentTime, duration, fps, direction });

      videoElement.currentTime = newTime;
      set({ currentTime: newTime });
    },

    seek: (time: number) => {
      const { videoElement, duration } = get();
      if (!videoElement) return;

      const clampedTime = Math.max(0, Math.min(time, duration));
      videoElement.currentTime = clampedTime;
      set({ currentTime: clampedTime });
    },

    jump: (seconds: number) => {
      const { videoElement, currentTime, duration } = get();
      if (!videoElement) {
        return;
      }

      const newTime = Math.max(0, Math.min(currentTime + seconds, duration));
      videoElement.currentTime = newTime;
      set({ currentTime: newTime });
    },

    toggleMute: () => {
      const { videoElement, isMuted } = get();
      if (!videoElement) return;

      videoElement.muted = !isMuted;
      set({ isMuted: !isMuted });
    },

    setIsPlaying: (isPlaying: boolean) => {
      set({ isPlaying });
    },

    setCurrentTime: (time: number) => {
      set({ currentTime: time });
    },

    setDuration: (duration: number) => {
      set({ duration });
    },

    setIsBuffering: (isBuffering: boolean) => {
      set({ isBuffering });
    },

    setFps: (fps: number) => {
      set({ fps });
    },

    setVideoElement: (element: HTMLVideoElement | null) => {
      set({ videoElement: element });
    },

    reset: () => {
      set(initialState);
    },
  },
}));

export const useIsPlaying = () => usePlayerStore(state => state.isPlaying);
export const useDuration = () => usePlayerStore(state => state.duration);
export const useVolume = () => usePlayerStore(state => state.volume);
export const useIsMuted = () => usePlayerStore(state => state.isMuted);
export const useIsBuffering = () => usePlayerStore(state => state.isBuffering);
export const useFps = () => usePlayerStore(state => state.fps);
export const useVideoElement = () => usePlayerStore(state => state.videoElement);
export const useCurrentTime = () => usePlayerStore(state => state.currentTime);
// we round down the current time to the nearest threshold to prevent unnecessary re-renders when the time hasn't changed significantly
export const useThrottledCurrentTime = (thresholdSec: number = 1): number => {
  return usePlayerStore(state => Math.floor(state.currentTime / thresholdSec) * thresholdSec);
};

export const usePlayerActions = () => usePlayerStore(state => state.actions);
