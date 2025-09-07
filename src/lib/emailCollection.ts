import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface EmailSubscription {
  email: string;
  source: 'ai_video_analysis' | 'general' | 'newsletter';
  timestamp: any;
  status: 'pending' | 'confirmed';
}

export async function subscribeToEmailList(email: string, source: 'ai_video_analysis' | 'general' | 'newsletter' = 'general'): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'emailSubscriptions'), {
      email: email.toLowerCase().trim(),
      source,
      timestamp: serverTimestamp(),
      status: 'pending'
    });
    
    console.log('Email subscription added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding email subscription:', error);
    throw error;
  }
}

export async function subscribeToAIVideoAnalysis(email: string): Promise<string> {
  return subscribeToEmailList(email, 'ai_video_analysis');
}
