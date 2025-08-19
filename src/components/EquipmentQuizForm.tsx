'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { equipmentQuestions, EquipmentQuestion } from '@/data/equipmentQuestions';

interface EquipmentAnswer {
  [key: string]: string;
}

interface EquipmentQuizFormProps {
  onComplete: (answers: EquipmentAnswer) => void;
}

export default function EquipmentQuizForm({ onComplete }: EquipmentQuizFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<EquipmentAnswer>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors(prev => ({ ...prev, [questionId]: '' }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const currentQuestion = equipmentQuestions[currentStep];
    if (!currentQuestion.required) return true;
    
    const answer = answers[currentQuestion.id];
    if (!answer || (typeof answer === 'string' && answer.trim() === '')) {
      setErrors(prev => ({ ...prev, [currentQuestion.id]: 'This question is required' }));
      return false;
    }
    return true;
  };

  const canGoNext = (): boolean => {
    const currentQuestion = equipmentQuestions[currentStep];
    if (!currentQuestion.required) return true;
    
    const answer = answers[currentQuestion.id];
    return typeof answer === 'string' && answer.trim() !== '';
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < equipmentQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Quiz complete
        onComplete(answers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuestion = (question: EquipmentQuestion) => {
    const value = answers[question.id] || '';
    const error = errors[question.id];

    switch (question.type) {
      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option} className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          >
            <option value="">Select an option</option>
            {question.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / equipmentQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Racket & Strings Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized equipment recommendations based on your skill level, playing style, and preferences
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentStep + 1} of {equipmentQuestions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {equipmentQuestions[currentStep].question}
            </h2>
            {equipmentQuestions[currentStep].description && (
              <p className="text-gray-600 text-lg">
                {equipmentQuestions[currentStep].description}
              </p>
            )}
          </div>

          <div className="mb-8">
            {renderQuestion(equipmentQuestions[currentStep])}
            {errors[equipmentQuestions[currentStep].id] && (
              <p className="text-red-500 text-sm mt-2">
                {errors[equipmentQuestions[currentStep].id]}
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentStep === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext()}
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                canGoNext()
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:from-blue-700 hover:to-green-700 transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>
                {currentStep === equipmentQuestions.length - 1 ? 'Get Equipment' : 'Next'}
              </span>
              {currentStep < equipmentQuestions.length - 1 && <ArrowRight className="h-4 w-4" />}
              {currentStep === equipmentQuestions.length - 1 && <CheckCircle className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Back to Full AcePlan */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Want a complete training plan with your equipment recommendations?
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            Get Your Full AcePlan
          </button>
        </div>
      </div>
    </div>
  );
}
