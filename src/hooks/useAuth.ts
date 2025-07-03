// src/hooks/useAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth.service';
import type { AuthState, AuthUser, SignInData, SignUpData, AuthError } from '@/types/auth';

/**
 * Primary auth hook for the application
 * Provides authentication state and methods throughout the app
 */
export function useAuth() {
  const [state, setState] = useState<AuthState>(() => authService.get_state());
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = authService.subscribe((newState) => {
      setState(newState);
      // Clear error on successful auth state change
      if (newState.is_authenticated) {
        setError(null);
      }
    });

    return unsubscribe;
  }, []);

  const sign_in = useCallback(async (data: SignInData): Promise<void> => {
    try {
      setError(null);
      await authService.sign_in(data);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    }
  }, []);

  const sign_up = useCallback(async (data: SignUpData): Promise<void> => {
    try {
      setError(null);
      await authService.sign_up(data);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    }
  }, []);

  const sign_out = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      await authService.sign_out();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    }
  }, []);

  const reset_password = useCallback(async (email: string): Promise<void> => {
    try {
      setError(null);
      await authService.reset_password(email);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    }
  }, []);

  const send_verification_email = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      await authService.send_verification_email();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError);
      throw authError;
    }
  }, []);

  return {
    // State
    user: state.user,
    is_authenticated: state.is_authenticated,
    is_loading: state.is_loading,
    is_initializing: state.is_initializing,
    error,
    
    // Auth methods
    sign_in,
    sign_up,
    sign_out,
    reset_password,
    send_verification_email,
    
    // Utility
    should_redirect: !state.is_initializing && !state.is_authenticated,
  };
}

/**
 * Hook to get auth token for API requests
 */
export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { is_authenticated } = useAuth();

  useEffect(() => {
    if (!is_authenticated) {
      setToken(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetch_token = async () => {
      try {
        const id_token = await authService.get_id_token();
        if (!cancelled) {
          setToken(id_token);
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          setToken(null);
          setLoading(false);
        }
      }
    };

    fetch_token();

    return () => {
      cancelled = true;
    };
  }, [is_authenticated]);

  return { token, loading };
}

/**
 * React Query-style login hook for compatibility
 * Wraps existing useAuth functionality with mutation-style API
 */
export function useLogin(): {
  mutate: (data: SignInData) => Promise<void>;
  isPending: boolean;
  error: AuthError | null;
} {
  const { sign_in, is_loading, error } = useAuth();
  
  const mutate = useCallback(async (data: SignInData): Promise<void> => {
    await sign_in(data);
  }, [sign_in]);

  return {
    mutate,
    isPending: is_loading,
    error,
  };
}
