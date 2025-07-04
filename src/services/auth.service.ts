// src/services/auth.service.ts
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import { doc, getFirestore, serverTimestamp, setDoc } from '@react-native-firebase/firestore';
import type { AuthState, AuthUser, SignInData, SignUpData } from '@/types/auth';
import { AuthError } from '@/types/auth';

type AuthStateListener = (state: AuthState) => void;

class AuthService {
  private current_state: AuthState = {
    user: null,
    is_loading: true,
    is_authenticated: false,
    is_initializing: true,
  };

  private listeners = new Set<AuthStateListener>();
  private unsubscribe_firebase?: () => void;
  private auth;
  private firestore;

  constructor() {
    console.log('AuthService: Starting initialization');
    try {
      this.auth = getAuth();
      this.firestore = getFirestore();
      this.initialize();
    } catch (error) {
      console.error('AuthService constructor error:', error);
      this.current_state = {
        user: null,
        is_loading: false,
        is_authenticated: false,
        is_initializing: false,
      };
    }
  }

  /**
   * Initialize Firebase auth listener
   */
  private initialize(): void {
    console.log('AuthService: Setting up auth state listener');
    try {
      this.unsubscribe_firebase = onAuthStateChanged(
        this.auth!,
        this.handle_auth_state_change.bind(this),
      );
      console.log('AuthService: Auth listener set up successfully');
    } catch (error) {
      console.error('AuthService: Failed to set up auth listener:', error);
      throw error;
    }
  }

  /**
   * Handle Firebase auth state changes
   */
  private async handle_auth_state_change(firebase_user: any): Promise<void> {
    try {
      if (firebase_user) {
        // Map Firebase user to our AuthUser type
        const user: AuthUser = {
          id: firebase_user.uid,
          email: firebase_user.email!,
          display_name: firebase_user.displayName || undefined,
          photo_url: firebase_user.photoURL || undefined,
          email_verified: firebase_user.emailVerified,
          created_at: firebase_user.metadata.creationTime
            ? new Date(firebase_user.metadata.creationTime)
            : new Date(),
          updated_at: firebase_user.metadata.lastSignInTime
            ? new Date(firebase_user.metadata.lastSignInTime)
            : new Date(),
        };

        this.update_state({
          user,
          is_authenticated: true,
          is_loading: false,
          is_initializing: false,
        });
      } else {
        this.update_state({
          user: null,
          is_authenticated: false,
          is_loading: false,
          is_initializing: false,
        });
      }
    } catch (error) {
      console.error('Error handling auth state change:', error);
      this.update_state({
        user: null,
        is_authenticated: false,
        is_loading: false,
        is_initializing: false,
      });
    }
  }

  /**
   * Update state and notify listeners
   */
  private update_state(partial_state: Partial<AuthState>): void {
    this.current_state = {
      ...this.current_state,
      ...partial_state,
    };
    this.notify_listeners();
  }

  /**
   * Notify all listeners of state change
   */
  private notify_listeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.current_state);
      } catch (error) {
        console.error('Error in auth state listener:', error);
      }
    });
  }

  /**
   * Subscribe to auth state changes
   */
  subscribe(listener: AuthStateListener): () => void {
    this.listeners.add(listener);

    // Immediately call with current state
    listener(this.current_state);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Get current auth state
   */
  get_state(): AuthState {
    return this.current_state;
  }

  /**
   * Get current user
   */
  get_current_user(): AuthUser | null {
    return this.current_state.user;
  }

  /**
   * Sign up with email and password
   */
  async sign_up(data: SignUpData): Promise<void> {
    try {
      this.update_state({ is_loading: true });

      // Create user with email and password
      const credential = await createUserWithEmailAndPassword(
        this.auth!,
        data.email,
        data.password,
      );

      // Update display name
      if (data.first_name || data.last_name) {
        const display_name = `${data.first_name || ''} ${data.last_name || ''}`.trim();
        await credential.user.updateProfile({
          displayName: display_name,
        });
      }

      // Create user profile in Firestore
      const userRef = doc(this.firestore!, 'users', credential.user.uid);
      await setDoc(userRef, {
        email: data.email,
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        display_name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });

      // Send verification email
      await sendEmailVerification(credential.user);

      // Auth state listener will handle the state update
    } catch (error: any) {
      this.update_state({ is_loading: false });
      throw this.map_firebase_error(error);
    }
  }

  /**
   * Sign in with email and password
   */
  async sign_in(data: SignInData): Promise<void> {
    try {
      this.update_state({ is_loading: true });

      await signInWithEmailAndPassword(this.auth!, data.email, data.password);

      // Auth state listener will handle the state update
    } catch (error: any) {
      this.update_state({ is_loading: false });
      throw this.map_firebase_error(error);
    }
  }

  /**
   * Sign out
   */
  async sign_out(): Promise<void> {
    try {
      this.update_state({ is_loading: true });
      await signOut(this.auth!);
      // Auth state listener will handle the state update
    } catch (error: any) {
      this.update_state({ is_loading: false });
      throw this.map_firebase_error(error);
    }
  }

  /**
   * Send password reset email
   */
  async reset_password(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth!, email);
    } catch (error: any) {
      throw this.map_firebase_error(error);
    }
  }

  /**
   * Verify email
   */
  async send_verification_email(): Promise<void> {
    try {
      const current_user = this.auth!.currentUser;
      if (!current_user) {
        throw new AuthError('auth/user-not-found', 'No user signed in');
      }

      await sendEmailVerification(current_user);
    } catch (error: any) {
      throw this.map_firebase_error(error);
    }
  }

  /**
   * Get ID token for API requests
   */
  async get_id_token(force_refresh = false): Promise<string | null> {
    try {
      const current_user = this.auth!.currentUser;
      if (!current_user) {
        return null;
      }

      return await current_user.getIdToken(force_refresh);
    } catch (error) {
      console.error('Failed to get ID token:', error);
      return null;
    }
  }

  /**
   * Get ID token with claims
   */
  async get_id_token_result(force_refresh = false): Promise<{
    token: string;
    claims: Record<string, any>;
  } | null> {
    try {
      const current_user = this.auth!.currentUser;
      if (!current_user) {
        return null;
      }

      const token_result = await current_user.getIdTokenResult(force_refresh);

      return {
        token: token_result.token,
        claims: token_result.claims,
      };
    } catch (error) {
      console.error('Failed to get ID token result:', error);
      return null;
    }
  }

  /**
   * Map Firebase errors to our AuthError type
   */
  private map_firebase_error(error: any): AuthError {
    const code = error?.code || 'auth/unknown';

    // Map Firebase error codes to user-friendly messages
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'An account with this email already exists',
      'auth/invalid-email': 'Please enter a valid email address',
      'auth/operation-not-allowed': 'Email/password accounts are not enabled',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/user-disabled': 'This account has been disabled',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later',
      'auth/network-request-failed': 'Network error. Please check your connection',
      'auth/invalid-credential': 'The email or password is incorrect',
      'auth/account-exists-with-different-credential':
        'An account already exists with the same email',
      'auth/requires-recent-login': 'Please sign in again to complete this action',
    };

    const message = errorMessages[code] || error?.message || 'An authentication error occurred';

    return new AuthError(code as any, message, error);
  }

  /**
   * Clean up service
   */
  destroy(): void {
    this.unsubscribe_firebase?.();
    this.listeners.clear();
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export for type checking
export type { AuthService };
