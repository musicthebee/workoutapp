import type { UUID } from '../common';

/**
 * Types for filtering and searching data
 * Used throughout the app for list views
 */

// Exercise filtering options
export interface ExerciseFilters {
  readonly search?: string;
  readonly muscle_groups?: ReadonlyArray<string>;
  readonly categories?: ReadonlyArray<string>;
  readonly equipment?: ReadonlyArray<string>;
  readonly favoritesOnly?: boolean;
  readonly customOnly?: boolean;
  readonly source?: 'library' | 'mine' | 'all';
}

// Workout filtering options
export interface WorkoutFilters {
  readonly search?: string;
  readonly categories?: ReadonlyArray<string>;
  readonly difficulty?: ReadonlyArray<string>;
  readonly durationRange?: {
    readonly min?: number;
    readonly max?: number;
  };
  readonly favoritesOnly?: boolean;
  readonly customOnly?: boolean;
  readonly source?: 'library' | 'mine' | 'all';
}

// History filtering options
export interface HistoryFilters {
  readonly dateRange?: {
    readonly start: Date;
    readonly end: Date;
  };
  readonly workout_ids?: ReadonlyArray<UUID>;
  readonly completedOnly?: boolean;
}

// Helper to check if filters are active
export const hasActiveFilters = (filters: ExerciseFilters | WorkoutFilters | HistoryFilters): boolean => {
  return Object.values(filters).some(value => {
    if (value === undefined || value === null) return false;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value.length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return true;
  });
};

// Helper to reset filters
export const createEmptyExerciseFilters = (): ExerciseFilters => ({
  source: 'all',
});

export const createEmptyWorkoutFilters = (): WorkoutFilters => ({
  source: 'all',
});

export const createEmptyHistoryFilters = (): HistoryFilters => ({
  completedOnly: true,
});
