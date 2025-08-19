'use client';

import { Trophy, Target, Zap, ArrowRight, Calendar, Users, Star } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface HeroSectionProps {
  onGetPlan: () => void;
}

export default function HeroSection({ onGetPlan }: HeroSectionProps) {
  const { currentUser } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Height of the fixed header
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setShowMobileMenu(false); // Close mobile menu after clicking
  };

  return (
    <>
      {/* Header with Logo */}
      <header className="bg-white/90 backdrop-blur-md border-b border-white/30 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Image
                src="/aceplanlogo.png"
                alt="AcePlan Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                AcePlan
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-16">
              <button onClick={() => scrollToSection('features')} className="text-indigo-700 hover:text-indigo-900 font-semibold transition-all duration-300 hover:scale-105 relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-teal-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-indigo-700 hover:text-indigo-900 font-semibold transition-all duration-300 hover:scale-105 relative group">
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-teal-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('racket-suggester')} className="text-indigo-700 hover:text-indigo-900 font-semibold transition-all duration-300 hover:scale-105 relative group">
                AI Racket & Strings Generator
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-teal-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection('ai-analyzer')} className="text-indigo-700 hover:text-indigo-900 font-semibold transition-all duration-300 hover:scale-105 relative group">
                AI Video Analyzer
                <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">Coming Soon</span>
              </button>
              <button onClick={() => scrollToSection('about')} className="text-indigo-700 hover:text-indigo-900 font-semibold transition-all duration-300 hover:scale-105 relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-teal-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => window.location.href = '/#quiz'}
                className="px-6 py-3 text-indigo-700 hover:text-indigo-900 font-semibold transition-colors border border-indigo-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50"
              >
                Sign In
              </button>
              <button
                onClick={onGetPlan}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Get My Free AcePlan
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {showMobileMenu && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('features')} className="text-left px-4 py-2 text-indigo-700 hover:bg-indigo-50 rounded-lg">
                  Features
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-left px-4 py-2 text-indigo-700 hover:bg-indigo-50 rounded-lg">
                  How It Works
                </button>
                <button onClick={() => scrollToSection('racket-suggester')} className="text-left px-4 py-2 text-indigo-700 hover:bg-indigo-50 rounded-lg">
                  AI Racket & Strings Generator
                </button>
                <button onClick={() => scrollToSection('ai-analyzer')} className="text-left px-4 py-2 text-indigo-700 hover:bg-indigo-50 rounded-lg">
                  AI Video Analyzer
                </button>
                <button onClick={() => scrollToSection('about')} className="text-left px-4 py-2 text-indigo-700 hover:bg-indigo-50 rounded-lg">
                  About
                </button>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <button
                    onClick={() => window.location.href = '/#quiz'}
                    className="w-full text-left px-4 py-2 text-indigo-700 hover:bg-indigo-50 rounded-lg"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={onGetPlan}
                    className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-semibold"
                  >
                    Get My Free AcePlan
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-600 to-indigo-800 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 left-16 w-4 h-4 bg-yellow-300 rounded-full animate-bounce"></div>
        <div className="absolute top-64 right-24 w-3 h-3 bg-teal-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-white rounded-full animate-bounce"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Main Branding */}
            <div className="mb-8">
              {/* Large Logo in Hero - Replace with your actual logo */}
              <div className="inline-flex items-center justify-center mb-6">
                <Image
                  src="/aceplanlogo.png" // ← Updated to match your filename
                  alt="AcePlan Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
                AcePlan
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 font-light mb-6 max-w-3xl mx-auto leading-relaxed">
                Practice hard. <span className="text-yellow-300 font-semibold">Play harder.</span>
              </p>
              <p className="text-lg text-blue-200 max-w-2xl mx-auto leading-relaxed mb-8">
                Get your personalized tennis equipment recommendations AND a complete 4-week training program designed specifically for your skill level, goals, and schedule.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mb-12">
              <button 
                onClick={onGetPlan}
                className="group relative inline-flex items-center space-x-4 bg-gradient-to-r from-yellow-400 to-teal-500 text-indigo-900 px-10 py-5 rounded-2xl text-xl font-bold hover:from-yellow-500 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/25"
              >
                <span>Get My Free AcePlan</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Smart Equipment Matching</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  AI-powered racket and string recommendations based on your skill level, playing style, and budget
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Personalized Training Plan</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  4-week progressive training calendar with drills tailored to your weakest shots and improvement goals
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <div className="w-14 h-14 bg-gradient-to-r from-teal-400 to-teal-500 rounded-xl flex items-center justify-center mb-3 mx-auto">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Progressive Improvement</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Systematic skill development from fundamentals to advanced techniques with proper progression
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Expert Recommendations</h4>
                <p className="text-blue-200 text-sm">
                  Based on tennis equipment science and professional coaching principles
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Personalized for You</h4>
                <p className="text-blue-200 text-sm">
                  Every plan is unique based on your specific profile and goals
                </p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Proven Results</h4>
                <p className="text-blue-200 text-sm">
                  Structured approach that has helped players at all levels improve their game
                </p>
              </div>
            </div>

            {/* What You Get Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 text-center">What You Get in Your AcePlan</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-base font-semibold text-yellow-300 mb-2">🎾 Equipment Recommendations</h4>
                  <ul className="text-blue-100 text-sm space-y-1">
                    <li>• Top 3 racket picks (good, better, best)</li>
                    <li>• Personalized string recommendations</li>
                    <li>• Budget-appropriate options</li>
                    <li>• Arm-friendly alternatives if needed</li>
                    <li>• Direct affiliate links to purchase</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-teal-300 mb-2">📅 Training Program</h4>
                  <ul className="text-blue-100 text-sm space-y-1">
                    <li>• 4-week progressive training plan</li>
                    <li>• Daily drill schedules with timing</li>
                    <li>• Focus on your weakest shots</li>
                    <li>• Skill-appropriate difficulty levels</li>
                    <li>• Detailed instructions and variations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
