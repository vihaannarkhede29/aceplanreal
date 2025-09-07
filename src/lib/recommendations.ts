import { QuizAnswer, Racket, StringRecommendation, Equipment, RecommendationResult } from '@/types';
import { rackets } from '@/data/rackets';
import { strings } from '@/data/strings';
import { equipment } from '@/data/equipment';
import { generateTrainingPlan } from './trainingPlan';

export function generateRecommendations(answers: QuizAnswer): RecommendationResult {
  // Filter rackets based on skill level
  let skillFilteredRackets = rackets.filter(racket => {
    if (answers.skillLevel.includes('Beginner')) {
      return racket.level === 'Beginner' || racket.level === 'Beginner-Intermediate';
    } else if (answers.skillLevel.includes('Intermediate')) {
      return racket.level === 'Intermediate' || racket.level === 'Beginner-Intermediate' || racket.level === 'Intermediate-Advanced';
    } else if (answers.skillLevel.includes('Advanced')) {
      return racket.level === 'Advanced' || racket.level === 'Intermediate-Advanced';
    }
    return true;
  });

  // Filter based on arm injuries
  if (answers.armInjuries && answers.armInjuries.includes('Yes')) {
    skillFilteredRackets = skillFilteredRackets.filter(racket => {
      // Prefer flexible frames for arm issues
      return racket.stiffness === 'Flexible' || racket.stiffness === 'Medium';
    });
  }

  // Score and sort rackets
  const scoredRackets = skillFilteredRackets.map(racket => {
    let score = 0;
    
    // Skill level scoring
    if (answers.skillLevel.includes('Beginner') && racket.level.includes('Beginner')) {
      score += 5;
    } else if (answers.skillLevel.includes('Intermediate') && racket.level.includes('Intermediate')) {
      score += 5;
    } else if (answers.skillLevel.includes('Advanced') && racket.level.includes('Advanced')) {
      score += 5;
    }

    // Playing style scoring based on racket characteristics
    if (answers.playingStyle && answers.playingStyle.includes('Aggressive')) {
      // Prefer power rackets for aggressive players
      if (racket.name.includes('Pure Aero') || racket.name.includes('Pure Drive') || racket.name.includes('VCORE')) {
        score += 4;
      }
      // Prefer heavier rackets for aggressive players
      if (racket.weight.includes('11') || racket.weight.includes('12')) {
        score += 2;
      }
    } else if (answers.playingStyle && answers.playingStyle.includes('Defensive')) {
      // Prefer control rackets for defensive players
      if (racket.name.includes('Pro Staff') || racket.name.includes('Blade') || racket.name.includes('Phantom')) {
        score += 4;
      }
      // Prefer lighter rackets for defensive players
      if (racket.weight.includes('10') || racket.weight.includes('9')) {
        score += 2;
      }
    } else if (answers.playingStyle && answers.playingStyle.includes('All-court')) {
      // Prefer all-around rackets
      if (racket.name.includes('Radical') || racket.name.includes('Speed') || racket.name.includes('Clash')) {
        score += 4;
      }
    }

    // Primary goals scoring
    if (answers.primaryGoals && answers.primaryGoals.includes('Power')) {
      // Prefer power rackets
      if (racket.name.includes('Pure Aero') || racket.name.includes('Pure Drive') || racket.name.includes('VCORE')) {
        score += 3;
      }
      // Prefer larger head sizes for power
      if (racket.headSize.includes('100') || racket.headSize.includes('104')) {
        score += 2;
      }
    } else if (answers.primaryGoals && answers.primaryGoals.includes('Control')) {
      // Prefer control rackets
      if (racket.name.includes('Pro Staff') || racket.name.includes('Blade') || racket.name.includes('Phantom')) {
        score += 3;
      }
      // Prefer smaller head sizes for control
      if (racket.headSize.includes('97') || racket.headSize.includes('98')) {
        score += 2;
      }
    } else if (answers.primaryGoals && answers.primaryGoals.includes('Spin')) {
      // Prefer spin rackets
      if (racket.name.includes('Pure Aero') || racket.name.includes('VCORE')) {
        score += 3;
      }
    } else if (answers.primaryGoals && answers.primaryGoals.includes('Comfort')) {
      // Prefer comfortable rackets
      if (racket.name.includes('Clash') || racket.name.includes('EZONE') || racket.stiffness === 'Flexible') {
        score += 3;
      }
    }

    // Arm injury considerations
    if (answers.armInjuries && answers.armInjuries.includes('Yes')) {
      if (racket.stiffness === 'Flexible') {
        score += 3;
      } else if (racket.stiffness === 'Medium') {
        score += 1;
      }
      // Prefer arm-friendly rackets
      if (racket.name.includes('Clash') || racket.name.includes('EZONE')) {
        score += 2;
      }
    }

    return { ...racket, score };
  });

  // Sort by score and take top 3
  let recommendedRackets = scoredRackets
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((racket, index) => ({
      ...racket,
      category: (index === 0 ? 'best' : index === 1 ? 'better' : 'good') as 'good' | 'better' | 'best'
    }));

  // Fallback: if no rackets match criteria, use the best overall rackets
  if (recommendedRackets.length === 0) {
    console.log('No rackets matched criteria, using fallback recommendations');
    recommendedRackets = rackets
      .slice(0, 3)
      .map((racket, index) => ({
        ...racket,
        score: 10 - index, // Add score for fallback rackets
        category: (index === 0 ? 'best' : index === 1 ? 'better' : 'good') as 'good' | 'better' | 'best'
      }));
  }

  // Filter strings based on skill level and goals
  let filteredStrings = strings.filter(string => {
    // Skill-based filtering
    if (answers.skillLevel.includes('Beginner')) {
      return string.type === 'Synthetic Gut' || string.type === 'Multifilament';
    } else if (answers.skillLevel.includes('Advanced')) {
      return string.type === 'Polyester' || string.type === 'Hybrid';
    }
    return true; // Intermediate can use any type
  });

  // Filter based on primary goals
  if (answers.primaryGoals && answers.primaryGoals.includes('Power')) {
    filteredStrings = filteredStrings.filter(string => 
      string.type === 'Multifilament' || string.type === 'Synthetic Gut'
    );
  } else if (answers.primaryGoals && answers.primaryGoals.includes('Control')) {
    filteredStrings = filteredStrings.filter(string => 
      string.type === 'Polyester' || string.type === 'Hybrid'
    );
  }

  // Filter based on arm injuries
  if (answers.armInjuries && answers.armInjuries.includes('Yes')) {
    filteredStrings = filteredStrings.filter(string => 
      string.type === 'Multifilament' || string.type === 'Synthetic Gut'
    );
  }

  // Score and sort strings
  const scoredStrings = filteredStrings.map(string => {
    let score = 0;
    
    // Skill level scoring
    if (answers.skillLevel.includes('Beginner') && string.type === 'Synthetic Gut') {
      score += 5;
    } else if (answers.skillLevel.includes('Advanced') && string.type === 'Polyester') {
      score += 5;
    }

    // Goals scoring
    if (answers.primaryGoals && answers.primaryGoals.includes('Power') && string.type === 'Multifilament') {
      score += 3;
    } else if (answers.primaryGoals && answers.primaryGoals.includes('Control') && string.type === 'Polyester') {
      score += 3;
    }

    return { ...string, score };
  });

  let recommendedStrings = scoredStrings
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Fallback: if no strings match criteria, use the best overall strings
  if (recommendedStrings.length === 0) {
    console.log('No strings matched criteria, using fallback recommendations');
    recommendedStrings = strings
      .slice(0, 3)
      .map((string, index) => ({
        ...string,
        score: 10 - index // Add score for fallback strings
      }));
  }

  // Generate explanation with fallback
  const topRacket = recommendedRackets[0];
  const explanation = generateExplanation(answers, topRacket);

  // Generate training plan
  const trainingPlan = generateTrainingPlan(answers);
  const trainingSummary = generateTrainingSummary(answers, trainingPlan);

  // Select equipment recommendations based on skill level and goals
  let recommendedEquipment = equipment;
  
  // Prioritize racket equipment for the user's skill level
  if (answers.skillLevel.includes('Beginner')) {
    recommendedEquipment = equipment.filter(item => 
      item.category === 'Tennis Rackets' && 
      (item.name.includes('Clash') || item.name.includes('Lite') || item.name.includes('UL'))
    ).concat(equipment.filter(item => item.category !== 'Tennis Rackets'));
  } else if (answers.skillLevel.includes('Advanced')) {
    recommendedEquipment = equipment.filter(item => 
      item.category === 'Tennis Rackets' && 
      (item.name.includes('Pro Staff') || item.name.includes('Pure Aero') || item.name.includes('Radical'))
    ).concat(equipment.filter(item => item.category !== 'Tennis Rackets'));
  }
  
  // Take top 5 equipment items
  recommendedEquipment = recommendedEquipment.slice(0, 5);

  return {
    rackets: recommendedRackets,
    strings: recommendedStrings,
    equipment: recommendedEquipment,
    trainingPlan,
    explanation,
    skillLevel: answers.skillLevel,
    playingStyle: answers.playingStyle,
    trainingSummary
  };
}

