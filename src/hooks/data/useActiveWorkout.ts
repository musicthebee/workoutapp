// src/hooks/data/useActiveWorkout.ts
import { useCallback, useMemo } from 'react';

import {
  useActiveWorkoutStore,
  useCurrentExercise,
  useIsWorkoutActive,
  useWorkoutProgress,
} from '@/store/activeWorkout';
import type {
  UUID,
  SetPerformance,
  ActiveExercise,
  WorkoutState,
} from '@/types';

/**
 * Main hook for active workout management
 * Provides all functionality needed during a workout session
 */
export const useActiveWorkout = () => {
  // Select state from store
  const {
    session,
    performance_id,
    is_loading,
    is_saving,
    error,
    rest_timer_seconds,
    is_timer_running,
    start_workout,
    start_empty_workout,
    pause_workout,
    resume_workout,
    end_workout,
    complete_workout,
    add_exercise_during_workout,
    skip_exercise,
    log_set,
    complete_current_set,
    go_to_next_exercise,
    go_to_previous_exercise,
    start_rest_timer,
    pause_rest_timer,
    resume_rest_timer,
    skip_rest_timer,
    add_rest_time,
    clear_error,
  } = useActiveWorkoutStore();

  // Use selector hooks - TEMPORARILY DISABLED
  // const current_exercise = useCurrentExercise();
  // const is_active = useIsWorkoutActive();
  // const progress = useWorkoutProgress();
  
  // Mock for now
  const current_exercise = null;
  const is_active = false;
  const progress = { current: 0, total: 0, percentage: 0 };

  // Calculate session duration
  const session_duration = useMemo(() => {
    if (!session) return 0;
    const now = new Date();
    const diff = now.getTime() - session.startTime.getTime();
    return Math.floor(diff / 1000); // seconds
  }, [session]);

  // Format timer display
  const rest_timer_display = useMemo(() => {
    const minutes = Math.floor(rest_timer_seconds / 60);
    const seconds = rest_timer_seconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [rest_timer_seconds]);

  // Get previous set data for reference
  const previous_set = useMemo(() => {
    if (!current_exercise || current_exercise.completedSets.length === 0) {
      return null;
    }
    return current_exercise.completedSets[current_exercise.completedSets.length - 1];
  }, [current_exercise]);

  // Can navigate checks
  const can_go_previous = session ? session.currentExerciseIndex > 0 : false;
  const can_go_next = session ? session.currentExerciseIndex < session.exercises.length - 1 : false;
  const can_add_exercise = session ? ['preparing', 'active', 'rest'].includes(session.state) : false;

  // Enhanced log set with validation
  const log_set_performance = useCallback((performance: SetPerformance) => {
    if (!current_exercise) {
      console.error('No current exercise to log set for');
      return;
    }
    
    // Validate based on measurement type
    if (current_exercise.measurement_type === 'reps' && !performance.reps) {
      console.warn('Reps required for rep-based exercise');
    } else if (current_exercise.measurement_type === 'duration' && !performance.duration) {
      console.warn('Duration required for time-based exercise');
    }
    
    log_set(performance);
  }, [current_exercise, log_set]);

  // Quick complete set with defaults
  const quick_complete_set = useCallback((
    reps?: number,
    weight?: number
  ) => {
    if (!current_exercise) return;
    
    const performance: SetPerformance = {
      reps: reps || current_exercise.currentSet?.targetReps,
      weight: weight || previous_set?.weight,
      completed: true,
    };
    
    log_set_performance(performance);
  }, [current_exercise, previous_set, log_set_performance]);

  // Add exercise with smart defaults
  const add_exercise = useCallback(async (exercise_id: UUID) => {
    if (!can_add_exercise) {
      console.warn('Cannot add exercise in current state');
      return;
    }
    
    await add_exercise_during_workout(exercise_id);
  }, [can_add_exercise, add_exercise_during_workout]);

  // Complete workout with validation
  const finish_workout = useCallback(async (notes?: string) => {
    if (!session || session.completedSets === 0) {
      const confirm = window.confirm(
        'No sets completed. Are you sure you want to end this workout?'
      );
      if (!confirm) return;
    }
    
    await complete_workout(notes);
  }, [session, complete_workout]);

  // State helpers
  const is_resting = session?.state === 'rest';
  const is_paused = session?.state === 'paused';
  const is_preparing = session?.state === 'preparing';
  const is_complete = session?.state === 'complete';
  const is_performing = session?.state === 'active';

  return {
    // Session data
    session,
    current_exercise,
    previous_set,
    is_active,
    progress,
    session_duration,
    
    // State flags
    is_resting,
    is_paused,
    is_preparing,
    is_complete,
    is_performing,
    
    // Loading/error states
    is_loading,
    is_saving,
    error,
    
    // Timer
    rest_timer_seconds,
    rest_timer_display,
    is_timer_running,
    
    // Navigation state
    can_go_previous,
    can_go_next,
    can_add_exercise,
    
    // Session actions
    start_workout,
    start_empty_workout,
    pause_workout,
    resume_workout,
    end_workout,
    complete_workout: finish_workout,
    
    // Exercise actions
    add_exercise,
    skip_exercise,
    go_to_next_exercise,
    go_to_previous_exercise,
    
    // Set actions
    log_set: log_set_performance,
    quick_complete_set,
    complete_current_set,
    
    // Timer actions
    start_rest_timer,
    pause_rest_timer,
    resume_rest_timer,
    skip_rest_timer,
    add_rest_time,
    
    // Utility
    clear_error,
  };
};

/**
 * Hook for the set logger modal
 * Provides focused interface for logging a single set
 */
export const useSetLogger = (exercise: ActiveExercise | null) => {
  const { log_set, previous_set } = useActiveWorkout();
  
  const [reps, set_reps] = React.useState<number | null>(null);
  const [weight, set_weight] = React.useState<number | null>(null);
  const [duration, set_duration] = React.useState<number | null>(null);
  const [notes, set_notes] = React.useState('');
  
  // Initialize with defaults
  React.useEffect(() => {
    if (exercise) {
      set_reps(exercise.currentSet?.targetReps || previous_set?.reps || null);
      set_weight(previous_set?.weight || null);
      set_duration(exercise.currentSet?.targetDuration || null);
    }
  }, [exercise, previous_set]);
  
  // Quick rep selections
  const quick_reps = useMemo(() => {
    if (!exercise?.currentSet?.targetReps) return [];
    const target = exercise.currentSet.targetReps;
    return [
      target - 2,
      target - 1,
      target,
      target + 1,
      target + 2,
    ].filter(r => r > 0);
  }, [exercise]);
  
  // Quick weight adjustments
  const quick_weights = useMemo(() => {
    if (!weight) return [];
    return [
      { label: '-5', value: weight - 5 },
      { label: 'Same', value: weight },
      { label: '+5', value: weight + 5 },
    ].filter(w => w.value > 0);
  }, [weight]);
  
  const handle_complete = useCallback(() => {
    if (!exercise) return;
    
    const performance: SetPerformance = {
      reps: exercise.measurement_type === 'reps' ? reps : undefined,
      weight: weight || undefined,
      duration: exercise.measurement_type === 'duration' ? duration : undefined,
      completed: true,
      notes: notes || undefined,
    };
    
    log_set(performance);
  }, [exercise, reps, weight, duration, notes, log_set]);
  
  const handle_failed = useCallback(() => {
    if (!exercise) return;
    
    const performance: SetPerformance = {
      reps: reps || 0,
      weight: weight || undefined,
      completed: false,
      notes: notes || 'Failed set',
    };
    
    log_set(performance);
  }, [exercise, reps, weight, notes, log_set]);
  
  return {
    // Form state
    reps,
    set_reps,
    weight,
    set_weight,
    duration,
    set_duration,
    notes,
    set_notes,
    
    // Quick selections
    quick_reps,
    quick_weights,
    
    // Actions
    handle_complete,
    handle_failed,
    
    // Validation
    can_complete: exercise?.measurement_type === 'reps' 
      ? reps !== null && reps > 0
      : duration !== null && duration > 0,
  };
};

/**
 * Hook for rest timer functionality
 * Can be used in rest screen or inline timer display
 */
export const useRestTimer = () => {
  const {
    rest_timer_seconds,
    rest_timer_display,
    is_timer_running,
    start_rest_timer,
    pause_rest_timer,
    resume_rest_timer,
    skip_rest_timer,
    add_rest_time,
  } = useActiveWorkout();
  
  const add_30_seconds = useCallback(() => {
    add_rest_time(30);
  }, [add_rest_time]);
  
  const subtract_30_seconds = useCallback(() => {
    add_rest_time(-30);
  }, [add_rest_time]);
  
  return {
    seconds: rest_timer_seconds,
    display: rest_timer_display,
    is_running: is_timer_running,
    start: start_rest_timer,
    pause: pause_rest_timer,
    resume: resume_rest_timer,
    skip: skip_rest_timer,
    add_30_seconds,
    subtract_30_seconds,
  };
};
