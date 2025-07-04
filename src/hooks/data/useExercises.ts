// src/hooks/data/useExercises.ts
import React, { useEffect, useCallback, useMemo } from 'react';

import {
  useExerciseStore,
  useFilteredExercises,
  useExerciseById,
  useIsExerciseOwned,
} from '@/store/exercise';
import { authService } from '@/services/auth.service';
import type {
  Exercise,
  UUID,
  ExerciseFilters,
  CreateExerciseInput,
  UpdateExerciseInput,
} from '@/types';

/**
 * Main hook for exercise data management
 * Provides a clean interface to components for all exercise operations
 */
export const useExercises = () => {
  // Select only what we need from store (performance optimization)
  const {
    is_loading,
    is_creating,
    is_updating,
    error,
    filters,
    search_query,
    fetch_exercises,
    create_exercise,
    update_exercise,
    copy_from_library,
    toggle_favorite,
    archive_exercise,
    set_filter,
    reset_filters,
    set_search,
    clear_error,
  } = useExerciseStore();

  // Get filtered exercises using selector hook
  const exercises = useFilteredExercises();

  // Fetch exercises on mount only
  useEffect(() => {
    fetch_exercises();
  }, []); // Empty dependency array to avoid infinite loop

  // Memoized counts for UI
  const counts = useMemo(() => ({
    total: exercises.length,
    library: exercises.filter(e => e.user_id === null).length,
    mine: exercises.filter(e => e.user_id !== null).length,
    favorites: exercises.filter(e => e.is_favorite).length,
  }), [exercises]);

  // Grouped exercises by category
  const exercises_by_category = useMemo(() => {
    const grouped = new Map<string, Exercise[]>();
    
    exercises.forEach(exercise => {
      const category = exercise.category;
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(exercise);
    });
    
    return grouped;
  }, [exercises]);

  // Available filter options based on current data
  const available_filters = useMemo(() => {
    const muscle_groups = new Set<string>();
    const categories = new Set<string>();
    const equipment = new Set<string>();
    
    exercises.forEach(exercise => {
      exercise.muscle_groups.forEach(mg => muscle_groups.add(mg));
      categories.add(exercise.category);
      equipment.add(exercise.equipment);
    });
    
    return {
      muscle_groups: Array.from(muscle_groups).sort(),
      categories: Array.from(categories).sort(),
      equipment: Array.from(equipment).sort(),
    };
  }, [exercises]);

  // Search handler with debounce (handled by component using useDebounce)
  const handle_search = useCallback((query: string) => {
    set_search(query);
  }, [set_search]);

  // Filter handlers
  const handle_filter_change = useCallback(<K extends keyof ExerciseFilters>(
    key: K,
    value: ExerciseFilters[K]
  ) => {
    set_filter(key, value);
  }, [set_filter]);

  // Quick filter toggles
  const toggle_favorites_filter = useCallback(() => {
    set_filter('favoritesOnly', !filters.favoritesOnly);
  }, [set_filter, filters.favoritesOnly]);

  const set_source_filter = useCallback((source: 'all' | 'library' | 'mine') => {
    set_filter('source', source);
  }, [set_filter]);

  // CRUD operations with error handling
  const create_new_exercise = useCallback(async (input: CreateExerciseInput) => {
    try {
      const created = await create_exercise(input);
      return { success: true as const, data: created };
    } catch (error) {
      return { 
        success: false as const, 
        error: error instanceof Error ? error.message : 'Failed to create exercise' 
      };
    }
  }, [create_exercise]);

  const update_existing_exercise = useCallback(async (
    id: UUID,
    updates: UpdateExerciseInput
  ) => {
    try {
      const updated = await update_exercise(id, updates);
      return { success: true as const, data: updated };
    } catch (error) {
      return { 
        success: false as const, 
        error: error instanceof Error ? error.message : 'Failed to update exercise' 
      };
    }
  }, [update_exercise]);

  const copy_library_exercise = useCallback(async (library_exercise_id: UUID) => {
    try {
      const copied = await copy_from_library(library_exercise_id);
      return { success: true as const, data: copied };
    } catch (error) {
      return { 
        success: false as const, 
        error: error instanceof Error ? error.message : 'Failed to copy exercise' 
      };
    }
  }, [copy_from_library]);

  // Batch operations
  const archive_multiple = useCallback(async (exercise_ids: UUID[]) => {
    const results = await Promise.allSettled(
      exercise_ids.map(id => archive_exercise(id))
    );
    
    const failed = results.filter(r => r.status === 'rejected').length;
    return {
      success: failed === 0,
      archived: results.length - failed,
      failed,
    };
  }, [archive_exercise]);

  return {
    // Data
    exercises,
    exercises_by_category,
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
    create_exercise: create_new_exercise,
    update_exercise: update_existing_exercise,
    copy_from_library: copy_library_exercise,
    toggle_favorite,
    archive_exercise,
    archive_multiple,
    
    // Utility
    clear_error,
    refresh: fetch_exercises,
  };
};

