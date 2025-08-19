'use client';

import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, Trophy, Target } from 'lucide-react';

interface EquipmentQuizProps {
  onComplete: (answers: any) => void;
  onBack: () => void;
}

const equipmentQuestions = [
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
    question: 'What are your primary goals with tennis?',
    type: 'radio',
    options: [
      'Power - I want to hit harder and generate more force',
      'Control - I want precision and accuracy in my shots',
      'Comfort - I want a smooth, comfortable feel',
      'Spin - I want to generate more topspin and slice',
      'All-around - I want a balanced racket for all aspects'
    ],
    required: true,
    description: 'This helps determine the best racket and string combination'
  }
];

export default function EquipmentQuiz({ onComplete, onBack }: EquipmentQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const currentQuestion = equipmentQuestions[currentStep];
  const currentAnswer = answers[currentQuestion.id];

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const canGoNext = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === 'radio' || currentQuestion.type === 'select') {
      return answer && answer.trim() !== '';
    }
    return answer && answer.length > 0;
  };

  const handleNext = () => {
    if (canGoNext()) {
      if (currentStep === equipmentQuestions.length - 1) {
        onComplete(answers);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const progress = ((currentStep + 1) / equipmentQuestions.length) * 100;

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'radio':
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map((option, index) => (
              <label key={index} className="flex items-start space-x-4 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option}
                    checked={currentAnswer === option}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                    currentAnswer === option
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300 group-hover:border-blue-400'
                  }`}>
                    {currentAnswer === option && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
                <span className="text-gray-700 group-hover:text-blue-600 transition-colors text-lg leading-relaxed">
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-8 text-white text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="h-8 w-8" />
            <Target className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">AI Racket & Strings Generator</h1>
          <p className="text-blue-100">Get personalized equipment recommendations in minutes</p>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pt-6">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 text-center mb-6">
            Question {currentStep + 1} of {equipmentQuestions.length}
          </p>
        </div>

        {/* Question */}
        <div className="px-8 pb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {currentQuestion.question}
          </h2>
          
          {currentQuestion.description && (
            <p className="text-gray-600 mb-8 text-lg">
              {currentQuestion.description}
            </p>
          )}

          {renderQuestion()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{currentStep === 0 ? 'Back to Home' : 'Previous'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                canGoNext()
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>{currentStep === equipmentQuestions.length - 1 ? 'Get Recommendations' : 'Next'}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
