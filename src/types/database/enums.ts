/**
 * Database enum types with type safety
 * These match the SQL schema enum definitions exactly
 */

export enum MuscleGroup {
  CHEST = 'chest',
  BACK = 'back',
  SHOULDERS = 'shoulders', 
  BICEPS = 'biceps',
  TRICEPS = 'triceps',
  FOREARMS = 'forearms',
  ABS = 'abs',
  OBLIQUES = 'obliques',
  CORE = 'core',
  QUADS = 'quads',
  HAMSTRINGS = 'hamstrings',
  GLUTES = 'glutes',
  CALVES = 'calves',
  CARDIO = 'cardio'
}

export enum ExerciseCategory {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  PLYOMETRIC = 'plyometric',
  MOBILITY = 'mobility',
  BALANCE = 'balance',
  POWER = 'power'
}

export enum WorkoutCategory {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  HIIT = 'hiit',
  CIRCUIT = 'circuit',
  MOBILITY = 'mobility',
  HYBRID = 'hybrid'
}

export enum Equipment {
  BARBELL = 'barbell',
  DUMBBELL = 'dumbbell',
  KETTLEBELL = 'kettlebell',
  CABLE = 'cable',
  MACHINE = 'machine',
  BODYWEIGHT = 'bodyweight',
  BANDS = 'bands',
  MEDICINE_BALL = 'medicine_ball',
  TRX = 'trx',
  CARDIO_MACHINE = 'cardio_machine',
  NONE = 'none'
}

export enum MeasurementType {
  REPS = 'reps',
  DURATION = 'duration',
  DISTANCE = 'distance'
}

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

// Type guards for runtime validation
export const isMuscleGroup = (value: string): value is MuscleGroup =>
  Object.values(MuscleGroup).includes(value as MuscleGroup);

export const isExerciseCategory = (value: string): value is ExerciseCategory =>
  Object.values(ExerciseCategory).includes(value as ExerciseCategory);

export const isWorkoutCategory = (value: string): value is WorkoutCategory =>
  Object.values(WorkoutCategory).includes(value as WorkoutCategory);

export const isEquipment = (value: string): value is Equipment =>
  Object.values(Equipment).includes(value as Equipment);

export const isMeasurementType = (value: string): value is MeasurementType =>
  Object.values(MeasurementType).includes(value as MeasurementType);

export const isDifficulty = (value: string): value is Difficulty =>
  Object.values(Difficulty).includes(value as Difficulty);

// Utility arrays for UI dropdowns
export const MUSCLE_GROUP_OPTIONS = Object.values(MuscleGroup);
export const EXERCISE_CATEGORY_OPTIONS = Object.values(ExerciseCategory);
export const WORKOUT_CATEGORY_OPTIONS = Object.values(WorkoutCategory);
export const EQUIPMENT_OPTIONS = Object.values(Equipment);
export const MEASUREMENT_TYPE_OPTIONS = Object.values(MeasurementType);
export const DIFFICULTY_OPTIONS = Object.values(Difficulty);