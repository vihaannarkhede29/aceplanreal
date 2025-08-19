'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, Target, Play } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type ViewMode = 'day' | 'week' | 'month';

interface Drill {
  id: string;
  name: string;
  duration: number;
  description: string;
  videoUrl?: string;
}

interface TrainingDay {
  day: string;
  focus: string;
  drills: Drill[];
  totalDuration: number;
  intensity: 'low' | 'medium' | 'high';
  notes: string;
}

interface TrainingWeek {
  weekNumber: number;
  days: TrainingDay[];
  weeklyFocus: string;
  totalHours: number;
  progression: string;
}

export default function MonthlyCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [trainingPlan, setTrainingPlan] = useState<TrainingWeek[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Load training plan from localStorage
    const saved = localStorage.getItem('aceplan_quiz_results');
    if (saved) {
      try {
        const results = JSON.parse(saved);
        if (results.trainingPlan) {
          setTrainingPlan(results.trainingPlan);
        }
      } catch (error) {
        console.error('Error parsing saved results:', error);
      }
    }
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getTrainingForDate = (date: Date): TrainingDay | null => {
    if (!trainingPlan.length) return null;
    
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Find which week this date falls into based on the training plan
    // We'll start the training plan from the current week
    const today = new Date();
    const daysSinceStart = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const weekIndex = Math.floor(daysSinceStart / 7);
    
    // Only show training for weeks 0-3 (4 weeks of training plan)
    if (weekIndex >= 0 && weekIndex < trainingPlan.length) {
      const week = trainingPlan[weekIndex];
      if (week && week.days) {
        return week.days.find(day => day.day === dayOfWeek) || null;
      }
    }
    
    return null;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setViewMode('day');
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{monthName}</h2>
        </div>
        
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-semibold text-gray-600 text-sm">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const training = day ? getTrainingForDate(day) : null;
            
            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border border-gray-200 ${
                  day ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-100'
                } ${day && training ? 'border-green-300' : ''}`}
                onClick={() => day && handleDateClick(day)}
              >
                {day && (
                  <>
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {day.getDate()}
                    </div>
                    
                    {training ? (
                      <div className="space-y-1">
                        <div className={`text-xs px-1 py-0.5 rounded ${getIntensityColor(training.intensity)}`}>
                          {training.intensity}
                        </div>
                        <div className="text-xs text-gray-600">
                          {training.drills.length} drill{training.drills.length !== 1 ? 's' : ''}
                        </div>
                        <div className="text-xs text-gray-500">
                          {training.totalDuration} min
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400">
                        No training
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      weekDays.push(day);
    }
    
    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Week of {weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </h2>
        </div>
        
        <div className="space-y-4">
          {weekDays.map((day, index) => {
            const training = getTrainingForDate(day);
            const dayName = day.toLocaleDateString('en-US', { weekday: 'long' });
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                }`}
                onClick={() => handleDateClick(day)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-semibold ${isToday ? 'text-blue-900' : 'text-gray-900'}`}>
                    {dayName} - {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </h3>
                  {training && (
                    <div className={`text-sm px-2 py-1 rounded ${getIntensityColor(training.intensity)}`}>
                      {training.intensity} intensity
                    </div>
                  )}
                </div>
                
                {training ? (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <strong>Focus:</strong> {training.focus}
                    </div>
                    
                    <div className="space-y-2">
                      {training.drills.map((drill, drillIndex) => (
                        <div key={drillIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{drill.name}</div>
                            <div className="text-xs text-gray-500">{drill.description}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center text-xs text-gray-600">
                              <Clock className="h-3 w-3 mr-1" />
                              {drill.duration} min
                            </div>
                            {drill.videoUrl && (
                              <a
                                href={drill.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              >
                                <Play className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {training.notes && (
                      <div className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                        <strong>Notes:</strong> {training.notes}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-4">
                    No training scheduled
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dateToShow = selectedDate || currentDate;
    const training = getTrainingForDate(dateToShow);
    const dayName = dateToShow.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = dateToShow.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{dayName}</h2>
          <p className="text-gray-600">{dateString}</p>
        </div>
        
        {training ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Today's Focus</h3>
              <p className="text-gray-700">{training.focus}</p>
              <div className="mt-3 flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getIntensityColor(training.intensity)}`}>
                  {training.intensity} intensity
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {training.totalDuration} minutes total
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Drills</h3>
              {training.drills.map((drill, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{drill.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {drill.duration} min
                      </div>
                      {drill.videoUrl && (
                        <a
                          href={drill.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Play className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{drill.description}</p>
                </div>
              ))}
            </div>
            
            {training.notes && (
              <div className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                <h3 className="font-medium text-yellow-900 mb-2">Notes</h3>
                <p className="text-yellow-800">{training.notes}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Training Scheduled</h3>
            <p className="text-gray-500">Take the quiz to get your personalized training plan!</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Calendar className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">AcePlan Training Calendar</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {currentUser && (
                <div className="text-sm text-gray-600">
                  Welcome, {currentUser.displayName || currentUser.email?.split('@')[0]}!
                </div>
              )}
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Back to Weekly Plan
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Date Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Today
              </button>
              
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['day', 'week', 'month'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === mode
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'day' && renderDayView()}
      </main>
    </div>
  );
}