function generateTrainingSummary(answers: QuizAnswer, trainingPlan: any[]): string {
  const daysPerWeek = getDaysPerWeek(answers.trainingDays);
  const hoursPerWeek = getHoursPerWeek(answers.trainingHours);
  
  let summary = `Your personalized training plan includes ${daysPerWeek} training days per week, totaling ${hoursPerWeek} hours. `;
  
  if (answers.weakestShots && answers.weakestShots.length > 0) {
    // Clean up the weakest shots text
    const cleanWeakestShots = answers.weakestShots.map(shot => 
      shot.replace(/^.*? - /, '').toLowerCase()
    );
    summary += `We've prioritized drills to improve your ${cleanWeakestShots.join(', ')}. `;
  }
  
  if (answers.improvementAreas && answers.improvementAreas.length > 0) {
    // Clean up the improvement areas text
    const cleanImprovementAreas = answers.improvementAreas.map(area => 
      area.replace(/^.*? - /, '').toLowerCase()
    );
    summary += `The plan focuses on developing your ${cleanImprovementAreas.join(', ')}. `;
  }
  
  summary += `The 4-week progressive program starts with fundamentals and builds to advanced techniques, ensuring steady improvement while preventing injury.`;
  
  return summary;
}

function getDaysPerWeek(trainingDays: string): number {
  switch (trainingDays) {
    case '1-2 days per week': return 2;
    case '3-4 days per week': return 4;
    case '5-6 days per week': return 6;
    case '7 days per week': return 7;
    default: return 3;
  }
}

