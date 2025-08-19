'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { X, Trophy, Star, Calendar, Zap } from 'lucide-react';
import { analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';
import { saveUserPlan } from '@/lib/userPlans';
import { UserCredential } from 'firebase/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizResults?: any; // Make quizResults optional since users might just want to sign in
}

export default function LoginModal({ isOpen, onClose, quizResults }: LoginModalProps) {
  const { currentUser, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  console.log('LoginModal: isOpen:', isOpen, 'currentUser:', currentUser, 'quizResults:', quizResults);

  const handleGoogleSignIn = async () => {
    console.log('LoginModal: Attempting Google sign-in');
    setIsLoading(true);
    try {
      const userCredential: UserCredential = await signInWithGoogle();
      const user = userCredential.user;
      
      // Track successful sign-in from modal
      if (analytics) {
        logEvent(analytics, 'login_modal_success', {
          method: 'google',
          source: quizResults ? 'results_page' : 'landing_page'
        });
      }
      
      // Save quiz results to Firestore if they exist
      if (quizResults && user) {
        try {
          const planId = await saveUserPlan(user.uid, quizResults);
          console.log('LoginModal: Plan saved to Firestore with ID:', planId);
          
          // Also store in localStorage as backup
          localStorage.setItem('aceplan_quiz_results', JSON.stringify(quizResults));
          localStorage.setItem('aceplan_firestore_id', planId);
        } catch (error) {
          console.error('LoginModal: Error saving plan to Firestore:', error);
          // Fallback to localStorage only
          localStorage.setItem('aceplan_quiz_results', JSON.stringify(quizResults));
        }
      }

      // Show success message and auto-close
      setShowSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error: any) {
      console.error('LoginModal: Sign in error:', error);
      
      // Track sign-in error from modal
      if (analytics) {
        logEvent(analytics, 'login_modal_error', {
          method: 'google',
          source: quizResults ? 'results_page' : 'landing_page',
          error: error.message
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Track when modal is shown
  useEffect(() => {
    if (isOpen && analytics) {
      logEvent(analytics, 'login_modal_shown', {
        source: quizResults ? 'results_page' : 'landing_page',
        delay: quizResults ? '15_seconds' : 'immediate'
      });
    }
  }, [isOpen, quizResults]);

  // Track when modal is dismissed
  const handleClose = () => {
    if (analytics) {
      logEvent(analytics, 'login_modal_dismissed', {
        source: quizResults ? 'results_page' : 'landing_page'
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  console.log('LoginModal: Rendering modal, isOpen:', isOpen);

  // Show success message
  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Welcome to AcePlan!</h2>
            <p className="text-green-100">
              {quizResults ? 'Your results have been saved successfully.' : 'You are now signed in to AcePlan!'}
            </p>
          </div>
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Closing automatically...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              {quizResults ? '🎾 Save Your AcePlan' : '🎾 Sign In to AcePlan'}
            </h2>
            <p className="text-green-100">
              {quizResults ? 'Don\'t lose your personalized recommendations!' : 'Access your saved plans and get updates!'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-700 mb-4">
              {quizResults 
                ? 'Want to save your results and get personalized updates?'
                : 'Sign in to access your saved AcePlans and get new tennis tips!'
              }
            </p>
            
            {/* Benefits */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span>
                  {quizResults ? 'Save your equipment recommendations' : 'Access your saved equipment recommendations'}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span>
                  {quizResults ? 'Access your training calendar anytime' : 'View your training calendar anytime'}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Zap className="h-4 w-4 text-green-500" />
                <span>Get new tennis tips and updates</span>
              </div>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  {isLoading ? 'Signing in...' : 'Sign in with Google'}
                </span>
              </>
            )}
          </button>

          {/* Skip option */}
          <div className="text-center mt-4">
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
