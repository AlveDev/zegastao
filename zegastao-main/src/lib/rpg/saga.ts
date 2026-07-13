// A Saga Financeira — a "Trilha" do Zé Gastão MMORPG.
// Conteúdo ORIGINAL: capítulos por fase financeira, missões derivadas de dados
// reais que o app já carrega (milestones, contas, dívidas, cofres, investimentos).
// Zero IA — progressão 100% determinística.

import type { FinancialPhase } from '@/types';

// Ordem canônica das fases (espelha o backend que calcula financialPhase).
export const PHASE_ORDER: FinancialPhase[] = [
  'survival',
  'reorganizing',
  'stabilizing',
  'accumulating',
  'growing',
];

export function phaseIndex(phase?: FinancialPhase): number {
  const i = phase ? PHASE_ORDER.indexOf(phase) : 0;
  return i < 0 ? 0 : i;
}

// Sinais checáveis a partir do estado do app (sem IA, sem leitura extra).
export type SagaCheck =
  | 'character_created'
  | 'account_added'
  | 'bosses_mapped'
  | 'cofre_opened'
  | 'has_investment'
  | `milestone:${string}`;

export interface SagaMission {
  id: string;
  label: string;
  labelClassic?: string;  // rótulo sem jargão RPG (usado no Modo Clássico)
  check: SagaCheck;
  cta?: { label: string; to: string };
}

export interface SagaChapter {
  id: string;
  index: number;          // 1-based, para exibir "CAPÍTULO N"
  phase: FinancialPhase;
  icon: string;
  iconClassic?: string;   // ícone alternativo sem simbologia de combate
  title: string;
  titleClassic?: string;
  subtitle: string;       // descrição curta do capítulo
  subtitleClassic?: string;
  missions: SagaMission[];
  reward: string;         // "Ao concluir: ..."
  rewardClassic?: string;
}

export function chapterIcon(ch: Pick<SagaChapter, 'icon' | 'iconClassic'>, isClassic: boolean): string {
  return (isClassic && ch.iconClassic) || ch.icon;
}
export function chapterTitle(ch: Pick<SagaChapter, 'title' | 'titleClassic'>, isClassic: boolean): string {
  return (isClassic && ch.titleClassic) || ch.title;
}
export function chapterSubtitle(ch: Pick<SagaChapter, 'subtitle' | 'subtitleClassic'>, isClassic: boolean): string {
  return (isClassic && ch.subtitleClassic) || ch.subtitle;
}
export function chapterReward(ch: Pick<SagaChapter, 'reward' | 'rewardClassic'>, isClassic: boolean): string {
  return (isClassic && ch.rewardClassic) || ch.reward;
}
export function missionLabel(m: Pick<SagaMission, 'label' | 'labelClassic'>, isClassic: boolean): string {
  return (isClassic && m.labelClassic) || m.label;
}

