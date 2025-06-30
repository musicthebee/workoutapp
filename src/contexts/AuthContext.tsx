import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Mock Auth Context
 * Matches Firebase Auth interface for easy migration later
 */

// User interface matching Firebase Auth
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

// Auth error interface
export interface AuthError {
  code: string;
  message: string;
}

// Auth context value
interface AuthContextValue {
  // State
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  
  // Auth methods (matching Firebase)
  signInWithEmailAndPassword: (email: string, password: string) => Promise<User>;
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  updateProfile: (updates: { displayName?: string; photoURL?: string }) => Promise<void>;
  
  // Helper methods
  clearError: () => void;
}

// Storage keys
const AUTH_STORAGE_KEY = '@workout_tracker/auth';
const MOCK_DELAY = 800; // Simulate network delay

// Mock user database
const mockUsers: Record<string, { password: string; user: User }> = {
  'test@example.com': {
    password: 'password123',
    user: {
      uid: 'user_123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
      emailVerified: true,
    },
  },
};

// Helper to simulate async operations
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Create context
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Provider props
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider Component
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  // Load persisted auth state
  useEffect(() => {
    loadPersistedAuth();
  }, []);

  const loadPersistedAuth = async (): Promise<void> => {
    try {
      const authData = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (authData) {
        const parsed = JSON.parse(authData) as User;
        setUser(parsed);
      }
    } catch (err) {
      console.error('Failed to load auth state:', err);
    } finally {
      setLoading(false);
    }
  };

  const persistAuth = async (userData: User | null): Promise<void> => {
    try {
      if (userData) {
        await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      } else {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Failed to persist auth state:', err);
    }
  };

  // Sign in with email and password
  const signInWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    setError(null);
    
    try {
      await delay(MOCK_DELAY);
      
      // Validate input
      if (!email || !password) {
        throw { code: 'auth/invalid-input', message: 'Email and password required' };
      }
      
      // Check mock database
      const mockUser = mockUsers[email.toLowerCase()];
      if (!mockUser) {
        throw { code: 'auth/user-not-found', message: 'User not found' };
      }
      
      if (mockUser.password !== password) {
        throw { code: 'auth/wrong-password', message: 'Invalid password' };
      }
      
      // Success
      const userData = { ...mockUser.user };
      setUser(userData);
      await persistAuth(userData);
      return userData;
      
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  // Create new user account
  const createUserWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    setError(null);
    
    try {
      await delay(MOCK_DELAY);
      
      // Validate input
      if (!email || !password) {
        throw { code: 'auth/invalid-input', message: 'Email and password required' };
      }
      
      if (password.length < 6) {
        throw { code: 'auth/weak-password', message: 'Password should be at least 6 characters' };
      }
      
      // Check if user exists
      if (mockUsers[email.toLowerCase()]) {
        throw { code: 'auth/email-already-in-use', message: 'Email already in use' };
      }
      
      // Create new user
      const newUser: User = {
        uid: `user_${Date.now()}`,
        email,
        displayName: null,
        photoURL: null,
        emailVerified: false,
      };
      
      // Add to mock database
      mockUsers[email.toLowerCase()] = {
        password,
        user: newUser,
      };
      
      // Set current user
      setUser(newUser);
      await persistAuth(newUser);
      return newUser;
      
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    setLoading(true);
    
    try {
      await delay(MOCK_DELAY / 2);
      setUser(null);
      await persistAuth(null);
      setError(null);
    } catch (err) {
      const authError = { code: 'auth/sign-out-error', message: 'Failed to sign out' };
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  // Send password reset email
  const sendPasswordResetEmail = async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await delay(MOCK_DELAY);
      
      if (!email) {
        throw { code: 'auth/invalid-email', message: 'Email required' };
      }
      
      // In mock, just check if user exists
      if (!mockUsers[email.toLowerCase()]) {
        throw { code: 'auth/user-not-found', message: 'User not found' };
      }
      
      // Mock success
      console.log(`[MOCK] Password reset email sent to ${email}`);
      
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates: { displayName?: string; photoURL?: string }): Promise<void> => {
    if (!user) {
      throw { code: 'auth/no-user', message: 'No user signed in' };
    }
    
    setLoading(true);
    
    try {
      await delay(MOCK_DELAY / 2);
      
      const updatedUser = {
        ...user,
        ...updates,
      };
      
      // Update mock database
      const userEmail = user.email?.toLowerCase();
      if (userEmail && mockUsers[userEmail]) {
        mockUsers[userEmail]!.user = updatedUser;
      }
      
      setUser(updatedUser);
      await persistAuth(updatedUser);
      
    } catch (err) {
      const authError = { code: 'auth/update-profile-error', message: 'Failed to update profile' };
      setError(authError);
      throw authError;
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = (): void => {
    setError(null);
  };

  const value: AuthContextValue = {
    user,
    loading,
    error,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use auth context
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

/**
 * Mock auth helpers for development
 */
export const mockAuth = {
  // Quick sign in for development
  signInAsTestUser: async (): Promise<User> => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('Must be used within AuthProvider');
    }
    return context.signInWithEmailAndPassword('test@example.com', 'password123');
  },
  
  // Add more mock users
  addMockUser: (email: string, password: string, displayName: string): void => {
    mockUsers[email.toLowerCase()] = {
      password,
      user: {
        uid: `user_${Date.now()}`,
        email,
        displayName,
        photoURL: null,
        emailVerified: true,
      },
    };
  },
  
  // Get current mock users (dev only)
  getMockUsers: (): string[] => {
    return Object.keys(mockUsers);
  },
};
