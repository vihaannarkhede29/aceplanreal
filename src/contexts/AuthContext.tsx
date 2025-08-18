'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, analytics } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('AuthProvider: Initializing, loading:', loading);

  const signInWithGoogle = async () => {
    console.log('AuthProvider: signInWithGoogle called');
    try {
      const provider = new GoogleAuthProvider();
      console.log('AuthProvider: Google provider created, attempting sign-in');
      await signInWithPopup(auth, provider);
      console.log('AuthProvider: Google sign-in successful');
      
      // Track successful sign-in
      if (analytics) {
        logEvent(analytics, 'login', {
          method: 'google'
        });
      }
    } catch (error) {
      console.error('AuthProvider: Error signing in with Google:', error);
      
      // Track sign-in error
      if (analytics) {
        logEvent(analytics, 'login_error', {
          method: 'google',
          error: error.message
        });
      }
    }
  };

  const logout = async () => {
    console.log('AuthProvider: logout called');
    try {
      await signOut(auth);
      console.log('AuthProvider: Logout successful');
      
      // Track successful logout
      if (analytics) {
        logEvent(analytics, 'logout');
      }
    } catch (error) {
      console.error('AuthProvider: Error signing out:', error);
    }
  };

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('AuthProvider: Auth state changed, user:', user);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    logout
  };

  console.log('AuthProvider: Rendering with value:', value);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