// Catálogo dos capítulos da Saga (original).
export const SAGA_CHAPTERS: SagaChapter[] = [
  {
    id: 'despertar',
    index: 1,
    phase: 'survival',
    icon: '🌅',
    title: 'O Despertar do Aventureiro',
    titleClassic: 'Primeiros Passos',
    subtitle: 'Conheça seu terreno: monte a base e enxergue sua situação real.',
    subtitleClassic: 'Monte a base: contas, dívidas e o primeiro mês no azul.',
    missions: [
      { id: 'create', label: 'Criar seu personagem', labelClassic: 'Completar seu cadastro', check: 'character_created' },
      { id: 'account', label: 'Registrar uma conta ou carteira', check: 'account_added', cta: { label: 'Adicionar conta', to: '/carteira' } },
      { id: 'map', label: 'Mapear seus Bosses (cadastrar dívidas)', labelClassic: 'Cadastrar suas dívidas', check: 'bosses_mapped', cta: { label: 'Importar extrato', to: '/upload' } },
      { id: 'azul', label: 'Fechar o primeiro mês no azul', check: 'milestone:first_positive', cta: { label: 'Ver Painel', to: '/dashboard' } },
    ],
    reward: 'A base está montada — o Sábio passa a te conhecer de verdade.',
    rewardClassic: 'A base está montada — o Copiloto passa a te conhecer de verdade.',
  },
  {
    id: 'cacada',
    index: 2,
    phase: 'reorganizing',
    icon: '⚔️',
    iconClassic: '💳',
    title: 'A Caçada aos Bosses',
    titleClassic: 'Quitação das Dívidas',
    subtitle: 'Hora do combate: ataque as dívidas na ordem certa e derrote-as.',
    subtitleClassic: 'Pague as dívidas na ordem certa e fique livre delas.',
    missions: [
      { id: 'priciest', label: 'Derrotar o Boss mais caro (maior juro)', labelClassic: 'Quitar a dívida mais cara (maior juro)', check: 'milestone:priciest_debt_cleared', cta: { label: 'Ver Dívidas', to: '/carteira' } },
      { id: 'allclear', label: 'Derrotar todos os Bosses', labelClassic: 'Quitar todas as dívidas', check: 'milestone:all_debts_cleared', cta: { label: 'Ver Dívidas', to: '/carteira' } },
    ],
    reward: 'Livre das dívidas — o campo fica aberto para construir.',
    rewardClassic: 'Livre das dívidas — agora dá para construir patrimônio.',
  },
  {
    id: 'muralha',
    index: 3,
    phase: 'stabilizing',
    icon: '🛡️',
    title: 'Erguendo a Muralha',
    titleClassic: 'Reserva de Emergência',
    subtitle: 'Construa sua reserva de emergência — sua defesa contra imprevistos.',
    subtitleClassic: 'Construa sua reserva de emergência — sua proteção contra imprevistos.',
    missions: [
      { id: 'cofre', label: 'Abrir um Cofre (caixinha de meta)', labelClassic: 'Abrir uma Caixinha (meta de poupança)', check: 'cofre_opened', cta: { label: 'Criar Caixinha', to: '/caixinha' } },
      { id: 'reserve1', label: 'Formar reserva de 1 mês', check: 'milestone:reserve_1m', cta: { label: 'Ver Caixinhas', to: '/caixinha' } },
      { id: 'reserve3', label: 'Formar reserva de 3 meses', check: 'milestone:reserve_3m', cta: { label: 'Ver Caixinhas', to: '/caixinha' } },
    ],
    reward: 'Muralha erguida — você dorme tranquilo, sem medo de imprevisto.',
    rewardClassic: 'Reserva formada — você fica tranquilo diante de imprevistos.',
  },
  {
    id: 'fazenda',
    index: 4,
    phase: 'accumulating',
    icon: '🪙',
    title: 'A Fazenda do Ouro',
    titleClassic: 'Primeiros Investimentos',
    subtitle: 'Faça o ouro trabalhar por você: comece a investir com segurança.',
    subtitleClassic: 'Faça o dinheiro trabalhar por você: comece a investir com segurança.',
    missions: [
      { id: 'firstinv', label: 'Fazer o primeiro investimento', check: 'milestone:first_investment', cta: { label: 'Ver Carteira', to: '/carteira' } },
      { id: 'inv1k', label: 'Acumular R$ 1.000 investidos', check: 'milestone:invested_1k' },
      { id: 'inv10k', label: 'Acumular R$ 10.000 investidos', check: 'milestone:invested_10k' },
    ],
    reward: 'O ouro começa a render — sua fazenda produz sozinha.',
    rewardClassic: 'Seu dinheiro começa a render sozinho.',
  },
  {
    id: 'lenda',
    index: 5,
    phase: 'growing',
    icon: '🏆',
    title: 'Lenda Viva',
    titleClassic: 'Liberdade Financeira',
    subtitle: 'O objetivo final: renda passiva cobrindo seus gastos. Liberdade.',
    missions: [
      { id: 'passive10', label: 'Renda passiva cobre 10% dos gastos', check: 'milestone:passive_10' },
      { id: 'passive100', label: 'Liberdade financeira (renda passiva = gastos)', check: 'milestone:passive_100' },
    ],
    reward: 'Lenda viva — a liberdade financeira foi conquistada. 🎉',
    rewardClassic: 'Liberdade financeira conquistada. 🎉',
  },
];

// Contexto derivado do estado do app (montado no componente a partir dos hooks).
export interface SagaContext {
  onboardingDone: boolean;
  accountsCount: number;
  debtsCount: number;
  caixinhasCount: number;
  investmentsCount: number;
  achievedMilestones: Set<string>;
  phase?: FinancialPhase;
}

export function isCheckDone(check: SagaCheck, ctx: SagaContext): boolean {
  if (check.startsWith('milestone:')) {
    return ctx.achievedMilestones.has(check.slice('milestone:'.length));
  }
  switch (check) {
    case 'character_created': return ctx.onboardingDone;
    case 'account_added':     return ctx.accountsCount > 0;
    case 'bosses_mapped':     return ctx.debtsCount > 0 || ctx.achievedMilestones.has('all_debts_cleared');
    case 'cofre_opened':      return ctx.caixinhasCount > 0;
    case 'has_investment':    return ctx.investmentsCount > 0;
    default:                  return false;
  }
}

export type ChapterStatus = 'done' | 'current' | 'locked';

export interface ResolvedMission extends SagaMission {
  done: boolean;
}

