// src/hooks/data/useWorkouts.ts
import React, { useCallback, useEffect, useMemo } from 'react';

import {
  useFilteredWorkouts,
  useWorkoutById,
  useWorkoutExercises,
  useWorkoutStore,
} from '@/store/workout';
import { useExerciseStore } from '@/store/exercise';
import { authService } from '@/services/auth.service';
import type {
  CreateWorkoutInput,
  Exercise,
  UpdateWorkoutInput,
  UUID,
  Workout,
  WorkoutExercise,
  WorkoutFilters,
} from '@/types';

/**
 * Main hook for workout data management
 * Provides a clean interface for all workout operations
 */
export const useWorkouts = () => {
  // Select only needed state from store
  const {
    is_loading,
    is_creating,
    is_updating,
    error,
    filters,
    search_query,
    fetch_workouts,
    create_workout,
    update_workout,
    copy_from_library,
    toggle_favorite,
    archive_workout,
    set_filter,
    reset_filters,
    set_search,
    clear_error,
  } = useWorkoutStore();

  // Get filtered workouts
  const workouts = useFilteredWorkouts();

  // Fetch workouts on mount only
  useEffect(() => {
    fetch_workouts();
  }, []); // Empty dependency array to avoid infinite loop

  // Memoized counts
  const counts = useMemo(
    () => ({
      total: workouts.length,
      library: workouts.filter(w => w.user_id === null).length,
      mine: workouts.filter(w => w.user_id !== null).length,
      favorites: workouts.filter(w => w.is_favorite).length,
    }),
    [workouts],
  );

  // Group workouts by category
  const workouts_by_category = useMemo(() => {
    const grouped = new Map<string, Workout[]>();

    workouts.forEach(workout => {
      const category = workout.category;
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(workout);
    });

    return grouped;
  }, [workouts]);

  // Available filter options
  const available_filters = useMemo(() => {
    const categories = new Set<string>();
    const difficulties = new Set<string>();
    let min_duration = Infinity;
    let max_duration = 0;

    workouts.forEach(workout => {
      categories.add(workout.category);
      difficulties.add(workout.difficulty);
      if (workout.estimated_duration_minutes) {
        min_duration = Math.min(min_duration, workout.estimated_duration_minutes);
        max_duration = Math.max(max_duration, workout.estimated_duration_minutes);
      }
    });

    return {
      categories: Array.from(categories).sort(),
      difficulties: Array.from(difficulties).sort(),
      duration_range: {
        min: min_duration === Infinity ? 0 : min_duration,
        max: max_duration,
      },
    };
  }, [workouts]);

  // Search handler
  const handle_search = useCallback(
    (query: string) => {
      set_search(query);
    },
    [set_search],
  );

  // Filter handlers
  const handle_filter_change = useCallback(
    <K extends keyof WorkoutFilters>(key: K, value: WorkoutFilters[K]) => {
      set_filter(key, value);
    },
    [set_filter],
  );

  // Quick filters
  const toggle_favorites_filter = useCallback(() => {
    set_filter('favoritesOnly', !filters.favoritesOnly);
  }, [set_filter, filters.favoritesOnly]);

  const set_source_filter = useCallback(
    (source: 'all' | 'library' | 'mine') => {
      set_filter('source', source);
    },
    [set_filter],
  );

  // CRUD operations
  const create_new_workout = useCallback(
    async (input: CreateWorkoutInput) => {
      try {
        const created = await create_workout(input);
        return { success: true as const, data: created };
      } catch (error) {
        return {
          success: false as const,
          error: error instanceof Error ? error.message : 'Failed to create workout',
        };
      }
    },
    [create_workout],
  );

  const update_existing_workout = useCallback(
    async (id: UUID, updates: UpdateWorkoutInput) => {
      try {
        const updated = await update_workout(id, updates);
        return { success: true as const, data: updated };
      } catch (error) {
        return {
          success: false as const,
          error: error instanceof Error ? error.message : 'Failed to update workout',
        };
      }
    },
    [update_workout],
  );

  const copy_library_workout = useCallback(
    async (library_workout_id: UUID) => {
      try {
        const copied = await copy_from_library(library_workout_id);
        return { success: true as const, data: copied };
      } catch (error) {
        return {
          success: false as const,
          error: error instanceof Error ? error.message : 'Failed to copy workout',
        };
      }
    },
    [copy_from_library],
  );

  return {
    // Data
    workouts,
    workouts_by_category,
    counts,
    available_filters,

    // Filter state
    filters,
    search_query,

    // Loading states
    is_loading,
    is_creating,
    is_updating,

    // Error state
    error,

    // Search & Filter actions
    handle_search,
    handle_filter_change,
    toggle_favorites_filter,
    set_source_filter,
    reset_filters,

    // CRUD actions
    create_workout: create_new_workout,
    update_workout: update_existing_workout,
    copy_from_library: copy_library_workout,
    toggle_favorite,
    archive_workout,

    // Utility
    clear_error,
    refresh: fetch_workouts,
  };
};

/**
 * Hook to get a single workout with its exercises
 * Denormalizes the data for easy consumption
 */
