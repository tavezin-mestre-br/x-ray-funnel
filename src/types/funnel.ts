export type QuestionType = 'tiles' | 'slider' | 'single' | 'multi' | 'ranking' | 'allocation';

export interface Option {
  id: string;
  label: string;
  value: number;
  icon?: string;
  pillar?: 'aquisição' | 'conversão' | 'processo' | 'alavancas';
}

export interface Question {
  id: number;
  phase: number;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options: Option[];
  timerSeconds?: number;
  feedback?: string;
}

export interface UserData {
  name: string;
  whatsapp: string;
  email: string;
  responses: Record<number, any>;
  xp: number;
  streak: number;
  badges: string[];
}

export interface PillarScore {
  name: string;
  score: number;
  max: number;
}

export interface FinalResults {
  totalScore: number;
  pillars: PillarScore[];
  classification: string;
  bottleneck: string;
  bottleneckWhy: string;
  impact: string;
  recommendations: {
    sevenDays: string;
    thirtyDays: string;
    sixtyNinetyDays: string;
  };
}
