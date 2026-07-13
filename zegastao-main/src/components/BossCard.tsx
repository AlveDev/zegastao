import { cn } from '@/lib/utils';
import type { Debt } from '@/types';

interface BossCardProps {
  debt: Debt;
  onAttack?: () => void;
  className?: string;
  variant?: 'rpg' | 'classic';
}

const BOSS_ICONS: Record<string, string> = {
  nubank:    '🟣',
  itau:      '🟠',
  bradesco:  '🔴',
  santander: '🔴',
  caixa:     '🔵',
  bb:        '🟡',
  inter:     '🟠',
  c6:        '⚫',
};

function getBossIcon(creditor: string): string {
  const key = creditor.toLowerCase().replace(/\s+/g, '');
  for (const [bank, icon] of Object.entries(BOSS_ICONS)) {
    if (key.includes(bank)) return icon;
  }
  return '💀';
}

function debtBossLevel(interestRate: number): number {
  if (interestRate >= 15) return 5;
  if (interestRate >= 10) return 4;
  if (interestRate >= 5)  return 3;
  if (interestRate >= 2)  return 2;
  return 1;
}

function formatCurrency(v: number): string {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function debtPriority(interestRate: number): { label: string; dots: string; color: string } {
  if (interestRate >= 10) return { label: 'Alta',  dots: '🔴🔴🔴', color: 'text-red-400' };
  if (interestRate >= 3)  return { label: 'Média', dots: '🟡🟡',   color: 'text-amber-400' };
  return                         { label: 'Baixa', dots: '🟢',     color: 'text-green-400' };
}

function getCreditorIcon(creditor: string): string {
  const icon = getBossIcon(creditor);
  return icon === '💀' ? '💳' : icon;
}

export function BossCard({ debt, onAttack, className, variant = 'rpg' }: BossCardProps) {
  const total = debt.totalBalance ?? 0;
  const paidInstallments = debt.paidInstallments ?? 0;
  const totalInstallments = debt.totalInstallments ?? debt.remainingInstallments + paidInstallments;
  const remaining = totalInstallments > 0
    ? (debt.monthlyPayment * debt.remainingInstallments)
    : total;
  const paid = total - remaining;
  const hpPct = total > 0 ? Math.max(0, Math.min(100, (remaining / total) * 100)) : 100;
  const bossLv = debtBossLevel(debt.interestRateMonthly ?? 0);
  const monthlyAttack = debt.interestRateMonthly
    ? Math.round(remaining * (debt.interestRateMonthly / 100))
    : null;

  const hpBarClass = hpPct > 60
    ? 'from-red-600 to-red-500'
    : hpPct > 30
    ? 'from-orange-600 to-orange-500'
    : 'from-red-900 to-red-700';

  if (variant === 'classic') {
    const priority = debtPriority(debt.interestRateMonthly ?? 0);
    return (
      <div className={cn(
        'relative rounded-xl border overflow-hidden transition-all duration-200',
        'border-border bg-card hover:shadow-md',
        className
      )}>
        <div className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">{getCreditorIcon(debt.creditor ?? '')}</span>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-foreground text-sm leading-tight">
                {debt.creditor ?? 'Dívida'}
              </h3>
              <p className={cn('text-xs font-medium mt-0.5', priority.color)}>
                Prioridade {priority.label}
                {debt.interestRateMonthly ? ` · Juros ${debt.interestRateMonthly}%/mês` : ''}
              </p>
            </div>
            <span className="text-sm shrink-0 mt-0.5">{priority.dots}</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground font-medium">Progresso de quitação</span>
              <span className="text-foreground tabular-nums font-bold">
                {formatCurrency(remaining)} restante
              </span>
            </div>
            <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${Math.max(0, 100 - hpPct)}%` }}
              />
            </div>
            {paid > 0 && (
              <p className="text-[10px] text-green-500 font-medium">
                ✅ {formatCurrency(paid)} já pago de {formatCurrency(total)}
              </p>
            )}
          </div>

          {monthlyAttack !== null && monthlyAttack > 0 && (
            <div className="flex items-center gap-2 text-xs bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
              <span className="text-amber-400">⚠️</span>
              <span className="text-foreground/80">
                Juros mensais: <span className="font-bold text-amber-400">+{formatCurrency(monthlyAttack)}</span>
              </span>
            </div>
          )}

          {onAttack && (
            <button
              onClick={onAttack}
              className={cn(
                'w-full flex items-center justify-center gap-2 rounded-lg py-2.5 px-4',
                'bg-primary hover:bg-primary/90 active:scale-95 transition-all duration-150',
                'text-primary-foreground font-bold text-sm'
              )}
            >
              📝 Registrar pagamento
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'relative rounded-xl border overflow-hidden transition-all duration-200',
      'border-red-900/40 bg-gradient-to-br from-red-950/30 via-card to-card',
      'hover:border-red-700/50 hover:shadow-lg hover:shadow-red-900/20',
      className
    )}>
      {/* Boss level badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        {Array.from({ length: bossLv }).map((_, i) => (
          <span key={i} className="text-red-500 text-xs">⚔️</span>
        ))}
      </div>

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">{getBossIcon(debt.creditor ?? '')}</span>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wide leading-tight">
              ☠️ BOSS: {(debt.creditor ?? 'Dívida').toUpperCase()}
            </h3>
            <p className="text-xs text-red-400 font-medium mt-0.5">
              Nível {bossLv}
              {debt.interestRateMonthly ? ` · Juros ${debt.interestRateMonthly}%/mês` : ''}
            </p>
          </div>
        </div>

        {/* HP bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-red-400 font-medium">❤️ HP do Boss</span>
            <span className="text-foreground tabular-nums font-bold">
              {formatCurrency(remaining)} / {formatCurrency(total)}
            </span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden border border-red-900/30">
            <div
              className={cn('h-full rounded-full bg-gradient-to-r transition-all duration-700', hpBarClass)}
              style={{ width: `${hpPct}%` }}
            />
          </div>
          {paid > 0 && (
            <p className="text-[10px] text-green-500 font-medium">
              ✅ {formatCurrency(paid)} de dano causado
            </p>
          )}
        </div>

        {/* Monthly attack */}
        {monthlyAttack !== null && monthlyAttack > 0 && (
          <div className="flex items-center gap-2 text-xs bg-red-950/30 border border-red-900/30 rounded-lg px-3 py-2">
            <span className="text-red-400">⚡</span>
            <span className="text-red-300">
              Ataque mensal: <span className="font-bold">+{formatCurrency(monthlyAttack)}</span> de juros
            </span>
          </div>
        )}

        {/* Attack button */}
        {onAttack && (
          <button
            onClick={onAttack}
            className={cn(
              'w-full flex items-center justify-center gap-2 rounded-lg py-2.5 px-4',
              'bg-red-600 hover:bg-red-500 active:scale-95 transition-all duration-150',
              'text-white font-bold text-sm shadow-md shadow-red-900/30'
            )}
          >
            ⚔️ Atacar — Pagar Parcela
          </button>
        )}
      </div>
    </div>
  );
}
