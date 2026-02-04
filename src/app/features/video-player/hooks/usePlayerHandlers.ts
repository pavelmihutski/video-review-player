import { useEffect } from 'react';

import { usePlayerActions } from '@/data/player';

export const usePlayerHandlers = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
  const actions = usePlayerActions();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      actions.setVideoElement(video);
      return () => actions.setVideoElement(null);
    }
  }, [videoRef, actions]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      actions.setCurrentTime(time);
    };

    const handleLoadedMetadata = () => {
      actions.setDuration(video.duration);
    };

    const handlePlay = () => actions.setIsPlaying(true);
    const handlePause = () => actions.setIsPlaying(false);

    const handleWaiting = () => actions.setIsBuffering(true);
    const handleCanPlay = () => actions.setIsBuffering(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoRef, actions]);
};
