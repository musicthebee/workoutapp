// src/store/workout/index.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { 
  Workout,
  WorkoutExercise,
  UUID, 
  WorkoutFilters,
  CreateWorkoutInput,
  UpdateWorkoutInput,
  AddExerciseToWorkoutInput,
  ApiError,
} from '@/types';
import { mockApi } from '@/services/mockApi';
import { createEmptyWorkoutFilters } from '@/types/business/filters';
import { orderingHelpers } from '@/types/utils/ordering';

// Store state interface
interface WorkoutState {
  // Data - normalized structure
  workouts: Map<UUID, Workout>;
  workout_exercises: Map<UUID, WorkoutExercise[]>; // workout_id -> exercises
  
  // UI State
  filters: WorkoutFilters;
  search_query: string;
  
  // Loading states
  is_loading: boolean;
  is_creating: boolean;
  is_updating: boolean;
  
  // Error handling
  error: ApiError | null;
  
  // Cache management
  last_fetch: number | null;
  cache_duration: number;
}

// Store actions interface
interface WorkoutActions {
  // Fetch operations
  fetch_workouts: () => Promise<void>;
  fetch_workout_by_id: (id: UUID) => Promise<Workout | undefined>;
  
  // CRUD operations
  create_workout: (input: CreateWorkoutInput) => Promise<Workout>;
  update_workout: (id: UUID, updates: UpdateWorkoutInput) => Promise<Workout>;
  copy_from_library: (library_workout_id: UUID) => Promise<Workout>;
  toggle_favorite: (id: UUID) => Promise<void>;
  archive_workout: (id: UUID) => Promise<void>;
  
  // Exercise management (living workouts!)
  add_exercise_to_workout: (workout_id: UUID, exercise_id: UUID, config?: Partial<AddExerciseToWorkoutInput>) => Promise<void>;
  update_workout_exercise: (workout_id: UUID, exercise_id: UUID, updates: Partial<WorkoutExercise>) => Promise<void>;
  remove_exercise_from_workout: (workout_id: UUID, exercise_id: UUID) => Promise<void>;
  reorder_exercises: (workout_id: UUID, exercises: WorkoutExercise[]) => Promise<void>;
  
  // Filter operations
  set_filter: <K extends keyof WorkoutFilters>(key: K, value: WorkoutFilters[K]) => void;
  reset_filters: () => void;
  set_search: (query: string) => void;
  
  // Utility
  clear_error: () => void;
  invalidate_cache: () => void;
}

// Combined store type
export type WorkoutStore = WorkoutState & WorkoutActions;

// Initial state
const initial_state: WorkoutState = {
  workouts: new Map(),
  workout_exercises: new Map(),
  filters: createEmptyWorkoutFilters(),
  search_query: '',
  is_loading: false,
  is_creating: false,
  is_updating: false,
  error: null,
  last_fetch: null,
  cache_duration: 5 * 60 * 1000, // 5 minutes
};

