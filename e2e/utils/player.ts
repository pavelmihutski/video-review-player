import { type Locator, type Page } from '@playwright/test';

function getVideoElement(page: Page): Locator {
  return page.locator('video');
}

export async function waitForReady(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const v = document.querySelector('video');

    return v && v.readyState >= 2;
  });
}

export async function waitForPlaying(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const v = document.querySelector('video');

    return v && !v.paused && v.currentTime > 0;
  });
}

export async function waitForNotPlaying(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const v = document.querySelector('video');
    return v && v.paused && !v.seeking;
  });
}

export async function waitForTimeProgress(page: Page, initialTime: number, minDelta = 0.1): Promise<void> {
  await page.waitForFunction(
    ({ initial, delta }) => {
      const v = document.querySelector('video');
      return v && v.currentTime > initial + delta;
    },
    { initial: initialTime, delta: minDelta },
    { timeout: 5000 },
  );
}

export async function waitForSeeking(page: Page, time: number): Promise<void> {
  await page.waitForFunction(
    (expectedTime: number) => {
      const video = document.querySelector('video');
      return video && !video.seeking && Math.abs(video.currentTime - expectedTime) < 0.5;
    },
    time,
    { timeout: 5000 },
  );
}

export async function setCurrentTime(page: Page, time: number): Promise<void> {
  const video = getVideoElement(page);

  await video.evaluate((v: HTMLVideoElement, t: number) => (v.currentTime = t), time);

  await waitForSeeking(page, time);
}

export async function getCurrentTime(page: Page): Promise<number> {
  const video = getVideoElement(page);

  return await video.evaluate((v: HTMLVideoElement) => v.currentTime);
}

export async function isPaused(page: Page): Promise<boolean> {
  const video = getVideoElement(page);

  return await video.evaluate((v: HTMLVideoElement) => v.paused);
}

export async function pause(page: Page): Promise<void> {
  const video = getVideoElement(page);

  await video.evaluate((v: HTMLVideoElement) => v.pause());
}
