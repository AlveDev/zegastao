// E4 — Árvore de Skills por profissão
// Determinístico — sem IA. Desbloqueadas por nível de profissão.

import type { Profession } from '@/lib/xp';

export interface Skill {
  id: string;
  profession: Profession;
  name: string;
  nameClassic?: string;
  desc: string;
  descClassic?: string;
  emoji: string;
  unlockLevel: number; // nível de profissão necessário (professionLevel)
}

export const SKILL_TREE: Skill[] = [
  // ── Poupador ──────────────────────────────────────────────
  { id: 'poupador_1', profession: 'poupador', name: 'Cofre Inicial', nameClassic: 'Primeira Caixinha', emoji: '🏦', unlockLevel: 1, desc: 'Habilidade de criar sua primeira caixinha de meta.' },
  { id: 'poupador_2', profession: 'poupador', name: 'Depósito Diário', emoji: '📅', unlockLevel: 2, desc: 'Streak de depósito diário ganha +5 XP de bônus.', descClassic: 'Sequência de depósito diário ganha +5 pontos de bônus.' },
  { id: 'poupador_3', profession: 'poupador', name: 'Cofre Avançado', nameClassic: 'Caixinhas Múltiplas', emoji: '💰', unlockLevel: 3, desc: 'Você pode criar múltiplas caixinhas simultâneas.' },
  { id: 'poupador_4', profession: 'poupador', name: 'Escudo da Reserva', nameClassic: 'Reserva de 1 Mês', emoji: '🛡️', unlockLevel: 5, desc: 'Reserva de 1 mês desbloqueia escudo visual no perfil.', descClassic: 'Reserva de 1 mês desbloqueia selo visual no perfil.' },
  { id: 'poupador_5', profession: 'poupador', name: 'Muralha de Cristal', nameClassic: 'Reserva de 3 Meses', emoji: '🏰', unlockLevel: 8, desc: 'Reserva de 3 meses — o HP nunca cai abaixo de 30.', descClassic: 'Reserva de 3 meses — a saúde financeira nunca cai abaixo de 30.' },

  // ── Quitador ──────────────────────────────────────────────
  { id: 'quitador_1', profession: 'quitador', name: 'Golpe Básico', nameClassic: 'Pagamento em Dia', emoji: '⚔️', unlockLevel: 1, desc: 'Registrar pagamento de parcela ganha +5 XP extra.' },
  { id: 'quitador_2', profession: 'quitador', name: 'Foco no Boss', nameClassic: 'Prioridade na Dívida', emoji: '🎯', unlockLevel: 2, desc: 'Boss mais caro aparece em destaque no topo da lista.', descClassic: 'Dívida mais cara aparece em destaque no topo da lista.' },
  { id: 'quitador_3', profession: 'quitador', name: 'Golpe Crítico', nameClassic: 'Pagamento Extra', emoji: '💥', unlockLevel: 3, desc: 'Pagamento acima da parcela mínima dá +10 XP de bônus.' },
  { id: 'quitador_4', profession: 'quitador', name: 'Caça aos Bosses', nameClassic: 'Quitação de Dívidas', emoji: '🗡️', unlockLevel: 5, desc: 'Cada Boss derrotado adiciona +50 XP de profissão.', descClassic: 'Cada dívida quitada adiciona +50 pontos de experiência.' },
  { id: 'quitador_5', profession: 'quitador', name: 'Purificador de Mapa', nameClassic: 'Livre de Dívidas', emoji: '🌟', unlockLevel: 8, desc: 'Sem dívidas ativas: HP base sobe +10 pontos.', descClassic: 'Sem dívidas ativas: saúde financeira base sobe +10 pontos.' },

  // ── Freelancer ────────────────────────────────────────────
  { id: 'freelancer_1', profession: 'freelancer', name: 'Bounty Básico', nameClassic: 'Primeiras Oportunidades', emoji: '📌', unlockLevel: 1, desc: 'Acesso às missões de renda extra T1 (Explorador).', descClassic: 'Acesso às tarefas de renda extra nível Iniciante.' },
  { id: 'freelancer_2', profession: 'freelancer', name: 'Mapa do Caçador', nameClassic: 'Oportunidades Intermediárias', emoji: '🗺️', unlockLevel: 2, desc: 'Acesso às missões T2 (Caçador) e drop de Prata.', descClassic: 'Acesso às tarefas de renda extra nível Intermediário.' },
  { id: 'freelancer_3', profession: 'freelancer', name: 'Instinto de Renda', emoji: '💡', unlockLevel: 3, desc: 'Missões de renda aparecem personalizadas por habilidade.', descClassic: 'Tarefas de renda aparecem personalizadas por habilidade.' },
  { id: 'freelancer_4', profession: 'freelancer', name: 'Cédula de Elite', nameClassic: 'Oportunidades Avançadas', emoji: '💵', unlockLevel: 5, desc: 'Acesso às missões T3 (Lendário) e drop de Ouro.', descClassic: 'Acesso às tarefas de renda extra nível Avançado.' },
  { id: 'freelancer_5', profession: 'freelancer', name: 'Mercador Lendário', nameClassic: 'Especialista em Renda Extra', emoji: '🏆', unlockLevel: 8, desc: 'XP de missões de renda extra dobrado.', descClassic: 'Pontos de experiência de tarefas de renda extra dobrados.' },

  // ── Investidor ────────────────────────────────────────────
  { id: 'investidor_1', profession: 'investidor', name: 'Primeira Semeadura', nameClassic: 'Primeiro Investimento', emoji: '🌱', unlockLevel: 1, desc: 'Registrar primeiro investimento ganha +50 XP extra.' },
  { id: 'investidor_2', profession: 'investidor', name: 'Fazendeiro Básico', nameClassic: 'Renda Passiva', emoji: '🪙', unlockLevel: 2, desc: 'Visualização de renda passiva estimada na Fazenda.', descClassic: 'Visualização de renda passiva estimada.' },
  { id: 'investidor_3', profession: 'investidor', name: 'Portfólio Diverso', emoji: '📊', unlockLevel: 3, desc: 'Painel mostra distribuição da carteira por tipo.' },
  { id: 'investidor_4', profession: 'investidor', name: 'Colheita Mensal', nameClassic: 'Renda Passiva Consolidada', emoji: '🌾', unlockLevel: 5, desc: 'Renda passiva acima de R$ 1.000/mês destrava badge.' },
  { id: 'investidor_5', profession: 'investidor', name: 'Arcano do Patrimônio', nameClassic: 'Projeção de Patrimônio', emoji: '🔮', unlockLevel: 8, desc: 'Visão de projeção de patrimônio por 12 meses.' },
];

export function getSkillsForProfession(profession: Profession): Skill[] {
  return SKILL_TREE.filter((s) => s.profession === profession);
}

export function isSkillUnlocked(skill: Skill, profLevel: number): boolean {
  return profLevel >= skill.unlockLevel;
}

export function skillName(skill: Pick<Skill, 'name' | 'nameClassic'>, isClassic: boolean): string {
  return (isClassic && skill.nameClassic) || skill.name;
}
export function skillDesc(skill: Pick<Skill, 'desc' | 'descClassic'>, isClassic: boolean): string {
  return (isClassic && skill.descClassic) || skill.desc;
}
