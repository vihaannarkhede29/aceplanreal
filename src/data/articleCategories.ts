import { ArticleCategory } from '@/types/articles';

export const articleCategories: ArticleCategory[] = [
  {
    id: 'technique',
    name: 'Tennis Technique',
    description: 'Master your strokes, footwork, and court positioning',
    icon: '🎾',
    color: 'bg-blue-500'
  },
  {
    id: 'equipment',
    name: 'Equipment & Gear',
    description: 'Racket reviews, string guides, and gear recommendations',
    icon: '🏓',
    color: 'bg-green-500'
  },
  {
    id: 'fitness',
    name: 'Fitness & Training',
    description: 'Physical conditioning, injury prevention, and recovery',
    icon: '💪',
    color: 'bg-red-500'
  },
  {
    id: 'strategy',
    name: 'Strategy & Tactics',
    description: 'Match strategy, mental game, and competitive tips',
    icon: '🧠',
    color: 'bg-purple-500'
  },
  {
    id: 'news',
    name: 'Tennis News',
    description: 'Latest updates from the tennis world',
    icon: '📰',
    color: 'bg-yellow-500'
  },
  {
    id: 'tips',
    name: 'Quick Tips',
    description: 'Daily tips and tricks to improve your game',
    icon: '💡',
    color: 'bg-orange-500'
  }
];
