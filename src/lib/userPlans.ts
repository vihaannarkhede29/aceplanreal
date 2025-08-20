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

    await setDoc(planRef, plan);
    console.log('UserPlan: Plan saved successfully with ID:', planId);
    
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
