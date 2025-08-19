import { QuizAnswer, Drill, TrainingDay, TrainingWeek } from '@/types';
import { drills } from '@/data/drills';

export function generateTrainingPlan(answers: QuizAnswer): TrainingWeek[] {
  const selectedDays = Array.isArray(answers.trainingDays) ? answers.trainingDays : [];
  const daysPerWeek = selectedDays.length;
  const hoursPerDay = getHoursPerDay(answers.trainingHours);
  const totalDays = 28; // 4 weeks
  const trainingWeeks: TrainingWeek[] = [];

  // Determine skill level for drill selection
  const isBeginner: boolean = answers.skillLevel.includes('Beginner') || 
                    (answers.yearsPlaying ? answers.yearsPlaying.includes('Less than 1 year') : false);
  const isAdvanced: boolean = answers.skillLevel.includes('Advanced') || 
                    (answers.yearsPlaying ? answers.yearsPlaying.includes('5+ years') : false);
  const isIntermediate: boolean = !isBeginner && !isAdvanced;

  for (let week = 1; week <= 4; week++) {
    const weekDays: TrainingDay[] = [];
    const weeklyFocus = getWeeklyFocus(week, answers);
    const progression = getWeeklyProgression(week, answers);

    // Only create training days for the days the user selected
    selectedDays.forEach((dayName, dayIndex) => {
      const dayFocus = getDayFocus(dayIndex + 1, week, answers);
      const intensity = getDayIntensity(dayIndex + 1, week, answers);
      
      // Calculate target minutes based on hours per day
      let targetMinutes = Math.floor(hoursPerDay * 60);
      
      // Adjust for skill level - beginners need more time for fundamentals
      if (isBeginner) {
        targetMinutes = Math.floor(targetMinutes * 1.2); // 20% more time for basics
      } else if (isAdvanced) {
        targetMinutes = Math.floor(targetMinutes * 0.9); // 10% less time, more intense
      }

      // Select drills based on skill level and focus
      const selectedDrills = selectDrillsForDay(dayFocus, answers, targetMinutes, isBeginner, isIntermediate, isAdvanced);
      
      // Ensure at least 1 drill per day
      if (selectedDrills.length === 0) {
        const fallbackDrill = getFallbackDrill(dayFocus, isBeginner, isIntermediate, isAdvanced);
        if (fallbackDrill) {
          selectedDrills.push(fallbackDrill);
        }
      }
      
      const totalDuration = selectedDrills.reduce((sum, drill) => sum + drill.duration, 0);
      const notes = getDayNotes(dayFocus, intensity, answers);

      weekDays.push({
        day: dayName,
        focus: dayFocus,
        drills: selectedDrills,
        totalDuration,
        intensity,
        notes
      });
    });

    trainingWeeks.push({
      weekNumber: week,
      days: weekDays,
      weeklyFocus,
      totalHours: hoursPerDay * daysPerWeek,
      progression
    });
  }

  return trainingWeeks;
}

function getHoursPerDay(trainingHours: string): number {
  switch (trainingHours) {
    case '0.5-1 hour per day': return 0.75;
    case '1-1.5 hours per day': return 1.25;
    case '1.5-2 hours per day': return 1.75;
    case '2-2.5 hours per day': return 2.25;
    case '2.5-3 hours per day': return 2.75;
    case '3+ hours per day': return 3.5;
    default: return 1.5;
  }
}

function getFallbackDrill(dayFocus: string, isBeginner: boolean, isIntermediate: boolean, isAdvanced: boolean): Drill | null {
  // Find a suitable fallback drill based on the day focus and skill level
  const availableDrills = drills.filter(drill => {
    // Filter by day focus
    if (dayFocus.includes('Forehand') && drill.category !== 'forehand') return false;
    if (dayFocus.includes('Backhand') && drill.category !== 'backhand') return false;
    if (dayFocus.includes('Serve') && drill.category !== 'serve') return false;
    if (dayFocus.includes('Volley') && drill.category !== 'volley') return false;
    if (dayFocus.includes('Return') && drill.category !== 'return') return false;
    if (dayFocus.includes('Footwork') && drill.category !== 'footwork') return false;
    if (dayFocus.includes('Strategy') && drill.category !== 'strategy') return false;
    
    // Filter by skill level
    if (isBeginner && drill.difficulty === 'advanced') return false;
    if (isAdvanced && drill.difficulty === 'beginner') return false;
    
    return true;
  });
  
  // Return the first available drill or a generic one
  if (availableDrills.length > 0) {
    return availableDrills[0];
  }
  
  // If no specific drill found, return a generic one based on skill level
  const genericDrills = drills.filter(drill => {
    if (isBeginner && drill.difficulty === 'beginner') return true;
    if (isIntermediate && drill.difficulty === 'intermediate') return true;
    if (isAdvanced && drill.difficulty === 'advanced') return true;
    return false;
  });
  
  return genericDrills.length > 0 ? genericDrills[0] : null;
}

