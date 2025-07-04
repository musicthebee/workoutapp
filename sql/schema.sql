-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector"; -- For embeddings

-- Type Definitions
CREATE TYPE muscle_group AS ENUM (
    'chest', 'back', 'shoulders', 
    'biceps', 'triceps', 'forearms',
    'abs', 'obliques', 'core',
    'quads', 'hamstrings', 'glutes', 'calves',
    'cardio'
);

CREATE TYPE exercise_category AS ENUM (
    'strength',      -- traditional resistance training
    'cardio',        -- endurance/aerobic
    'plyometric',    -- explosive movements
    'mobility',      -- stretching/flexibility
    'balance',       -- stability work
    'power'          -- olympic lifts, explosive strength
);

CREATE TYPE workout_category AS ENUM (
    'strength',      -- traditional lifting session
    'cardio',        -- endurance focused session
    'hiit',          -- high intensity intervals
    'circuit',       -- rotating exercises, minimal rest
    'mobility',      -- yoga/stretching session
    'hybrid'         -- mixed goals
);

CREATE TYPE equipment AS ENUM (
    'barbell', 'dumbbell', 'kettlebell',
    'cable', 'machine', 'bodyweight',
    'bands', 'medicine_ball', 'trx',
    'cardio_machine', 'none'
);

CREATE TYPE measurement_type AS ENUM (
    'reps',          -- count based
    'duration',          -- duration based (seconds)
    'distance'       -- distance based (meters)
);

CREATE TYPE difficulty AS ENUM (
    'beginner',
    'intermediate', 
    'advanced'
);

-- Users Table
CREATE TABLE sys_user (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firebase_uid VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100),
    date_of_birth DATE,
    -- Physical attributes for tracking
    height_cm INTEGER,
    weight_kg DECIMAL(5,2),
    -- Preferences
    preferred_units VARCHAR(10) DEFAULT 'metric' CHECK (preferred_units IN ('metric', 'imperial')),
    rest_timer_enabled BOOLEAN DEFAULT TRUE,
    rest_timer_auto_start BOOLEAN DEFAULT FALSE,
    -- Notification preferences
    workout_reminders BOOLEAN DEFAULT TRUE,
    achievement_notifications BOOLEAN DEFAULT TRUE,
    -- Training preferences
    training_experience difficulty DEFAULT 'beginner',
    primary_goal VARCHAR(50), -- 'strength', 'muscle', 'endurance', 'weight_loss', 'general_fitness'
    -- Account status
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Exercise Table (Library + User exercises)
CREATE TABLE exercise (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES sys_user(id) ON DELETE CASCADE, -- NULL = library exercise
    source_id UUID REFERENCES exercise(id), -- NULL = original, else points to what it was copied from
    name VARCHAR(100) NOT NULL,
    muscle_groups muscle_group[] NOT NULL CHECK (array_length(muscle_groups, 1) > 0),
    category exercise_category NOT NULL,
    equipment equipment NOT NULL,
    instructions TEXT NOT NULL,
    measurement_type measurement_type NOT NULL,
    -- Default recommendations
    default_sets INTEGER NOT NULL,
    default_reps INTEGER, -- NULL for time/distance based
    default_duration INTEGER, -- NULL for rep based
    default_rest INTEGER NOT NULL DEFAULT 60,
    -- User specific fields (only used when user_id is not null)
    notes TEXT,
    is_favorite BOOLEAN DEFAULT FALSE,
    -- Embeddings for semantic search and recommendations
    embedding vector(1536), -- OpenAI ada-002 embeddings
    is_archived BOOLEAN DEFAULT FALSE,
    is_ai_generated BOOLEAN DEFAULT FALSE,
    ai_prompt TEXT,
    -- Metadata for better filtering/recommendations
    difficulty_score INTEGER CHECK (difficulty_score BETWEEN 1 AND 10), -- 1-10 scale
    popularity_score INTEGER DEFAULT 0, -- track usage across users
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_measurement_values CHECK (
        (measurement_type = 'reps' AND default_reps IS NOT NULL AND default_duration IS NULL) OR
        (measurement_type IN ('duration', 'distance') AND default_duration IS NOT NULL AND default_reps IS NULL)
    )
);

