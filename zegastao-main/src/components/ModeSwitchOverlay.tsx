import { Loader2 } from 'lucide-react';
import { useUIMode } from '@/hooks/useUIMode';

export function ModeSwitchOverlay() {
  const { isSwitching, uiMode } = useUIMode();

  if (!isSwitching) return null;

  const label = uiMode === 'classic' ? 'Ativando Modo Clássico…' : 'Ativando Modo Aventureiro…';

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm font-medium text-foreground">{label}</p>
    </div>
  );
}
