/**
 * Clean database model types extracted from generated GraphQL types
 * Preserves snake_case architecture while removing GraphQL metadata
 */

import type {
  Exercise as GQLExercise,
  Sys_User as GQLUser,
  Workout as GQLWorkout,
  Workout_Exercise as GQLWorkoutExercise,
  Workout_Performance as GQLWorkoutPerformance,
} from '@/api/generated/graphql';

// Clean core types - remove GraphQL metadata and unwrap scalars
export type Exercise = Omit<
  GQLExercise,
  | 'exercise'
  | 'exercises'
  | 'exercises_aggregate'
  | 'workout_exercises'
  | 'workout_exercises_aggregate'
  | 'sys_user'
> & {
  id: string;
  user_id: string | null;
  source_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  muscle_groups: string[];
  embedding: number[] | null;
  difficulty_score: number | null;
  popularity_score: number | null;
  ai_prompt: string | null;
  notes: string | null;
  is_favorite: boolean | null;
  is_archived: boolean | null;
  is_ai_generated: boolean | null;
};

export type WorkoutExercise = Omit<GQLWorkoutExercise, 'exercise' | 'workout'> & {
  workout_id: string;
  exercise_id: string;
  exercise_order: number;
  duration: number | null;
  reps: number | null;
  notes: string | null;
  created_at: string | null;
  exercise?: Exercise; // Populated on fetch
};

export type Workout = Omit<
  GQLWorkout,
  | 'workout'
  | 'workouts'
  | 'workouts_aggregate'
  | 'workout_exercises'
  | 'workout_exercises_aggregate'
  | 'workout_performances'
  | 'workout_performances_aggregate'
  | 'sys_user'
> & {
  id: string;
  user_id: string | null;
  source_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  embedding: number[] | null;
  total_volume_estimate: number | null;
  popularity_score: number | null;
  ai_prompt: string | null;
  notes: string | null;
  is_favorite: boolean | null;
  is_archived: boolean | null;
  is_ai_generated: boolean | null;
  workout_exercises: WorkoutExercise[];
};

export type User = Omit<
  GQLUser,
  | 'exercises'
  | 'exercises_aggregate'
  | 'user_weight_histories'
  | 'user_weight_histories_aggregate'
  | 'workout_performances'
  | 'workout_performances_aggregate'
  | 'workouts'
  | 'workouts_aggregate'
> & {
  id: string;
  created_at: string | null;
  updated_at: string | null;
  date_of_birth: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  name: string | null;
  last_login: string | null;
  primary_goal: string | null;
  preferred_units: string | null;
  rest_timer_enabled: boolean | null;
  rest_timer_auto_start: boolean | null;
  workout_reminders: boolean | null;
  achievement_notifications: boolean | null;
  is_active: boolean | null;
};

// Extract enum values from GraphQL scalars
export type MuscleGroup = string; // Will be constrained by GraphQL schema
export type ExerciseCategory = string;
export type WorkoutCategory = string;
export type Equipment = string;
export type MeasurementType = string;
export type Difficulty = string;

// Application-specific types (not database tables)
// These represent JSON structures stored in the database

export interface SetPerformance {
  set_number: number;
  reps?: number | null;
  weight?: number | null;
  duration_seconds?: number | null;
  distance_meters?: number | null;
  completed: boolean;
  notes?: string | null;
}

export interface ExercisePerformance {
  exercise_id: string;
  exercise_name: string;
  exercise_order: number;
  set_performances: SetPerformance[];
}

export type WorkoutPerformance = Omit<GQLWorkoutPerformance, 'sys_user' | 'workout'> & {
  id: string;
  user_id: string;
  workout_id: string;
  started_at: string;
  completed_at: string | null;
  notes: string | null;
  created_at: string | null;
  exercises_performed: any; // JSONB field containing ExercisePerformance[]
  // Helper for application use
  exercise_performances?: ExercisePerformance[]; // Parsed from exercises_performed JSONB
};
