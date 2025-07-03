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
