const SESSION_ID_KEY = "gameSessionId";
const ANSWERED_PREFIX = "answeredCells";
const STATS_PREFIX = "sessionStats";

export function setSessionId(sessionId: number | string) {
  localStorage.setItem(SESSION_ID_KEY, String(sessionId));
}

export function getSessionId(): string | null {
  return localStorage.getItem(SESSION_ID_KEY);
}

export function clearSessionId() {
  localStorage.removeItem(SESSION_ID_KEY);
}

function getAnsweredKey(sessionId: string) {
  return `${ANSWERED_PREFIX}:${sessionId}`;
}

export function loadAnsweredCells(sessionId: string): Set<string> {
  try {
    const raw = localStorage.getItem(getAnsweredKey(sessionId));
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((item) => typeof item === "string"));
  } catch {
    return new Set();
  }
}

export function markAnsweredCell(
  sessionId: string,
  themesId: number,
  cost: number
) {
  try {
    const key = getAnsweredKey(sessionId);
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(parsed) ? parsed : [];
    const cellKey = `${themesId}:${cost}`;
    const next = Array.from(new Set([...list, cellKey]));
    localStorage.setItem(key, JSON.stringify(next));
  } catch {
    // ignore storage errors
  }
}

export function clearAnsweredCells(sessionId: string) {
  localStorage.removeItem(getAnsweredKey(sessionId));
}

type SessionStats = {
  totalAnswered: number;
  correctAnswered: number;
  totalQuestions: number;
  timeSeconds: number;
};

function getStatsKey(sessionId: string) {
  return `${STATS_PREFIX}:${sessionId}`;
}

export function loadSessionStats(sessionId: string): SessionStats {
  try {
    const raw = localStorage.getItem(getStatsKey(sessionId));
    if (!raw) {
      return {
        totalAnswered: 0,
        correctAnswered: 0,
        totalQuestions: 0,
        timeSeconds: 0,
      };
    }
    const parsed = JSON.parse(raw);
    return {
      totalAnswered: Number(parsed?.totalAnswered || 0),
      correctAnswered: Number(parsed?.correctAnswered || 0),
      totalQuestions: Number(parsed?.totalQuestions || 0),
      timeSeconds: Number(parsed?.timeSeconds || 0),
    };
  } catch {
    return {
      totalAnswered: 0,
      correctAnswered: 0,
      totalQuestions: 0,
      timeSeconds: 0,
    };
  }
}

function saveSessionStats(sessionId: string, stats: SessionStats) {
  localStorage.setItem(getStatsKey(sessionId), JSON.stringify(stats));
}

export function recordAnswer(sessionId: string, isCorrect: boolean) {
  const stats = loadSessionStats(sessionId);
  const next = {
    ...stats,
    totalAnswered: stats.totalAnswered + 1,
    correctAnswered: stats.correctAnswered + (isCorrect ? 1 : 0),
  };
  saveSessionStats(sessionId, next);
}

export function setTotalQuestions(sessionId: string, totalQuestions: number) {
  const stats = loadSessionStats(sessionId);
  saveSessionStats(sessionId, { ...stats, totalQuestions });
}

export function setTimeSeconds(sessionId: string, timeSeconds: number) {
  const stats = loadSessionStats(sessionId);
  saveSessionStats(sessionId, { ...stats, timeSeconds });
}

export function clearSessionStats(sessionId: string) {
  localStorage.removeItem(getStatsKey(sessionId));
}