function getDayName(dayNumber: number): string {
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return dayNames[dayNumber - 1] || 'Training Day';
}

function getDayFocus(day: number, week: number, answers: QuizAnswer): string {
  const focuses = [
    'Technical Foundation',
    'Power Development', 
    'Control & Accuracy',
    'Footwork & Movement',
    'Strategy & Tactics',
    'Mental Game',
    'Recovery & Light Practice'
  ];
  
  // Rotate focuses based on day and week
  const focusIndex = ((day - 1) + (week - 1) * 2) % focuses.length;
  return focuses[focusIndex];
}

function getDayIntensity(day: number, week: number, answers: QuizAnswer): 'low' | 'medium' | 'high' {
  // Progressive intensity: start light, build up, then taper
  if (week === 1) return 'low';
  if (week === 2) return 'medium';
  if (week === 3) return 'high';
  if (week === 4) return 'medium'; // Taper before next cycle
  
  // Consider training frequency
  if (answers.trainingDays === '1-2 days per week') return 'medium';
  if (answers.trainingDays === '7 days per week') return 'low'; // Daily training should be lighter
  
  return 'medium';
}

function getDayNotes(dayFocus: string, intensity: string, answers: QuizAnswer): string {
  let notes = `Focus: ${dayFocus}. Intensity: ${intensity}.`;
  
  if (intensity === 'high') {
    notes += ' Make sure to warm up properly and stay hydrated.';
  }
  
  if (answers.armInjuries === 'Yes') {
    notes += ' Pay attention to any arm discomfort and stop if needed.';
  }
  
  if (dayFocus.includes('Technical')) {
    notes += ' Focus on proper form over speed.';
  }
  
  if (dayFocus.includes('Power')) {
    notes += ' Use proper technique to generate power safely.';
  }
  
  return notes;
}

function getWeeklyFocus(week: number, answers: QuizAnswer): string {
  const isBeginner = answers.skillLevel.includes('Beginner') || 
                    (answers.yearsPlaying ? answers.yearsPlaying.includes('Less than 1 year') : false);
  
  if (isBeginner) {
    const focuses = [
      'Building Foundation - Focus on basic technique and consistency',
      'Developing Skills - Work on power, control, and shot variety',
      'Advanced Techniques - Master complex shots and strategies',
      'Integration & Match Play - Combine all skills in competitive situations'
    ];
    return focuses[week - 1] || focuses[0];
  } else {
    // For intermediate and advanced players
    const focuses = [
      'Skill Refinement - Polish existing techniques and add new variations',
      'Performance Enhancement - Increase power, accuracy, and tactical awareness',
      'Advanced Mastery - Perfect complex shots and strategic thinking',
      'Competition Preparation - Fine-tune for match play and tournament readiness'
    ];
    return focuses[week - 1] || focuses[0];
  }
}

function getWeeklyProgression(week: number, answers: QuizAnswer): string {
  const isBeginner = answers.skillLevel.includes('Beginner') || 
                    (answers.yearsPlaying ? answers.yearsPlaying.includes('Less than 1 year') : false);
  
  if (isBeginner) {
    const progressions = [
      'Week 1: Establish fundamentals and build confidence',
      'Week 2: Increase intensity and add complexity to drills',
      'Week 3: Peak training with maximum challenge and volume',
      'Week 4: Consolidate gains and prepare for next training cycle'
    ];
    return progressions[week - 1] || progressions[0];
  } else {
    // For intermediate and advanced players
    const progressions = [
      'Week 1: Technical refinement and skill assessment',
      'Week 2: Performance optimization and tactical development',
      'Week 3: High-intensity training and advanced techniques',
      'Week 4: Competition preparation and skill integration'
    ];
    return progressions[week - 1] || progressions[0];
  }
}

