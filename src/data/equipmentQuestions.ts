export interface EquipmentQuestion {
  id: string;
  question: string;
  type: 'radio' | 'select' | 'text';
  options?: string[];
  placeholder?: string;
  required: boolean;
  description?: string;
}

export const equipmentQuestions: EquipmentQuestion[] = [
  {
    id: 'skillLevel',
    question: 'What is your current tennis skill level?',
    type: 'radio',
    options: [
      'Complete Beginner - I have never played tennis before',
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
      'Never played',
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
