'use client';

import React, { useState, useEffect } from 'react';
import LoginModal from '@/components/LoginModal';
import EquipmentQuizForm from '@/components/EquipmentQuizForm';
import EquipmentResultsPage from '@/components/EquipmentResultsPage';
import QuizForm from '@/components/QuizForm';
import ResultsPage from '@/components/ResultsPage';
import HeroSection from '@/components/HeroSection';
import { QuizAnswer, RecommendationResult } from '@/types';
import { generateRecommendations } from '@/lib/recommendations';
import { getLatestUserPlan } from '@/lib/userPlans';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { User, Trophy, Calendar, Target } from 'lucide-react';

// Inner component that can use the useAuth hook
function HomeContent() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showEquipmentQuiz, setShowEquipmentQuiz] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [results, setResults] = useState<RecommendationResult | null>(null);
  const [equipmentResults, setEquipmentResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewPreviousPlan, setViewPreviousPlan] = useState(false);
  const { currentUser } = useAuth();

  // Check if user wants to view previous plan
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#results') {
      setViewPreviousPlan(true);
      // You can add logic here to load the previous plan
    }
  }, []);

  // Auto-load previous plan when user signs in
  useEffect(() => {
    if (currentUser && !results && !equipmentResults) {
      const loadPreviousPlan = async () => {
        try {
          const previousPlan = await getLatestUserPlan(currentUser.uid);
          if (previousPlan) {
            setResults(previousPlan.planData);
            setViewPreviousPlan(true);
            console.log('Auto-loaded previous plan for user:', currentUser.uid);
          }
        } catch (error) {
          console.error('Error loading previous plan:', error);
        }
      };
      
      loadPreviousPlan();
    }
  }, [currentUser, results, equipmentResults]);

  const handleGetPlan = () => {
    setShowQuiz(true);
  };

  const handleGetEquipment = () => {
    setShowEquipmentQuiz(true);
  };

  const handleSignIn = () => {
    setShowLoginModal(true);
  };

  const handleQuizComplete = async (answers: QuizAnswer) => {
    setIsLoading(true);
    try {
      const recommendations = generateRecommendations(answers);
      setResults(recommendations);
      setShowQuiz(false);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEquipmentComplete = (answers: any) => {
    setEquipmentResults(answers);
    setShowEquipmentQuiz(false);
  };

  const handleRetakeQuiz = () => {
    setResults(null);
    setEquipmentResults(null);
    setViewPreviousPlan(false);
  };

  const handleBackToEquipment = () => {
    setEquipmentResults(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Creating Your AcePlan...</h2>
          <p className="text-gray-600">Analyzing your profile and generating personalized recommendations</p>
        </div>
      </div>
    );
  }

  if (equipmentResults) {
    return (
      <EquipmentResultsPage answers={equipmentResults} onBackToEquipment={handleBackToEquipment} />
    );
  }

  if (showEquipmentQuiz) {
    return (
      <EquipmentQuizForm onComplete={handleEquipmentComplete} />
    );
  }

  if (results) {
    return (
      <ResultsPage results={results} onRetakeQuiz={handleRetakeQuiz} isPreviousPlan={viewPreviousPlan} />
    );
  }

  if (showQuiz) {
    return (
      <QuizForm onComplete={handleQuizComplete} />
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection onGetPlan={handleGetPlan} onGetEquipment={handleGetEquipment} onSignIn={handleSignIn} />
      
      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)} 
          quizResults={null} 
        />
      )}
      
      {/* Sign In CTA Section - Only show if user is not signed in */}
      {!currentUser && (
        <section id="sign-in-cta" className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Already have an AcePlan?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Sign in to access your saved results and training plan
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <User className="h-5 w-5" />
              <span>Sign In to AcePlan</span>
            </button>
          </div>
        </section>
      )}
      
      {/* Load Saved Plan Section - Only show if user is signed in */}
      {currentUser && (
        <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome back, {currentUser.displayName || currentUser.email?.split('@')[0]}! 🎾
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Ready to continue your tennis journey? Load your saved AcePlan or create a new one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <button
                  onClick={async () => {
                    try {
                      const previousPlan = await getLatestUserPlan(currentUser.uid);
                      if (previousPlan) {
                        setResults(previousPlan.planData);
                        setViewPreviousPlan(true);
                      } else {
                        alert('No saved plan found. Please create a new plan first.');
                      }
                    } catch (error) {
                      console.error('Error loading saved plan:', error);
                      alert('Error loading saved plan. Please try again.');
                    }
                  }}
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Load Saved Plan</span>
                </button>
              <button
                onClick={handleGetPlan}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Trophy className="h-5 w-5" />
                <span>Create New Plan</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How AcePlan Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your personalized tennis equipment recommendations and training plan in just a few minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Take the Quiz</h3>
              <p className="text-gray-600">
                Answer a few questions about your skill level, playing style, and goals
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized equipment suggestions and a custom training plan
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Start Training</h3>
              <p className="text-gray-600">
                Follow your 4-week progressive training program and track your progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose AcePlan?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade recommendations backed by tennis expertise and AI-powered analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                AI-Powered Equipment Analysis
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Smart Matching</h4>
                    <p className="text-gray-600 text-sm">Our AI analyzes your profile to find the perfect equipment match</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Expert Validation</h4>
                    <p className="text-gray-600 text-sm">All recommendations are validated by tennis professionals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Real-time Updates</h4>
                    <p className="text-gray-600 text-sm">Equipment database is constantly updated with latest products</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Comprehensive Training Plans
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Progressive Difficulty</h4>
                    <p className="text-gray-600 text-sm">4-week programs that gradually increase in complexity</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Skill-Focused Drills</h4>
                    <p className="text-gray-600 text-sm">Targeted exercises for your specific improvement areas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Progress Tracking</h4>
                    <p className="text-gray-600 text-sm">Monitor your improvement and adjust plans accordingly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6">
              <span className="text-3xl">🤖</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              AI Video Analyzer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Coming soon! Upload videos of your tennis strokes and get instant feedback on your technique
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Get Notified When It's Ready
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to know when our AI video analysis feature launches
            </p>
            <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              <span>Notify Me</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-green-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">AcePlan</h3>
          <p className="text-xl text-blue-200 mb-8">
            Practice hard. Play harder. Get your personalized tennis equipment plan today.
          </p>
          
          {/* Legal Links */}
          <div className="flex justify-center space-x-8 mb-8 text-blue-200">
            <a 
              href="/privacy-policy" 
              className="hover:text-white transition-colors duration-200 underline"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="hover:text-white transition-colors duration-200 underline"
            >
              Terms of Service
            </a>
            <a 
              href="mailto:aceplan711@gmail.com" 
              className="hover:text-white transition-colors duration-200 underline"
            >
              Support
            </a>
          </div>
          
          <div className="text-sm text-blue-300">
            <p>© 2025 AcePlan. All rights reserved.</p>
            <p className="mt-2">
              This site contains affiliate links. We may earn a commission from qualifying purchases.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}
