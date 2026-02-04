import { expect, test } from '@playwright/test';

import {
  getCurrentTime,
  isPaused,
  pause,
  setCurrentTime,
  waitForNotPlaying,
  waitForPlaying,
  waitForReady,
  waitForSeeking,
  waitForTimeProgress,
} from './utils/player';

test.describe('player', () => {
  test.describe('playback', () => {
    test('the video should start playing and progress when user clicks play button', async ({ page }) => {
      await page.goto('/');
      await waitForReady(page);

      await page.getByLabel('Play').click();
      await waitForPlaying(page);

      const initialTime = await getCurrentTime(page);

      await waitForTimeProgress(page, initialTime, 0.5);

      const laterTime = await getCurrentTime(page);

      expect(laterTime).toBeGreaterThan(initialTime + 0.5);
    });

    test('the video should pause when user clicks pause button', async ({ page }) => {
      await page.goto('/');
      await waitForReady(page);

      await page.getByLabel('Play').click();
      await waitForPlaying(page);

      await page.getByLabel('Pause').click();

      const pausedState = await isPaused(page);

      expect(pausedState).toBeTruthy();
    });

    test('the video should NOT progress when paused', async ({ page }) => {
      await page.goto('/');
      await waitForReady(page);

      await page.getByLabel('Play').click();
      await waitForPlaying(page);

      await page.getByLabel('Pause').click();

      await waitForNotPlaying(page);

      const t1 = await getCurrentTime(page);

      await page.waitForTimeout(500);

      const t2 = await getCurrentTime(page);

      expect(t2).toBeCloseTo(t1, 1);
      expect(await isPaused(page)).toBeTruthy();
    });
  });

  test.describe('seeking', () => {
    test('the video should seek backward 5 seconds when user clicks jump back button', async ({ page }) => {
      await page.goto('/');
      await waitForReady(page);

      await setCurrentTime(page, 10);

      const timeBefore = await getCurrentTime(page);
      expect(timeBefore).toBeCloseTo(10, 0);

      await page.getByLabel('Jump back 5 seconds').click();

      await waitForSeeking(page, timeBefore - 5);

      const timeAfter = await getCurrentTime(page);

      expect(timeAfter).toBeCloseTo(5, 0);
    });

    test('the video should seek forward 5 seconds when user clicks jump forward button', async ({ page }) => {
      await page.goto('/');
      await waitForReady(page);

      const timeBefore = await getCurrentTime(page);

      await page.getByLabel('Jump forward 5 seconds').click();

      await waitForSeeking(page, timeBefore + 5);

      const timeAfter = await getCurrentTime(page);

      expect(timeAfter).toBeCloseTo(timeBefore + 5, 0);
    });
  });

  test.describe('frame stepping', () => {
    test('the frame step controls should be disabled when the video is playing', async ({ page }) => {
      await page.goto('/');
      await waitForReady(page);

      await page.getByLabel('Play').click();

      const prevFrameBtn = page.getByLabel('Previous frame');
      const nextFrameBtn = page.getByLabel('Next frame');

      await expect(prevFrameBtn).toBeDisabled();
      await expect(nextFrameBtn).toBeDisabled();

      await page.getByLabel('Pause').click();

      await expect(prevFrameBtn).toBeEnabled();
      await expect(nextFrameBtn).toBeEnabled();
    });

    test('the video should step forward one frame when user clicks next frame button', async ({ page }) => {
      await page.goto('/');
      await waitForReady(page);

      await pause(page);
      await setCurrentTime(page, 5);

      const timeBefore = await getCurrentTime(page);

      await page.getByLabel('Next frame').click();

      await page.waitForTimeout(100);

      const timeAfter = await getCurrentTime(page);
      const delta = timeAfter - timeBefore;

      // Frame step should move forward
      expect(delta).toBeGreaterThan(0);
      // But less than ~1/15 fps (robust for any reasonable FPS)
      expect(delta).toBeLessThan(1 / 15);
    });

    test('the video should step backward one frame when user clicks previous frame button', async ({ page }) => {
      await page.goto('/');
      await waitForReady(page);

      await pause(page);
      await setCurrentTime(page, 5);

      const timeBefore = await getCurrentTime(page);

      await page.getByLabel('Previous frame').click();

      const timeAfter = await getCurrentTime(page);
      const delta = timeBefore - timeAfter;

      // Frame step should move backward
      expect(delta).toBeGreaterThan(0);
      console.log(delta);
      // But less than ~1/15 fps (robust for any reasonable FPS)
      //60 fps: 1/60 = 0.0167s per frame
      //30 fps: 1/30 = 0.0333s per frame
      //25 fps: 1/25 = 0.0400s per frame
      //24 fps: 1/24 = 0.0417s per frame
      expect(delta).toBeLessThan(1 / 15);
    });
  });

  test.describe('shortcuts', () => {
    test('the video should seek backward 5 seconds when user presses ArrowLeft key', async ({ page }) => {
      await page.goto('/');
      await waitForReady(page);

      await setCurrentTime(page, 10);

      const timeBefore = await getCurrentTime(page);
      expect(timeBefore).toBeCloseTo(10, 0);

      await page.keyboard.press('ArrowLeft');

      await waitForSeeking(page, timeBefore - 5);

      const timeAfter = await getCurrentTime(page);

      expect(timeAfter).toBeCloseTo(5, 0);
    });

    test('the video should seek forward 5 seconds when user presses ArrowRight key', async ({ page }) => {
      await page.goto('/');
      await waitForReady(page);

      const timeBefore = await getCurrentTime(page);

      await page.keyboard.press('ArrowRight');

      await waitForSeeking(page, timeBefore + 5);

      const timeAfter = await getCurrentTime(page);

      expect(timeAfter).toBeCloseTo(timeBefore + 5, 0);
    });

    test('the video should toggle between playing and paused when user presses Space key', async ({ page }) => {
      await page.goto('/');
      await waitForReady(page);

      await page.keyboard.press('Space');

      expect(await isPaused(page)).toBeFalsy();

      await page.keyboard.press('Space');

      expect(await isPaused(page)).toBeTruthy();
    });
  });
});
