import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ApolloProvider } from '@/contexts/ApolloProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { RootNavigator } from '@/navigation/RootNavigator';

/**
 * Main application component
 * Sets up all providers in the correct order
 */
const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <ApolloProvider>
            <ThemeProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </ThemeProvider>
          </ApolloProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
