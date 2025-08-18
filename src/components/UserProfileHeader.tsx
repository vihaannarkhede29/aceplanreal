'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Trophy, Calendar, Settings, ChevronDown } from 'lucide-react';

export default function UserProfileHeader() {
  const { currentUser, logout } = useAuth();
  const [savedResults, setSavedResults] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);

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
      setShowDropdown(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-3 bg-white/90 backdrop-blur-md border border-white/30 rounded-lg px-4 py-2 hover:bg-white/95 transition-all duration-200 shadow-sm"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-gray-900">
            {currentUser.displayName || currentUser.email?.split('@')[0]}
          </p>
          <p className="text-xs text-gray-500">{currentUser.email}</p>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {currentUser.displayName || currentUser.email?.split('@')[0]}
                </h3>
                <p className="text-sm text-gray-600">{currentUser.email}</p>
              </div>
            </div>
          </div>

          {savedResults && (
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                Your Saved AcePlan
              </h4>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-blue-900 font-medium">Skill Level</p>
                  <p className="text-blue-700">{savedResults.skillLevel}</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-green-900 font-medium">Playing Style</p>
                  <p className="text-green-700">{savedResults.playingStyle}</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-purple-900 font-medium">Top Racket</p>
                  <p className="text-purple-700">
                    {savedResults.rackets?.[0]?.name || 'Not available'}
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-3">
                  <p className="text-orange-900 font-medium">Training Plan</p>
                  <p className="text-orange-700">
                    {savedResults.trainingPlan?.length || 0} weeks
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
