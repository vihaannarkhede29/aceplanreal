'use client';

import { TrainingWeek, TrainingDay, Drill } from '@/types';
import { Calendar, Clock, Target, TrendingUp, Info, ChevronDown, ChevronRight, Play } from 'lucide-react';
import { useState } from 'react';

interface TrainingCalendarProps {
  trainingPlan: TrainingWeek[];
}

export default function TrainingCalendar({ trainingPlan }: TrainingCalendarProps) {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);

  const toggleWeek = (weekNumber: number) => {
    setExpandedWeeks(prev => 
      prev.includes(weekNumber) 
        ? prev.filter(w => w !== weekNumber)
        : [...prev, weekNumber]
    );
  };

  const toggleDay = (dayKey: string) => {
    setExpandedDays(prev => 
      prev.includes(dayKey) 
        ? prev.filter(d => d !== dayKey)
        : [...prev, dayKey]
    );
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIntensityLabel = (intensity: string) => {
    switch (intensity) {
      case 'low': return 'Light';
      case 'medium': return 'Moderate';
      case 'high': return 'Intense';
      default: return 'Medium';
    }
  };

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Personalized Training Calendar
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A 4-week progressive training plan tailored to your schedule, skill level, and improvement goals
        </p>
      </div>

      {trainingPlan.map((week, weekIndex) => (
        <div key={week.weekNumber} className="mb-6">
          {/* Week Header - Clickable */}
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl p-4 cursor-pointer hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-lg"
            onClick={() => toggleWeek(week.weekNumber)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {expandedWeeks.includes(week.weekNumber) ? (
                  <ChevronDown className="h-6 w-6" />
                ) : (
                  <ChevronRight className="h-6 w-6" />
                )}
                <div>
                  <h3 className="text-2xl font-bold">Week {week.weekNumber}</h3>
                  <p className="text-blue-100 text-sm">{week.weeklyFocus}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{week.totalHours}h</div>
                <div className="text-blue-100 text-sm">Total Hours</div>
              </div>
            </div>
            <div className="mt-3 p-2 bg-white/20 rounded-lg">
              <p className="text-sm">{week.progression}</p>
            </div>
          </div>

          {/* Training Days - Only shown when week is expanded */}
          {expandedWeeks.includes(week.weekNumber) && (
            <div className="mt-4 space-y-4">
              {week.days.map((day, dayIndex) => {
                const dayKey = `week-${week.weekNumber}-day-${dayIndex}`;
                return (
                  <div key={dayIndex} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Day Header - Clickable */}
                    <div 
                      className="bg-gray-50 px-6 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => toggleDay(dayKey)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {expandedDays.includes(dayKey) ? (
                            <ChevronDown className="h-5 w-5 text-blue-600" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-blue-600" />
                          )}
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <h4 className="text-xl font-semibold text-gray-900">{day.day}</h4>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getIntensityColor(day.intensity)}`}>
                            {getIntensityLabel(day.intensity)}
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">{Math.round(day.totalDuration)} min</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-green-600" />
                          <span className="text-green-700 font-medium">{day.focus}</span>
                        </div>
                      </div>
                    </div>

                    {/* Drills - Only shown when day is expanded */}
                    {expandedDays.includes(dayKey) && (
                      <div className="p-6">
                        <div className="space-y-4">
                          {day.drills.map((drill, drillIndex) => (
                            <div key={drillIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start justify-between mb-3">
                                <h5 className="text-lg font-semibold text-gray-900">{drill.name}</h5>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <Clock className="h-4 w-4" />
                                  <span>{drill.duration} min</span>
                                  {drill.videoUrl && (
                                    <a
                                      href={drill.videoUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                    >
                                      <Play className="h-3 w-3" />
                                      <span>Watch Video</span>
                                    </a>
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-gray-700 mb-3">{drill.description}</p>
                              
                              <div className="grid md:grid-cols-2 gap-4">
                                {/* Focus Areas */}
                                <div>
                                  <h6 className="font-medium text-gray-900 mb-2 flex items-center">
                                    <Target className="h-4 w-4 mr-2 text-blue-600" />
                                    Focus Areas
                                  </h6>
                                  <div className="flex flex-wrap gap-2">
                                    {drill.focus.map((focus, index) => (
                                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                        {focus}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Equipment */}
                                <div>
                                  <h6 className="font-medium text-gray-900 mb-2 flex items-center">
                                    <Info className="h-4 w-4 mr-2 text-green-600" />
                                    Equipment
                                  </h6>
                                  <div className="text-sm text-gray-600">
                                    {drill.equipment.join(', ')}
                                  </div>
                                </div>
                              </div>

                              {/* Instructions */}
                              <div className="mt-4">
                                <h6 className="font-medium text-gray-900 mb-2">Instructions:</h6>
                                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                                  {drill.instructions.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                  ))}
                                </ol>
                              </div>

                              {/* Variations */}
                              {drill.variations.length > 0 && (
                                <div className="mt-4">
                                  <h6 className="font-medium text-gray-900 mb-2">Variations:</h6>
                                  <div className="flex flex-wrap gap-2">
                                    {drill.variations.map((variation, index) => (
                                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                        {variation}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Day Notes */}
                        {day.notes && (
                          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start space-x-2">
                              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <h6 className="font-medium text-blue-900 mb-1">Training Notes</h6>
                                <p className="text-blue-800 text-sm">{day.notes}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Training Tips */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
          Training Success Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Before Training:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Warm up for 10-15 minutes</li>
              <li>• Stay hydrated throughout</li>
              <li>• Focus on technique over speed</li>
              <li>• Listen to your body</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">During Training:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Take breaks between drills</li>
              <li>• Focus on one skill at a time</li>
              <li>• Record your progress</li>
              <li>• Stay mentally engaged</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
