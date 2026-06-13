export const authStorageKey = 'digital-wallet-token';
const authStorageEvent = 'digital-wallet-token-change';

export function readToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(authStorageKey);
}

export function writeToken(token: string) {
  if (typeof window === 'undefined') return;

  if (!token) {
    clearToken();
    return;
  }

  window.localStorage.setItem(authStorageKey, token);
  notifyTokenChange();
}

export function clearToken() {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(authStorageKey);
  notifyTokenChange();
}

export function subscribeToTokenChanges(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(authStorageEvent, onStoreChange as EventListener);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(authStorageEvent, onStoreChange as EventListener);
  };
}

function notifyTokenChange() {
  window.dispatchEvent(new Event(authStorageEvent));
}
