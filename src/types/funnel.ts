export type QuestionType = 'tiles' | 'slider' | 'single' | 'multi' | 'ranking' | 'allocation';

export interface Option {
  id: string;
  label: string;
  value: number;
  icon?: string;
  pillar?: 'aquisição' | 'atendimento' | 'processo';
  painPoint?: string;
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
  emotionalHook?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface UserData {
  name: string;
  whatsapp: string;
  email: string;
  responses: Record<number, any>;
  xp: number;
  streak: number;
  badges: string[];
  expectation?: string;
  painProfile?: string;
  previousAttempt?: string;
}

export interface PillarScore {
  name: string;
  score: number;
  max: number;
  description: string;
  status: 'high' | 'medium' | 'low';
}

export interface FinalResults {
  totalScore: number;
  pillars: PillarScore[];
  classification: string;
  classificationExplanation: string;
  bottleneck: string;
  bottleneckWhy: string;
  bottleneckPillars: string[];
  impact: string;
  recommendations: {
    sevenDays: string[];
    thirtyDays: string[];
    sixtyNinetyDays: string[];
  };
  earnedBadges: Badge[];
  level: number;
}