// Create the store
export const useWorkoutStore = create<WorkoutStore>()(
  devtools(
    immer((set, get) => ({
      // State
      ...initial_state,
      
      // Fetch all workouts
      fetch_workouts: async () => {
        const state = get();
        
        // Check cache
        if (
          state.last_fetch && 
          Date.now() - state.last_fetch < state.cache_duration &&
          state.workouts.size > 0
        ) {
          return;
        }
        
        set(state => {
          state.is_loading = true;
          state.error = null;
        });
        
        try {
          const user_id = 'user_123'; // TODO: Get from auth
          const workouts = await mockApi.getWorkouts(user_id);
          
          set(state => {
            // Clear existing data
            state.workouts.clear();
            state.workout_exercises.clear();
            
            // Populate normalized data
            workouts.forEach(workout => {
              state.workouts.set(workout.id, {
                ...workout,
                workout_exercises: [], // Don't store exercises in workout
              });
              
              // Store exercises separately
              state.workout_exercises.set(workout.id, workout.workout_exercises);
            });
            
            state.is_loading = false;
            state.last_fetch = Date.now();
          });
        } catch (error) {
          set(state => {
            state.is_loading = false;
            state.error = {
              code: 'FETCH_ERROR',
              message: error instanceof Error ? error.message : 'Failed to fetch workouts',
            };
          });
        }
      },
      
      // Fetch single workout
      fetch_workout_by_id: async (id: UUID) => {
        const existing = get().workouts.get(id);
        if (existing && get().workout_exercises.has(id)) return existing;
        
        try {
          const workout = await mockApi.getWorkoutById(id);
          
          set(state => {
            state.workouts.set(id, {
              ...workout,
              workout_exercises: [],
            });
            state.workout_exercises.set(id, workout.workout_exercises);
          });
          
          return workout;
        } catch (error) {
          set(state => {
            state.error = {
              code: 'FETCH_ERROR',
              message: `Failed to fetch workout ${id}`,
            };
          });
          return undefined;
        }
      },
      
      // Create new workout
      create_workout: async (input: CreateWorkoutInput) => {
        set(state => {
          state.is_creating = true;
          state.error = null;
        });
        
        try {
          const created = await mockApi.createWorkout(input);
          
          set(state => {
            state.workouts.set(created.id, {
              ...created,
              workout_exercises: [],
            });
            state.workout_exercises.set(created.id, created.workout_exercises);
            state.is_creating = false;
          });
          
          return created;
        } catch (error) {
          set(state => {
            state.is_creating = false;
            state.error = {
              code: 'CREATE_ERROR',
              message: error instanceof Error ? error.message : 'Failed to create workout',
            };
          });
          throw error;
        }
      },
      
      // Update workout
      update_workout: async (id: UUID, updates: UpdateWorkoutInput) => {
        const original = get().workouts.get(id);
        if (!original) {
          throw new Error('Workout not found');
        }
        
        // Optimistic update
        set(state => {
          const workout = state.workouts.get(id);
          if (workout) {
            state.workouts.set(id, { ...workout, ...updates });
          }
          state.is_updating = true;
          state.error = null;
        });
        
        try {
          const updated = await mockApi.updateWorkout(id, updates);
          
          set(state => {
            state.workouts.set(id, {
              ...updated,
              workout_exercises: [],
            });
            state.is_updating = false;
          });
          
          return updated;
        } catch (error) {
          // Rollback
          set(state => {
            state.workouts.set(id, original);
            state.is_updating = false;
            state.error = {
              code: 'UPDATE_ERROR',
              message: error instanceof Error ? error.message : 'Failed to update workout',
            };
          });
          throw error;
        }
      },
      
      // Copy from library
      copy_from_library: async (library_workout_id: UUID) => {
        set(state => {
          state.is_creating = true;
          state.error = null;
        });
        
        try {
          const user_id = 'user_123'; // TODO: Get from auth
          
          // This would handle smart exercise copying in real implementation
          const library_workout = get().workouts.get(library_workout_id);
          if (!library_workout) {
            throw new Error('Library workout not found');
          }
          
          // Create copy
          const input: CreateWorkoutInput = {
            user_id,
            source_id: library_workout_id,
            name: `${library_workout.name} (Copy)`,
            description: library_workout.description,
            category: library_workout.category,
            difficulty: library_workout.difficulty,
            estimated_duration_minutes: library_workout.estimated_duration_minutes,
            exercises: get().workout_exercises.get(library_workout_id)?.map(we => ({
              exercise_id: we.exercise_id,
              exercise_order: we.exercise_order,
              sets: we.sets,
              reps: we.reps,
              duration_seconds: we.duration_seconds,
              rest_seconds: we.rest_seconds,
            })),
          };
          
          const copied = await mockApi.createWorkout(input);
          
          set(state => {
            state.workouts.set(copied.id, {
              ...copied,
              workout_exercises: [],
            });
            state.workout_exercises.set(copied.id, copied.workout_exercises);
            state.is_creating = false;
          });
          
          return copied;
        } catch (error) {
          set(state => {
            state.is_creating = false;
            state.error = {
              code: 'COPY_ERROR',
              message: error instanceof Error ? error.message : 'Failed to copy workout',
            };
          });
          throw error;
        }
      },
      
      // Add exercise to workout (Living workouts!)
      add_exercise_to_workout: async (workout_id: UUID, exercise_id: UUID, config) => {
        const exercises = get().workout_exercises.get(workout_id) || [];
        const exercise_order = orderingHelpers.getOrderForAppend(exercises);
        
        const new_exercise: WorkoutExercise = {
          workout_id,
          exercise_id,
          exercise_order,
          sets: config?.sets || 3,
          reps: config?.reps || null,
          duration_seconds: config?.duration_seconds || null,
          rest_seconds: config?.rest_seconds || 90,
        };
        
        // Optimistic update
        set(state => {
          const current = state.workout_exercises.get(workout_id) || [];
          state.workout_exercises.set(workout_id, [...current, new_exercise]);
        });
        
        try {
          await mockApi.addExerciseToWorkout(
            workout_id,
            exercise_id,
            exercise_order,
            {
              sets: new_exercise.sets,
              reps: new_exercise.reps,
              duration_seconds: new_exercise.duration_seconds,
              rest_seconds: new_exercise.rest_seconds,
            }
          );
        } catch (error) {
          // Rollback
          set(state => {
            state.workout_exercises.set(workout_id, exercises);
            state.error = {
              code: 'ADD_EXERCISE_ERROR',
              message: 'Failed to add exercise to workout',
            };
          });
          throw error;
        }
      },
      
      // Update exercise in workout
      update_workout_exercise: async (workout_id: UUID, exercise_id: UUID, updates: Partial<WorkoutExercise>) => {
        const exercises = get().workout_exercises.get(workout_id) || [];
        const index = exercises.findIndex(e => e.exercise_id === exercise_id);
        
        if (index === -1) {
          throw new Error('Exercise not found in workout');
        }
        
        const original = [...exercises];
        
        // Optimistic update
        set(state => {
          const current = state.workout_exercises.get(workout_id) || [];
          current[index] = { ...current[index]!, ...updates };
          state.workout_exercises.set(workout_id, [...current]);
        });
        
        try {
          // API call would go here
          // await mockApi.updateWorkoutExercise(workout_id, exercise_id, updates);
        } catch (error) {
          // Rollback
          set(state => {
            state.workout_exercises.set(workout_id, original);
            state.error = {
              code: 'UPDATE_EXERCISE_ERROR',
              message: 'Failed to update exercise in workout',
            };
          });
          throw error;
        }
      },
      
      // Remove exercise from workout
      remove_exercise_from_workout: async (workout_id: UUID, exercise_id: UUID) => {
        const exercises = get().workout_exercises.get(workout_id) || [];
        const filtered = exercises.filter(e => e.exercise_id !== exercise_id);
        
        // Optimistic update
        set(state => {
          state.workout_exercises.set(workout_id, filtered);
        });
        
        try {
          // API call would go here
          // await mockApi.removeExerciseFromWorkout(workout_id, exercise_id);
        } catch (error) {
          // Rollback
          set(state => {
            state.workout_exercises.set(workout_id, exercises);
            state.error = {
              code: 'REMOVE_EXERCISE_ERROR',
              message: 'Failed to remove exercise from workout',
            };
          });
          throw error;
        }
      },
      
      // Reorder exercises
      reorder_exercises: async (workout_id: UUID, exercises: WorkoutExercise[]) => {
        const original = get().workout_exercises.get(workout_id) || [];
        
        // Update with new order
        set(state => {
          state.workout_exercises.set(workout_id, exercises);
        });
        
        try {
          // API call would update all exercise_order values
          // await mockApi.updateWorkoutExerciseOrder(workout_id, exercises);
        } catch (error) {
          // Rollback
          set(state => {
            state.workout_exercises.set(workout_id, original);
            state.error = {
              code: 'REORDER_ERROR',
              message: 'Failed to reorder exercises',
            };
          });
          throw error;
        }
      },
      
      // Toggle favorite
      toggle_favorite: async (id: UUID) => {
        const workout = get().workouts.get(id);
        if (!workout) return;
        
        await get().update_workout(id, {
          is_favorite: !workout.is_favorite,
        });
      },
      
      // Archive workout
      archive_workout: async (id: UUID) => {
        await get().update_workout(id, {
          is_archived: true,
        });
        
        // Remove from local cache
        set(state => {
          state.workouts.delete(id);
          state.workout_exercises.delete(id);
        });
      },
      
      // Filter operations
      set_filter: (key, value) => {
        set(state => {
          state.filters[key] = value;
        });
      },
      
      reset_filters: () => {
        set(state => {
          state.filters = createEmptyWorkoutFilters();
          state.search_query = '';
        });
      },
      
      set_search: (query: string) => {
        set(state => {
          state.search_query = query;
        });
      },
      
      // Utility
      clear_error: () => {
        set(state => {
          state.error = null;
        });
      },
      
      invalidate_cache: () => {
        set(state => {
          state.last_fetch = null;
        });
      },
    })),
    {
      name: 'workout-store',
    }
  )
);

