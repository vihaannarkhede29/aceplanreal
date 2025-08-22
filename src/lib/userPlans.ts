import { db } from './firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { RecommendationResult } from '@/types';

export interface UserPlan {
  id: string;
  userId: string;
  planData: RecommendationResult;
  createdAt: any;
  updatedAt: any;
  name?: string;
  description?: string;
}

/**
 * Save a user's plan to Firestore
 * Only keeps the 2 most recent plans (current + previous)
 */
export const saveUserPlan = async (
  userId: string, 
  planData: RecommendationResult,
  planName?: string
): Promise<string> => {
  try {
    const planId = `${userId}_${Date.now()}`;
    const planRef = doc(db, 'userPlans', planId);
    
    const plan: UserPlan = {
      id: planId,
      userId,
      planData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      name: planName || `AcePlan ${new Date().toLocaleDateString()}`,
      description: `Personalized tennis plan for ${planData.skillLevel} ${planData.playingStyle} player`
    };

    // Save the new plan
    await setDoc(planRef, plan);
    console.log('UserPlan: Plan saved successfully with ID:', planId);
    
    // Get all existing plans for this user
    const existingPlans = await getUserPlans(userId);
    
    // If we have more than 2 plans, delete the oldest ones
    if (existingPlans.length > 2) {
      // Sort by creation time (newest first)
      const sortedPlans = existingPlans.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || new Date(0);
        const bTime = b.createdAt?.toDate?.() || new Date(0);
        return bTime.getTime() - aTime.getTime();
      });
      
      // Keep only the 2 most recent plans (excluding the one we just saved)
      const plansToKeep = sortedPlans.slice(0, 1); // Keep only the most recent existing plan
      
      // Delete all other plans
      for (const oldPlan of existingPlans) {
        if (!plansToKeep.find(p => p.id === oldPlan.id) && oldPlan.id !== planId) {
          await deleteUserPlan(oldPlan.id);
          console.log('UserPlan: Deleted old plan:', oldPlan.id);
        }
      }
    }
    
    return planId;
  } catch (error) {
    console.error('UserPlan: Error saving plan:', error);
    throw error;
  }
};

/**
 * Get a specific user plan by ID
 */
export const getUserPlan = async (planId: string): Promise<UserPlan | null> => {
  try {
    const planRef = doc(db, 'userPlans', planId);
    const planSnap = await getDoc(planRef);
    
    if (planSnap.exists()) {
      return planSnap.data() as UserPlan;
    } else {
      console.log('UserPlan: No plan found with ID:', planId);
      return null;
    }
  } catch (error) {
    console.error('UserPlan: Error getting plan:', error);
    throw error;
  }
};

/**
 * Get all plans for a specific user
 */
export const getUserPlans = async (userId: string): Promise<UserPlan[]> => {
  try {
    const plansRef = collection(db, 'userPlans');
    
    // First try with ordering (requires composite index)
    try {
      const q = query(
        plansRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const plans: UserPlan[] = [];
      
      querySnapshot.forEach((doc) => {
        plans.push(doc.data() as UserPlan);
      });
      
      console.log('UserPlan: Retrieved', plans.length, 'plans for user:', userId);
      return plans;
      
    } catch (indexError: any) {
      // If index error occurs, fall back to simple query without ordering
      console.warn('UserPlan: Composite index not available, falling back to simple query:', indexError.message);
      
      const simpleQuery = query(
        plansRef,
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(simpleQuery);
      const plans: UserPlan[] = [];
      
      querySnapshot.forEach((doc) => {
        plans.push(doc.data() as UserPlan);
      });
      
      // Sort in memory as fallback
      plans.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || new Date(0);
        const bTime = b.createdAt?.toDate?.() || new Date(0);
        return bTime.getTime() - aTime.getTime();
      });
      
      console.log('UserPlan: Retrieved', plans.length, 'plans for user (fallback):', userId);
      return plans;
    }
    
  } catch (error) {
    console.error('UserPlan: Error getting user plans:', error);
    throw error;
  }
};

/**
 * Get the most recent plan for a user
 */
