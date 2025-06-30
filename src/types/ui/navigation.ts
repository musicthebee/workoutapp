import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

/**
 * Navigation type definitions
 * Ensures type-safe navigation throughout the app
 */

// Main stack navigator params
export type RootStackParamList = {
  readonly Tabs: NavigatorScreenParams<TabParamList>;
  readonly ExerciseDetail: { exercise_id: string };
  readonly WorkoutDetail: { workout_id: string };
  readonly WorkoutBuilder: { workout_id?: string };
  readonly ActiveWorkout: { workout_id?: string }; // Can start empty!
  readonly ExerciseEditModal: { 
    exercise_id?: string;
    workout_id?: string;
    onSave?: (exercise_id: string) => void;
  };
  readonly SetLoggerModal: {
    exercise_id: string;
    exercise_name: string;
    set_number: number;
    target_reps?: number;
    target_duration?: number;
    previous_weight?: number;
    onComplete: (performance: unknown) => void;
  };
  readonly RestTimerModal: {
    duration: number;
    next_exercise?: string;
    onSkip: () => void;
    onComplete: () => void;
  };
  readonly ExercisePickerModal: {
    workout_id?: string;
    onSelect: (exercise_id: string) => void;
  };
};

// Tab navigator params
export type TabParamList = {
  readonly HomeTab: undefined;
  readonly ExercisesTab: undefined;
  readonly WorkoutsTab: undefined;
  readonly HistoryTab: undefined;
  readonly ProfileTab: undefined;
};

// Screen prop types
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

// Navigation prop types for hooks
export type UseNavigationProp = RootStackScreenProps<keyof RootStackParamList>['navigation'];
export type UseRouteProp<T extends keyof RootStackParamList> = RootStackScreenProps<T>['route'];

// Modal presentation types
export type ModalPresentationStyle = 'modal' | 'push' | 'transparentModal';

// Screen transition types
export type ScreenTransition = 'default' | 'slide' | 'fade' | 'none';

// Navigation helpers
export const navigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  animationEnabled: true,
} as const;

export const modalOptions = {
  presentation: 'modal' as const,
  headerShown: true,
  gestureEnabled: true,
} as const;

export const tabBarOptions = {
  activeTintColor: undefined, // Will use theme
  inactiveTintColor: undefined, // Will use theme
  showLabel: true,
  style: undefined, // Will use theme
} as const;
