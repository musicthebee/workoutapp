import type { 
  UUID, 
  CreateExerciseInput,
  UpdateExerciseInput,
  CreateWorkoutInput,
  UpdateWorkoutInput,
  AddExerciseToWorkoutInput,
  AIGenerationRequest,
  CompleteWorkoutInput,
} from '@/types';

import type {
  Exercise,
  Workout,
  WorkoutExercise,
  WorkoutPerformance,
  WorkoutCategory,
  Difficulty,
  ExerciseCategory,
  Equipment,
  MuscleGroup,
} from '@/types/database/models';

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
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'MockApiError';
  }
}

// Helper functions
const delay = (ms: number = 300): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock database instance
const mockDatabase: MockDatabase = {
  exercises: [
    // Library exercises (user_id = null)
    {
      id: 'lib_ex_1',
      user_id: null,
      source_id: null,
      name: 'Barbell Bench Press',
      muscle_groups: ['chest', 'triceps', 'shoulders'],
      category: 'strength',
      equipment: 'barbell',
      instructions: 'Lie on bench, lower bar to chest with control, press up powerfully.',
      measurement_type: 'reps',
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
      muscle_groups: ['back', 'biceps'] ,
      category: 'strength',
      equipment: 'bodyweight',
      instructions: 'Hang from bar, pull up until chin over bar.',
      measurement_type: 'reps',
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
  ],
  
  workouts: [
    {
      id: 'lib_w_1',
      user_id: null,
      source_id: null,
      name: 'Push Day - Beginner',
      description: 'Chest, shoulders, and triceps workout',
      category: 'strength',
      difficulty: 'beginner',
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
      throw new Error('User not authenticated');
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
    return mockDatabase.exercises.filter(ex => 
      !ex.is_archived && (ex.user_id === userId || ex.user_id === null)
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
      ...input,
      muscle_groups: [...input.muscle_groups], // Convert readonly array to mutable
      measurement_type: input.measurement_type as 'reps' | 'duration' | 'distance',
      id: `ex_${Date.now()}`,
      source_id: input.source_id || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_favorite: false,
      is_archived: false,
      is_ai_generated: input.is_ai_generated || false,
      ai_prompt: input.ai_prompt || null,
      notes: null,
      embedding: null,
      difficulty_score: null,
      popularity_score: 0,
      default_reps: input.default_reps ?? null,
      default_duration: input.default_duration ?? null,
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
    
    mockDatabase.exercises[index] = {
      ...exercise,
      ...updates,
      muscle_groups: updates.muscle_groups ? [...updates.muscle_groups] : exercise.muscle_groups,
      measurement_type: updates.measurement_type ? updates.measurement_type as 'reps' | 'duration' | 'distance' : exercise.measurement_type,
      updated_at: new Date().toISOString(),
    };
    
    return mockDatabase.exercises[index]!;
  },

  async copyExerciseFromLibrary(libraryExerciseId: UUID, userId: UUID): Promise<Exercise> {
    await delay();
    
    const libraryExercise = mockDatabase.exercises.find(
      ex => ex.id === libraryExerciseId && !ex.user_id
    );
    
    if (!libraryExercise) {
      throw new MockApiError('Library exercise not found', 'NOT_FOUND', 404);
    }
    
    const existing = mockDatabase.exercises.find(
      ex => ex.source_id === libraryExerciseId && ex.user_id === userId
    );
    if (existing) return existing;
    
    const copiedExercise: Exercise = {
      ...libraryExercise,
      id: `ex_${Date.now()}`,
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
    
    const workouts = mockDatabase.workouts.filter(w => 
      !w.is_archived && (w.user_id === userId || w.user_id === null)
    );
    
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
    
    const workoutId = `w_${Date.now()}`;
    const newWorkout: Workout = {
      ...input,
      id: workoutId,
      source_id: input.source_id || null,
      description: input.description || null,
      estimated_duration_minutes: input.estimated_duration_minutes,
      workout_exercises: input.exercises ? input.exercises.map(e => ({
        workout_id: workoutId,
        exercise_id: e.exercise_id,
        exercise_order: e.exercise_order,
        sets: e.sets,
        reps: e.reps ?? null,
        duration: e.duration ?? null,
        rest: e.rest,
        notes: null,
        created_at: new Date().toISOString(),
      })) : [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_favorite: false,
      is_archived: false,
      is_ai_generated: input.is_ai_generated || false,
      ai_prompt: input.ai_prompt || null,
      notes: null,
      embedding: null,
      total_volume_estimate: null,
      popularity_score: 0,
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
    
    mockDatabase.workouts[index] = {
      ...workout,
      ...updates,
      updated_at: new Date().toISOString(),
    };
    
    return mockDatabase.workouts[index]!;
  },

  async addExerciseToWorkout(
    workoutId: UUID, 
    exerciseId: UUID, 
    order: number, 
    config: Omit<AddExerciseToWorkoutInput, 'workout_id' | 'exercise_id' | 'exercise_order'>
  ): Promise<Workout> {
    await delay();
    
    const workoutIndex = mockDatabase.workouts.findIndex(w => w.id === workoutId);
    if (workoutIndex === -1) {
      throw new MockApiError('Workout not found', 'NOT_FOUND', 404);
    }
    
    const newExercise: WorkoutExercise = {
      workout_id: workoutId,
      exercise_id: exerciseId,
      exercise_order: order,
      sets: config.sets,
      reps: config.reps ?? null,
      duration: config.duration ?? null,
      rest: config.rest,
      notes: null,
      created_at: new Date().toISOString(),
    };
    
    mockDatabase.workouts[workoutIndex]!.workout_exercises.push(newExercise);
    mockDatabase.workouts[workoutIndex]!.updated_at = new Date().toISOString();
    
    return mockDatabase.workouts[workoutIndex]!;
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
    
    const performance: WorkoutPerformance = {
      id: `perf_${Date.now()}`,
      user_id: userId,
      workout_id: workoutId,
      started_at: new Date().toISOString(),
      completed_at: null,
      notes: null,
      exercise_performances: [],
    };
    
    mockDatabase.performances.push(performance);
    return performance;
  },

  async completeWorkoutPerformance(
    performanceId: UUID, 
    data: Omit<CompleteWorkoutInput, 'workout_performance_id'>
  ): Promise<WorkoutPerformance> {
    await delay();
    
    const index = mockDatabase.performances.findIndex(p => p.id === performanceId);
    if (index === -1) {
      throw new MockApiError('Performance not found', 'NOT_FOUND', 404);
    }
    
    mockDatabase.performances[index] = {
      ...mockDatabase.performances[index]!,
      ...data,
      exercise_performances: data.exercise_performances.map(ep => ({
        ...ep,
        set_performances: [...ep.set_performances]
      })),
      completed_at: data.completed_at,
    };
    
    return mockDatabase.performances[index]!;
  },

  // AI Generation
  async generateExerciseWithAI(
    request: AIGenerationRequest
  ): Promise<Omit<Exercise, 'id' | 'created_at' | 'updated_at'>> {
    await delay(1000);
    
    return {
      user_id: request.user_id,
      source_id: null,
      name: `AI Exercise: ${request.prompt?.slice(0, 20) || 'Generated'}...`,
      muscle_groups: request.constraints?.muscle_groups ? [...request.constraints.muscle_groups] : ['core'],
      category: 'strength',
      equipment: request.constraints?.equipment?.[0] || 'bodyweight',
      instructions: `AI Generated: Based on your request "${request.prompt || 'custom exercise'}"...`,
      measurement_type: 'reps',
      default_sets: 3,
      default_reps: 12,
      default_duration: null,
      default_rest: 60,
      is_favorite: false,
      is_archived: false,
      is_ai_generated: true,
      ai_prompt: request.prompt || null,
      notes: null,
      embedding: null,
      difficulty_score: null,
      popularity_score: 0,
    };
  },

  async generateWorkoutWithAI(
    request: AIGenerationRequest
  ): Promise<Omit<Workout, 'id' | 'created_at' | 'updated_at'>> {
    await delay(1500);
    
    return {
      user_id: request.user_id,
      source_id: null,
      name: `AI Workout: ${request.constraints?.duration_minutes || 30}min`,
      description: `AI Generated workout based on: ${request.prompt || 'your preferences'}`,
      category: (request.constraints?.workout_type as WorkoutCategory) || 'hybrid',
      difficulty: (request.constraints?.fitness_level as Difficulty) || 'intermediate',
      estimated_duration_minutes: request.constraints?.duration_minutes || 30,
      workout_exercises: [],
      is_favorite: false,
      is_archived: false,
      is_ai_generated: true,
      ai_prompt: request.prompt || null,
      notes: null,
      embedding: null,
      total_volume_estimate: null,
      popularity_score: 0,
    };
  },
};

// Helper for seeding more test data
export const seedMockData = {
  addMoreExercises: (count: number = 10): void => {
    const categories: ExerciseCategory[] = ['strength', 'cardio', 'mobility', 'balance'];
    const equipment: Equipment[] = ['barbell', 'dumbbell', 'cable', 'machine', 'bodyweight'];
    const muscleGroups: MuscleGroup[] = ['chest', 'back', 'quads', 'shoulders', 'biceps', 'core'];
    
    for (let i = 0; i < count; i++) {
      const exercise: Exercise = {
        id: `seed_ex_${i}`,
        user_id: null,
        source_id: null,
        name: `Exercise ${i + 1}`,
        muscle_groups: [muscleGroups[i % muscleGroups.length]!],
        category: categories[i % categories.length]!,
        equipment: equipment[i % equipment.length]!,
        instructions: `Instructions for exercise ${i + 1}`,
        measurement_type: i % 3 === 0 ? 'duration' : 'reps',
        default_sets: 3,
        default_reps: i % 3 === 0 ? null : 10,
        default_duration: i % 3 === 0 ? 30 : null,
        default_rest: 60,
        is_favorite: false,
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
  },
  
  clearUserData: (): void => {
    mockDatabase.exercises = mockDatabase.exercises.filter(ex => !ex.user_id);
    mockDatabase.workouts = mockDatabase.workouts.filter(w => !w.user_id);
    mockDatabase.performances = [];
  },
};
