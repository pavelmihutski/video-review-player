import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { worker } from '@/api/mocks/browser';
import { App } from '@/app/App';

const start = async () => {
  await worker.start({
    serviceWorker: {
      url: '/video-review-player/mockServiceWorker.js',
    },
  });

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

start();
