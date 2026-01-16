const SESSION_ID_KEY = "gameSessionId";
export function setSessionId(sessionId: number | string) {
  localStorage.setItem(SESSION_ID_KEY, String(sessionId));
}

export function getSessionId(): string | null {
  return localStorage.getItem(SESSION_ID_KEY);
}

export function clearSessionId() {
  localStorage.removeItem(SESSION_ID_KEY);
}
