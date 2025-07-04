import type { UUID } from '../common';

/**
 * Shared database model types
 * These will be REPLACED by generated types after running codegen
 * For now, they prevent duplication between mockApi and other services
 */

// Database enum types matching schema
export type MuscleGroup = 
  | 'chest' | 'back' | 'shoulders' 
  | 'biceps' | 'triceps' | 'forearms'
  | 'abs' | 'obliques' | 'core'
  | 'quads' | 'hamstrings' | 'glutes' | 'calves'
  | 'cardio';

export type ExerciseCategory = 
  | 'strength'      // traditional resistance training
  | 'cardio'        // endurance/aerobic
  | 'plyometric'    // explosive movements
  | 'mobility'      // stretching/flexibility
  | 'balance'       // stability work
  | 'power';        // olympic lifts, explosive strength

export type WorkoutCategory = 
  | 'strength'      // traditional lifting session
  | 'cardio'        // endurance focused session
  | 'hiit'          // high intensity intervals
  | 'circuit'       // rotating exercises, minimal rest
  | 'mobility'      // yoga/stretching session
  | 'hybrid';       // mixed goals

export type Equipment = 
  | 'barbell' | 'dumbbell' | 'kettlebell'
  | 'cable' | 'machine' | 'bodyweight'
  | 'bands' | 'medicine_ball' | 'trx'
  | 'cardio_machine' | 'none';

export type MeasurementType = 
  | 'reps'          // count based
  | 'duration'      // duration based (seconds)
  | 'distance';     // distance based (meters)

export type Difficulty = 
  | 'beginner'
  | 'intermediate'
  | 'advanced';

// Exercise model matching database schema
export interface Exercise {
  id: UUID;
  user_id: UUID | null;
  source_id: UUID | null;
  name: string;
  muscle_groups: MuscleGroup[];
  category: ExerciseCategory;
  equipment: Equipment;
  instructions: string;
  measurement_type: MeasurementType;
  default_sets: number;
  default_reps: number | null;
  default_duration: number | null;  // Duration in seconds
  default_rest: number;  // Rest time in seconds
  is_favorite: boolean;
  is_archived: boolean;
  is_ai_generated: boolean;
  ai_prompt: string | null;
  notes: string | null;
  // AI/ML fields
  embedding: number[] | null;  // Vector embeddings for semantic search
  difficulty_score: number | null;  // 1-10 scale
  popularity_score: number;
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
  duration: number | null;  // Duration in seconds
  rest: number;  // Rest time in seconds
  notes: string | null;  // Missing field from schema
  created_at: string;
  exercise?: Exercise; // Populated on fetch
}

// Workout model
export interface Workout {
  id: UUID;
  user_id: UUID | null;
  source_id: UUID | null;
  name: string;
  description: string | null;
  category: WorkoutCategory;
  difficulty: Difficulty;
  estimated_duration_minutes: number;  // NOT NULL in schema
  is_favorite: boolean;
  is_archived: boolean;
  is_ai_generated: boolean;
  ai_prompt: string | null;
  notes: string | null;  // Missing field from schema
  // AI/ML fields
  embedding: number[] | null;  // Vector embeddings for semantic search
  total_volume_estimate: number | null;  // Estimated total volume for tracking
  popularity_score: number;
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

// User model matching database schema
export interface User {
  id: UUID;
  firebase_uid: string;
  email: string;
  name: string | null;
  date_of_birth: string | null;  // DATE type
  // Physical attributes for tracking
  height_cm: number | null;
  weight_kg: number | null;
  // Preferences
  preferred_units: 'metric' | 'imperial';
  rest_timer_enabled: boolean;
  rest_timer_auto_start: boolean;
  // Notification preferences
  workout_reminders: boolean;
  achievement_notifications: boolean;
  // Training preferences
  training_experience: Difficulty;
  primary_goal: string | null;  // 'strength', 'muscle', 'endurance', 'weight_loss', 'general_fitness'
  // Account status
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * IMPORTANT: After running GraphQL codegen:
 * 1. Delete this file
 * 2. Update all imports to use generated types from 'src/types/generated/graphql'
 * 3. The generated types will have the exact same shape but be auto-maintained
 */
