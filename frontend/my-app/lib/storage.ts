export const authStorageKey = 'digital-wallet-token';

export function readToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(authStorageKey);
}

export function writeToken(token: string) {
  window.localStorage.setItem(authStorageKey, token);
}

export function clearToken() {
  window.localStorage.removeItem(authStorageKey);
}
