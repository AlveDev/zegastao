import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { setProfile } from '@/lib/firestore';

export type UIMode = 'rpg' | 'classic';

const STORAGE_KEY = 'ze-gastao-ui-mode';
const MIN_OVERLAY_MS = 500;

function applyUIModeAttr(mode: UIMode) {
  document.documentElement.dataset.uiMode = mode;
}

export function initUIModeAttr() {
  const saved = (localStorage.getItem(STORAGE_KEY) as UIMode) || 'rpg';
  applyUIModeAttr(saved);
}

interface UIModeContextValue {
  uiMode: UIMode;
  setUIMode: (next: UIMode) => void;
  isRPG: boolean;
  isClassic: boolean;
  isSwitching: boolean;
}

const UIModeContext = createContext<UIModeContextValue | null>(null);

export function UIModeProvider({ children }: { children: ReactNode }) {
  const [uiMode, setUIModeState] = useState<UIMode>(
    () => (localStorage.getItem(STORAGE_KEY) as UIMode) || 'rpg'
  );
  const [isSwitching, setIsSwitching] = useState(false);
  const switchStartedAt = useRef(0);

  const setUIMode = useCallback((next: UIMode) => {
    if (next === uiMode) return;
    switchStartedAt.current = Date.now();
    setIsSwitching(true);
    localStorage.setItem(STORAGE_KEY, next);
    applyUIModeAttr(next);
    setUIModeState(next);

    setProfile({ uiMode: next })
      .catch(() => {})
      .finally(() => {
        const elapsed = Date.now() - switchStartedAt.current;
        const remaining = Math.max(0, MIN_OVERLAY_MS - elapsed);
        setTimeout(() => setIsSwitching(false), remaining);
      });
  }, [uiMode]);

  return (
    <UIModeContext.Provider value={{ uiMode, setUIMode, isRPG: uiMode === 'rpg', isClassic: uiMode === 'classic', isSwitching }}>
      {children}
    </UIModeContext.Provider>
  );
}

export function useUIMode() {
  const ctx = useContext(UIModeContext);
  if (!ctx) throw new Error('useUIMode must be used within UIModeProvider');
  return ctx;
}