// Selector hooks
export const useWorkoutById = (id: UUID | null | undefined): Workout | undefined => {
  return useWorkoutStore(state => id ? state.workouts.get(id) : undefined);
};

export const useWorkoutExercises = (workout_id: UUID | null | undefined): WorkoutExercise[] => {
  return useWorkoutStore(state => 
    workout_id ? (state.workout_exercises.get(workout_id) || []) : []
  );
};

export const useFilteredWorkouts = (): Workout[] => {
  const workouts = useWorkoutStore(state => Array.from(state.workouts.values()));
  const filters = useWorkoutStore(state => state.filters);
  const search_query = useWorkoutStore(state => state.search_query);
  
  return workouts.filter(workout => {
    // Skip archived
    if (workout.is_archived) return false;
    
    // Search filter
    if (search_query) {
      const query = search_query.toLowerCase();
      if (!workout.name.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    // Source filter
    if (filters.source && filters.source !== 'all') {
      if (filters.source === 'library' && workout.user_id !== null) return false;
      if (filters.source === 'mine' && workout.user_id === null) return false;
    }
    
    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(workout.category)) return false;
    }
    
    // Difficulty filter
    if (filters.difficulty && filters.difficulty.length > 0) {
      if (!filters.difficulty.includes(workout.difficulty)) return false;
    }
    
    // Duration filter
    if (filters.durationRange) {
      const duration = workout.estimated_duration_minutes || 0;
      if (filters.durationRange.min && duration < filters.durationRange.min) return false;
      if (filters.durationRange.max && duration > filters.durationRange.max) return false;
    }
    
    // Favorites filter
    if (filters.favoritesOnly && !workout.is_favorite) return false;
    
    return true;
  });
};
