// src/store/activeWorkout/index.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { 
  UUID,
  ActiveWorkout,
  ActiveExercise,
  ActiveSetPerformance,
  CompleteWorkoutInput,
} from '@/types';
import type { WorkoutExercise, Exercise } from '@/types/database/models';
import { authService } from '@/services/auth.service';
import { mockApi } from '@/services/mockApi';
import { orderingHelpers } from '@/types/utils/ordering';
import { useExerciseStore } from '../exercise';
import { useWorkoutStore } from '../workout';

// Store state interface
interface ActiveWorkoutState {
  // Current session
  session: ActiveWorkout | null;
  performance_id: UUID | null;
  
  // UI state
  is_loading: boolean;
  is_saving: boolean;
  error: string | null;
  
  // Timer state
  rest_timer_seconds: number;
  is_timer_running: boolean;
  timer_interval_id: NodeJS.Timeout | null;
}

// Store actions interface
interface ActiveWorkoutActions {
  // Session management
  start_workout: (workout_id?: UUID) => Promise<void>;
  start_empty_workout: () => Promise<void>;
  pause_workout: () => void;
  resume_workout: () => void;
  end_workout: () => void;
  complete_workout: (notes?: string) => Promise<void>;
  
  // Exercise management (living workouts!)
  add_exercise_during_workout: (exercise_id: UUID) => Promise<void>;
  skip_exercise: () => void;
  
  // Set management
  log_set: (performance: ActiveSetPerformance) => void;
  update_set: (set_index: number, performance: ActiveSetPerformance) => void;
  complete_current_set: () => void;
  
  // Navigation
  go_to_next_exercise: () => void;
  go_to_previous_exercise: () => void;
  
  // Timer management
  start_rest_timer: (seconds: number) => void;
  pause_rest_timer: () => void;
  resume_rest_timer: () => void;
  skip_rest_timer: () => void;
  add_rest_time: (seconds: number) => void;
  
  // Utility
  clear_error: () => void;
}

// Combined store type
export type ActiveWorkoutStore = ActiveWorkoutState & ActiveWorkoutActions;

// Initial state
const initial_state: ActiveWorkoutState = {
  session: null,
  performance_id: null,
  is_loading: false,
  is_saving: false,
  error: null,
  rest_timer_seconds: 0,
  is_timer_running: false,
  timer_interval_id: null,
};

// Helper to create active exercise from workout exercise
const createActiveExercise = (
  workout_exercise: WorkoutExercise,
  exercise_data: Exercise
): ActiveExercise => ({
  exercise_id: workout_exercise.exercise_id,
  exerciseName: exercise_data.name,
  exercise_order: workout_exercise.exercise_order,
  instructions: exercise_data.instructions,
  measurement_type: exercise_data.measurement_type,
  sets: workout_exercise.sets,
  completedSets: [],
  currentSet: {
    setNumber: 1,
    targetReps: workout_exercise.reps || undefined,
    targetDuration: workout_exercise.duration || undefined,
    restDuration: workout_exercise.rest,
  },
});

