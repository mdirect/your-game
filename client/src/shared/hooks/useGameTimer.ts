import { useEffect, useState } from "react";

const GAME_TIMER_KEY = "gameTimerStart";
const GAME_TIMER_PAUSED_AT_KEY = "gameTimerPausedAt";
const GAME_TIMER_PAUSED_TOTAL_KEY = "gameTimerPausedTotal";
const GAME_DURATION_MS = 20 * 60 * 1000;

function getStartTime(): number {
  const raw = localStorage.getItem(GAME_TIMER_KEY);
  if (raw) {
    const parsed = Number(raw);
    if (!Number.isNaN(parsed)) return parsed;
  }
  const now = Date.now();
  localStorage.setItem(GAME_TIMER_KEY, String(now));
  return now;
}

export function resetGameTimer() {
  localStorage.removeItem(GAME_TIMER_KEY);
  localStorage.removeItem(GAME_TIMER_PAUSED_AT_KEY);
  localStorage.removeItem(GAME_TIMER_PAUSED_TOTAL_KEY);
}

export function useGameTimer() {
  const [isPaused, setIsPaused] = useState(() => {
    const pausedAt = localStorage.getItem(GAME_TIMER_PAUSED_AT_KEY);
    return Boolean(pausedAt);
  });
  const [remainingMs, setRemainingMs] = useState(() => {
    const start = getStartTime();
    const pausedTotal = Number(localStorage.getItem(GAME_TIMER_PAUSED_TOTAL_KEY) || 0);
    const pausedAt = Number(localStorage.getItem(GAME_TIMER_PAUSED_AT_KEY) || 0);
    const now = pausedAt || Date.now();
    const elapsed = now - start - pausedTotal;
    return Math.max(GAME_DURATION_MS - elapsed, 0);
  });

  function togglePause() {
    const pausedAtRaw = localStorage.getItem(GAME_TIMER_PAUSED_AT_KEY);
    if (pausedAtRaw) {
      const pausedAt = Number(pausedAtRaw);
      const pausedTotal = Number(localStorage.getItem(GAME_TIMER_PAUSED_TOTAL_KEY) || 0);
      const nextTotal = pausedTotal + (Date.now() - pausedAt);
      localStorage.setItem(GAME_TIMER_PAUSED_TOTAL_KEY, String(nextTotal));
      localStorage.removeItem(GAME_TIMER_PAUSED_AT_KEY);
      setIsPaused(false);
    } else {
      localStorage.setItem(GAME_TIMER_PAUSED_AT_KEY, String(Date.now()));
      setIsPaused(true);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const start = getStartTime();
      const pausedTotal = Number(localStorage.getItem(GAME_TIMER_PAUSED_TOTAL_KEY) || 0);
      const pausedAt = Number(localStorage.getItem(GAME_TIMER_PAUSED_AT_KEY) || 0);
      const now = pausedAt || Date.now();
      const elapsed = now - start - pausedTotal;
      const next = Math.max(GAME_DURATION_MS - elapsed, 0);
      setRemainingMs(next);
      setIsPaused(Boolean(pausedAt));
      if (next <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return {
    remainingMs,
    isExpired: remainingMs <= 0,
    isPaused,
    togglePause,
  };
}

