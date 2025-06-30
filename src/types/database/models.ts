import type { UUID } from '../common';

/**
 * Shared database model types
 * These will be REPLACED by generated types after running codegen
 * For now, they prevent duplication between mockApi and other services
 */

// Exercise model matching database schema
export interface Exercise {
  id: UUID;
  user_id: UUID | null;
  source_id: UUID | null;
  name: string;
  muscle_groups: string[];
  category: string;
  equipment: string;
  instructions: string;
  measurement_type: 'reps' | 'duration' | 'distance';
  default_sets: number;
  default_reps: number | null;
  default_duration_seconds: number | null;
  default_rest_seconds: number;
  is_favorite: boolean;
  is_archived: boolean;
  is_ai_generated: boolean;
  ai_prompt: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Workout exercise junction
export interface WorkoutExercise {
  workout_id: UUID;
  exercise_id: UUID;
  exercise_order: number;
  sets: number;
  reps: number | null;
  duration_seconds: number | null;
  rest_seconds: number;
  exercise?: Exercise; // Populated on fetch
}

// Workout model
export interface Workout {
  id: UUID;
  user_id: UUID | null;
  source_id: UUID | null;
  name: string;
  description: string | null;
  category: string;
  difficulty: string;
  estimated_duration_minutes: number | null;
  is_favorite: boolean;
  is_archived: boolean;
  is_ai_generated: boolean;
  ai_prompt: string | null;
  created_at: string;
  updated_at: string;
  workout_exercises: WorkoutExercise[];
}

// Performance models
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
  exercise_id: UUID;
  exercise_name: string;
  exercise_order: number;
  set_performances: SetPerformance[];
}

export interface WorkoutPerformance {
  id: UUID;
  user_id: UUID;
  workout_id: UUID;
  started_at: string;
  completed_at: string | null;
  notes: string | null;
  exercise_performances: ExercisePerformance[];
}

// User model
export interface User {
  id: UUID;
  email: string;
  name: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * IMPORTANT: After running GraphQL codegen:
 * 1. Delete this file
 * 2. Update all imports to use generated types from 'src/types/generated/graphql'
 * 3. The generated types will have the exact same shape but be auto-maintained
 */
