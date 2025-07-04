## Final Schema Design Principles

### Core Architecture: **Copy-on-Use with Single Table**

**1. Single Table per Entity**
- One `exercise` table (not exercise + exercise_template)
- One `workout` table (not workout + workout_template)
- Discriminate by `user_id` field

**2. Ownership Model**
- Library items: `user_id = NULL` (immutable, system-owned)
- User items: `user_id = <uuid>` (fully owned, editable)
- No shared mutable state between users

**3. Copy-on-Use Pattern**
- Users browse library items freely
- When user adds to workout or edits: full row copy
- User owns the copy completely
- Track lineage via `source_id` (optional)

**4. Query Simplicity**
- Show user's items: `WHERE user_id = ?`
- Show library: `WHERE user_id IS NULL`
- Show everything available: `WHERE user_id = ? OR user_id IS NULL`
- No complex joins or JSON overlays

**5. Data Model**
- Complete denormalization (each user's copy is independent)
- No cascading updates needed
- No customization tables
- No JSON fields for core data

**Benefits:**
- Ultra simple queries
- Clear ownership
- Easy to reason about
- Scales horizontally
- No update conflicts
- Seamless user experience

**Trade-off:** Storage (multiple copies) for Simplicity (no complex logic)

when user uses a library workout and/or  exercises and there are performance records off of it. 
After that user decides to customize the workout or exercise. 
Now the performance records do not need to be migrated right?

Exactly right! No migration needed. Here's why this works perfectly:

## Performance Records Stay Put

**Scenario Timeline:**
1. User performs library "Push Day" workout 10 times
2. All 10 performance records point to `workout_id = 'lib-push-day'`
3. User decides to customize (system copies to `'user-push-day'`)
4. Old records STILL point to `'lib-push-day'` ✓
5. New records point to `'user-push-day'` ✓

**Why this is correct:**
- Performance records are **historical facts**
- User DID perform the library version those 10 times
- No need to rewrite history
- Library items are immutable, so reference remains valid

**Query for workout history:**
```sql
SELECT * FROM workout_performance 
WHERE user_id = ? 
AND (workout_id = 'lib-push-day' OR workout_id = 'user-push-day')
ORDER BY completed_at;
```

**Benefits:**
- True historical record
- No complex migrations
- Can track when user started customizing
- Can compare performance pre/post customization
- No cascading updates

This is actually a **feature** not a bug - you preserve the exact workout configuration used at that point in time!

# Exercise Ordering Design - Numeric with Midpoint Insertion

## Overview
We use **NUMERIC** type with precision for exercise ordering, using midpoint calculation for insertions.

## Schema Design

```sql
CREATE TABLE workout_exercise (
    workout_id UUID REFERENCES workout(id),
    exercise_id UUID REFERENCES exercise(id),
    exercise_order NUMERIC(20,10) NOT NULL,  -- High precision for many subdivisions
    ...
    PRIMARY KEY (workout_id, exercise_id)
);
```

## Key Design Pattern: Midpoint Insertion

### Initial Order
```
Exercise 1: 1.0000000000
Exercise 2: 2.0000000000
Exercise 3: 3.0000000000
```

### Inserting Between Exercises
To insert between positions 1.0 and 2.0:
```sql
-- Calculate midpoint: (1.0 + 2.0) / 2 = 1.5
INSERT INTO workout_exercise (workout_id, exercise_id, exercise_order, ...)
VALUES ('workout-id', 'new-exercise-id', 1.5000000000, ...);
```

### Continued Subdivisions
Between 1.0 and 1.5:
- New position: (1.0 + 1.5) / 2 = 1.25

Between 1.25 and 1.5:
- New position: (1.25 + 1.5) / 2 = 1.375

## Benefits of NUMERIC over FLOAT

1. **Exact Precision**: No floating-point rounding errors
2. **Predictable Behavior**: Midpoint calculation is always exact
3. **Deep Nesting**: With NUMERIC(20,10), you can subdivide many times:
   - 1.0, 1.5, 1.25, 1.125, 1.0625...

## Implementation Function

```sql
CREATE OR REPLACE FUNCTION calculate_exercise_order(
    p_workout_id UUID,
    p_after_order NUMERIC DEFAULT NULL,
    p_before_order NUMERIC DEFAULT NULL
) RETURNS NUMERIC AS $$
BEGIN
    -- Insert at beginning
    IF p_after_order IS NULL AND p_before_order IS NOT NULL THEN
        RETURN p_before_order / 2;
    END IF;
    
    -- Insert at end
    IF p_after_order IS NOT NULL AND p_before_order IS NULL THEN
        RETURN p_after_order + 1;
    END IF;
    
    -- Insert between two exercises
    IF p_after_order IS NOT NULL AND p_before_order IS NOT NULL THEN
        RETURN (p_after_order + p_before_order) / 2;
    END IF;
    
    -- First exercise in empty workout
    RETURN 1.0;
END;
$$ LANGUAGE plpgsql;
```

This approach gives us precise control and virtually unlimited insertion capability!
