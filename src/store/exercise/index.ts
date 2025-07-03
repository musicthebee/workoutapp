// src/store/exercise/index.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { 
  UUID, 
  ExerciseFilters,
  CreateExerciseInput,
  UpdateExerciseInput,
  ApiError,
} from '@/types';
import type { Exercise } from '@/types/database/models';
import { mockApi } from '@/services/mockApi';
import { createEmptyExerciseFilters } from '@/types/business/filters';

// Store state interface
interface ExerciseState {
  // Data
  exercises: Map<UUID, Exercise>;
  
  // UI State
  filters: ExerciseFilters;
  search_query: string;
  
  // Loading states
  is_loading: boolean;
  is_creating: boolean;
  is_updating: boolean;
  
  // Error handling
  error: ApiError | null;
  
  // Cache management
  last_fetch: number | null;
  cache_duration: number; // milliseconds
}

// Store actions interface
interface ExerciseActions {
  // Fetch operations
  fetch_exercises: () => Promise<void>;
  fetch_exercise_by_id: (id: UUID) => Promise<Exercise | undefined>;
  
  // CRUD operations
  create_exercise: (input: CreateExerciseInput) => Promise<Exercise>;
  update_exercise: (id: UUID, updates: UpdateExerciseInput) => Promise<Exercise>;
  copy_from_library: (library_exercise_id: UUID) => Promise<Exercise>;
  toggle_favorite: (id: UUID) => Promise<void>;
  archive_exercise: (id: UUID) => Promise<void>;
  
  // Filter operations
  set_filter: <K extends keyof ExerciseFilters>(key: K, value: ExerciseFilters[K]) => void;
  reset_filters: () => void;
  set_search: (query: string) => void;
  
  // Utility
  clear_error: () => void;
  invalidate_cache: () => void;
}

// Combined store type
export type ExerciseStore = ExerciseState & ExerciseActions;

// Initial state
const initial_state: ExerciseState = {
  exercises: new Map(),
  filters: createEmptyExerciseFilters(),
  search_query: '',
  is_loading: false,
  is_creating: false,
  is_updating: false,
  error: null,
  last_fetch: null,
  cache_duration: 5 * 60 * 1000, // 5 minutes
};

// Create the store
export const useExerciseStore = create<ExerciseStore>()(
  devtools(
    immer((set, get) => ({
      // State
      ...initial_state,
      
      // Fetch all exercises
      fetch_exercises: async () => {
        const state = get();
        
        // Check cache
        if (
          state.last_fetch && 
          Date.now() - state.last_fetch < state.cache_duration &&
          state.exercises.size > 0
        ) {
          return; // Use cached data
        }
        
        set(state => {
          state.is_loading = true;
          state.error = null;
        });
        
        try {
          // Get current user (from auth context in real app)
          const user_id = 'user_123'; // TODO: Get from auth
          
          const exercises = await mockApi.getExercises(user_id);
          
          set(state => {
            state.exercises = new Map(exercises.map(ex => [ex.id, ex]));
            state.is_loading = false;
            state.last_fetch = Date.now();
          });
        } catch (error) {
          set(state => {
            state.is_loading = false;
            state.error = {
              code: 'FETCH_ERROR',
              message: error instanceof Error ? error.message : 'Failed to fetch exercises',
            };
          });
        }
      },
      
      // Fetch single exercise
      fetch_exercise_by_id: async (id: UUID) => {
        const existing = get().exercises.get(id);
        if (existing) return existing;
        
        try {
          const exercise = await mockApi.getExerciseById(id);
          
          set(state => {
            state.exercises.set(id, exercise);
          });
          
          return exercise;
        } catch (error) {
          set(state => {
            state.error = {
              code: 'FETCH_ERROR',
              message: `Failed to fetch exercise ${id}`,
            };
          });
          return undefined;
        }
      },
      
      // Create new exercise
      create_exercise: async (input: CreateExerciseInput) => {
        set(state => {
          state.is_creating = true;
          state.error = null;
        });
        
        try {
          const created = await mockApi.createExercise(input);
          
          set(state => {
            state.exercises.set(created.id, created);
            state.is_creating = false;
          });
          
          return created;
        } catch (error) {
          set(state => {
            state.is_creating = false;
            state.error = {
              code: 'CREATE_ERROR',
              message: error instanceof Error ? error.message : 'Failed to create exercise',
            };
          });
          throw error;
        }
      },
      
      // Update exercise
      update_exercise: async (id: UUID, updates: UpdateExerciseInput) => {
        const original = get().exercises.get(id);
        if (!original) {
          throw new Error('Exercise not found');
        }
        
        // Optimistic update
        set(state => {
          const exercise = state.exercises.get(id);
          if (exercise) {
            state.exercises.set(id, { ...exercise, ...updates });
          }
          state.is_updating = true;
          state.error = null;
        });
        
        try {
          const updated = await mockApi.updateExercise(id, updates);
          
          set(state => {
            state.exercises.set(id, updated);
            state.is_updating = false;
          });
          
          return updated;
        } catch (error) {
          // Rollback
          set(state => {
            state.exercises.set(id, original);
            state.is_updating = false;
            state.error = {
              code: 'UPDATE_ERROR',
              message: error instanceof Error ? error.message : 'Failed to update exercise',
            };
          });
          throw error;
        }
      },
      
      // Copy from library
      copy_from_library: async (library_exercise_id: UUID) => {
        set(state => {
          state.is_creating = true;
          state.error = null;
        });
        
        try {
          const user_id = 'user_123'; // TODO: Get from auth
          const copied = await mockApi.copyExerciseFromLibrary(library_exercise_id, user_id);
          
          set(state => {
            state.exercises.set(copied.id, copied);
            state.is_creating = false;
          });
          
          return copied;
        } catch (error) {
          set(state => {
            state.is_creating = false;
            state.error = {
              code: 'COPY_ERROR',
              message: error instanceof Error ? error.message : 'Failed to copy exercise',
            };
          });
          throw error;
        }
      },
      
      // Toggle favorite
      toggle_favorite: async (id: UUID) => {
        const exercise = get().exercises.get(id);
        if (!exercise) return;
        
        await get().update_exercise(id, {
          is_favorite: !exercise.is_favorite,
        });
      },
      
      // Archive exercise
      archive_exercise: async (id: UUID) => {
        await get().update_exercise(id, {
          is_archived: true,
        });
        
        // Remove from local cache
        set(state => {
          state.exercises.delete(id);
        });
      },
      
      // Filter operations
      set_filter: (key, value) => {
        set(state => {
          (state.filters as any)[key] = value;
        });
      },
      
      reset_filters: () => {
        set(state => {
          state.filters = createEmptyExerciseFilters() as any;
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
      name: 'exercise-store',
    }
  )
);

// Selector hooks for common queries
export const useExerciseById = (id: UUID | null | undefined): Exercise | undefined => {
  return useExerciseStore(state => id ? state.exercises.get(id) : undefined);
};

export const useFilteredExercises = (): Exercise[] => {
  // Just return empty array for now - will fix filtering logic later
  return [];
};

// Utility to check if user owns exercise
export const useIsExerciseOwned = (exercise_id: UUID | null | undefined): boolean => {
  const exercise = useExerciseById(exercise_id);
  return exercise?.user_id !== null && exercise?.user_id !== undefined;
};