-- Workout Table (Library + User workouts)
CREATE TABLE workout (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES sys_user(id) ON DELETE CASCADE, -- NULL = library workout
    source_id UUID REFERENCES workout(id), -- NULL = original, else points to what it was copied from
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category workout_category NOT NULL,
    difficulty difficulty NOT NULL,
    estimated_duration_minutes INTEGER NOT NULL,
    -- User specific fields
    notes TEXT,
    is_favorite BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    is_ai_generated BOOLEAN DEFAULT FALSE,
    ai_prompt TEXT,
    -- Embeddings for semantic search and recommendations
    embedding vector(1536), -- OpenAI ada-002 embeddings
    -- Metadata
    total_volume_estimate INTEGER, -- estimated total volume for tracking
    popularity_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Workout Exercise Junction
CREATE TABLE workout_exercise (
    workout_id UUID REFERENCES workout(id) ON DELETE CASCADE,
    exercise_id UUID REFERENCES exercise(id) ON DELETE CASCADE,
    exercise_order NUMERIC(10, 6) NOT NULL,  -- For fractional ordering
    -- These can override exercise defaults
    sets INTEGER NOT NULL,
    reps INTEGER,
    duration INTEGER,
    rest INTEGER NOT NULL DEFAULT 60,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (workout_id, exercise_id),
    CONSTRAINT check_workout_measurement_values CHECK (
        (reps IS NOT NULL AND duration IS NULL) OR
        (duration IS NOT NULL AND reps IS NULL)
    )
);

-- Workout Performance Tracking
CREATE TABLE workout_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES sys_user(id) ON DELETE CASCADE,
    workout_id UUID NOT NULL REFERENCES workout(id),
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    -- Store actual performance data
    exercises_performed JSONB NOT NULL DEFAULT '[]',
    /* Example exercises_performed:
    [
        {
            "exercise_id": "uuid",
            "exercise_name": "Bench Press",
            "exercise_order": 1,
            "sets": [
                {"set_number": 1, "reps": 10, "weight": 135, "completed": true, "notes": null},
                {"set_number": 2, "reps": 8, "weight": 155, "completed": true, "notes": "felt heavy"},
                {"set_number": 3, "reps": 6, "weight": 175, "completed": false, "notes": "failed last rep"}
            ]
        },
        {
            "exercise_id": "uuid", 
            "exercise_name": "Plank",
            "exercise_order": 2,
            "sets": [
                {"set_number": 1, "duration": 60, "completed": true, "notes": null},
                {"set_number": 2, "duration": 45, "completed": true, "notes": null}
            ]
        }
    ]
    */
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User weight tracking history
CREATE TABLE user_weight_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES sys_user(id) ON DELETE CASCADE,
    weight_kg DECIMAL(5,2) NOT NULL,
    body_fat_percentage DECIMAL(4,2),
    notes TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_exercise_user_id ON exercise(user_id);
CREATE INDEX idx_exercise_source_id ON exercise(source_id);
CREATE INDEX idx_exercise_muscle_groups ON exercise USING GIN(muscle_groups);
CREATE INDEX idx_exercise_category ON exercise(category);
CREATE INDEX idx_exercise_equipment ON exercise(equipment);
CREATE INDEX idx_exercise_name ON exercise(name varchar_pattern_ops); -- For LIKE queries
CREATE INDEX idx_exercise_embedding ON exercise USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100); -- For similarity search

CREATE INDEX idx_workout_user_id ON workout(user_id);
CREATE INDEX idx_workout_source_id ON workout(source_id);
CREATE INDEX idx_workout_category ON workout(category);
CREATE INDEX idx_workout_name ON workout(name varchar_pattern_ops);
CREATE INDEX idx_workout_embedding ON workout USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX idx_workout_exercise_order ON workout_exercise(workout_id, exercise_order);
CREATE INDEX idx_workout_exercise_exercise ON workout_exercise(exercise_id);

CREATE INDEX idx_workout_performance_user ON workout_performance(user_id);
CREATE INDEX idx_workout_performance_workout ON workout_performance(workout_id);
CREATE INDEX idx_workout_performance_dates ON workout_performance(user_id, completed_at DESC);

CREATE INDEX idx_user_weight_history_user ON user_weight_history(user_id, recorded_at DESC);

DROP FUNCTION copy_exercise_for_user(uuid,uuid);
-- Helper function to copy library exercise to user
CREATE OR REPLACE FUNCTION copy_exercise_for_user(
    p_user_id UUID,
    p_exercise_id UUID
) RETURNS SETOF exercise AS $$
DECLARE
    v_new_id UUID;
    v_source_exercise exercise;
BEGIN
    -- Get the source exercise
    SELECT * INTO v_source_exercise FROM exercise WHERE id = p_exercise_id;
    
    -- Check if already copied
    SELECT id INTO v_new_id 
    FROM exercise 
    WHERE user_id = p_user_id 
    AND source_id = COALESCE(v_source_exercise.source_id, p_exercise_id);
    
    IF v_new_id IS NOT NULL THEN
        RETURN QUERY SELECT * FROM exercise WHERE id = v_new_id; -- Return existing
        RETURN;
    END IF;
    
    -- Create the copy
    INSERT INTO exercise (
        user_id, source_id, name, muscle_groups, category, 
        equipment, instructions, measurement_type,
        default_sets, default_reps, default_duration, default_rest
    )
    SELECT 
        p_user_id,
        COALESCE(source_id, id), -- Point to original library exercise
        name, muscle_groups, category, equipment, instructions, measurement_type,
        default_sets, default_reps, default_duration, default_rest
    FROM exercise
    WHERE id = p_exercise_id
    RETURNING id INTO v_new_id;
    
    RETURN QUERY SELECT * FROM exercise WHERE id = v_new_id;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION copy_workout_for_user(uuid,uuid);
