import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@/theme/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import type { RootStackParamList, TabParamList } from '@/types';

import { Text, View } from 'react-native';

// Import the showcase screens
import {
  AtomsShowcaseScreen,
  ComponentShowcaseScreen,
  GlassShowcaseScreen,
  ProfileScreen,
  WorkoutExampleScreen,
} from '@/screens';

// Placeholder screens - to be implemented
const PlaceholderScreen: React.FC<{ title: string }> = ({ title }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={{ color: theme.colors.text_primary }}>{title}</Text>
    </View>
  );
};

// Create navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

/**
 * Tab Navigator
 */
const TabNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = 'home';

          switch (route.name) {
            case 'HomeTab':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'ExercisesTab':
              iconName = focused ? 'barbell' : 'barbell-outline';
              break;
            case 'WorkoutsTab':
              iconName = focused ? 'diamond' : 'diamond-outline';
              break;
            case 'HistoryTab':
              iconName = focused ? 'layers' : 'layers-outline';
              break;
            case 'ProfileTab':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text_tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: theme.borders.widths.hairline,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={AtomsShowcaseScreen}
        options={{ title: 'Components' }}
      />
      <Tab.Screen
        name="ExercisesTab"
        component={WorkoutExampleScreen}
        options={{ title: 'Example' }}
      />
      <Tab.Screen name="WorkoutsTab" component={GlassShowcaseScreen} options={{ title: 'Glass' }} />
      <Tab.Screen
        name="HistoryTab"
        component={ComponentShowcaseScreen}
        options={{ title: 'Components V2' }}
      />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
};

/**
 * Root Navigator
 */
export const RootNavigator: React.FC = () => {
  const theme = useTheme();
  const { user, is_loading } = useAuth();

  // Show loading screen while checking auth
  if (is_loading) {
    return <PlaceholderScreen title="Loading..." />;
  }

  // Show auth screen if not logged in (this should not happen with auto-login)
  if (!user) {
    return <PlaceholderScreen title="Logging in..." />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: theme.borders.widths.hairline,
        },
        headerTintColor: theme.colors.text_primary,
        headerTitleStyle: {
          fontSize: theme.typography.heading_4.font_size,
          lineHeight: theme.typography.heading_4.font_size * theme.typography.heading_4.line_height,
          fontWeight: theme.typography.heading_4.font_weight,
          letterSpacing: theme.typography.heading_4.letter_spacing,
        },
        cardStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />

      {/* Detail Screens */}
      <Stack.Screen
        name="ExerciseDetail"
        component={() => <PlaceholderScreen title="Exercise Detail" />}
        options={{ title: 'Exercise' }}
      />
      <Stack.Screen
        name="WorkoutDetail"
        component={() => <PlaceholderScreen title="Workout Detail" />}
        options={{ title: 'Workout' }}
      />
      <Stack.Screen
        name="WorkoutBuilder"
        component={() => <PlaceholderScreen title="Workout Builder" />}
        options={{ title: 'Build Workout' }}
      />
      <Stack.Screen
        name="ActiveWorkout"
        component={() => <PlaceholderScreen title="Active Workout" />}
        options={{ headerShown: false }}
      />

      {/* Modal Screens */}
      <Stack.Screen
        name="ExerciseEditModal"
        component={() => <PlaceholderScreen title="Edit Exercise" />}
        options={{
          presentation: 'modal',
          title: 'Edit Exercise',
        }}
      />
      <Stack.Screen
        name="SetLoggerModal"
        component={() => <PlaceholderScreen title="Log Set" />}
        options={{
          presentation: 'modal',
          title: 'Log Set',
        }}
      />
      <Stack.Screen
        name="RestTimerModal"
        component={() => <PlaceholderScreen title="Rest Timer" />}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ExercisePickerModal"
        component={() => <PlaceholderScreen title="Pick Exercise" />}
        options={{
          presentation: 'modal',
          title: 'Add Exercise',
        }}
      />
    </Stack.Navigator>
  );
};
