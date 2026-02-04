import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

import { PlayerError, usePlayerActions } from '@/data/player';

type UsePlayerOptions = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  src: string;
  onError?: (error: Error) => void;
};

export const usePlayer = ({ videoRef, src, onError }: UsePlayerOptions) => {
  const hlsRef = useRef<Hls | null>(null);
  const { setFps } = usePlayerActions();

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (!Hls.isSupported()) {
      return;
    }

    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 90,
    });

    hlsRef.current = hls;

    hls.loadSource(src);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
      setFps(data.levels[0].frameRate);
    });

    hls.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) {
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          throw new PlayerError('PLAYER_NETWORK_ERROR', 'Fatal network error, trying to recover');
        }

        if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          throw new PlayerError('PLAYER_MEDIA_ERROR', 'Fatal media error, trying to recover');
        }
        throw new PlayerError('PLAYER_ERROR', 'Fatal error, cannot recover');
      }
    });

    return () => {
      hls.destroy();
      hlsRef.current = null;
    };
  }, [videoRef, src, onError, setFps]);

  return hlsRef;
};
