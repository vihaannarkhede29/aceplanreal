'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Trophy, Calendar, Settings, ChevronDown, Clock, Plus } from 'lucide-react';
import { getUserPlans, UserPlan } from '@/lib/userPlans';

export default function UserProfileHeader() {
  const { currentUser, logout } = useAuth();
  const [savedPlans, setSavedPlans] = useState<UserPlan[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setShowDropdown(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const loadPlan = (plan: UserPlan) => {
    try {
      console.log('Loading plan:', plan);
      console.log('Plan data:', plan.planData);
      
      // Verify all required data is present
      if (!plan.planData) {
        console.error('Plan data is missing');
        alert('Error: Plan data is missing. Please try again.');
        return;
      }
      
      // Check if all required sections are present
      const requiredSections = ['rackets', 'strings', 'trainingPlan', 'skillLevel', 'playingStyle'] as const;
      const missingSections = requiredSections.filter(section => !(plan.planData as any)[section]);
      
      if (missingSections.length > 0) {
        console.warn('Missing plan sections:', missingSections);
        console.log('Available sections:', Object.keys(plan.planData));
      }
      
      // Store this plan as the current results and navigate to results page
      localStorage.setItem('aceplan_quiz_results', JSON.stringify(plan.planData));
      if (plan.id !== 'local') {
        localStorage.setItem('aceplan_firestore_id', plan.id);
      }
      
      // Set a flag to indicate this is a loaded plan
      localStorage.setItem('aceplan_loaded_plan', 'true');
      
      console.log('Plan loaded successfully, reloading page to show new plan...');
      
      // Close dropdown first
      setShowDropdown(false);
      
      // Use a small delay to ensure localStorage is set, then reload the page
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
    } catch (error) {
      console.error('Error loading plan:', error);
      alert('Error loading plan. Please try again.');
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

          {loading ? (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading plans...</span>
              </div>
            </div>
          ) : savedPlans.length > 0 ? (
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                Your Saved AcePlans ({savedPlans.length})
              </h4>
              
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {savedPlans.map((plan, index) => (
                  <div key={plan.id} className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900 text-sm">{plan.name || `AcePlan ${index + 1}`}</h5>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{plan.createdAt?.toDate?.() ? plan.createdAt.toDate().toLocaleDateString() : 'Recently'}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">{plan.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="bg-white/70 rounded p-2">
                        <p className="text-blue-900 font-medium">Skill</p>
                        <p className="text-blue-700">{plan.planData.skillLevel}</p>
                      </div>
                      
                      <div className="bg-white/70 rounded p-2">
                        <p className="text-green-900 font-medium">Style</p>
                        <p className="text-green-700">{plan.planData.playingStyle}</p>
                      </div>
                    </div>
                    
                    {/* Plan Contents Preview */}
                    <div className="bg-white/70 rounded p-2 mb-3">
                      <p className="text-purple-900 font-medium text-xs mb-1">Plan Includes:</p>
                      <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                        <div>🎾 {plan.planData.rackets?.length || 0} Rackets</div>
                        <div>🧵 {plan.planData.strings?.length || 0} Strings</div>
                        <div>📅 {plan.planData.trainingPlan?.length || 0} Weeks</div>
                        <div>⚡ {plan.planData.trainingPlan?.reduce((total: number, week: any) => 
                          total + week.days.reduce((dayTotal: number, day: any) => dayTotal + day.drills.length, 0), 0
                        ) || 0} Drills</div>
                      </div>
                    </div>

                    <button
                      onClick={() => loadPlan(plan)}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 text-xs font-medium"
                    >
                      Load This Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 border-b border-gray-100">
              <div className="text-center text-gray-500">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No saved plans yet</p>
                <p className="text-xs">Take the quiz to save your first AcePlan!</p>
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
