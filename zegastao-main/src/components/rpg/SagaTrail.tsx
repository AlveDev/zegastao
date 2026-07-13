import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Lock, Scroll, Target, Infinity as InfinityIcon } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useAccounts } from '@/hooks/useAccounts';
import { useDebts } from '@/hooks/useDebts';
import { useCaixinhas } from '@/hooks/useCaixinhas';
import { useInvestments, useMilestones } from '@/hooks/useJourney';
import { useUIMode } from '@/hooks/useUIMode';
import { cn } from '@/lib/utils';
import {
  resolveSaga, ENDLESS_GOALS, PHASE_ORDER,
  chapterIcon, chapterTitle, chapterSubtitle, chapterReward, missionLabel,
  endlessGoalTitle, endlessGoalDesc,
  type ResolvedChapter, type SagaContext,
} from '@/lib/rpg/saga';
import { PHASE_LABELS } from '@/types';

function ChapterCard({ ch }: { ch: ResolvedChapter }) {
  const { isClassic } = useUIMode();
  const locked = ch.status === 'locked';
  const current = ch.status === 'current';
  const done = ch.status === 'done';

  return (
    <div
      className={cn(
        'rounded-2xl border p-4 transition-all',
        current && 'rpg-panel rpg-panel-gold',
        done && 'border-primary/30 bg-primary/5',
        locked && 'border-border bg-card/40 opacity-60',
        !current && !done && !locked && 'border-border bg-card'
      )}
    >
      {/* Cabeçalho do capítulo */}
      <div className="flex items-start gap-3">
        <div className={cn(
          'h-11 w-11 shrink-0 rounded-xl flex items-center justify-center text-2xl',
          locked ? 'bg-secondary grayscale' : 'bg-background'
        )}>
          {locked ? <Lock className="h-5 w-5 text-muted-foreground" /> : chapterIcon(ch, isClassic)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {isClassic ? 'Etapa' : 'Capítulo'} {ch.index} · {PHASE_LABELS[ch.phase]}
            </p>
            {current && (
              <span className="text-[9px] font-bold uppercase tracking-wide text-gold">◆ Atual</span>
            )}
            {done && (
              <span className="text-[9px] font-bold uppercase tracking-wide text-primary">✓ Concluído</span>
            )}
            {locked && (
              <span className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground">🔒 Bloqueado</span>
            )}
          </div>
          <h3 className="font-display font-bold text-foreground leading-tight mt-0.5">{chapterTitle(ch, isClassic)}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{chapterSubtitle(ch, isClassic)}</p>
        </div>
      </div>

      {/* Missões — escondidas em capítulos bloqueados */}
      {!locked && (
        <ul className="mt-3 space-y-1.5">
          {ch.missions.map((m) => (
            <li key={m.id} className="flex items-center gap-2.5">
              {m.done
                ? <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                : <Circle className="h-4 w-4 shrink-0 text-muted-foreground/40" />}
              <span className={cn(
                'text-sm flex-1 min-w-0',
                m.done ? 'text-muted-foreground line-through' : 'text-foreground'
              )}>
                {missionLabel(m, isClassic)}
              </span>
              {current && !m.done && m.cta && (
                <Link
                  to={m.cta.to}
                  className="shrink-0 text-[11px] font-bold text-primary hover:underline"
                >
                  {m.cta.label} →
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Barra de progresso + recompensa */}
      {!locked && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
            <span>{ch.completed}/{ch.total} missões</span>
            <span>{ch.pct}%</span>
          </div>
          <div className="stat-bar h-1.5">
            <div
              className={cn('stat-bar-fill', done ? 'bg-primary' : 'bg-gold')}
              style={{ width: `${ch.pct}%` }}
            />
          </div>
          <p className="mt-2 flex items-start gap-1.5 text-[11px] text-gold/90">
            <span>🎁</span>
            <span className="text-muted-foreground"><span className="font-semibold text-gold">Ao concluir:</span> {chapterReward(ch, isClassic)}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export function SagaTrail() {
  const { isClassic } = useUIMode();
  const profile = useStore((s) => s.profile);
  const { data: accounts } = useAccounts();
  const { data: debts } = useDebts();
  const { data: caixinhas } = useCaixinhas();
  const { data: investments } = useInvestments();
  const milestones = useMilestones();

  const ctx: SagaContext = {
    onboardingDone: !!profile?.onboardingDone,
    accountsCount: accounts.length,
    debtsCount: debts.length,
    caixinhasCount: caixinhas.length,
    investmentsCount: investments.length,
    achievedMilestones: new Set(milestones.map((m) => m.id)),
    phase: profile?.financialPhase,
  };

  const saga = resolveSaga(ctx);
  const reachedEndless = saga.chaptersDone >= saga.totalChapters;

  return (
    <div className="space-y-3">
      {/* Cabeçalho da Trilha */}
      <div className="rpg-panel rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-background flex items-center justify-center">
            {isClassic ? <Target className="h-5 w-5 text-gold" /> : <Scroll className="h-5 w-5 text-gold" />}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-bold text-foreground leading-tight">
              {isClassic ? 'Seu Roteiro Financeiro' : 'A Saga Financeira'}
            </h2>
            <p className="text-xs text-muted-foreground">
              {isClassic ? 'Do vermelho à liberdade — uma etapa de cada vez.' : 'Do vermelho à liberdade — um capítulo de cada vez.'}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Progresso</p>
            <p className="font-display font-bold text-gold">{saga.chaptersDone}/{saga.totalChapters}</p>
          </div>
        </div>
        <div className="stat-bar h-2 mt-3">
          <div className="stat-bar-fill bg-gold" style={{ width: `${saga.overallPct}%` }} />
        </div>
      </div>

      {/* Capítulos */}
      {saga.chapters.map((ch) => (
        <ChapterCard key={ch.id} ch={ch} />
      ))}

      {/* Pós-jornada — Sem Fim */}
      <div className={cn(
        'rounded-2xl border p-4',
        reachedEndless ? 'rpg-panel rpg-panel-gold' : 'border-border bg-card/40 opacity-70'
      )}>
        <div className="flex items-center gap-2 mb-1">
          <InfinityIcon className="h-4 w-4 text-gold" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {isClassic ? 'Modo Contínuo · ∞' : 'Pós-jornada · ∞'}
          </p>
        </div>
        <h3 className="font-display font-bold text-foreground">{isClassic ? 'Sem Parar' : 'Sem Fim'}</h3>
        <p className="text-xs text-muted-foreground">
          {isClassic
            ? (reachedEndless
                ? 'O roteiro principal acabou — agora é manter o hábito.'
                : 'Conclua o roteiro para desbloquear os objetivos contínuos de manutenção.')
            : (reachedEndless
                ? 'A história principal acabou — agora é manter a lenda viva.'
                : 'Conclua a Saga para desbloquear os desafios infinitos de manutenção.')}
        </p>
        <div className="grid grid-cols-1 gap-2 mt-3">
          {ENDLESS_GOALS.map((g) => (
            <div key={g.id} className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-2.5">
              <span className="text-xl shrink-0">{g.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{endlessGoalTitle(g, isClassic)}</p>
                <p className="text-[11px] text-muted-foreground">{endlessGoalDesc(g, isClassic)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Reexport para conveniência de quem importa a fase a partir daqui.
export { PHASE_ORDER };
