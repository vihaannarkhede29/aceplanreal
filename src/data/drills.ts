import { Drill } from '@/types';

export const drills: Drill[] = [
  // FOREHAND DRILLS
  {
    id: 'forehand-consistency',
    name: 'Forehand Consistency Rally',
    category: 'forehand',
    difficulty: 'beginner',
    duration: 20,
    description: 'Build consistent forehand strokes with controlled rallies',
    instructions: [
      'Start with slow, controlled rallies from baseline',
      'Focus on clean contact and proper follow-through',
      'Aim for 10 consecutive shots without errors',
      'Gradually increase pace while maintaining control'
    ],
    focus: ['Consistency', 'Technique', 'Timing'],
    equipment: ['Tennis racket', 'Tennis balls', 'Partner or ball machine'],
    courtSetup: 'Baseline to baseline, full court width',
    variations: ['Cross-court only', 'Down the line', 'Alternating directions'],
    videoUrl: 'https://www.youtube.com/shorts/G7ZJNaszMrc'
  },
  {
    id: 'forehand-power',
    name: 'Forehand Power Development',
    category: 'forehand',
    difficulty: 'intermediate',
    duration: 25,
    description: 'Develop power and depth in your forehand shots',
    instructions: [
      'Use proper weight transfer from back foot to front foot',
      'Generate racket head speed with relaxed arm',
      'Hit through the ball with full extension',
      'Aim for deep shots that land within 3 feet of baseline'
    ],
    focus: ['Power', 'Depth', 'Weight transfer'],
    equipment: ['Tennis racket', 'Tennis balls', 'Partner or ball machine'],
    courtSetup: 'Baseline to baseline, full court width',
    variations: ['Inside-out forehand', 'Running forehand', 'High forehand'],
    videoUrl: 'https://www.youtube.com/shorts/bt2xtajWf7g'
  },
  {
    id: 'forehand-placement',
    name: 'Forehand Target Practice',
    category: 'forehand',
    difficulty: 'intermediate',
    duration: 30,
    description: 'Improve forehand accuracy and shot placement',
    instructions: [
      'Place targets in different court positions',
      'Practice hitting specific zones consistently',
      'Work on both cross-court and down-the-line shots',
      'Vary between deep and short shots'
    ],
    focus: ['Accuracy', 'Placement', 'Court awareness'],
    equipment: ['Tennis racket', 'Tennis balls', 'Targets or markers', 'Partner'],
    courtSetup: 'Full court with target zones marked',
    variations: ['Corner targets', 'Service box targets', 'Baseline targets'],
    videoUrl: 'https://www.youtube.com/watch?v=bqhJwjIe9Co'
  },

  // BACKHAND DRILLS
  {
    id: 'backhand-consistency',
    name: 'Backhand Consistency Rally',
    category: 'backhand',
    difficulty: 'beginner',
    duration: 20,
    description: 'Build consistent backhand strokes with controlled rallies',
    instructions: [
      'Focus on proper grip and stance',
      'Keep the ball in front of your body',
      'Use smooth, controlled strokes',
      'Aim for 10 consecutive shots without errors'
    ],
    focus: ['Consistency', 'Grip', 'Stance'],
    equipment: ['Tennis racket', 'Tennis balls', 'Partner or ball machine'],
    courtSetup: 'Baseline to baseline, full court width',
    variations: ['One-handed backhand', 'Two-handed backhand', 'Slice backhand'],
    videoUrl: 'https://www.youtube.com/shorts/e8LpNthxXUM'
  },
  {
    id: 'backhand-slice',
    name: 'Backhand Slice Development',
    category: 'backhand',
    difficulty: 'intermediate',
    duration: 25,
    description: 'Master the backhand slice for defensive and tactical play',
    instructions: [
      'Use continental grip for slice',
      'Keep the racket face open',
      'Hit high to low with forward motion',
      'Aim for low, skidding balls'
    ],
    focus: ['Slice technique', 'Defensive play', 'Tactical variety'],
    equipment: ['Tennis racket', 'Tennis balls', 'Partner or ball machine'],
    courtSetup: 'Baseline to baseline, full court width',
    variations: ['Defensive slice', 'Approach slice', 'Drop shot slice'],
    videoUrl: 'https://www.youtube.com/shorts/7BxqbSWXh2c'
  },

  // SERVE DRILLS
  {
    id: 'serve-placement',
    name: 'Serve Placement Practice',
    category: 'serve',
    difficulty: 'intermediate',
    duration: 30,
    description: 'Improve serve accuracy and placement',
    instructions: [
      'Practice serving to specific targets',
      'Work on both deuce and ad court serves',
      'Vary between flat, slice, and kick serves',
      'Focus on consistent ball toss'
    ],
    focus: ['Accuracy', 'Placement', 'Ball toss'],
    equipment: ['Tennis racket', 'Tennis balls', 'Targets'],
    courtSetup: 'Service line with targets',
    variations: ['Flat serve', 'Slice serve', 'Kick serve'],
    videoUrl: 'https://www.youtube.com/shorts/70YFDJqIED8'
  },
  {
    id: 'serve-power',
    name: 'Serve Power Development',
    category: 'serve',
    difficulty: 'advanced',
    duration: 25,
    description: 'Develop power and speed in your serve',
    instructions: [
      'Use proper kinetic chain from legs to arm',
      'Generate racket head speed with relaxed motion',
      'Focus on timing and coordination',
      'Aim for consistent power without sacrificing accuracy'
    ],
    focus: ['Power', 'Speed', 'Kinetic chain'],
    equipment: ['Tennis racket', 'Tennis balls'],
    courtSetup: 'Service line',
    variations: ['Flat serve power', 'Slice serve power', 'Kick serve power'],
    videoUrl: 'https://www.youtube.com/shorts/QbMxFrOwfTQ'
  },

  // VOLLEY DRILLS
  {
    id: 'volley-fundamentals',
    name: 'Volley Fundamentals',
    category: 'volley',
    difficulty: 'beginner',
    duration: 20,
    description: 'Learn basic volley technique and positioning',
    instructions: [
      'Use continental grip for all volleys',
      'Keep racket in front of body',
      'Use short, punching motion',
      'Move forward to meet the ball'
    ],
    focus: ['Grip', 'Positioning', 'Punch motion'],
    equipment: ['Tennis racket', 'Tennis balls', 'Partner'],
    courtSetup: 'Service line to net',
    variations: ['Forehand volley', 'Backhand volley', 'High volley'],
    videoUrl: 'https://www.youtube.com/shorts/STgNj2feCwE'
  },
  {
    id: 'volley-placement',
    name: 'Volley Placement Practice',
    category: 'volley',
    difficulty: 'intermediate',
    duration: 25,
    description: 'Improve volley accuracy and placement',
    instructions: [
      'Practice volleying to specific targets',
      'Work on both offensive and defensive volleys',
      'Focus on quick reactions and positioning',
      'Vary between deep and short volleys'
    ],
    focus: ['Accuracy', 'Reactions', 'Positioning'],
    equipment: ['Tennis racket', 'Tennis balls', 'Targets', 'Partner'],
    courtSetup: 'Net area with targets',
    variations: ['Deep volley', 'Short volley', 'Angle volley'],
    videoUrl: 'https://www.youtube.com/shorts/R8SPjm7WkGk'
  },

  // RETURN DRILLS
  {
    id: 'return-positioning',
    name: 'Return Positioning and Movement',
    category: 'return',
    difficulty: 'intermediate',
    duration: 30,
    description: 'Improve return positioning and movement patterns',
    instructions: [
      'Practice different return positions',
      'Work on quick movement to the ball',
      'Focus on split-step timing',
      'Vary between aggressive and defensive returns'
    ],
    focus: ['Positioning', 'Movement', 'Timing'],
    equipment: ['Tennis racket', 'Tennis balls', 'Partner or ball machine'],
    courtSetup: 'Return position to baseline',
    variations: ['Aggressive return', 'Defensive return', 'Chip return'],
    videoUrl: 'https://www.youtube.com/shorts/trzCwVpa5Rw'
  },

  // OVERHEAD DRILLS
  {
    id: 'overhead-fundamentals',
    name: 'Overhead Smash Fundamentals',
    category: 'overhead',
    difficulty: 'intermediate',
    duration: 25,
    description: 'Master the overhead smash technique',
    instructions: [
      'Use proper positioning under the ball',
      'Generate power with full arm extension',
      'Focus on timing and coordination',
      'Aim for consistent placement'
    ],
    focus: ['Positioning', 'Power', 'Timing'],
    equipment: ['Tennis racket', 'Tennis balls', 'Partner'],
    courtSetup: 'Net area',
    variations: ['High overhead', 'Low overhead', 'Running overhead'],
    videoUrl: 'https://youtube.com/shorts/AEB-VfM_u6U'
  },

  // FOOTWORK DRILLS
  {
    id: 'ladder-drills',
    name: 'Tennis Ladder Drills',
    category: 'footwork',
    difficulty: 'beginner',
    duration: 20,
    description: 'Improve footwork and agility with ladder drills',
    instructions: [
      'Set up agility ladder on court',
      'Practice various footwork patterns',
      'Focus on quick, light steps',
      'Maintain proper tennis stance'
    ],
    focus: ['Agility', 'Speed', 'Coordination'],
    equipment: ['Agility ladder', 'Tennis shoes'],
    courtSetup: 'Agility ladder on court surface',
    variations: ['In-and-out', 'Side-to-side', 'Hopscotch'],
    videoUrl: 'https://www.youtube.com/shorts/QGTpnBt8XTU'
  },
  {
    id: 'split-step',
    name: 'Split-Step Timing',
    category: 'footwork',
    difficulty: 'intermediate',
    duration: 15,
    description: 'Master the split-step for better court movement',
    instructions: [
      'Practice split-step timing',
      'Focus on explosive movement after split',
      'Work on directional changes',
      'Maintain balance throughout movement'
    ],
    focus: ['Timing', 'Explosiveness', 'Balance'],
    equipment: ['Tennis racket', 'Tennis balls', 'Partner'],
    courtSetup: 'Full court movement',
    variations: ['Forward split-step', 'Sideways split-step', 'Backward split-step'],
    videoUrl: 'https://www.youtube.com/watch?v=J1UhPl1UrYs'
  },

  // STRATEGY DRILLS
  {
    id: 'point-play',
    name: 'Point Play Strategy',
    category: 'strategy',
    difficulty: 'advanced',
    duration: 45,
    description: 'Practice strategic point play and decision making',
    instructions: [
      'Play practice points with specific strategies',
      'Focus on shot selection and court positioning',
      'Work on building points systematically',
      'Practice different game situations'
    ],
    focus: ['Strategy', 'Decision making', 'Court awareness'],
    equipment: ['Tennis racket', 'Tennis balls', 'Partner'],
    courtSetup: 'Full court match play',
    variations: ['Serve and volley', 'Baseline rally', 'All-court play'],
    videoUrl: 'https://www.youtube.com/shorts/6kW1k5vWBaQ'
  },

  // MENTAL DRILLS
  {
    id: 'focus-concentration',
    name: 'Focus and Concentration',
    category: 'mental',
    difficulty: 'intermediate',
    duration: 20,
    description: 'Improve mental focus and concentration during play',
    instructions: [
      'Practice mindfulness techniques',
      'Focus on breathing and relaxation',
      'Work on staying present in the moment',
      'Develop mental routines between points'
    ],
    focus: ['Focus', 'Concentration', 'Mental toughness'],
    equipment: ['Tennis racket', 'Tennis balls', 'Quiet space'],
    courtSetup: 'Any court or practice area',
    variations: ['Breathing exercises', 'Visualization', 'Mental routines'],
    videoUrl: 'https://www.youtube.com/shorts/R2Jtrt-RBrE'
  },

  // FITNESS DRILLS
  {
    id: 'endurance-training',
    name: 'Tennis Endurance Training',
    category: 'fitness',
    difficulty: 'intermediate',
    duration: 40,
    description: 'Build endurance and stamina for tennis matches',
    instructions: [
      'Combine cardio and tennis-specific movements',
      'Work on interval training patterns',
      'Focus on maintaining form when tired',
      'Build up endurance gradually'
    ],
    focus: ['Endurance', 'Stamina', 'Cardio fitness'],
    equipment: ['Tennis racket', 'Tennis balls', 'Timer'],
    courtSetup: 'Full court with movement patterns',
    variations: ['Interval training', 'Circuit training', 'Match simulation'],
    videoUrl: 'https://www.youtube.com/watch?v=OMX3AR_KnGI'
  }
];
