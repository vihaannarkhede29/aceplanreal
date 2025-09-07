'use client';

import { useState } from 'react';
import { QuizAnswer } from '@/types';
import { quizQuestions } from '@/data/quizQuestions';
import { ChevronLeft, ChevronRight, CheckCircle, Trophy, Target, Home } from 'lucide-react';

interface QuizFormProps {
  onComplete: (answers: QuizAnswer) => void;
  onBackToHome?: () => void;
}

export default function QuizForm({ onComplete, onBackToHome }: QuizFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

  const validateCurrentStep = (): boolean => {
    const currentErrors: Record<string, string> = {};
    
    if (currentQuestion.required) {
      const answer = answers[currentQuestion.id as keyof QuizAnswer];
      
      if (currentQuestion.type === 'multi-select') {
        // For multi-select, check if at least one option is selected
        if (!Array.isArray(answer) || answer.length === 0) {
          currentErrors[currentQuestion.id] = 'This field is required';
        }
      } else {
        // For other types (radio, select, text), check if answer exists and is not empty
        if (!answer || String(answer).trim() === '') {
          currentErrors[currentQuestion.id] = 'This field is required';
        }
      }
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }));
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === quizQuestions.length - 1) {
        // Complete quiz
        onComplete(answers as QuizAnswer);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const canGoNext = () => {
    const answer = answers[currentQuestion.id as keyof QuizAnswer];
    
    if (currentQuestion.type === 'multi-select') {
      // For multi-select, check if at least one option is selected
      return currentQuestion.required ? Array.isArray(answer) && answer.length > 0 : true;
    } else {
      // For other types (radio, select, text), check if answer exists and is not empty
      return currentQuestion.required ? answer && String(answer).trim() !== '' : true;
    }
  };

  const renderQuestion = () => {
    const questionId = currentQuestion.id as keyof QuizAnswer;
    const currentAnswer = answers[questionId] || '';

    switch (currentQuestion.type) {
      case 'radio':
        return (
          <div className="space-y-4">
            {currentQuestion.options?.map((option, index) => (
              <label key={index} className="flex items-start space-x-4 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name={questionId}
                    value={option}
                    checked={currentAnswer === option}
                    onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${
                    currentAnswer === option 
                      ? 'border-green-500 bg-green-500' 
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

      case 'multi-select':
        const currentMultiAnswer = Array.isArray(currentAnswer) ? currentAnswer : [];
        const allOptions = currentQuestion.options || [];
        
        const handleSelectAll = () => {
          if (currentMultiAnswer.length === allOptions.length) {
            // If all are selected, deselect all
            handleAnswerChange(questionId, []);
          } else {
            // Select all
            handleAnswerChange(questionId, allOptions);
          }
        };

        return (
          <div className="space-y-4">
            {/* Select All Button */}
            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={handleSelectAll}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentMultiAnswer.length === allOptions.length
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {currentMultiAnswer.length === allOptions.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            
            {allOptions.map((option, index) => (
              <label key={index} className="flex items-start space-x-4 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    name={questionId}
                    value={option}
                    checked={currentMultiAnswer.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleAnswerChange(questionId, [...currentMultiAnswer, option]);
                      } else {
                        handleAnswerChange(questionId, currentMultiAnswer.filter(item => item !== option));
                      }
                    }}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    currentMultiAnswer.includes(option)
                      ? 'border-green-500 bg-green-500' 
                      : 'border-gray-300 group-hover:border-blue-400'
                  }`}>
                    {currentMultiAnswer.includes(option) && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-gray-700 group-hover:text-blue-600 transition-colors text-lg leading-relaxed">
                  {option}
                </span>
              </label>
            ))}
            {currentMultiAnswer.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <span className="font-medium">Selected:</span> {currentMultiAnswer.length} option{currentMultiAnswer.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        );

      case 'select':
        return (
          <div className="relative">
            <select
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(questionId, e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg appearance-none bg-white"
            >
              <option value="">Select an option</option>
              {currentQuestion.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <ChevronRight className="h-5 w-5 text-gray-400 transform rotate-90" />
            </div>
          </div>
        );

      case 'text':
        return (
          <textarea
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(questionId, e.target.value)}
            placeholder={currentQuestion.placeholder}
            rows={4}
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-lg resize-none"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Question {currentStep + 1} of {quizQuestions.length}
                </h3>
                <p className="text-sm text-gray-500">
                  {Math.round(progress)}% Complete
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(progress)}%
              </div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              {currentQuestion.question}
            </h2>
            {currentQuestion.description && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-blue-800 italic">
                  💡 {currentQuestion.description}
                </p>
              </div>
            )}
          </div>
          
          {renderQuestion()}
          
          {errors[currentQuestion.id] && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm flex items-center">
                <span className="mr-2">⚠️</span>
                {errors[currentQuestion.id]}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-3 px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:border-blue-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>
            
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-3 px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:border-gray-400 hover:text-gray-800 transition-all duration-200 font-semibold"
              >
                <Home className="h-5 w-5" />
                <span>Back to Home</span>
              </button>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={!canGoNext()}
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl hover:from-blue-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {currentStep === quizQuestions.length - 1 ? (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>Get My AcePlan</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <ChevronRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>

        {/* Step Indicators */}
        <div className="mt-12 flex justify-center space-x-3">
          {quizQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 scale-125'
                  : index < currentStep
                  ? 'bg-green-400'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Motivation */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-green-50 px-6 py-4 rounded-xl border border-blue-100">
            <Trophy className="h-6 w-6 text-blue-600" />
            <span className="text-blue-800 font-medium">
              You&apos;re almost there! Just a few more questions to get your personalized AcePlan.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