/**
 * Hook to get a single exercise by ID
 * Uses the store's selector for optimal performance
 */
export const useExercise = (exercise_id: UUID | null | undefined) => {
  const exercise = useExerciseById(exercise_id);
  const is_owned = useIsExerciseOwned(exercise_id);
  
  const {
    update_exercise,
    toggle_favorite,
    archive_exercise,
  } = useExerciseStore(
    (state) => ({
      update_exercise: state.update_exercise,
      toggle_favorite: state.toggle_favorite,
      archive_exercise: state.archive_exercise,
    }));
  
  // Exercise-specific actions
  const update = useCallback(async (updates: UpdateExerciseInput) => {
    if (!exercise_id) return;
    return update_exercise(exercise_id, updates);
  }, [exercise_id, update_exercise]);
  
  const toggle_fav = useCallback(async () => {
    if (!exercise_id) return;
    return toggle_favorite(exercise_id);
  }, [exercise_id, toggle_favorite]);
  
  const archive = useCallback(async () => {
    if (!exercise_id) return;
    return archive_exercise(exercise_id);
  }, [exercise_id, archive_exercise]);
  
  return {
    exercise,
    is_owned,
    is_library: exercise?.user_id === null,
    can_edit: is_owned,
    actions: exercise ? {
      update,
      toggle_favorite: toggle_fav,
      archive,
    } : null,
  };
};

/**
 * Hook for exercise creation flow
 * Handles both manual and AI-assisted creation
 */
export const useExerciseCreation = () => {
  const { create_exercise, is_creating, error, clear_error } = useExerciseStore();
  
  const [creation_mode, set_creation_mode] = React.useState<'manual' | 'ai'>('manual');
  const [ai_prompt, set_ai_prompt] = React.useState('');
  
  const create_manual = useCallback(async (input: Omit<CreateExerciseInput, 'user_id'>) => {
    const current_user = authService.get_current_user();
    if (!current_user) {
      throw new Error('User not authenticated');
    }
    const user_id = current_user.id;
    return create_exercise({
      ...input,
      user_id,
      is_ai_generated: false,
    });
  }, [create_exercise]);
  
  const create_with_ai = useCallback(async (prompt: string) => {
    // TODO: Call AI service to generate exercise
    // For now, just mock
    const current_user = authService.get_current_user();
    if (!current_user) {
      throw new Error('User not authenticated');
    }
    const user_id = current_user.id;
    const generated: CreateExerciseInput = {
      user_id,
      name: `AI Exercise: ${prompt.slice(0, 30)}`,
      muscle_groups: ['core'],
      category: 'strength',
      equipment: 'bodyweight',
      instructions: `AI Generated based on: ${prompt}`,
      measurement_type: 'reps',
      default_sets: 3,
      default_reps: 10,
      default_rest: 60,
      is_ai_generated: true,
      ai_prompt: prompt,
    };
    
    return create_exercise(generated);
  }, [create_exercise]);
  
  return {
    creation_mode,
    set_creation_mode,
    ai_prompt,
    set_ai_prompt,
    is_creating,
    error,
    clear_error,
    create_manual,
    create_with_ai,
  };
};
