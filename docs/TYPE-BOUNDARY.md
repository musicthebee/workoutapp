# Type Boundary Pattern

## Pattern Name
**Type Boundary Pattern** (or **Generated Type Sanitization Pattern**)

## Intent
Maintain a clean separation between generated external types (GraphQL, OpenAPI, Protobuf) and application domain types without introducing runtime mapping layers.

## Problem
When using code generation tools for API schemas, the generated types often include:
- Framework-specific type wrappers (`Scalars['uuid']['output']`)
- Metadata fields (`__typename`, aggregates, relationships)
- Bidirectional relationships that create circular dependencies
- Different nullability patterns (`Maybe<T>` vs `T | null`)
- Missing application-specific types that aren't database entities

Using these generated types directly throughout your application:
- Pollutes business logic with infrastructure concerns
- Makes testing difficult (mocking complex nested types)
- Couples your entire application to the API framework
- Creates noisy, hard-to-read type signatures

## Solution
Create a type boundary at compile-time using TypeScript's type manipulation features to sanitize generated types into clean domain types.

```typescript
// Generated types (from GraphQL/OpenAPI/etc)
import type { User as GeneratedUser } from '@/generated/api';

// Clean domain types
export type User = Omit<GeneratedUser, 
  '__typename' | 
  'posts_aggregate' | 
  'followers_aggregate'
> & {
  id: string;  // Unwrap Scalars['uuid']['output']
  created_at: string;  // Unwrap Scalars['timestamptz']['output']
};
```

## Architecture Principles

### 1. **Single Source of Truth**
The database/API schema remains the single source of truth. Domain types are derived from generated types, not maintained separately.

### 2. **Zero Runtime Cost**
All type transformation happens at compile-time through TypeScript's type system. No runtime mapping functions or performance overhead.

### 3. **Consistent Naming Convention**
Choose one naming convention (snake_case, camelCase) across all layers to avoid field mapping:
```typescript
// If database uses snake_case, use it everywhere:
user_id ✓ (database) → user_id ✓ (GraphQL) → user_id ✓ (application)

// Avoid:
user_id (database) → userId (GraphQL) → userId (application)  // Requires mapping!
```

### 4. **Type Boundary Location**
Place sanitized types at the edge of your application's type system:
```
/src/types/          ← Type boundary (sanitized types)
/src/generated/      ← Raw generated types (git-ignored)
/src/components/     ← Uses clean types
/src/services/       ← Uses clean types
```

## Implementation

### Step 1: Generate Raw Types
```bash
# GraphQL example
graphql-codegen --config codegen.yml

# OpenAPI example  
openapi-generator generate -i api.yaml -g typescript-axios
```

### Step 2: Create Type Boundary
```typescript
// src/types/models.ts
import type {
  Exercise as GQLExercise,
  Workout as GQLWorkout,
  Workout_Exercise as GQLWorkoutExercise,
} from '@/generated/graphql';

// Remove GraphQL-specific fields
type GraphQLMeta = '__typename' | '_aggregate' | '_connection';

// Sanitize generated types
export type Exercise = Omit<GQLExercise, GraphQLMeta | 'workout_exercises_aggregate'>;
export type Workout = Omit<GQLWorkout, GraphQLMeta | 'exercises_aggregate'>;

// Relationship types with optional population
export type WorkoutExercise = Omit<GQLWorkoutExercise, GraphQLMeta> & {
  exercise?: Exercise;  // Optional - may or may not be populated
};

// Application-specific types not in database
export interface ExercisePerformance {
  exercise_id: string;
  set_performances: SetPerformance[];
}
```

### Step 3: Use Clean Types Throughout
```typescript
// MockAPI uses clean types
const mockExercise: Exercise = {
  id: 'ex_123',  // Simple string, not Scalars['uuid']['output']
  name: 'Bench Press',
  muscle_groups: ['chest', 'triceps'],
  // No __typename or aggregate fields!
};

// Components use clean types
interface ExerciseCardProps {
  exercise: Exercise;  // Clean, simple type
}

// Services use clean types
class ExerciseService {
  async getExercises(): Promise<Exercise[]> {
    // Implementation can use GraphQL internally
    // But returns clean types
  }
}
```

## Benefits

1. **Clean Domain Model**: Application code works with simple, focused types
2. **Type Safety**: Full TypeScript type checking maintained
3. **Framework Agnostic**: Easy to switch between GraphQL, REST, gRPC
4. **Testability**: Mock data is simple to create without framework noise
5. **Developer Experience**: Autocomplete shows only relevant fields
6. **No Runtime Overhead**: Zero performance cost

## Trade-offs

1. **Manual Maintenance**: Must update type sanitization when schema changes significantly
2. **Potential Drift**: Sanitized types could theoretically drift from generated types (mitigated by TypeScript compiler)
3. **Initial Setup**: Requires understanding of TypeScript utility types

## When to Use

✅ **Use when:**
- Using code generation for API types
- Want clean domain types without runtime mapping
- Team values simple, readable types
- Application has clear domain boundaries

❌ **Don't use when:**
- API and application types are already identical
- Runtime type validation is required (use Zod instead)
- Team isn't comfortable with TypeScript utility types

## Examples in the Wild

### GraphQL with Hasura
```typescript
// Generated type has GraphQL metadata
type User = {
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  posts: Array<Post>;
  posts_aggregate: Post_Aggregate;
  __typename: 'User';
};

// Clean domain type
export type User = Omit<GeneratedUser, '__typename' | 'posts_aggregate'> & {
  id: string;
  name: string;
  posts?: Post[];  // Optional relationship
};
```

### OpenAPI with Axios
```typescript
// Generated type from OpenAPI
interface UserDto {
  id?: string;  // Everything optional by default
  name?: string;
  _links?: Links;  // HAL metadata
}

// Clean domain type
export interface User {
  id: string;  // Required in domain
  name: string;
  // No _links metadata
}
```

### Protobuf with gRPC
```typescript
// Generated type has gRPC methods
class UserMessage {
  getId(): string;
  setId(value: string): UserMessage;
  getName(): string;
  setName(value: string): UserMessage;
  serializeBinary(): Uint8Array;
}

// Clean domain type
export interface User {
  id: string;
  name: string;
}
```

## Related Patterns

- **Anti-Corruption Layer** (DDD) - Similar concept at system boundaries
- **Data Transfer Objects** (DTO) - But without runtime mapping
- **Repository Pattern** - Often combined to hide data source details

## Conclusion

The Type Boundary Pattern provides a clean way to work with generated types without sacrificing 
type safety or introducing runtime overhead. By sanitizing types at compile-time, 
you get the best of both worlds: automated type generation from your API schema and clean domain types for your application logic.