function selectDrillsForDay(dayFocus: string, answers: QuizAnswer, targetMinutes: number, isBeginner: boolean, isIntermediate: boolean, isAdvanced: boolean): Drill[] {
  let availableDrills = drills.filter(drill => {
    // Filter by day focus
    if (dayFocus.includes('Forehand') && drill.category !== 'forehand') return false;
    if (dayFocus.includes('Backhand') && drill.category !== 'backhand') return false;
    if (dayFocus.includes('Serve') && drill.category !== 'serve') return false;
    if (dayFocus.includes('Volley') && drill.category !== 'volley') return false;
    if (dayFocus.includes('Return') && drill.category !== 'return') return false;
    if (dayFocus.includes('Footwork') && drill.category !== 'footwork') return false;
    if (dayFocus.includes('Strategy') && drill.category !== 'strategy') return false;
    
    // More sophisticated skill level filtering
    if (isBeginner) {
      // Beginners can do beginner and some intermediate drills
      if (drill.difficulty === 'advanced') return false;
    } else if (isIntermediate) {
      // Intermediates can do intermediate and some advanced drills, avoid basic beginner drills
      if (drill.difficulty === 'beginner' && drill.name.toLowerCase().includes('basic')) return false;
    } else if (isAdvanced) {
      // Advanced players should focus on intermediate and advanced drills
      if (drill.difficulty === 'beginner') return false;
    }
    
    return true;
  });

  // Score drills based on user preferences and experience
  const scoredDrills = availableDrills.map(drill => {
    let score = 0;
    
    // High priority for weakest shots (regardless of skill level)
    if (answers.weakestShots && answers.weakestShots.some(shot => 
      drill.name.toLowerCase().includes(shot.toLowerCase().replace(/^.*? - /, '')) ||
      drill.description.toLowerCase().includes(shot.toLowerCase().replace(/^.*? - /, ''))
    )) {
      score += 10; // Highest priority
    }
    
    // Medium priority for improvement areas
    if (answers.improvementAreas && answers.improvementAreas.some(area => 
      drill.name.toLowerCase().includes(area.toLowerCase().replace(/^.*? - /, '')) ||
      drill.description.toLowerCase().includes(area.toLowerCase().replace(/^.*? - /, ''))
    )) {
      score += 6;
    }
    
    // Skill level scoring - more nuanced
    if (isBeginner) {
      if (drill.difficulty === 'beginner') score += 4;
      else if (drill.difficulty === 'intermediate') score += 2;
    } else if (isIntermediate) {
      if (drill.difficulty === 'intermediate') score += 4;
      else if (drill.difficulty === 'advanced') score += 3;
      else if (drill.difficulty === 'beginner') score += 1; // Lower priority for basic drills
    } else if (isAdvanced) {
      if (drill.difficulty === 'advanced') score += 5;
      else if (drill.difficulty === 'intermediate') score += 3;
      // No points for beginner drills for advanced players
    }
    
    // Experience-based scoring
    if (answers.yearsPlaying) {
      if (answers.yearsPlaying.includes('5+ years') && drill.difficulty === 'advanced') {
        score += 3; // Advanced players get bonus for advanced drills
      } else if (answers.yearsPlaying.includes('3-5 years') && drill.difficulty === 'intermediate') {
        score += 2; // Intermediate players get bonus for intermediate drills
      }
    }
    
    // Playing style considerations
    if (answers.playingStyle && answers.playingStyle.includes('Aggressive') && 
        (drill.category === 'serve' || drill.category === 'forehand')) {
      score += 2;
    } else if (answers.playingStyle && answers.playingStyle.includes('Defensive') && 
               drill.category === 'footwork') {
      score += 2;
    } else if (answers.playingStyle && answers.playingStyle.includes('Serve-volley') && 
               (drill.category === 'serve' || drill.category === 'volley')) {
      score += 2;
    }
    
    return { ...drill, score };
  });

  // Sort by score and select drills to fit target time
  const selectedDrills: Drill[] = [];
  let totalTime = 0;
  
  scoredDrills
    .sort((a, b) => b.score - a.score)
    .forEach(drill => {
      if (totalTime + drill.duration <= targetMinutes) {
        selectedDrills.push(drill);
        totalTime += drill.duration;
      }
    });

  // If we don't have enough drills, add more from the same category
  if (totalTime < targetMinutes * 0.8) {
    const remainingDrills = availableDrills.filter(drill => 
      !selectedDrills.some(selected => selected.id === drill.id)
    );
    
    remainingDrills.forEach(drill => {
      if (totalTime + drill.duration <= targetMinutes) {
        selectedDrills.push(drill);
        totalTime += drill.duration;
      }
    });
  }

  return selectedDrills;
}