// Create the store
export const useActiveWorkoutStore = create<ActiveWorkoutStore>()(
  devtools(
    immer((set, get) => ({
      // State
      ...initial_state,
      
      // Start workout from template
      start_workout: async (workout_id?: UUID) => {
        set(state => {
          state.is_loading = true;
          state.error = null;
        });
        
        try {
          const current_user = authService.get_current_user();
          if (!current_user) {
            throw new Error('User not authenticated');
          }
          const user_id = current_user.id;
          
          let exercises: ActiveExercise[] = [];
          let workoutName = 'Quick Workout';
          
          if (workout_id) {
            // Get workout data
            const workout = useWorkoutStore.getState().workouts.get(workout_id);
            const workout_exercises = useWorkoutStore.getState().workout_exercises.get(workout_id) || [];
            
            if (!workout) {
              throw new Error('Workout not found');
            }
            
            workoutName = workout.name;
            
            // Denormalize exercises for performance during workout
            exercises = workout_exercises.map(we => {
              const exercise_data = useExerciseStore.getState().exercises.get(we.exercise_id);
              if (!exercise_data) {
                throw new Error(`Exercise ${we.exercise_id} not found`);
              }
              return createActiveExercise(we, exercise_data);
            });
          }
          
          // Start performance tracking
          const performance = await mockApi.startWorkoutPerformance(user_id, workout_id || 'empty');
          
          // Create active session
          const session: ActiveWorkout = {
            workout_id: workout_id || 'empty',
            workoutName,
            startTime: new Date(),
            state: exercises.length > 0 ? 'warmup' : 'preparing',
            exercises,
            currentExerciseIndex: 0,
            currentSetIndex: 0,
            totalSets: exercises.reduce((sum, ex) => sum + ex.sets, 0),
            completedSets: 0,
            estimatedTimeRemaining: 0, // TODO: Calculate
          };
          
          set(state => {
            state.session = session as any;
            state.performance_id = performance.id;
            state.is_loading = false;
          });
        } catch (error) {
          set(state => {
            state.is_loading = false;
            state.error = error instanceof Error ? error.message : 'Failed to start workout';
          });
        }
      },
      
      // Start empty workout
      start_empty_workout: async () => {
        await get().start_workout();
      },
      
      // Add exercise during workout (Living workouts!)
      add_exercise_during_workout: async (exercise_id: UUID) => {
        const session = get().session;
        if (!session) return;
        
        set(state => {
          state.is_loading = true;
          state.error = null;
        });
        
        try {
          // Get exercise data
          const exercise_data = useExerciseStore.getState().exercises.get(exercise_id);
          if (!exercise_data) {
            throw new Error('Exercise not found');
          }
          
          // Calculate order for new exercise
          const new_order = orderingHelpers.getOrderForAppend(session.exercises);
          
          // Create active exercise
          const new_exercise: ActiveExercise = createActiveExercise(
            {
              workout_id: session.workout_id,
              exercise_id,
              exercise_order: new_order,
              sets: exercise_data.default_sets,
              reps: exercise_data.default_reps,
              duration: exercise_data.default_duration,
              rest: exercise_data.default_rest,
              notes: null,
              created_at: new Date().toISOString(),
            },
            exercise_data
          );
          
          // Add to session
          set(state => {
            if (state.session) {
              (state.session.exercises as any).push(new_exercise);
              state.session.totalSets += new_exercise.sets;
              
              // If this is the first exercise, move to active state
              if (state.session.exercises.length === 1) {
                state.session.state = 'active';
              }
            }
            state.is_loading = false;
          });
          
          // Also update the source workout if not ephemeral
          if (session.workout_id !== 'empty') {
            await useWorkoutStore.getState().add_exercise_to_workout(
              session.workout_id,
              exercise_id,
              {
                sets: exercise_data.default_sets,
                reps: exercise_data.default_reps,
                duration: exercise_data.default_duration,
                rest: exercise_data.default_rest,
              }
            );
          }
        } catch (error) {
          set(state => {
            state.is_loading = false;
            state.error = error instanceof Error ? error.message : 'Failed to add exercise';
          });
        }
      },
      
      // Log set performance
      log_set: (performance: ActiveSetPerformance) => {
        set(state => {
          if (!state.session || state.session.state !== 'active') return;
          
          const current_exercise = state.session.exercises[state.session.currentExerciseIndex];
          if (!current_exercise) return;
          
          // Add to completed sets
          current_exercise.completedSets.push(performance);
          state.session.completedSets += 1;
          
          // Update current set
          if (current_exercise.completedSets.length < current_exercise.sets) {
            current_exercise.currentSet = {
              setNumber: current_exercise.completedSets.length + 1,
              targetReps: current_exercise.currentSet?.targetReps,
              targetDuration: current_exercise.currentSet?.targetDuration,
              restDuration: current_exercise.currentSet?.restDuration || 90,
            };
            
            // Start rest timer if set was completed
            if (performance.completed) {
              state.session.state = 'rest';
              get().start_rest_timer(current_exercise.currentSet.restDuration);
            }
          } else {
            // Exercise complete, move to next
            current_exercise.currentSet = null;
            get().go_to_next_exercise();
          }
        });
      },
      
      // Complete current set
      complete_current_set: () => {
        const session = get().session;
        if (!session || session.state !== 'active') return;
        
        const current_exercise = session.exercises[session.currentExerciseIndex];
        if (!current_exercise || !current_exercise.currentSet) return;
        
        // Create default performance (user didn't log specific values)
        const performance: ActiveSetPerformance = {
          reps: current_exercise.currentSet.targetReps,
          completed: true,
        };
        
        get().log_set(performance);
      },
      
      // Navigation
      go_to_next_exercise: () => {
        set(state => {
          if (!state.session) return;
          
          if (state.session.currentExerciseIndex < state.session.exercises.length - 1) {
            state.session.currentExerciseIndex += 1;
            state.session.currentSetIndex = 0;
            state.session.state = 'active';
          } else {
            // Workout complete
            state.session.state = 'complete';
          }
        });
      },
      
      go_to_previous_exercise: () => {
        set(state => {
          if (!state.session) return;
          
          if (state.session.currentExerciseIndex > 0) {
            state.session.currentExerciseIndex -= 1;
            state.session.currentSetIndex = 0;
            state.session.state = 'active';
          }
        });
      },
      
      skip_exercise: () => {
        get().go_to_next_exercise();
      },
      
      // Rest timer management
      start_rest_timer: (seconds: number) => {
        // Clear any existing timer
        const existing_timer = get().timer_interval_id;
        if (existing_timer) {
          clearInterval(existing_timer);
        }
        
        set(state => {
          state.rest_timer_seconds = seconds;
          state.is_timer_running = true;
        });
        
        // Start countdown
        const interval = setInterval(() => {
          const current = get().rest_timer_seconds;
          
          if (current <= 1) {
            // Timer complete
            get().skip_rest_timer();
          } else {
            set(state => {
              state.rest_timer_seconds = current - 1;
            });
          }
        }, 1000);
        
        set(state => {
          state.timer_interval_id = interval;
        });
      },
      
      pause_rest_timer: () => {
        const timer = get().timer_interval_id;
        if (timer) {
          clearInterval(timer);
        }
        
        set(state => {
          state.is_timer_running = false;
          state.timer_interval_id = null;
        });
      },
      
      resume_rest_timer: () => {
        if (!get().is_timer_running && get().rest_timer_seconds > 0) {
          get().start_rest_timer(get().rest_timer_seconds);
        }
      },
      
      skip_rest_timer: () => {
        const timer = get().timer_interval_id;
        if (timer) {
          clearInterval(timer);
        }
        
        set(state => {
          state.rest_timer_seconds = 0;
          state.is_timer_running = false;
          state.timer_interval_id = null;
          
          if (state.session && state.session.state === 'rest') {
            state.session.state = 'active';
          }
        });
      },
      
      add_rest_time: (seconds: number) => {
        set(state => {
          state.rest_timer_seconds += seconds;
        });
      },
      
      // Session control
      pause_workout: () => {
        set(state => {
          if (state.session) {
            state.session.state = 'paused';
          }
        });
        get().pause_rest_timer();
      },
      
      resume_workout: () => {
        set(state => {
          if (state.session && state.session.state === 'paused') {
            state.session.state = 'active';
          }
        });
      },
      
      end_workout: () => {
        // Clean up timers
        const timer = get().timer_interval_id;
        if (timer) {
          clearInterval(timer);
        }
        
        set(state => {
          state.session = null;
          state.performance_id = null;
          state.rest_timer_seconds = 0;
          state.is_timer_running = false;
          state.timer_interval_id = null;
        });
      },
      
      // Complete and save workout
      complete_workout: async (notes?: string) => {
        const session = get().session;
        const performance_id = get().performance_id;
        
        if (!session || !performance_id) return;
        
        set(state => {
          state.is_saving = true;
          state.error = null;
        });
        
        try {
          // Build performance data
          const performance_data: Omit<CompleteWorkoutInput, 'workout_performance_id'> = {
            completed_at: new Date().toISOString(),
            notes: notes || null,
            exercise_performances: session.exercises
              .filter(ex => ex.completedSets.length > 0)
              .map(ex => ({
                exercise_id: ex.exercise_id,
                exercise_name: ex.exerciseName,
                exercise_order: ex.exercise_order,
                set_performances: ex.completedSets as any,
              })),
          };
          
          await mockApi.completeWorkoutPerformance(performance_id, performance_data);
          
          // Clear session
          get().end_workout();
          
          set(state => {
            state.is_saving = false;
          });
        } catch (error) {
          set(state => {
            state.is_saving = false;
            state.error = error instanceof Error ? error.message : 'Failed to save workout';
          });
        }
      },
      
      // Update set (for editing)
      update_set: (set_index: number, performance: ActiveSetPerformance) => {
        set(state => {
          if (!state.session) return;
          
          const current_exercise = state.session.exercises[state.session.currentExerciseIndex];
          if (!current_exercise || !current_exercise.completedSets[set_index]) return;
          
          current_exercise.completedSets[set_index] = performance;
        });
      },
      
      // Utility
      clear_error: () => {
        set(state => {
          state.error = null;
        });
      },
    })),
    {
      name: 'active-workout-store',
    }
  )
);

// Selector hooks
export const useCurrentExercise = (): ActiveExercise | null => {
  return useActiveWorkoutStore(state => {
    if (!state.session) return null;
    return state.session.exercises[state.session.currentExerciseIndex] || null;
  });
};

export const useIsWorkoutActive = (): boolean => {
  return useActiveWorkoutStore(state => state.session !== null);
};

export const useWorkoutProgress = (): { current: number; total: number; percentage: number } => {
  return useActiveWorkoutStore(state => {
    if (!state.session) return { current: 0, total: 0, percentage: 0 };
    
    const current = state.session.completedSets;
    const total = state.session.totalSets;
    const percentage = total > 0 ? (current / total) * 100 : 0;
    
    return { current, total, percentage };
  });
};
