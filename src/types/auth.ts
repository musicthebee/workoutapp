// src/types/auth.ts
/**
 * Authentication type definitions
 */

// User type matching our auth needs
export interface AuthUser {
  id: string;
  email: string;
  display_name?: string;
  photo_url?: string;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

// Auth state type
export interface AuthState {
  user: AuthUser | null;
  is_loading: boolean;
  is_authenticated: boolean;
  is_initializing: boolean;
}

// Sign up data
export interface SignUpData {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

// Sign in data
export interface SignInData {
  email: string;
  password: string;
}

// Auth error codes
export type AuthErrorCode =
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/invalid-email'
  | 'auth/network-request-failed'
  | 'auth/too-many-requests'
  | 'auth/user-disabled'
  | 'auth/operation-not-allowed'
  | 'auth/invalid-credential'
  | 'auth/account-exists-with-different-credential'
  | 'auth/requires-recent-login'
  | 'auth/unknown';

// Auth error class
export class AuthError extends Error {
  constructor(public code: AuthErrorCode, message: string, public originalError?: any) {
    super(message);
    this.name = 'AuthError';
  }

  static from(error: any): AuthError {
    // Handle Firebase auth errors
    if (error?.code && error?.message) {
      return new AuthError(error.code as AuthErrorCode, error.message, error);
    }

    // If it's already an AuthError, return it
    if (error instanceof AuthError) {
      return error;
    }

    // Generic error
    return new AuthError(
      'auth/unknown',
      error?.message || 'An authentication error occurred',
      error,
    );
  }
}
