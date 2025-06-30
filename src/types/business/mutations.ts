import type { UUID } from '../common';

/**
 * Input types for GraphQL mutations
 * These match the expected inputs for Hasura mutations
 */

// For adding exercise during workout (living workouts!)
export interface AddExerciseToWorkoutInput {
  readonly workout_id: UUID;
  readonly exercise_id: UUID;
  readonly exercise_order: number; // Use fractional ordering
  readonly sets: number;
  readonly reps?: number | null;
  readonly duration_seconds?: number | null;
  readonly rest_seconds: number;
}

// For creating new exercise (manual or AI-assisted)
export interface CreateExerciseInput {
  readonly user_id: UUID; // Makes it owned by user
  readonly source_id?: UUID | null; // If copied from library
  readonly name: string;
  readonly muscle_groups: ReadonlyArray<string>;
  readonly category: string;
  readonly equipment: string;
  readonly instructions: string;
  readonly measurement_type: string;
  readonly default_sets: number;
  readonly default_reps?: number | null;
  readonly default_duration_seconds?: number | null;
  readonly default_rest_seconds: number;
  readonly is_ai_generated?: boolean; // Just a flag!
  readonly ai_prompt?: string | null; // Store the prompt if AI
}

// For updating existing exercise
export interface UpdateExerciseInput {
  readonly name?: string;
  readonly muscle_groups?: ReadonlyArray<string>;
  readonly category?: string;
  readonly equipment?: string;
  readonly instructions?: string;
  readonly measurement_type?: string;
  readonly default_sets?: number;
  readonly default_reps?: number | null;
  readonly default_duration_seconds?: number | null;
  readonly default_rest_seconds?: number;
  readonly is_favorite?: boolean;
  readonly is_archived?: boolean;
  readonly notes?: string | null;
}

// For creating new workout (manual or AI-assisted)
export interface CreateWorkoutInput {
  readonly user_id: UUID;
  readonly source_id?: UUID | null;
  readonly name: string;
  readonly description?: string | null;
  readonly category: string;
  readonly difficulty: string;
  readonly estimated_duration_minutes?: number | null;
  readonly is_ai_generated?: boolean; // Just a flag!
  readonly ai_prompt?: string | null;
  readonly exercises?: ReadonlyArray<{
    readonly exercise_id: UUID;
    readonly exercise_order: number;
    readonly sets: number;
    readonly reps?: number | null;
    readonly duration_seconds?: number | null;
    readonly rest_seconds: number;
  }>;
}

// For updating existing workout
export interface UpdateWorkoutInput {
  readonly name?: string;
  readonly description?: string | null;
  readonly category?: string;
  readonly difficulty?: string;
  readonly estimated_duration_minutes?: number | null;
  readonly is_favorite?: boolean;
  readonly is_archived?: boolean;
}

// For AI generation requests (NOT a separate type!)
export interface AIGenerationRequest {
  readonly type: 'exercise' | 'workout';
  readonly user_id: UUID;
  readonly prompt?: string;
  readonly constraints?: {
    // For exercises
    readonly muscle_groups?: ReadonlyArray<string>;
    readonly equipment?: ReadonlyArray<string>;
    readonly exercise_type?: string;
    
    // For workouts  
    readonly duration_minutes?: number;
    readonly workout_type?: string;
    readonly exercise_count?: number;
    readonly fitness_level?: string;
  };
}

// For logging performance
export interface LogSetPerformanceInput {
  readonly exercise_id: UUID;
  readonly set_number: number;
  readonly reps?: number | null;
  readonly weight?: number | null;
  readonly duration_seconds?: number | null;
  readonly distance_meters?: number | null;
  readonly completed: boolean;
  readonly notes?: string | null;
}

// For completing workout
export interface CompleteWorkoutInput {
  readonly workout_performance_id: UUID;
  readonly completed_at: string;
  readonly notes?: string | null;
  readonly exercise_performances: ReadonlyArray<{
    readonly exercise_id: UUID;
    readonly exercise_name: string;
    readonly exercise_order: number;
    readonly set_performances: ReadonlyArray<LogSetPerformanceInput>;
  }>;
}

// AI returns Exercise or Workout from DB, not special types!
