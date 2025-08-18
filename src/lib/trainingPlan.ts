import { QuizAnswer, Drill, TrainingDay, TrainingWeek } from '@/types';
import { drills } from '@/data/drills';

export function generateTrainingPlan(answers: QuizAnswer): TrainingWeek[] {
  const daysPerWeek = getDaysPerWeek(answers.trainingDays);
  const hoursPerWeek = getHoursPerWeek(answers.trainingHours);
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
    const progression = getWeeklyProgression(week);

    for (let day = 1; day <= daysPerWeek; day++) {
      const dayName = getDayName(day);
      const dayFocus = getDayFocus(day, week, answers);
      const intensity = getDayIntensity(day, week, answers);
      
      // Calculate target minutes based on hours per week and skill level
      let targetMinutes = Math.floor((hoursPerWeek * 60) / daysPerWeek);
      
      // Adjust for skill level - beginners need more time for fundamentals
      if (isBeginner) {
        targetMinutes = Math.floor(targetMinutes * 1.2); // 20% more time for basics
      } else if (isAdvanced) {
        targetMinutes = Math.floor(targetMinutes * 0.9); // 10% less time, more intense
      }

      // Select drills based on skill level and focus
      const selectedDrills = selectDrillsForDay(dayFocus, answers, targetMinutes, isBeginner, isIntermediate, isAdvanced);
      
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
    }

    trainingWeeks.push({
      weekNumber: week,
      days: weekDays,
      weeklyFocus,
      totalHours: hoursPerWeek,
      progression
    });
  }

  return trainingWeeks;
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
  const focuses = [
    'Building Foundation - Focus on basic technique and consistency',
    'Developing Skills - Work on power, control, and shot variety',
    'Advanced Techniques - Master complex shots and strategies',
    'Integration & Match Play - Combine all skills in competitive situations'
  ];
  
  return focuses[week - 1] || focuses[0];
}

function getWeeklyProgression(week: number): string {
  const progressions = [
    'Week 1: Establish fundamentals and build confidence',
    'Week 2: Increase intensity and add complexity to drills',
    'Week 3: Peak training with maximum challenge and volume',
    'Week 4: Consolidate gains and prepare for next training cycle'
  ];
  
  return progressions[week - 1] || progressions[0];
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
    
    // Filter by skill level
    if (isBeginner && drill.difficulty !== 'beginner') return false;
    if (isAdvanced && drill.difficulty === 'beginner') return false;
    if (isIntermediate && drill.difficulty === 'advanced') return false;
    
    return true;
  });

  // Score drills based on user preferences
  const scoredDrills = availableDrills.map(drill => {
    let score = 0;
    
    // Prioritize drills that match weakest shots
    if (answers.weakestShots && answers.weakestShots.some(shot => 
      drill.name.toLowerCase().includes(shot.toLowerCase().replace(/^.*? - /, '')) ||
      drill.description.toLowerCase().includes(shot.toLowerCase().replace(/^.*? - /, ''))
    )) {
      score += 8; // High priority for weakest shots
    }
    
    // Prioritize drills that match improvement areas
    if (answers.improvementAreas && answers.improvementAreas.some(area => 
      drill.name.toLowerCase().includes(area.toLowerCase().replace(/^.*? - /, '')) ||
      drill.description.toLowerCase().includes(area.toLowerCase().replace(/^.*? - /, ''))
    )) {
      score += 5; // Medium priority for improvement areas
    }
    
    // Skill level scoring
    if (isBeginner && drill.difficulty === 'beginner') {
      score += 3;
    } else if (isIntermediate && drill.difficulty === 'intermediate') {
      score += 3;
    } else if (isAdvanced && drill.difficulty === 'advanced') {
      score += 3;
    }
    
    // Playing style considerations
    if (answers.playingStyle && answers.playingStyle.includes('Aggressive') && 
        (drill.category === 'serve' || drill.category === 'forehand')) {
      score += 2;
    } else if (answers.playingStyle && answers.playingStyle.includes('Defensive') && 
               drill.category === 'footwork') {
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