export const useWorkout = (workout_id: UUID | null | undefined) => {
  const workout = useWorkoutById(workout_id);
  const workout_exercises = useWorkoutExercises(workout_id);
  const exercises = useExerciseStore(state => state.exercises);

  const {
    update_workout,
    toggle_favorite,
    archive_workout,
    add_exercise_to_workout,
    update_workout_exercise,
    remove_exercise_from_workout,
    reorder_exercises,
  } = useWorkoutStore();

  // Denormalize exercises for easy use
  const exercises_with_details = useMemo(() => {
    return workout_exercises
      .map(we => {
        const exercise_data = exercises.get(we.exercise_id);
        return {
          ...we,
          exercise: exercise_data,
        };
      })
      .filter(we => we.exercise !== undefined) as Array<WorkoutExercise & { exercise: Exercise }>;
  }, [workout_exercises, exercises]);

  // Calculate total duration
  const estimated_duration = useMemo(() => {
    if (workout?.estimated_duration_minutes) {
      return workout.estimated_duration_minutes;
    }

    // Calculate based on exercises
    let total_seconds = 0;
    exercises_with_details.forEach(we => {
      const sets = we.sets;
      const rest = we.rest;
      const exercise_time = we.duration || 30; // Assume 30s per set if reps

      total_seconds += sets * exercise_time + (sets - 1) * rest;
    });

    // Add transition time between exercises
    total_seconds += (exercises_with_details.length - 1) * 30;

    return Math.ceil(total_seconds / 60);
  }, [workout?.estimated_duration_minutes, exercises_with_details]);

  // Workout-specific actions
  const update = useCallback(
    async (updates: UpdateWorkoutInput) => {
      if (!workout_id) {return;}
      return update_workout(workout_id, updates);
    },
    [workout_id, update_workout],
  );

  const toggle_fav = useCallback(async () => {
    if (!workout_id) {return;}
    return toggle_favorite(workout_id);
  }, [workout_id, toggle_favorite]);

  const archive = useCallback(async () => {
    if (!workout_id) {return;}
    return archive_workout(workout_id);
  }, [workout_id, archive_workout]);

  const add_exercise = useCallback(
    async (exercise_id: UUID, config?: any) => {
      if (!workout_id) {return;}
      return add_exercise_to_workout(workout_id, exercise_id, config);
    },
    [workout_id, add_exercise_to_workout],
  );

  const update_exercise = useCallback(
    async (exercise_id: UUID, updates: Partial<WorkoutExercise>) => {
      if (!workout_id) {return;}
      return update_workout_exercise(workout_id, exercise_id, updates);
    },
    [workout_id, update_workout_exercise],
  );

  const remove_exercise = useCallback(
    async (exercise_id: UUID) => {
      if (!workout_id) {return;}
      return remove_exercise_from_workout(workout_id, exercise_id);
    },
    [workout_id, remove_exercise_from_workout],
  );

  const reorder = useCallback(
    async (new_order: WorkoutExercise[]) => {
      if (!workout_id) {return;}
      return reorder_exercises(workout_id, new_order);
    },
    [workout_id, reorder_exercises],
  );

  return {
    workout,
    exercises: exercises_with_details,
    exercise_count: exercises_with_details.length,
    estimated_duration,
    is_owned: workout?.user_id !== null,
    is_library: workout?.user_id === null,
    can_edit: workout?.user_id !== null,
    actions: workout
      ? {
          update,
          toggle_favorite: toggle_fav,
          archive,
          add_exercise,
          update_exercise,
          remove_exercise,
          reorder_exercises: reorder,
        }
      : null,
  };
};

/**
 * Hook for workout creation flow
 * Handles both manual and AI-assisted creation
 */
export const useWorkoutCreation = () => {
  const { create_workout, is_creating, error, clear_error } = useWorkoutStore();

  const [creation_mode, set_creation_mode] = React.useState<'manual' | 'ai'>('manual');
  const [ai_prompt, set_ai_prompt] = React.useState('');
  const [selected_exercises, set_selected_exercises] = React.useState<UUID[]>([]);

  const create_manual = useCallback(
    async (input: Omit<CreateWorkoutInput, 'user_id' | 'exercises'>) => {
      const current_user = authService.get_current_user();
      if (!current_user) {
        throw new Error('User not authenticated');
      }
      const user_id = current_user.id;

    // Build exercise list with default ordering
      const exercises = selected_exercises.map((exercise_id, index) => ({
        exercise_id,
        exercise_order: (index + 1) * 1.0,
        sets: 3,
        reps: 10,
        rest: 90,
      }));

    return create_workout({
        ...input,
        user_id,
        exercises,
        is_ai_generated: false,
      });
    },
    [create_workout, selected_exercises],
  );

  const create_with_ai = useCallback(
    async (prompt: string) => {
      // TODO: Call AI service to generate workout
      const current_user = authService.get_current_user();
      if (!current_user) {
        throw new Error('User not authenticated');
      }
      const user_id = current_user.id;
      const generated: CreateWorkoutInput = {
        user_id,
        name: `AI Workout: ${prompt.slice(0, 30)}`,
        description: `Generated based on: ${prompt}`,
        category: 'hybrid',
        difficulty: 'intermediate',
        estimated_duration_minutes: 45,
        exercises: [], // AI would provide these
        is_ai_generated: true,
        ai_prompt: prompt,
      };

    return create_workout(generated);
    },
    [create_workout],
  );

  const add_exercise_to_selection = useCallback((exercise_id: UUID) => {
    set_selected_exercises(prev => [...prev, exercise_id]);
  }, []);

  const remove_exercise_from_selection = useCallback((exercise_id: UUID) => {
    set_selected_exercises(prev => prev.filter(id => id !== exercise_id));
  }, []);

  const reorder_selection = useCallback((new_order: UUID[]) => {
    set_selected_exercises(new_order);
  }, []);

  return {
    creation_mode,
    set_creation_mode,
    ai_prompt,
    set_ai_prompt,
    selected_exercises,
    add_exercise: add_exercise_to_selection,
    remove_exercise: remove_exercise_from_selection,
    reorder_exercises: reorder_selection,
    is_creating,
    error,
    clear_error,
    create_manual,
    create_with_ai,
  };
};
