import { useEffect, useState } from "react";

const GAME_TIMER_KEY = "gameTimerStart";
const GAME_TIMER_PAUSED_AT_KEY = "gameTimerPausedAt";
const GAME_TIMER_PAUSED_TOTAL_KEY = "gameTimerPausedTotal";
const GAME_DURATION_MS = 20 * 60 * 1000;

function getKey(base: string, sessionId?: string | number | null) {
  return sessionId ? `${base}:${sessionId}` : base;
}

function getStartTime(sessionId?: string | number | null): number {
  const key = getKey(GAME_TIMER_KEY, sessionId);
  const raw = localStorage.getItem(key);
  if (raw) {
    const parsed = Number(raw);
    if (!Number.isNaN(parsed)) return parsed;
  }
  const now = Date.now();
  localStorage.setItem(key, String(now));
  return now;
}

export function resetGameTimer(sessionId?: string | number | null) {
  localStorage.removeItem(getKey(GAME_TIMER_KEY, sessionId));
  localStorage.removeItem(getKey(GAME_TIMER_PAUSED_AT_KEY, sessionId));
  localStorage.removeItem(getKey(GAME_TIMER_PAUSED_TOTAL_KEY, sessionId));
}

export function useGameTimer(sessionId?: string | number | null) {
  const pausedAtKey = getKey(GAME_TIMER_PAUSED_AT_KEY, sessionId);
  const pausedTotalKey = getKey(GAME_TIMER_PAUSED_TOTAL_KEY, sessionId);
  const [isPaused, setIsPaused] = useState(() => {
    const pausedAt = localStorage.getItem(pausedAtKey);
    return Boolean(pausedAt);
  });
  const [remainingMs, setRemainingMs] = useState(() => {
    const start = getStartTime(sessionId);
    const pausedTotal = Number(localStorage.getItem(pausedTotalKey) || 0);
    const pausedAt = Number(localStorage.getItem(pausedAtKey) || 0);
    const now = pausedAt || Date.now();
    const elapsed = now - start - pausedTotal;
    return Math.max(GAME_DURATION_MS - elapsed, 0);
  });

  function togglePause() {
    const pausedAtRaw = localStorage.getItem(pausedAtKey);
    if (pausedAtRaw) {
      const pausedAt = Number(pausedAtRaw);
      const pausedTotal = Number(localStorage.getItem(pausedTotalKey) || 0);
      const nextTotal = pausedTotal + (Date.now() - pausedAt);
      localStorage.setItem(pausedTotalKey, String(nextTotal));
      localStorage.removeItem(pausedAtKey);
      setIsPaused(false);
    } else {
      localStorage.setItem(pausedAtKey, String(Date.now()));
      setIsPaused(true);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const start = getStartTime(sessionId);
      const pausedTotal = Number(localStorage.getItem(pausedTotalKey) || 0);
      const pausedAt = Number(localStorage.getItem(pausedAtKey) || 0);
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
  }, [sessionId, pausedAtKey, pausedTotalKey]);

  return {
    remainingMs,
    isExpired: remainingMs <= 0,
    isPaused,
    togglePause,
  };
}