export interface ResolvedChapter extends Omit<SagaChapter, 'missions'> {
  missions: ResolvedMission[];
  completed: number;
  total: number;
  pct: number;
  status: ChapterStatus;
}

export interface ResolvedSaga {
  chapters: ResolvedChapter[];
  currentIndex: number;   // index (1-based) do capítulo atual
  chaptersDone: number;
  totalChapters: number;
  overallPct: number;
}

/**
 * Resolve a Saga de forma SERVER-AUTHORITATIVE (à prova de burla):
 *  - `financialPhase` (calculado pelo backend) é a verdade que define done/current/locked
 *    do capítulo → lida bem com casos extremos (ex.: usuário sem dívidas pula a Caçada).
 *  - Um capítulo só "fecha" sozinho pelas missões quando TODAS são baseadas em
 *    milestones do backend (imutáveis). Capítulos com checks de contagem
 *    (conta/cofre/investimento adicionados — facilmente forjáveis no cliente) só
 *    avançam quando o backend promove a fase. As contagens seguem como checklist
 *    de orientação, mas não destravam o próximo capítulo.
 */
export function resolveSaga(ctx: SagaContext): ResolvedSaga {
  const userPhase = phaseIndex(ctx.phase);

  const chapters: ResolvedChapter[] = SAGA_CHAPTERS.map((ch) => {
    const chPhase = phaseIndex(ch.phase);
    const missions: ResolvedMission[] = ch.missions.map((m) => ({
      ...m,
      done: isCheckDone(m.check, ctx),
    }));
    const completed = missions.filter((m) => m.done).length;
    const total = missions.length;
    const allMissionsDone = completed === total;
    // Só conta como "concluído pelas missões" se TODAS forem milestones do backend
    // (imutáveis). Checks de contagem no cliente não fecham o capítulo.
    const allMilestoneBased = ch.missions.every((m) => m.check.startsWith('milestone:'));
    const doneByMissions = allMissionsDone && allMilestoneBased;

    let status: ChapterStatus;
    if (chPhase < userPhase || doneByMissions) status = 'done';
    else if (chPhase === userPhase) status = 'current';
    else status = 'locked';

    return {
      ...ch,
      missions,
      completed,
      total,
      pct: total > 0 ? Math.round((completed / total) * 100) : 0,
      status,
    };
  });

  // Garante exatamente um capítulo "current": o primeiro não-concluído desbloqueado.
  let currentSet = false;
  for (const ch of chapters) {
    if (ch.status === 'current' && !currentSet) { currentSet = true; continue; }
    if (ch.status === 'current' && currentSet) ch.status = 'locked';
  }
  if (!currentSet) {
    const firstLocked = chapters.find((c) => c.status === 'locked');
    if (firstLocked) firstLocked.status = 'current';
  }

  const chaptersDone = chapters.filter((c) => c.status === 'done').length;
  const current = chapters.find((c) => c.status === 'current');
  const totalChapters = chapters.length;

  // Progresso geral: capítulos concluídos + fração do capítulo atual.
  const currentFraction = current ? current.completed / current.total : 0;
  const overallPct = Math.round(((chaptersDone + currentFraction) / totalChapters) * 100);

  return {
    chapters,
    currentIndex: current?.index ?? totalChapters,
    chaptersDone,
    totalChapters,
    overallPct: Math.min(100, overallPct),
  };
}

// Modo pós-jornada ("Sem Fim") — objetivos infinitos de manutenção. Flavor + metas reais.
export interface EndlessGoal {
  id: string;
  icon: string;
  title: string;
  titleClassic?: string;
  desc: string;
  descClassic?: string;
}

export const ENDLESS_GOALS: EndlessGoal[] = [
  { id: 'streak', icon: '🔥', title: 'Streak Infinito', titleClassic: 'Sequência Infinita', desc: 'Mantenha o hábito diário sem quebrar a corrente.' },
  { id: 'hp', icon: '❤️', title: 'HP Impecável', titleClassic: 'Saúde Financeira Impecável', desc: 'Feche vários meses seguidos com HP financeiro saudável.', descClassic: 'Feche vários meses seguidos com saúde financeira em dia.' },
  { id: 'prestige', icon: '⭐', title: 'Prestígio', titleClassic: 'Patrimônio Crescente', desc: 'Aumente seu patrimônio e renda passiva mês após mês.' },
];

export function endlessGoalTitle(g: Pick<EndlessGoal, 'title' | 'titleClassic'>, isClassic: boolean): string {
  return (isClassic && g.titleClassic) || g.title;
}
export function endlessGoalDesc(g: Pick<EndlessGoal, 'desc' | 'descClassic'>, isClassic: boolean): string {
  return (isClassic && g.descClassic) || g.desc;
}
