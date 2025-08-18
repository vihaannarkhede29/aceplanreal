export interface QuizQuestion {
  id: string;
  question: string;
  type: 'radio' | 'select' | 'text' | 'multi-select';
  options?: string[];
  placeholder?: string;
  required: boolean;
  description?: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'skillLevel',
    question: 'What is your current tennis skill level?',
    type: 'radio',
    options: [
      'Beginner - I\'m new to tennis or have been playing for less than 1 year',
      'Intermediate - I can rally consistently and understand basic tactics',
      'Advanced - I play competitively and have refined technique'
    ],
    required: true,
    description: 'This helps us recommend rackets appropriate for your experience level'
  },
  {
    id: 'yearsPlaying',
    question: 'How many years have you been playing tennis?',
    type: 'select',
    options: [
      'Less than 1 year',
      '1-3 years',
      '3-5 years',
      '5-10 years',
      '10+ years'
    ],
    required: true
  },
  {
    id: 'height',
    question: 'What is your height?',
    type: 'select',
    options: [
      'Under 5\'4" (162 cm)',
      '5\'4" - 5\'8" (162-173 cm)',
      '5\'8" - 6\'0" (173-183 cm)',
      '6\'0" - 6\'4" (183-193 cm)',
      'Over 6\'4" (193 cm)'
    ],
    required: true,
    description: 'Height affects racket length and weight recommendations'
  },
  {
    id: 'build',
    question: 'How would you describe your build?',
    type: 'radio',
    options: [
      'Slim/Athletic - I have a lean build',
      'Average - I have a balanced build',
      'Strong/Heavy - I have a muscular or heavier build'
    ],
    required: true,
    description: 'This helps determine appropriate racket weight'
  },
  {
    id: 'playingStyle',
    question: 'What best describes your playing style?',
    type: 'radio',
    options: [
      'Aggressive baseliner - I like to hit hard from the baseline',
      'All-court player - I mix up my game and move around the court',
      'Serve-volley - I like to serve and come to the net',
      'Defensive - I focus on consistency and getting balls back'
    ],
    required: true,
    description: 'Playing style affects racket characteristics and string choices'
  },
  {
    id: 'armInjuries',
    question: 'Do you have any arm, shoulder, or elbow injuries or concerns?',
    type: 'radio',
    options: [
      'No - My arms and shoulders feel fine',
      'Yes - I experience occasional discomfort',
      'Yes - I have ongoing issues or injuries'
    ],
    required: true,
    description: 'This helps us recommend arm-friendly equipment if needed'
  },
  {
    id: 'budget',
    question: 'What is your budget range for a tennis racket?',
    type: 'radio',
    options: [
      '$50-100 - Budget-friendly options',
      '$100-200 - Mid-range quality',
      '$200-300 - Premium performance',
      '$300+ - Professional grade'
    ],
    required: true,
    description: 'We\'ll show you the best options within your budget'
  },
  {
    id: 'primaryGoals',
    question: 'What is your primary goal when choosing equipment?',
    type: 'radio',
    options: [
      'Power - I want to hit harder shots',
      'Control - I want to precise shot placement',
      'Comfort - I want to smooth, comfortable feel',
      'Spin - I want to generate more spin',
      'All-around - I want balanced performance'
    ],
    required: true,
    description: 'This helps determine string type and racket characteristics'
  },
  {
    id: 'trainingDays',
    question: 'How many days per week can you train?',
    type: 'select',
    options: [
      '1-2 days per week',
      '3-4 days per week',
      '5-6 days per week',
      '7 days per week'
    ],
    required: true,
    description: 'This helps create your personalized training schedule'
  },
  {
    id: 'trainingHours',
    question: 'How many hours per week can you dedicate to tennis training?',
    type: 'select',
    options: [
      '1-3 hours per week',
      '4-6 hours per week',
      '7-10 hours per week',
      '10+ hours per week'
    ],
    required: true,
    description: 'This determines the intensity and volume of your training plan'
  },
  {
    id: 'weakestShots',
    question: 'Which shots do you struggle with most? (Select all that apply)',
    type: 'multi-select',
    options: [
      'Forehand - Inconsistent or lacks power',
      'Backhand - Weak or unreliable',
      'Serve - Low percentage or lacks power',
      'Volley - Poor net play',
      'Return - Struggling with service returns',
      'Overhead - Missing easy putaways',
      'Drop shot - Can\'t execute effectively',
      'Lob - Poor defensive lobs',
      'None - All my shots are solid'
    ],
    required: true,
    description: 'This helps focus your training on areas that need improvement'
  },
  {
    id: 'improvementAreas',
    question: 'What areas do you want to improve most? (Select all that apply)',
    type: 'multi-select',
    options: [
      'Power - Hit harder shots',
      'Control - Better shot placement',
      'Consistency - Reduce unforced errors',
      'Footwork - Better court movement',
      'Strategy - Tactical understanding',
      'Mental game - Focus and confidence',
      'Fitness - Endurance and strength',
      'Match play - Competitive performance',
      'All-around - General improvement'
    ],
    required: true,
    description: 'This guides your training priorities and drill selection'
  },
  {
    id: 'currentRacket',
    question: 'What racket are you currently using? (Optional)',
    type: 'text',
    placeholder: 'e.g., Wilson Pro Staff, Babolat Pure Drive, or "None"',
    required: false,
    description: 'This helps us understand what you\'re used to'
  },
  {
    id: 'currentRacketFeedback',
    question: 'What do you like or dislike about your current racket? (Optional)',
    type: 'text',
    placeholder: 'e.g., "Too heavy", "Great power but lacks control", or "N/A"',
    required: false,
    description: 'This helps us recommend improvements or alternatives'
  }
];