export const getLatestUserPlan = async (userId: string): Promise<UserPlan | null> => {
  try {
    const plansRef = collection(db, 'userPlans');
    
    // First try with ordering and limit (requires composite index)
    try {
      const q = query(
        plansRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const plan = querySnapshot.docs[0].data() as UserPlan;
        console.log('UserPlan: Retrieved latest plan for user:', userId);
        return plan;
      } else {
        console.log('UserPlan: No plans found for user:', userId);
        return null;
      }
      
    } catch (indexError: any) {
      // If index error occurs, fall back to simple query and get latest in memory
      console.warn('UserPlan: Composite index not available, falling back to simple query:', indexError.message);
      
      const simpleQuery = query(
        plansRef,
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(simpleQuery);
      
      if (!querySnapshot.empty) {
        // Find the latest plan by sorting in memory
        let latestPlan: UserPlan | null = null;
        let latestTime = new Date(0);
        
        querySnapshot.forEach((doc) => {
          const plan = doc.data() as UserPlan;
          const planTime = plan.createdAt?.toDate?.() || new Date(0);
          
          if (planTime.getTime() > latestTime.getTime()) {
            latestPlan = plan;
            latestTime = planTime;
          }
        });
        
        console.log('UserPlan: Retrieved latest plan for user (fallback):', userId);
        return latestPlan;
      } else {
        console.log('UserPlan: No plans found for user:', userId);
        return null;
      }
    }
    
  } catch (error) {
    console.error('UserPlan: Error getting latest plan:', error);
    throw error;
  }
};

/**
 * Get the previous plan for a user (the one before the current one)
 */
export const getPreviousUserPlan = async (userId: string): Promise<UserPlan | null> => {
  try {
    const plansRef = collection(db, 'userPlans');
    
    // First try with ordering and limit (requires composite index)
    try {
      const q = query(
        plansRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(2)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.docs.length > 1) {
        // Return the second most recent plan (index 1)
        const previousPlan = querySnapshot.docs[1].data() as UserPlan;
        console.log('UserPlan: Retrieved previous plan for user:', userId);
        return previousPlan;
      } else {
        console.log('UserPlan: No previous plan found for user:', userId);
        return null;
      }
      
    } catch (indexError: any) {
      // If index error occurs, fall back to simple query and get previous in memory
      console.warn('UserPlan: Composite index not available, falling back to simple query:', indexError.message);
      
      const simpleQuery = query(
        plansRef,
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(simpleQuery);
      
      if (querySnapshot.docs.length > 1) {
        // Sort by creation time and get the second most recent
        const plans: UserPlan[] = [];
        querySnapshot.forEach((doc) => {
          plans.push(doc.data() as UserPlan);
        });
        
        // Sort by creation time (newest first)
        plans.sort((a, b) => {
          const aTime = a.createdAt?.toDate?.() || new Date(0);
          const bTime = b.createdAt?.toDate?.() || new Date(0);
          return bTime.getTime() - aTime.getTime();
        });
        
        // Return the second most recent plan
        const previousPlan = plans[1];
        console.log('UserPlan: Retrieved previous plan for user (fallback):', userId);
        return previousPlan;
      } else {
        console.log('UserPlan: No previous plan found for user:', userId);
        return null;
      }
    }
    
  } catch (error) {
    console.error('UserPlan: Error getting previous plan:', error);
    throw error;
  }
};

/**
 * Update an existing user plan
 */
export const updateUserPlan = async (
  planId: string, 
  updates: Partial<UserPlan>
): Promise<void> => {
  try {
    const planRef = doc(db, 'userPlans', planId);
    
    await setDoc(planRef, {
      ...updates,
      updatedAt: serverTimestamp()
    }, { merge: true });
    
    console.log('UserPlan: Plan updated successfully:', planId);
  } catch (error) {
    console.error('UserPlan: Error updating plan:', error);
    throw error;
  }
};

/**
 * Delete a user plan
 */
export const deleteUserPlan = async (planId: string): Promise<void> => {
  try {
    const planRef = doc(db, 'userPlans', planId);
    await setDoc(planRef, { deleted: true, updatedAt: serverTimestamp() }, { merge: true });
    
    console.log('UserPlan: Plan marked as deleted:', planId);
  } catch (error) {
    console.error('UserPlan: Error deleting plan:', error);
    throw error;
  }
};