function getHoursPerWeek(trainingHours: string): number {
  switch (trainingHours) {
    case '1-3 hours per week': return 2;
    case '4-6 hours per week': return 5;
    case '7-10 hours per week': return 8;
    case '10+ hours per week': return 12;
    default: return 4;
  }
}

function getBudgetRange(budget: string): { min: number; max: number } {
  switch (budget) {
    case '$50-100':
      return { min: 50, max: 100 };
    case '$100-200':
      return { min: 100, max: 200 };
    case '$200-300':
      return { min: 200, max: 300 };
    case '$300+':
      return { min: 300, max: 1000 };
    default:
      return { min: 50, max: 1000 };
  }
}

function generateExplanation(answers: QuizAnswer, topRacket: Racket): string {
  // Clean up skill level text - remove prefixes and make it more natural
  let skillLevel = answers.skillLevel;
  let yearsPlaying = answers.yearsPlaying;
  
  // Remove prefixes from skill level
  if (skillLevel.includes(' - ')) {
    skillLevel = skillLevel.split(' - ')[0].toLowerCase();
  } else {
    skillLevel = skillLevel.toLowerCase();
  }
  
  // Remove prefixes from years playing
  if (yearsPlaying.includes(' - ')) {
    yearsPlaying = yearsPlaying.split(' - ')[0];
  }
  
  // Make skill level more natural with proper capitalization
  if (skillLevel === 'beginner') {
    skillLevel = 'beginner';
  } else if (skillLevel === 'intermediate') {
    skillLevel = 'intermediate';
  } else if (skillLevel === 'advanced') {
    skillLevel = 'advanced';
  }
  
  // Make years playing more natural
  if (yearsPlaying === 'less than 1 year') {
    yearsPlaying = 'less than a year';
  } else if (yearsPlaying === '1-3 years') {
    yearsPlaying = '1-3 years';
  } else if (yearsPlaying === '3-5 years') {
    yearsPlaying = '3-5 years';
  } else if (yearsPlaying === '5+ years') {
    yearsPlaying = '5+ years';
  }
  
  let explanation = `Based on your profile as a ${skillLevel} player with ${yearsPlaying} of experience, `;
  
  // Clean up playing style text
  let playingStyle = answers.playingStyle;
  if (playingStyle.includes(' - ')) {
    playingStyle = playingStyle.split(' - ')[0].toLowerCase();
  } else {
    playingStyle = playingStyle.toLowerCase();
  }
  
  if (playingStyle.includes('aggressive baseliner')) {
    explanation += `I've selected rackets that provide excellent power and stability for aggressive baseline play. `;
  } else if (playingStyle.includes('serve-volley')) {
    explanation += `I've chosen rackets with good maneuverability and control for serve-and-volley tactics. `;
  } else if (playingStyle.includes('defensive')) {
    explanation += `I've selected rackets that offer good control and forgiveness for defensive play. `;
  } else if (playingStyle.includes('all-court')) {
    explanation += `I've chosen versatile rackets that work well for all-court play. `;
  } else {
    explanation += `I've selected rackets that provide a good balance of power and control. `;
  }

  if (answers.armInjuries && answers.armInjuries.includes('Yes')) {
    explanation += `Since you mentioned arm concerns, I've prioritized arm-friendly options with flexible frames and comfortable strings. `;
  }

  // Clean up primary goals text
  let primaryGoals = answers.primaryGoals;
  if (primaryGoals.includes(' - ')) {
    primaryGoals = primaryGoals.split(' - ')[0].toLowerCase();
  } else {
    primaryGoals = primaryGoals.toLowerCase();
  }
  
  if (primaryGoals.includes('power')) {
    explanation += `For power seekers, I've recommended strings that maximize energy return and rackets with good power potential. `;
  } else if (primaryGoals.includes('control')) {
    explanation += `For control players, I've selected strings and rackets that provide excellent precision and feel. `;
  } else if (primaryGoals.includes('comfort')) {
    explanation += `For comfort priority, I've chosen options that minimize vibration and provide smooth feel. `;
  } else if (primaryGoals.includes('spin')) {
    explanation += `For spin players, I've recommended strings and rackets that maximize spin potential. `;
  } else if (primaryGoals.includes('all-around')) {
    explanation += `For all-around players, I've selected versatile options that provide a good balance of power, control, and comfort. `;
  }

  explanation += `The ${topRacket.name} is my top recommendation because it offers the best balance of features for your playing style and skill level.`;

  return explanation;
}
