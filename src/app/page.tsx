'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import QuizForm from '@/components/QuizForm';
import EquipmentQuizForm from '@/components/EquipmentQuizForm';
import EquipmentResultsPage from '@/components/EquipmentResultsPage';
import ResultsPage from '@/components/ResultsPage';
import LoginModal from '@/components/LoginModal';
import { QuizAnswer, RecommendationResult } from '@/types';
import { generateRecommendations } from '@/lib/recommendations';
import { AuthProvider } from '@/contexts/AuthContext';
import { User, Trophy, Calendar, Target } from 'lucide-react';

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showEquipmentQuiz, setShowEquipmentQuiz] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [results, setResults] = useState<RecommendationResult | null>(null);
  const [equipmentResults, setEquipmentResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewPreviousPlan, setViewPreviousPlan] = useState(false);

  // Check if user wants to view previous plan
  useEffect(() => {
    // Check for #results hash in URL
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#results') {
        const savedResults = localStorage.getItem('aceplan_quiz_results');
        if (savedResults) {
          try {
            setResults(JSON.parse(savedResults));
            setViewPreviousPlan(true);
            // Remove the hash from URL without page reload
            window.history.replaceState(null, '', window.location.pathname);
          } catch (error) {
            console.error('Error parsing saved results:', error);
          }
        }
      }
    }

    // Legacy check for localStorage flag
    const shouldViewPrevious = localStorage.getItem('aceplan_view_previous_plan');
    if (shouldViewPrevious === 'true') {
      const savedResults = localStorage.getItem('aceplan_quiz_results');
      if (savedResults) {
        try {
          setResults(JSON.parse(savedResults));
          setViewPreviousPlan(true);
          // Clear the flag
          localStorage.removeItem('aceplan_view_previous_plan');
        } catch (error) {
          console.error('Error parsing saved results:', error);
        }
      }
    }
  }, []);

  const handleGetPlan = () => { setShowQuiz(true); };
  const handleGetEquipment = () => { setShowEquipmentQuiz(true); };
  
  const handleQuizComplete = (answers: QuizAnswer) => {
    setIsLoading(true);
    // Simulate processing time
    setTimeout(() => {
      const recommendations = generateRecommendations(answers);
      setResults(recommendations);
      setIsLoading(false);
      setViewPreviousPlan(false);
    }, 2000);
  };

  const handleEquipmentComplete = (answers: any) => {
    setEquipmentResults(answers);
    setShowEquipmentQuiz(false);
  };

  const handleBackToEquipment = () => {
    setEquipmentResults(null);
    setShowEquipmentQuiz(true);
  };

  const handleSignIn = () => {
    // Show the login modal instead of just scrolling
    setShowLoginModal(true);
  };

  const handleRetakeQuiz = () => { 
    setShowQuiz(false); 
    setResults(null); 
    setViewPreviousPlan(false);
  };

  if (isLoading) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Creating Your AcePlan...</h2>
            <p className="text-gray-600">Analyzing your profile and generating personalized recommendations</p>
          </div>
        </div>
      </AuthProvider>
    );
  }

  if (equipmentResults) {
    return (
      <AuthProvider>
        <EquipmentResultsPage answers={equipmentResults} onBackToEquipment={handleBackToEquipment} />
      </AuthProvider>
    );
  }

  if (showEquipmentQuiz) {
    return (
      <AuthProvider>
        <EquipmentQuizForm onComplete={handleEquipmentComplete} />
      </AuthProvider>
    );
  }

  if (results) {
    return (
      <AuthProvider>
        <ResultsPage results={results} onRetakeQuiz={handleRetakeQuiz} isPreviousPlan={viewPreviousPlan} />
      </AuthProvider>
    );
  }

  if (showQuiz) {
    return (
      <AuthProvider>
        <QuizForm onComplete={handleQuizComplete} />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
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
                  onClick={() => window.location.href = '/#results'}
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
              Get your complete tennis improvement plan in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Take the Quiz</h3>
              <p className="text-gray-600 leading-relaxed">
                Answer questions about your skill level, playing style, training schedule, and improvement goals. Our AI analyzes your responses to create a personalized profile.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Your AcePlan</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive your complete plan including top 3 racket recommendations, personalized string choices, and a 4-week training calendar with drills tailored to your needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transform Your Game</h3>
              <p className="text-gray-600 leading-relaxed">
                Follow your training schedule, practice with the right equipment, and watch your tennis skills improve week by week with our proven progressive system.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-16 grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">🎾 Smart Equipment Matching</h3>
              <p className="text-blue-800 mb-6">
                Our AI considers your skill level, playing style, budget, and physical concerns to recommend the perfect racket and strings for your game.
              </p>
              <ul className="text-blue-700 space-y-2">
                <li>• Budget-appropriate options</li>
                <li>• Arm-friendly alternatives</li>
                <li>• Performance vs. comfort balance</li>
                <li>• Direct purchase links</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-green-900 mb-4">📅 Personalized Training Program</h3>
              <p className="text-green-800 mb-6">
                Get a complete 4-week training plan that focuses on your weakest shots and improvement goals, with progressive difficulty building.
              </p>
              <ul className="text-green-700 space-y-2">
                <li>• Daily drill schedules</li>
                <li>• Skill-appropriate difficulty</li>
                <li>• Focus on weak areas</li>
                <li>• Progressive improvement</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AcePlan?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized tennis equipment recommendations and training plans tailored to your unique playing style and goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Equipment</h3>
              <p className="text-gray-600 leading-relaxed">
                Get racket and string recommendations based on your skill level, playing style, and specific needs.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Training Plans</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive a 4-week training program designed around your schedule and improvement goals.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Skill Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Focus on your weakest shots and areas for improvement with targeted drills and exercises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Racket & Strings Generator Section */}
      <section id="racket-suggester" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Racket & Strings Generator</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get instant equipment recommendations without taking the full quiz. Quick suggestions based on your basic preferences.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Quick Equipment Guide
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-blue-600" />
                    Racket Selection
                  </h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Beginner:</span>
                      <span className="font-medium">Lightweight, oversized head (105-110 sq in)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Intermediate:</span>
                      <span className="font-medium">Mid-weight, mid-plus head (100-105 sq in)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Advanced:</span>
                      <span className="font-medium">Heavier, smaller head (95-100 sq in)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-600" />
                    String Selection
                  </h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Power:</span>
                      <span className="font-medium">Multifilament or synthetic gut</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Control:</span>
                      <span className="font-medium">Polyester strings</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Comfort:</span>
                      <span className="font-medium">Natural gut or soft multifilaments</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button
                  onClick={handleGetEquipment}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Get Your Equipment
                </button>
                <p className="text-gray-600 mt-3 text-sm">
                  Take our equipment quiz for detailed, personalized racket and string suggestions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Video Analyzer Section */}
      <section id="ai-analyzer" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6">
              <span className="text-3xl">🤖</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              AI Video Analyzer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Advanced swing analysis powered by artificial intelligence to perfect your technique
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
              <span className="animate-pulse mr-2">🚀</span>
              Coming Soon
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📹</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Upload Your Swing</h3>
              <p className="text-gray-600 text-center">
                Record your tennis strokes and upload them for instant AI-powered analysis
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">AI Analysis</h3>
              <p className="text-gray-600 text-center">
                Get detailed feedback on your form, timing, and technique with frame-by-frame analysis
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Track Progress</h3>
              <p className="text-gray-600 text-center">
                Monitor your improvement over time with detailed progress reports and comparisons
              </p>
            </div>
          </div>

          {/* SwingVision Integration */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">SwingVision Integration</h3>
              <p className="text-gray-600 mb-6">
                Seamless integration with SwingVision for professional-grade tennis analysis and coaching
              </p>
              <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                <span className="mr-2">🎾</span>
                SwingVision - Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About AcePlan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing tennis improvement through AI-powered personalization
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                AcePlan was created to democratize professional tennis coaching and equipment selection. 
                We believe every player deserves access to personalized training plans and equipment 
                recommendations that match their unique needs and goals.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our AI-powered platform analyzes your playing style, skill level, physical attributes, 
                and training schedule to create a comprehensive improvement plan that actually works.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Data-Driven Recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700 font-medium">Proven Results</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose AcePlan?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Personalized Approach</h4>
                    <p className="text-gray-600 text-sm">Every recommendation is tailored to your specific needs and goals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Comprehensive Training</h4>
                    <p className="text-gray-600 text-sm">Complete 4-week programs with progressive difficulty</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Expert Equipment</h4>
                    <p className="text-gray-600 text-sm">Professional-grade equipment recommendations with direct purchase links</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Continuous Innovation</h4>
                    <p className="text-gray-600 text-sm">AI video analysis and advanced features coming soon</p>
                  </div>
                </div>
              </div>
            </div>
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
          <div className="text-sm text-blue-300">
            <p>© 2025 AcePlan. All rights reserved.</p>
            <p className="mt-2">
              This site contains affiliate links. We may earn a commission from qualifying purchases.
            </p>
          </div>
        </div>
      </footer>
    </main>
    </AuthProvider>
  );
}
