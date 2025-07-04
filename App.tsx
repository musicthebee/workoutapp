// App.tsx
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApolloProvider } from '@/contexts/ApolloProvider';
// Firebase Auth - no provider needed
import { ThemeProvider } from '@/contexts/ThemeContext';
import { GlassVariantProvider } from '@/contexts/GlassVariantContext';
import { RootNavigator } from '@/navigation/RootNavigator';
import { useAuth } from '@/hooks/useAuth';

// Import auth screens
import { NexAISplashScreen } from '@/screens/auth/NexAISplashScreen';
import { NexAILoginScreen } from '@/screens/auth/NexAILoginScreen';
import { NexAIRegisterScreen } from '@/screens/auth/NexAIRegisterScreen';
import { NexAIForgotPasswordScreen } from '@/screens/auth/NexAIForgotPasswordScreen';

type AuthState = 'splash' | 'login' | 'register' | 'forgot-password' | 'authenticated';

/**
 * Auth Flow Component
 * Manages the authentication flow and screen transitions
 */
const AuthFlow: React.FC = () => {
  const { user, is_loading } = useAuth();
  const [authState, setAuthState] = useState<AuthState>('splash');
  const [showSplash, setShowSplash] = useState(true);

  // Update auth state when authentication changes
  useEffect(() => {
    if (!is_loading && !showSplash) {
      if (user) {
        setAuthState('authenticated');
      } else if (authState === 'authenticated') {
        // User logged out, go back to login
        setAuthState('login');
      }
    }
  }, [user, is_loading, showSplash, authState]);

  // Handle splash screen completion
  const handleSplashComplete = (): void => {
    setShowSplash(false);
    if (user) {
      setAuthState('authenticated');
    } else {
      setAuthState('login');
    }
  };

  // Always show splash screen initially
  if (showSplash) {
    return <NexAISplashScreen onAnimationComplete={handleSplashComplete} />;
  }

  // Show authentication screens
  if (!user && authState !== 'authenticated') {
    switch (authState) {
      case 'login':
        return (
          <NexAILoginScreen
            onForgotPassword={() => setAuthState('forgot-password')}
            onRegister={() => setAuthState('register')}
          />
        );

      case 'register':
        return <NexAIRegisterScreen onLogin={() => setAuthState('login')} />;

      case 'forgot-password':
        return <NexAIForgotPasswordScreen onBackToLogin={() => setAuthState('login')} />;

      default:
        return (
          <NexAILoginScreen
            onForgotPassword={() => setAuthState('forgot-password')}
            onRegister={() => setAuthState('register')}
          />
        );
    }
  }

  // Show main app navigation
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

/**
 * Main application component
 * Sets up all providers in the correct order
 */
const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ApolloProvider>
          <ThemeProvider>
            <GlassVariantProvider>
              <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
              <AuthFlow />
            </GlassVariantProvider>
          </ThemeProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
