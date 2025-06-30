import type { UUID } from '../common';

/**
 * Types for managing active workout sessions
 * These types represent the runtime state during a workout
 */

// Workout states during execution
export type WorkoutState = 
  | 'preparing'  // Initial state, setting up
  | 'warmup'     // Warmup timer running
  | 'active'     // Performing exercises
  | 'rest'       // Rest between sets
  | 'paused'     // Workout paused
  | 'complete';  // Workout finished

// Represents a set being performed
export interface ActiveSet {
  readonly setNumber: number;
  readonly targetReps?: number;
  readonly targetDuration?: number;
  readonly targetDistance?: number;
  readonly restDuration: number;
}

// Performance data for a completed set
export interface SetPerformance {
  readonly reps?: number;
  readonly weight?: number;
  readonly duration?: number;
  readonly distance?: number;
  readonly completed: boolean;
  readonly notes?: string;
}

// Active exercise being performed
export interface ActiveExercise {
  readonly exercise_id: UUID;
  readonly exerciseName: string;
  readonly exercise_order: number;
  readonly instructions: string;
  readonly measurement_type: string;
  readonly sets: number;
  readonly completedSets: ReadonlyArray<SetPerformance>;
  readonly currentSet: ActiveSet | null;
}

// Complete active workout state
export interface ActiveWorkout {
  readonly workout_id: UUID;
  readonly workoutName: string;
  readonly startTime: Date;
  readonly state: WorkoutState;
  readonly exercises: ReadonlyArray<ActiveExercise>;
  readonly currentExerciseIndex: number;
  readonly currentSetIndex: number;
  readonly totalSets: number;
  readonly completedSets: number;
  readonly estimatedTimeRemaining: number; // seconds
}

// Helper functions for workout state
export const isWorkoutActive = (state: WorkoutState): boolean =>
  state !== 'complete' && state !== 'paused';

export const canAddExercise = (state: WorkoutState): boolean =>
  state === 'preparing' || state === 'active' || state === 'rest';

export const isSetComplete = (performance: SetPerformance): boolean =>
  performance.completed && 
  (performance.reps !== undefined || 
   performance.duration !== undefined || 
   performance.distance !== undefined);
