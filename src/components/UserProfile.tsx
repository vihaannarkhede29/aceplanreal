'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Trophy, Calendar, Settings } from 'lucide-react';

export default function UserProfile() {
  const { currentUser, logout } = useAuth();
  const [savedResults, setSavedResults] = useState<any>(null);

  useEffect(() => {
    // Load saved quiz results from localStorage
    const saved = localStorage.getItem('aceplan_quiz_results');
    if (saved) {
      try {
        setSavedResults(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing saved results:', error);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      // Clear saved results on logout
      localStorage.removeItem('aceplan_quiz_results');
      setSavedResults(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Welcome back, {currentUser.displayName || currentUser.email?.split('@')[0]}!
            </h3>
            <p className="text-sm text-gray-600">{currentUser.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {savedResults && (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
            <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
            Your Saved AcePlan
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">Skill Level</h5>
              <p className="text-blue-700">{savedResults.skillLevel}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h5 className="font-medium text-green-900 mb-2">Playing Style</h5>
              <p className="text-green-700">{savedResults.playingStyle}</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h5 className="font-medium text-purple-900 mb-2">Top Racket</h5>
              <p className="text-purple-700">
                {savedResults.rackets?.[0]?.name || 'Not available'}
              </p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4">
              <h5 className="font-medium text-orange-900 mb-2">Training Plan</h5>
              <p className="text-orange-700">
                {savedResults.trainingPlan?.length || 0} weeks available
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200">
              <Calendar className="h-4 w-4" />
              <span>View Full Training Plan</span>
            </button>
          </div>
        </div>
      )}

      {!savedResults && (
        <div className="border-t border-gray-200 pt-6 text-center">
          <div className="text-gray-500 mb-4">
            <Trophy className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No saved quiz results yet</p>
            <p className="text-sm">Take the quiz to save your personalized AcePlan!</p>
          </div>
        </div>
      )}
    </div>
  );
}
