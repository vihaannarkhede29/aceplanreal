'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Trophy, Calendar, Settings, Plus, Clock } from 'lucide-react';
import { getUserPlans, UserPlan } from '@/lib/userPlans';

export default function UserProfile() {
  const { currentUser, logout } = useAuth();
  const [savedPlans, setSavedPlans] = useState<UserPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserPlans = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          const plans = await getUserPlans(currentUser.uid);
          setSavedPlans(plans);
        } catch (error) {
          console.error('Error loading user plans:', error);
          // Fallback to localStorage
          const saved = localStorage.getItem('aceplan_quiz_results');
          if (saved) {
            try {
              const parsedResults = JSON.parse(saved);
              setSavedPlans([{
                id: 'local',
                userId: currentUser.uid,
                planData: parsedResults,
                createdAt: new Date(),
                updatedAt: new Date(),
                name: 'Local AcePlan',
                description: 'Plan saved locally'
              }]);
            } catch (error) {
              console.error('Error parsing saved results:', error);
            }
          }
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserPlans();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      // Clear saved plans on logout
      setSavedPlans([]);
      localStorage.removeItem('aceplan_quiz_results');
      localStorage.removeItem('aceplan_firestore_id');
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

      {loading ? (
        <div className="border-t border-gray-200 pt-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-600">Loading your plans...</p>
        </div>
      ) : savedPlans.length > 0 ? (
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
            <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
            Your Saved AcePlans ({savedPlans.length})
          </h4>
          
          <div className="space-y-4">
            {savedPlans.map((plan, index) => (
              <div key={plan.id} className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900">{plan.name || `AcePlan ${index + 1}`}</h5>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{plan.createdAt?.toDate?.() ? plan.createdAt.toDate().toLocaleDateString() : 'Recently'}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <div className="bg-white/70 rounded-lg p-3">
                    <h6 className="font-medium text-blue-900 mb-1 text-sm">Skill Level</h6>
                    <p className="text-blue-700 text-sm">{plan.planData.skillLevel}</p>
                  </div>
                  
                  <div className="bg-white/70 rounded-lg p-3">
                    <h6 className="font-medium text-green-900 mb-1 text-sm">Playing Style</h6>
                    <p className="text-green-700 text-sm">{plan.planData.playingStyle}</p>
                  </div>
                  
                  <div className="bg-white/70 rounded-lg p-3">
                    <h6 className="font-medium text-purple-900 mb-1 text-sm">Top Racket</h6>
                    <p className="text-purple-700 text-sm">
                      {plan.planData.rackets?.[0]?.name || 'Not available'}
                    </p>
                  </div>
                  
                  <div className="bg-white/70 rounded-lg p-3">
                    <h6 className="font-medium text-orange-900 mb-1 text-sm">Training Plan</h6>
                    <p className="text-orange-700 text-sm">
                      {plan.planData.trainingPlan?.length || 0} weeks available
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => {
                      // Store this plan as the current results and navigate to results page
                      localStorage.setItem('aceplan_quiz_results', JSON.stringify(plan.planData));
                      if (plan.id !== 'local') {
                        localStorage.setItem('aceplan_firestore_id', plan.id);
                      }
                      window.location.href = '/#results';
                    }}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>View Full Plan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-200 pt-6 text-center">
          <div className="text-gray-500 mb-4">
            <Trophy className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No saved AcePlans yet</p>
            <p className="text-sm">Take the quiz to save your personalized AcePlan!</p>
          </div>
        </div>
      )}
    </div>
  );
}
