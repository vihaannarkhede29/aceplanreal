export interface QuizAnswer {
  skillLevel: string;
  yearsPlaying: string;
  height: string;
  build: string;
  playingStyle: string;
  armInjuries: string;
  budget: string;
  primaryGoals: string;
  trainingDays: string;
  trainingHours: string;
  weakestShots: string[];
  improvementAreas: string[];
  currentRacket: string;
  currentRacketFeedback: string;
}

export interface Racket {
  id: string;
  name: string;
  brand: string;
  weight: string;
  headSize: string;
  stiffness: string;
  level: string;
  description: string;
  pros: string[];
  cons: string[];
  affiliateLink: string;
  imageUrl: string;
  category: 'good' | 'better' | 'best';
}

export interface StringRecommendation {
  type: string;
  name: string;
  description: string;
  tension: string;
  affiliateLink: string;
  bestFor: string[];
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  affiliateLink: string;
  imageUrl: string;
}

export interface Drill {
  id: string;
  name: string;
  category: 'forehand' | 'backhand' | 'serve' | 'volley' | 'return' | 'overhead' | 'drop-shot' | 'lob' | 'footwork' | 'strategy' | 'mental' | 'fitness';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  description: string;
  instructions: string[];
  focus: string[];
  equipment: string[];
  courtSetup: string;
  variations: string[];
  videoUrl?: string; // YouTube video URL for the drill
}

export interface TrainingDay {
  day: string;
  focus: string;
  drills: Drill[];
  totalDuration: number;
  intensity: 'low' | 'medium' | 'high';
  notes: string;
}

export interface TrainingWeek {
  weekNumber: number;
  days: TrainingDay[];
  weeklyFocus: string;
  totalHours: number;
  progression: string;
}

export interface RecommendationResult {
  rackets: Racket[];
  strings: StringRecommendation[];
  equipment: Equipment[];
  trainingPlan: TrainingWeek[];
  explanation: string;
  skillLevel: string;
  playingStyle: string;
  trainingSummary: string;
}