-- Helper function to copy library workout to user
CREATE OR REPLACE FUNCTION copy_workout_for_user(
    p_user_id UUID,
    p_workout_id UUID
) RETURNS SETOF workout AS $$
DECLARE
    v_new_workout_id UUID;
    v_new_exercise_id UUID;
    v_source_workout workout;
    r workout_exercise%ROWTYPE;
BEGIN
    -- Get the source workout
    SELECT * INTO v_source_workout FROM workout WHERE id = p_workout_id;
    
    -- Check if already copied
    SELECT id INTO v_new_workout_id 
    FROM workout 
    WHERE user_id = p_user_id 
    AND source_id = COALESCE(v_source_workout.source_id, p_workout_id);
    
    IF v_new_workout_id IS NOT NULL THEN
        RETURN QUERY SELECT * FROM workout WHERE id = v_new_workout_id; -- Return existing
        RETURN;
    END IF;
    
    -- Create workout copy
    INSERT INTO workout (
        user_id, source_id, name, description, 
        category, difficulty, estimated_duration_minutes
    )
    SELECT 
        p_user_id,
        COALESCE(source_id, id), -- Point to original library workout
        name, description, category, difficulty, estimated_duration_minutes
    FROM workout
    WHERE id = p_workout_id
    RETURNING id INTO v_new_workout_id;
    
    -- Copy all exercises and workout_exercise relationships
    FOR r IN SELECT * FROM workout_exercise WHERE workout_id = p_workout_id
    LOOP
        -- Copy the exercise if it's a library exercise
        IF EXISTS (SELECT 1 FROM exercise WHERE id = r.exercise_id AND user_id IS NULL) THEN
            SELECT id INTO v_new_exercise_id FROM copy_exercise_for_user(p_user_id, r.exercise_id);
        ELSE
            v_new_exercise_id := r.exercise_id; -- Already a user exercise
        END IF;
        
        -- Create the relationship
        INSERT INTO workout_exercise (
            workout_id, exercise_id, exercise_order,
            sets, reps, duration, rest, notes
        )
        VALUES (
            v_new_workout_id, v_new_exercise_id, r.exercise_order,
            r.sets, r.reps, r.duration, r.rest, r.notes
        );
    END LOOP;
    
    RETURN QUERY SELECT * FROM workout WHERE id = v_new_workout_id;
END;
$$ LANGUAGE plpgsql;

-- View for available exercises (user's + library)
CREATE OR REPLACE VIEW available_exercises AS
SELECT 
    e.*,
    CASE 
        WHEN e.user_id IS NULL THEN 'library'
        WHEN e.source_id IS NOT NULL THEN 'customized'
        ELSE 'created'
    END as exercise_type
FROM exercise e;

-- View for available workouts (user's + library)
CREATE OR REPLACE VIEW available_workouts AS
SELECT 
    w.*,
    CASE 
        WHEN w.user_id IS NULL THEN 'library'
        WHEN w.source_id IS NOT NULL THEN 'customized'
        ELSE 'created'
    END as workout_type
FROM workout w;

-- Helper function for semantic exercise search
CREATE OR REPLACE FUNCTION search_exercises_semantic(
    p_user_id UUID,
    p_query_embedding vector(1536),
    p_limit INT DEFAULT 10,
    p_similarity_threshold FLOAT DEFAULT 0.7
) RETURNS TABLE (
    id UUID,
    name VARCHAR(100),
    muscle_groups muscle_group[],
    category exercise_category,
    similarity FLOAT,
    exercise_type TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.id,
        e.name,
        e.muscle_groups,
        e.category,
        1 - (e.embedding <=> p_query_embedding) as similarity,
        CASE 
            WHEN e.user_id IS NULL THEN 'library'
            WHEN e.source_id IS NOT NULL THEN 'customized'
            ELSE 'created'
        END as exercise_type
    FROM exercise e
    WHERE (e.user_id = p_user_id OR e.user_id IS NULL)
    AND e.embedding IS NOT NULL
    AND 1 - (e.embedding <=> p_query_embedding) > p_similarity_threshold
    ORDER BY e.embedding <=> p_query_embedding
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;
