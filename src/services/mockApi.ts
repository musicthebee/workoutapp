import type {
  AddExerciseToWorkoutInput,
  AIGenerationRequest,
  CompleteWorkoutInput,
  CreateExerciseInput,
  CreateWorkoutInput,
  UpdateExerciseInput,
  UpdateWorkoutInput,
  UUID,
} from '@/types';

import type {
  Exercise,
  Workout,
  WorkoutExercise,
  WorkoutPerformance,
} from '@/types/database/models';
import {
  Difficulty,
  Equipment,
  ExerciseCategory,
  MeasurementType,
  MuscleGroup,
  WorkoutCategory,
} from '@/types/database/enums';

import { authService } from '@/services/auth.service';

/**
 * Mock API Service
 * Provides mock data and operations for development
 * All methods are properly typed with no `any` types
 */

// Mock database
interface MockDatabase {
  exercises: Exercise[];
  workouts: Workout[];
  performances: WorkoutPerformance[];
}

// Error class
export class MockApiError extends Error {
  constructor(message: string, public code: string, public statusCode: number = 400) {
    super(message);
    this.name = 'MockApiError';
  }
}

// Helper functions
const delay = (ms: number = 300): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

const generateId = (prefix: string): UUID =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Mock database instance
const mockDatabase: MockDatabase = {
  exercises: [
    // Library exercises (user_id = null)
    {
      id: 'lib_ex_1',
      user_id: null,
      source_id: null,
      name: 'Barbell Bench Press',
      muscle_groups: [MuscleGroup.CHEST, MuscleGroup.TRICEPS, MuscleGroup.SHOULDERS],
      category: ExerciseCategory.STRENGTH,
      equipment: Equipment.BARBELL,
      instructions: 'Lie on bench, lower bar to chest with control, press up powerfully.',
      measurement_type: MeasurementType.REPS,
      default_sets: 3,
      default_reps: 10,
      default_duration: null,
      default_rest: 90,
      embedding: null,
      difficulty_score: 7,
      popularity_score: 85,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: false,
      ai_prompt: null,
      notes: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 'lib_ex_2',
      user_id: null,
      source_id: null,
      name: 'Pull-ups',
      muscle_groups: [MuscleGroup.BACK, MuscleGroup.BICEPS],
      category: ExerciseCategory.STRENGTH,
      equipment: Equipment.BODYWEIGHT,
      instructions: 'Hang from bar, pull up until chin over bar.',
      measurement_type: MeasurementType.REPS,
      default_sets: 3,
      default_reps: 8,
      default_duration: null,
      default_rest: 90,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: false,
      ai_prompt: null,
      notes: null,
      embedding: null,
      difficulty_score: 8,
      popularity_score: 75,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 'lib_ex_3',
      user_id: null,
      source_id: null,
      name: 'Plank',
      muscle_groups: [MuscleGroup.CORE, MuscleGroup.ABS],
      category: ExerciseCategory.STRENGTH,
      equipment: Equipment.BODYWEIGHT,
      instructions: 'Hold plank position with straight body line.',
      measurement_type: MeasurementType.DURATION,
      default_sets: 3,
      default_reps: null,
      default_duration: 60,
      default_rest: 30,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: false,
      ai_prompt: null,
      notes: null,
      embedding: null,
      difficulty_score: 5,
      popularity_score: 70,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
  ],

  workouts: [
    {
      id: 'lib_w_1',
      user_id: null,
      source_id: null,
      name: 'Push Day - Beginner',
      description: 'Chest, shoulders, and triceps workout',
      category: WorkoutCategory.STRENGTH,
      difficulty: Difficulty.BEGINNER,
      estimated_duration_minutes: 45,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: false,
      ai_prompt: null,
      notes: null,
      embedding: null,
      total_volume_estimate: 2500,
      popularity_score: 90,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      workout_exercises: [
        {
          workout_id: 'lib_w_1',
          exercise_id: 'lib_ex_1',
          exercise_order: 1.0,
          sets: 3,
          reps: 10,
          duration: null,
          rest: 90,
          notes: null,
          created_at: '2024-01-01T00:00:00Z',
        },
      ],
    },
  ],

  performances: [],
};

// Mock API implementation
export const mockApi = {
  // Auth
  async getCurrentUser(): Promise<{ id: UUID; name: string; email: string }> {
    await delay();
    const current_user = authService.get_current_user();
    if (!current_user) {
      throw new MockApiError('User not authenticated', 'UNAUTHORIZED', 401);
    }
    return {
      id: current_user.id,
      name: current_user.display_name || 'Unknown User',
      email: current_user.email || '',
    };
  },

  // Exercises
  async getExercises(userId: UUID): Promise<Exercise[]> {
    await delay();
    return mockDatabase.exercises.filter(
      ex => !ex.is_archived && (ex.user_id === userId || ex.user_id === null),
    );
  },

  async getExerciseById(id: UUID): Promise<Exercise> {
    await delay(100);
    const exercise = mockDatabase.exercises.find(ex => ex.id === id);
    if (!exercise) {
      throw new MockApiError('Exercise not found', 'NOT_FOUND', 404);
    }
    return exercise;
  },

  async createExercise(input: CreateExerciseInput): Promise<Exercise> {
    await delay();

    const newExercise: Exercise = {
      id: generateId('ex'),
      user_id: input.user_id,
      source_id: input.source_id || null,
      name: input.name,
      muscle_groups: [...input.muscle_groups],
      category: input.category,
      equipment: input.equipment,
      instructions: input.instructions,
      measurement_type: input.measurement_type,
      default_sets: input.default_sets,
      default_reps: input.default_reps ?? null,
      default_duration: input.default_duration ?? null,
      default_rest: input.default_rest,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: input.is_ai_generated || false,
      ai_prompt: input.ai_prompt || null,
      notes: input.notes || null,
      embedding: null,
      difficulty_score: null,
      popularity_score: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockDatabase.exercises.push(newExercise);
    return newExercise;
  },

  async updateExercise(id: UUID, updates: UpdateExerciseInput): Promise<Exercise> {
    await delay();

    const index = mockDatabase.exercises.findIndex(ex => ex.id === id);
    if (index === -1) {
      throw new MockApiError('Exercise not found', 'NOT_FOUND', 404);
    }

    const exercise = mockDatabase.exercises[index]!;
    if (!exercise.user_id) {
      throw new MockApiError('Cannot modify library exercises', 'FORBIDDEN', 403);
    }

    const updatedExercise: Exercise = {
      ...exercise,
      ...updates,
      muscle_groups: updates.muscle_groups ? [...updates.muscle_groups] : exercise.muscle_groups,
      updated_at: new Date().toISOString(),
    };

    mockDatabase.exercises[index] = updatedExercise;
    return updatedExercise;
  },

  async deleteExercise(id: UUID): Promise<void> {
    await delay();

    const index = mockDatabase.exercises.findIndex(ex => ex.id === id);
    if (index === -1) {
      throw new MockApiError('Exercise not found', 'NOT_FOUND', 404);
    }

    const exercise = mockDatabase.exercises[index]!;
    if (!exercise.user_id) {
      throw new MockApiError('Cannot delete library exercises', 'FORBIDDEN', 403);
    }

    // Soft delete
    mockDatabase.exercises[index] = {
      ...exercise,
      is_archived: true,
      updated_at: new Date().toISOString(),
    };
  },

  async copyExerciseFromLibrary(libraryExerciseId: UUID, userId: UUID): Promise<Exercise> {
    await delay();

    const libraryExercise = mockDatabase.exercises.find(
      ex => ex.id === libraryExerciseId && !ex.user_id,
    );

    if (!libraryExercise) {
      throw new MockApiError('Library exercise not found', 'NOT_FOUND', 404);
    }

    // Check if already copied
    const existing = mockDatabase.exercises.find(
      ex => ex.source_id === libraryExerciseId && ex.user_id === userId,
    );
    if (existing) {
      return existing;
    }

    const copiedExercise: Exercise = {
      ...libraryExercise,
      id: generateId('ex'),
      user_id: userId,
      source_id: libraryExerciseId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockDatabase.exercises.push(copiedExercise);
    return copiedExercise;
  },

  // Workouts
  async getWorkouts(userId: UUID): Promise<Workout[]> {
    await delay();

    const workouts = mockDatabase.workouts.filter(
      w => !w.is_archived && (w.user_id === userId || w.user_id === null),
    );

    // Populate exercise references
    return workouts.map(workout => ({
      ...workout,
      workout_exercises: workout.workout_exercises.map(we => ({
        ...we,
        exercise: mockDatabase.exercises.find(ex => ex.id === we.exercise_id),
      })),
    }));
  },

  async getWorkoutById(id: UUID): Promise<Workout> {
    await delay(100);
    const workout = mockDatabase.workouts.find(w => w.id === id);
    if (!workout) {
      throw new MockApiError('Workout not found', 'NOT_FOUND', 404);
    }

    return {
      ...workout,
      workout_exercises: workout.workout_exercises.map(we => ({
        ...we,
        exercise: mockDatabase.exercises.find(ex => ex.id === we.exercise_id),
      })),
    };
  },

  async createWorkout(input: CreateWorkoutInput): Promise<Workout> {
    await delay();

    const workoutId = generateId('w');
    const newWorkout: Workout = {
      id: workoutId,
      user_id: input.user_id,
      source_id: input.source_id || null,
      name: input.name,
      description: input.description || null,
      category: input.category,
      difficulty: input.difficulty,
      estimated_duration_minutes: input.estimated_duration_minutes,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: input.is_ai_generated || false,
      ai_prompt: input.ai_prompt || null,
      notes: input.notes || null,
      embedding: null,
      total_volume_estimate: 0,
      popularity_score: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      workout_exercises: input.exercises
        ? input.exercises.map(e => ({
            workout_id: workoutId,
            exercise_id: e.exercise_id,
            exercise_order: e.exercise_order,
            sets: e.sets,
            reps: e.reps ?? null,
            duration: e.duration ?? null,
            rest: e.rest,
            notes: e.notes || null,
            created_at: new Date().toISOString(),
          }))
        : [],
    };

    mockDatabase.workouts.push(newWorkout);
    return newWorkout;
  },

  async updateWorkout(id: UUID, updates: UpdateWorkoutInput): Promise<Workout> {
    await delay();

    const index = mockDatabase.workouts.findIndex(w => w.id === id);
    if (index === -1) {
      throw new MockApiError('Workout not found', 'NOT_FOUND', 404);
    }

    const workout = mockDatabase.workouts[index]!;
    if (!workout.user_id) {
      throw new MockApiError('Cannot modify library workouts', 'FORBIDDEN', 403);
    }

    const updatedWorkout: Workout = {
      ...workout,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    mockDatabase.workouts[index] = updatedWorkout;
    return updatedWorkout;
  },

  async deleteWorkout(id: UUID): Promise<void> {
    await delay();

    const index = mockDatabase.workouts.findIndex(w => w.id === id);
    if (index === -1) {
      throw new MockApiError('Workout not found', 'NOT_FOUND', 404);
    }

    const workout = mockDatabase.workouts[index]!;
    if (!workout.user_id) {
      throw new MockApiError('Cannot delete library workouts', 'FORBIDDEN', 403);
    }

    // Soft delete
    mockDatabase.workouts[index] = {
      ...workout,
      is_archived: true,
      updated_at: new Date().toISOString(),
    };
  },

  async copyWorkoutFromLibrary(libraryWorkoutId: UUID, userId: UUID): Promise<Workout> {
    await delay();

    const libraryWorkout = mockDatabase.workouts.find(w => w.id === libraryWorkoutId && !w.user_id);

    if (!libraryWorkout) {
      throw new MockApiError('Library workout not found', 'NOT_FOUND', 404);
    }

    // Copy all exercises first
    const copiedExerciseIds = new Map<UUID, UUID>();
    for (const we of libraryWorkout.workout_exercises) {
      const copiedExercise = await this.copyExerciseFromLibrary(we.exercise_id, userId);
      copiedExerciseIds.set(we.exercise_id, copiedExercise.id);
    }

    // Create the copied workout
    const workoutId = generateId('w');
    const copiedWorkout: Workout = {
      ...libraryWorkout,
      id: workoutId,
      user_id: userId,
      source_id: libraryWorkoutId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      workout_exercises: libraryWorkout.workout_exercises.map(we => ({
        ...we,
        workout_id: workoutId,
        exercise_id: copiedExerciseIds.get(we.exercise_id) || we.exercise_id,
        created_at: new Date().toISOString(),
      })),
    };

    mockDatabase.workouts.push(copiedWorkout);
    return copiedWorkout;
  },

  async addExerciseToWorkout(workoutId: UUID, config: AddExerciseToWorkoutInput): Promise<Workout> {
    await delay();

    const workoutIndex = mockDatabase.workouts.findIndex(w => w.id === workoutId);
    if (workoutIndex === -1) {
      throw new MockApiError('Workout not found', 'NOT_FOUND', 404);
    }

    const workout = mockDatabase.workouts[workoutIndex]!;
    if (!workout.user_id) {
      throw new MockApiError('Cannot modify library workouts', 'FORBIDDEN', 403);
    }

    // Calculate order position
    const existingOrders = workout.workout_exercises.map(we => we.exercise_order);
    let newOrder: number;

    if (config.insert_after_position !== undefined && config.insert_before_position !== undefined) {
      // Insert between
      newOrder = (config.insert_after_position + config.insert_before_position) / 2;
    } else if (config.insert_after_position !== undefined) {
      // Insert after
      newOrder = config.insert_after_position + 1;
    } else if (config.insert_before_position !== undefined) {
      // Insert before
      newOrder = config.insert_before_position / 2;
    } else {
      // Append to end
      newOrder = existingOrders.length > 0 ? Math.max(...existingOrders) + 1 : 1;
    }

    const newExercise: WorkoutExercise = {
      workout_id: workoutId,
      exercise_id: config.exercise_id,
      exercise_order: newOrder,
      sets: config.sets,
      reps: config.reps ?? null,
      duration: config.duration ?? null,
      rest: config.rest,
      notes: config.notes || null,
      created_at: new Date().toISOString(),
    };

    mockDatabase.workouts[workoutIndex]!.workout_exercises.push(newExercise);
    mockDatabase.workouts[workoutIndex]!.updated_at = new Date().toISOString();

    return mockDatabase.workouts[workoutIndex]!;
  },

  async removeExerciseFromWorkout(workoutId: UUID, exerciseId: UUID): Promise<Workout> {
    await delay();

    const workoutIndex = mockDatabase.workouts.findIndex(w => w.id === workoutId);
    if (workoutIndex === -1) {
      throw new MockApiError('Workout not found', 'NOT_FOUND', 404);
    }

    const workout = mockDatabase.workouts[workoutIndex]!;
    if (!workout.user_id) {
      throw new MockApiError('Cannot modify library workouts', 'FORBIDDEN', 403);
    }

    workout.workout_exercises = workout.workout_exercises.filter(
      we => we.exercise_id !== exerciseId,
    );
    workout.updated_at = new Date().toISOString();

    mockDatabase.workouts[workoutIndex] = workout;
    return workout;
  },

  // Performance
  async getPerformanceHistory(userId: UUID, limit: number = 50): Promise<WorkoutPerformance[]> {
    await delay();

    return mockDatabase.performances
      .filter(p => p.user_id === userId)
      .sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())
      .slice(0, limit);
  },

  async startWorkoutPerformance(userId: UUID, workoutId: UUID): Promise<WorkoutPerformance> {
    await delay();

    const workout = mockDatabase.workouts.find(w => w.id === workoutId);
    if (!workout) {
      throw new MockApiError('Workout not found', 'NOT_FOUND', 404);
    }

    const performance: WorkoutPerformance = {
      id: generateId('perf'),
      user_id: userId,
      workout_id: workoutId,
      started_at: new Date().toISOString(),
      completed_at: null,
      notes: null,
      created_at: new Date().toISOString(),
      exercises_performed: [], // JSONB field
      exercise_performances: [], // Application helper
    };

    mockDatabase.performances.push(performance);
    return performance;
  },

  async completeWorkoutPerformance(
    performanceId: UUID,
    data: CompleteWorkoutInput,
  ): Promise<WorkoutPerformance> {
    await delay();

    const index = mockDatabase.performances.findIndex(p => p.id === performanceId);
    if (index === -1) {
      throw new MockApiError('Performance not found', 'NOT_FOUND', 404);
    }

    const completedPerformance: WorkoutPerformance = {
      ...mockDatabase.performances[index]!,
      completed_at: data.completed_at,
      notes: data.notes || null,
      exercise_performances: data.exercise_performances.map(ep => ({
        ...ep,
        set_performances: [...ep.set_performances],
      })),
    };

    mockDatabase.performances[index] = completedPerformance;
    return completedPerformance;
  },

  // AI Generation
  async generateExerciseWithAI(
    request: AIGenerationRequest,
  ): Promise<Omit<Exercise, 'id' | 'created_at' | 'updated_at'>> {
    await delay(1000); // Simulate AI processing

    // Simulate AI response based on request
    const muscleGroups = request.constraints?.muscle_groups || [MuscleGroup.CHEST];
    const equipment = request.constraints?.equipment?.[0] || Equipment.BARBELL;
    const difficulty = request.constraints?.difficulty || Difficulty.INTERMEDIATE;

    return {
      user_id: request.user_id,
      source_id: null,
      name: `AI Generated: ${request.prompt?.slice(0, 30) || 'Custom Exercise'}`,
      muscle_groups: [...muscleGroups],
      category: ExerciseCategory.STRENGTH,
      equipment,
      instructions: `AI Generated Instructions: ${
        request.prompt || 'Perform exercise with proper form'
      }`,
      measurement_type: MeasurementType.REPS,
      default_sets: 3,
      default_reps: 10,
      default_duration: null,
      default_rest: 90,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: true,
      ai_prompt: request.prompt || null,
      notes: null,
      embedding: null,
      difficulty_score: difficulty === Difficulty.BEGINNER ? 3 : difficulty === Difficulty.ADVANCED ? 8 : 5,
      popularity_score: 0,
    };
  },

  async generateWorkoutWithAI(
    request: AIGenerationRequest,
  ): Promise<Omit<Workout, 'id' | 'created_at' | 'updated_at'>> {
    await delay(1500); // Simulate AI processing

    const duration = request.constraints?.duration || 45;
    const difficulty = request.constraints?.difficulty || Difficulty.INTERMEDIATE;

    return {
      user_id: request.user_id,
      source_id: null,
      name: `AI Workout: ${request.prompt?.slice(0, 30) || 'Custom Workout'}`,
      description: `AI generated workout based on: ${request.prompt}`,
      category: WorkoutCategory.STRENGTH,
      difficulty,
      estimated_duration_minutes: duration,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: true,
      ai_prompt: request.prompt || null,
      notes: null,
      embedding: null,
      total_volume_estimate: 0,
      popularity_score: 0,
      workout_exercises: [], // Would be populated with exercises in real implementation
    };
  },

  // Utility methods
  seedDatabase: (count: number = 20): void => {
    const muscleGroups: MuscleGroup[] = [
      MuscleGroup.CHEST,
      MuscleGroup.BACK,
      MuscleGroup.SHOULDERS,
      MuscleGroup.BICEPS,
      MuscleGroup.TRICEPS,
      MuscleGroup.QUADS,
      MuscleGroup.HAMSTRINGS,
      MuscleGroup.ABS,
    ];
    const categories: ExerciseCategory[] = [ExerciseCategory.STRENGTH, ExerciseCategory.CARDIO, ExerciseCategory.MOBILITY, ExerciseCategory.PLYOMETRIC];
    const equipment: Equipment[] = [Equipment.BARBELL, Equipment.DUMBBELL, Equipment.BODYWEIGHT, Equipment.CABLE, Equipment.MACHINE];

    // Generate exercises
    for (let i = 0; i < count; i++) {
      const exercise: Exercise = {
        id: generateId('ex'),
        user_id: Math.random() > 0.5 ? 'user_123' : null,
        source_id: null,
        name: `Exercise ${i + 1}`,
        muscle_groups: [
          muscleGroups[Math.floor(Math.random() * muscleGroups.length)]!,
          muscleGroups[Math.floor(Math.random() * muscleGroups.length)]!,
        ],
        category: categories[Math.floor(Math.random() * categories.length)]!,
        equipment: equipment[Math.floor(Math.random() * equipment.length)]!,
        instructions: `Instructions for exercise ${i + 1}`,
        measurement_type: Math.random() > 0.3 ? MeasurementType.REPS : MeasurementType.DURATION,
        default_sets: 3,
        default_reps: Math.random() > 0.3 ? 10 : null,
        default_duration: Math.random() > 0.7 ? 60 : null,
        default_rest: 60,
        is_favorite: Math.random() > 0.8,
        is_archived: false,
        is_ai_generated: false,
        ai_prompt: null,
        notes: null,
        embedding: null,
        difficulty_score: Math.floor(Math.random() * 10) + 1,
        popularity_score: Math.floor(Math.random() * 100),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      mockDatabase.exercises.push(exercise);
    }

    // Generate workouts
    const workoutCategories: WorkoutCategory[] = [WorkoutCategory.STRENGTH, WorkoutCategory.CARDIO, WorkoutCategory.HIIT, WorkoutCategory.CIRCUIT];
    const difficulties: Difficulty[] = [Difficulty.BEGINNER, Difficulty.INTERMEDIATE, Difficulty.ADVANCED];

    for (let i = 0; i < Math.floor(count / 2); i++) {
      const workoutId = generateId('w');
      const exerciseCount = Math.floor(Math.random() * 5) + 3;
      const workoutExercises: WorkoutExercise[] = [];

      for (let j = 0; j < exerciseCount; j++) {
        const randomExercise =
          mockDatabase.exercises[Math.floor(Math.random() * mockDatabase.exercises.length)]!;
        workoutExercises.push({
          workout_id: workoutId,
          exercise_id: randomExercise.id,
          exercise_order: j + 1,
          sets: 3,
          reps: randomExercise.measurement_type === MeasurementType.REPS ? 10 : null,
          duration: randomExercise.measurement_type === MeasurementType.DURATION ? 60 : null,
          rest: 60,
          notes: null,
          created_at: new Date().toISOString(),
        });
      }

      const workout: Workout = {
        id: workoutId,
        user_id: Math.random() > 0.5 ? 'user_123' : null,
        source_id: null,
        name: `Workout ${i + 1}`,
        description: `Description for workout ${i + 1}`,
        category: workoutCategories[Math.floor(Math.random() * workoutCategories.length)]!,
        difficulty: difficulties[Math.floor(Math.random() * difficulties.length)]!,
        estimated_duration_minutes: 30 + Math.floor(Math.random() * 60),
        is_favorite: Math.random() > 0.8,
        is_archived: false,
        is_ai_generated: false,
        ai_prompt: null,
        notes: null,
        embedding: null,
        total_volume_estimate: Math.floor(Math.random() * 10000),
        popularity_score: Math.floor(Math.random() * 100),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        workout_exercises: workoutExercises,
      };
      mockDatabase.workouts.push(workout);
    }
  },

  clearUserData: (): void => {
    mockDatabase.exercises = mockDatabase.exercises.filter(ex => !ex.user_id);
    mockDatabase.workouts = mockDatabase.workouts.filter(w => !w.user_id);
    mockDatabase.performances = [];
  },

  resetDatabase: (): void => {
    mockDatabase.exercises = mockDatabase.exercises.filter(ex => ex.id.startsWith('lib_'));
    mockDatabase.workouts = mockDatabase.workouts.filter(w => w.id.startsWith('lib_'));
    mockDatabase.performances = [];
  },
};
