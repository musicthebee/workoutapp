# Workout App - Architecture & Implementation Guide

**Version**: 1.0 - MVP Architecture  
**Last Updated**: [Current Session]  
**Status**: ⚠️ Gaps Found - Fix Phase 1 & 2 before continuing

## 📋 Review Summary
**Phase 1 & 2 Comprehensive Review Results**:
- **Phase 1 (Foundation)**: ~85% Complete
  - ✅ Project structure 
  - ✅ Base dependencies
  - ✅ TypeScript/ESLint config
  - ⚠️ GraphQL packages (quick add)
  
- **Phase 2 (Types)**: ~90% Complete
  - ✅ Core business types (type-safe)
  - ✅ UI types (type-safe)
  - ✅ Fractional ordering
  - ✅ AI request type (simplified!)
  - ✅ Avoided redundant types
  - ⚠️ Just need to run codegen

- **Phase 3 (Theme)**: 100% Complete ✅

**Key Learning**: We initially over-engineered with redundant types (AIGeneratedExercise, EmptyWorkout, etc.) but caught and fixed it. Now following "one entity = one type" principle.

**Action Required**: Just add packages and run codegen - then ready for Phase 4!

## 🚀 Quick Start for New Session
```
Status: Phase 4 Complete! Ready for Phase 5
Current: All base atoms built ✅
Next: Phase 5 - Core Hooks (useWorkout, useExercise, etc.)
Achievement: 10 pure, typed atom components created
Key Rules: No state in atoms | Use theme tokens | TypeScript strict
```

## 📱 What We're Building
A premium workout tracking app for fitness enthusiasts with:
- Exercise library with search/filter
- Workout creation and management  
- Real-time workout guidance with timers
- Beautiful glass morphism UI
- Offline-first architecture

**Unique Features**:
- 🔄 **Living Workouts**: ALL workouts evolve as you use them
- ➕ **Universal Add**: Any workout (empty or full) can have exercises added
- 🤖 **AI Integration**: Optional AI assistance for creation
- 🔢 **Smart Ordering**: Fractional system prevents reindexing

**Database Schema**: PostgreSQL with tables for exercises, workouts, users, and performance tracking (see initial requirements for full schema)

## 💡 Key Innovations in Our Approach

1. **Universal Living Workouts**: EVERY workout (empty or full) can be modified during use
2. **No Empty/Full Distinction**: Unified experience - a workout is a workout
3. **Fractional Ordering**: No cascade updates when modifying exercise order
4. **Unified Creation**: Same UI whether planning ahead or creating mid-workout
5. **AI as Assistant**: Integrated into normal flow, not a separate feature
6. **Offline-First**: Full functionality without connection
7. **Glass Morphism**: Premium feel with consistent visual language

## 📋 Related Documents
- **MVP Product Specification**: See `workout-mvp-spec` artifact for complete feature list and requirements

## 📊 Current Progress Summary
- **Phase 1**: 🟨 85% Complete (Just needs GraphQL packages)
- **Phase 2**: 🟨 90% Complete (Just needs GraphQL codegen)
- **Phase 3**: ✅ 100% Complete (Theme System)
- **Phase 4**: ⏳ Nearly unblocked
- **Artifacts Created**: 6 of ~45 planned
- **Type Safety**: Strong (simplified to avoid redundancy)

### What IS Complete & Type-Safe:
- ✅ Theme system with all design tokens
- ✅ Core business types (workout, exercise, user)
- ✅ Fractional ordering system
- ✅ UI component prop types
- ✅ Navigation types
- ✅ Validation types
- ✅ AI generation request type (simplified)

### What's Still Needed:
- ⚠️ Add GraphQL packages to package.json
- ⚠️ Run GraphQL codegen to generate types
- ⚠️ Apollo Client setup in code

### Key Technical Decisions Made:
- ✅ Fractional ordering for exercises
- ✅ Universal living workouts
- ✅ No empty/full workout distinction
- ✅ Unified creation flow (manual + AI)
- ✅ Snake case everywhere
- ✅ Design tokens for all visual values
- ✅ Apollo Client for GraphQL
- ✅ **One entity = one type** (no redundant types)

## ❌ Anti-Patterns to Avoid (MUST READ)

### 1. **Creating Redundant Types for Different Creation Methods**
**What NOT to do**: 
```typescript
// ❌ BAD - Redundant types
interface Exercise { ... }
interface AIGeneratedExercise { ... }  // Duplicate!
interface ManualExercise { ... }       // Duplicate!
```

**What to do instead**:
```typescript
// ✅ GOOD - Single type with creation flag
interface Exercise {
  // ... all exercise fields
  is_ai_generated: boolean;
  generation_prompt?: string;
}
```

**Lesson**: Creation method is just metadata, not a different entity type. AI-generated exercises ARE exercises, not a special type.

### 2. **Creating Special Types for States**
**What NOT to do**:
```typescript
// ❌ BAD - Special type for empty state
interface EmptyWorkout { ... }
interface PopulatedWorkout { ... }
```

**What to do instead**:
```typescript
// ✅ GOOD - One type handles all states
interface Workout {
  exercises: Exercise[]; // Can be empty!
}
```

### 3. **Over-Engineering Simple Features**
- Don't create complex type hierarchies for simple variations
- Don't duplicate types for different states/sources
- Keep it simple - one entity, one type

### 4. **Elevating Standards to Decisions**
- Don't turn standard conventions into architectural decisions
- Folder naming (camelCase) is a standard, not a decision
- Save architectural decisions for actual system-impacting choices

**Remember**: If you're copying fields between types, you're doing it wrong!

**Action for Future**: Before creating a new type, ask:
1. Is this truly a different entity?
2. Or is it the same entity in a different state?
3. Can a simple flag or property handle the difference?

## 💡 Key Innovations in Our Approach

### 1. **DRY (Don't Repeat Yourself)**
- Every piece of functionality exists in exactly ONE place
- Composition over duplication
- Shared components, hooks, and utilities

### 2. **100% TypeScript Safety**
- Strict mode enabled
- No `any` types allowed
- Exhaustive type checking
- Runtime type guards for external data

### 3. **Component Hierarchy**
- **Atoms**: Single-purpose, zero business logic
- **Molecules**: Combine atoms, minimal logic
- **Organisms**: Complex components, business logic allowed
- **Templates**: Layout only, no logic

### 4. **Single Source of Truth**
- Database schema drives everything
- GraphQL generates types automatically
- Theme tokens for all visual properties

### 5. **Living Documents Philosophy**
- Workouts evolve through use (key innovation)
- No complex versioning or branching
- What you do is what you save

## 📏 Standard Patterns (Not Decisions)

These are industry standards we follow without question:
- **Folder Structure**: camelCase (React Native standard)
- **Component Files**: PascalCase.tsx
- **Test Files**: *.test.tsx
- **Story Files**: *.story.tsx

**Note**: Don't elevate standard conventions to architectural decisions. Save decisions for actual choices that impact the system.

## 🏗️ Architecture Decisions

### Decision 1: Snake Case Everywhere
**Date**: [Current Session]  
**Status**: ✅ Decided  
**Reasoning**: 
- Database uses snake_case (PostgreSQL convention)
- No mapping layer needed
- Reduces conversion bugs
- Simplifies GraphQL → TypeScript flow

### Decision 2: Hasura GraphQL + Code Generation
**Date**: [Current Session]  
**Status**: ✅ Decided  
**Reasoning**:
- Auto-generates types from database schema
- Real-time subscriptions support
- Built-in auth/permissions
- Reduces boilerplate code

### Decision 3: Zustand for State Management
**Date**: [Current Session]  
**Status**: ✅ Decided  
**Reasoning**:
- Lightweight (8kb)
- TypeScript first
- No boilerplate
- Works great with React Native

### Decision 4: Glassmorphism Design System
**Date**: [Current Session]  
**Status**: ✅ Decided  
**Reasoning**:
- Modern, premium feel
- Consistent across iOS/Android
- Depth and hierarchy through blur
- Engaging user experience

### Decision 5: Fractional Ordering for Exercises
**Date**: [Current Session]  
**Status**: ✅ Decided  
**Reasoning**:
- No cascade updates when reordering
- Insert between without reindexing
- Conflict-free editing
- Future-proof for drag-and-drop
**Implementation**: exercise_order as FLOAT/NUMERIC(10,6)

### Decision 6: Living Workouts (Universal Modification)
**Date**: [Current Session]  
**Status**: ✅ Decided  
**Reasoning**:
- ALL workouts evolve through use (empty or populated)
- Any workout can have exercises added during performance
- No distinction between "empty" and "regular" workouts
- Changes persist automatically
- Simplifies mental model and implementation
**MVP Limitation**: Add-only (no delete/reorder during workout)

### Decision 7: Unified Creation Flow with AI
**Date**: [Current Session]  
**Status**: ✅ Decided  
**Reasoning**:
- Single UI for manual and AI-assisted creation
- Same flow whether planning or mid-workout
- AI as optional assistant, not separate feature
- Track AI-generated content



### Decision 9: Copy-on-Customize Data Pattern
**Date**: [Current Session]  
**Status**: ✅ Decided  
**Reasoning**:
- Users own full copies of exercises/workouts
- No shared mutation complexity
- Simple queries (WHERE user_id = ?)
- Natural versioning and history
- Better performance (no JSON operations)
**Implementation**: 
- user_id NULL = library item
- user_id set = user owns copy
- source_id tracks lineage

## 📱 Technology Stack

- **Frontend**: React Native 0.73
- **Navigation**: React Navigation 6
- **State**: Zustand + Immer
- **Animations**: Reanimated 3
- **Backend**: PostgreSQL + Hasura
- **Types**: GraphQL Code Generator
- **Styling**: Themed components
- **Testing**: Jest + React Native Testing Library

## 📋 Implementation Phases

**Note**: See `workout-mvp-spec` artifact for complete feature requirements and user flows.

### Phase 1: Foundation Setup 🟨
**Status**: NEEDS UPDATE  
**Completed Items**:
- ✅ Project structure (`workout-app-structure`)
- ✅ Base package.json with dependencies
- ✅ TypeScript configuration
- ✅ ESLint/Prettier setup

**Missing Items**:
- ⚠️ GraphQL dependencies (@apollo/client, graphql-codegen)
- ⚠️ Environment configuration for Hasura
- ⚠️ GraphQL client setup

**Completed Artifacts**:
- ✅ `workout-app-structure` - Base structure (needs GraphQL additions)

### Phase 2: Type System 🟨
**Status**: 90% COMPLETE  
**Completed Tasks**:
- ✅ Core type definitions (`workout-types-system`)
- ✅ Snake case conversion
- ✅ Fractional ordering types
- ✅ AI generation request type (simplified - no redundancy!)
- ✅ Learned to avoid redundant types

**Remaining Tasks**:
- ⚠️ Run GraphQL codegen to generate database types
- ⚠️ That's it!

**Completed Artifacts**:
- ✅ `workout-types-system` - Core types with snake case (simplified)
- ✅ `workout-graphql-config` - GraphQL setup and configs

### Phase 3: Theme System & Design Tokens ✅
**Status**: COMPLETE  
**Completed Tasks**:
- ✅ Color tokens (light/dark themes)
- ✅ Spacing system (xxxs to xxxxl)
- ✅ Glass effect definitions (light/medium/heavy)
- ✅ Animation presets (fast/normal/slow)
- ✅ Typography scale
- ✅ Borders, shadows, sizes, z-indices

**Completed Artifacts**:
- ✅ `workout-theme-system` - Complete design token system

### Phase 4: Base Atoms ✅
**Status**: COMPLETE  
**Completed Components**:
1. ✅ GlassBase - Foundation for all glass effects
2. ✅ ButtonBase - Button with press animations
3. ✅ TextBase - Typography component  
4. ✅ InputBase - Text input with variants
5. ✅ Spacer - Consistent spacing
6. ✅ Flex - Flexbox container
7. ✅ Grid - Grid layout container
8. ✅ ProgressBase - Progress indicators
9. ✅ AnimatedValue - Animated numbers
10. ✅ usePressAnimation - Reusable animation hook

**Completed Artifacts**:
- ✅ `workout-atoms-glass` - Glass, Button, Text, Spacer components
- ✅ `workout-atoms-input` - Input, Layout, Progress components

**Key Patterns Established**:
- All atoms are pure (no state)
- All values from theme tokens
- Platform code isolated in GlassBase
- Consistent accessibility props
- TypeScript strict throughout

### Phase 5: Core Hooks
**Status**: NOT STARTED  
**Already Built**:
- ✅ useTheme (in theme system)
- ✅ usePressAnimation (in atoms)

**Planned Hooks**:
- ⏳ useWorkout - Active workout state management
- ⏳ useExercise - Exercise data and operations
- ⏳ useTimer - Countdown/countup timers
- ⏳ usePerformance - Track sets/reps/weight
- ⏳ useFilters - Manage list filters
- ⏳ useHaptic - Haptic feedback
- ⏳ useSound - Sound effects
- ⏳ useDebounce - Debounced values
- ⏳ usePrevious - Track previous values

**Architecture Notes**:
- Will use Zustand for global state
- Hooks abstract state management from components
- Can be built without GraphQL (just need types)

### Phase 6: Molecules
**Status**: NOT STARTED  
**Planned Components**:
- ⏳ ExerciseCard
- ⏳ WorkoutCard
- ⏳ NumericStepper
- ⏳ SearchInput
- ⏳ Timer

### Phase 7: Organisms
**Status**: NOT STARTED  
**Planned Components**:
- ⏳ VirtualizedList
- ⏳ FilterBar
- ⏳ ActiveExerciseDisplay
- ⏳ RestScreen
- ⏳ AppHeader
- ⏳ AppTabBar

### Phase 8: Templates
**Status**: NOT STARTED  
**Planned Templates**:
- ⏳ BaseTemplate
- ⏳ ListTemplate
- ⏳ DetailTemplate
- ⏳ FormTemplate

### Phase 9: Screens
**Status**: NOT STARTED  
**Planned Screens**:
- ⏳ HomeScreen
- ⏳ ExerciseLibraryScreen
- ⏳ ExerciseDetailScreen
- ⏳ WorkoutLibraryScreen
- ⏳ WorkoutDetailScreen
- ⏳ WorkoutBuilderScreen
- ⏳ ActiveWorkoutScreen
- ⏳ WorkoutHistoryScreen
- ⏳ ProfileScreen

### Phase 10: Integration & Polish
**Status**: NOT STARTED  
**Tasks**:
- ⏳ Navigation setup
- ⏳ API integration
- ⏳ Offline support
- ⏳ Performance optimization
- ⏳ Error boundaries
- ⏳ Accessibility

## 🎨 Design System Rules

### Token Usage (STRICT):
- **NO hardcoded values** - Every number/color/size MUST use tokens
- **Glass effects**: light (20 blur), medium (30 blur), heavy (40 blur)
- **Animations**: fast (150ms), normal (300ms), slow (500ms)
- **All components** import and use theme via `use_theme()` hook

### Design Tokens Include:
1. **Colors**: Full palette with light/dark themes
2. **Spacing**: xxxs (2) to xxxxl (96)
3. **Typography**: Complete type scale with presets
4. **Glass Effects**: 3 variants with blur/tint/border
5. **Animations**: Springs and durations
6. **Borders**: Radii and widths
7. **Shadows**: 6 elevation levels
8. **Sizes**: Icons, buttons, inputs, avatars
9. **Z-indices**: Layering system

## 🔧 Implementation Guidelines

### ⚠️ STRICT DESIGN TOKEN USAGE

**NEVER hardcode ANY visual values. ALWAYS use design tokens.**

```typescript
// ❌ FORBIDDEN - NO HARDCODED VALUES
<View style={{ padding: 16, borderRadius: 12 }} />
<Text style={{ color: '#2196F3', fontSize: 18 }} />

// ✅ REQUIRED - ALWAYS USE TOKENS
const theme = use_theme();
<View style={{ 
  padding: theme.spacing.md,
  borderRadius: theme.borders.radii.md 
}} />
<Text style={{ 
  color: theme.colors.action_primary,
  ...theme.typography.body_large 
}} />
```

### Key Implementation Patterns

#### 1. Adding Exercise During ANY Workout
```typescript
// Works for empty OR populated workouts
const add_exercise_to_workout = async (exercise: Exercise) => {
  // Empty workout just has empty array
  const exercises = active_workout.exercises || [];
  
  const new_order = ordering_helpers.get_order_for_append(exercises);
  
  const workout_exercise = {
    exercise_id: exercise.id,
    exercise_order: new_order,
    sets: exercise.default_sets,
    reps: exercise.default_reps,
    rest_seconds: exercise.default_rest_seconds,
  };
  
  // Add to active session
  active_workout.exercises.push(workout_exercise);
  
  // Persist to database (ALL workouts are "living")
  await update_workout(workout_id, {
    exercises: active_workout.exercises
  });
};
```

#### 2. Unified Creation Flow
```typescript
// Same component for all contexts
<ExerciseCreator
  mode={mode} // 'manual' | 'ai_assisted'
  onComplete={(exercise) => {
    if (is_during_workout) {
      add_exercise_to_workout(exercise);
    } else {
      save_to_library(exercise);
    }
  }}
/>
```

#### 3. AI-Assisted Creation
```typescript
interface AICreationParams {
  type: 'exercise' | 'workout';
  description?: string;
  muscle_groups?: string[];
  equipment?: string[];
  duration?: number;
  difficulty?: string;
}

// Track AI generation
const created_exercise = {
  ...generated_data,
  is_ai_generated: true,
  ai_generation_prompt: params.description,
};
```

### Database Schema Updates Needed
```sql
-- Update exercise_order to support fractional ordering
ALTER TABLE workout_exercise 
ALTER COLUMN exercise_order TYPE NUMERIC(10, 6);

-- Add AI tracking to user_overrides JSONB
-- user_overrides JSON structure now includes:
-- {
--   "user_id": {
--     ...existing fields...
--     "is_ai_generated": boolean,
--     "ai_generation_prompt": string
--   }
-- }
```

### Component Creation Checklist:
- [ ] TypeScript interface for props
- [ ] Props extend BaseComponentProps (if UI component)
- [ ] Uses theme tokens only (no hardcoded values)
- [ ] Includes accessibility props
- [ ] Pure functional component (atoms = no state)
- [ ] Under 100 lines (excluding comments)
- [ ] Platform code isolated (if needed)
- [ ] Has usage example in comments
- [ ] Exported from folder's index.ts
- [ ] Documented with clear comments

### File Organization:
- [ ] TypeScript interface for props
- [ ] Props extend BaseComponentProps
- [ ] Uses theme tokens only
- [ ] Includes accessibility props
- [ ] Has Storybook story
- [ ] Has unit tests
- [ ] Documented with JSDoc

### File Organization:
```
ComponentName/
├── ComponentName.tsx      # Implementation
├── ComponentName.types.ts # Type definitions
├── ComponentName.test.tsx # Tests
├── ComponentName.story.tsx # Storybook
└── index.ts              # Export
```

### Import Order:
1. React/React Native
2. Third-party libraries
3. Internal components
4. Hooks
5. Types
6. Utils/Constants

## 🚀 Next Steps

**Current Focus**: Phase 5 - Core Hooks
- Create useWorkout hook for workout state
- Create useExercise hook for exercise data
- Create useTimer hook for workout timers
- Create usePerformance hook for tracking
- All hooks should use Zustand for state

**Or Complete Foundation**:
1. Add GraphQL packages to package.json
2. Run codegen to generate types
3. Then continue with confidence

**Critical**: Hooks can be built without GraphQL, but will need types from codegen eventually.

**To Continue in New Conversation**:
1. Reference this architecture document
2. Check current phase status
3. Continue with next incomplete task
4. Update progress as artifacts are created

## 📝 Session Notes

**Current Session Date**: [Today]
- Established core architecture
- Decided on snake_case convention
- Set up type system for Hasura integration
- Created implementation roadmap
- ✅ Completed Phase 3: Theme System with comprehensive design tokens
- ✅ Created MVP Product Specification document
- ✅ Added fractional ordering system for exercises
- ✅ Designed "living workouts" that evolve with use
- ✅ Unified creation flow with AI assistance
- ✅ Unified "living workouts" - no empty/full distinction
- ✅ Simplified state management (add-only during workouts)

**Final Clarification**: ALL workouts are treated the same - whether they start empty or with exercises, they can all be modified during performance. This eliminates artificial distinctions and simplifies the implementation.

**Key Architectural Decisions This Session**:
1. Workouts are mutable documents that change with use
2. NO distinction between empty and populated workouts - all are modifiable
3. Exercise ordering uses floats to avoid reindexing
4. AI is integrated into standard creation flow, not separate
5. MVP focuses on adding exercises (delete/reorder is v2)

**Total Artifacts Created**: 5
1. Project Structure
2. Type System (with fractional ordering)
3. Theme System
4. MVP Specification (with dynamic workouts)
5. Architecture Guide (this document)

## 🔄 Continuation Guide for New Session

### To Resume Development:

1. **Load These Artifacts** (in order):
   - `workout-mvp-spec` - Product requirements
   - `workout-architecture-doc` - This guide
   - `workout-types-system` - Type definitions
   - `workout-theme-system` - Design tokens
   - `workout-app-structure` - Project setup

2. **Current State**:
   - ✅ Phase 1: Foundation (Complete)
   - ✅ Phase 2: Type System (MVP ready) (Complete for MVP)
   - ✅ Phase 3: Theme System (Complete)
   - ⏳ Phase 4: Base Atoms (Next)

3. **Next Actions**:
   - Create GlassBase component using theme tokens
   - Implement ButtonBase, TextBase, InputBase
   - Build layout atoms (Spacer, Flex, Grid)
   - ALL components must use theme tokens

4. **Key Reminders**:
   - Snake_case for all props and types
   - NO hardcoded visual values - use theme tokens
   - Follow atomic design strictly
   - GraphQL will generate database types
   - Test on both iOS and Android
   - Design for offline-first

5. **Critical Rules**:
   - Every number MUST come from theme tokens
   - Every color MUST come from theme colors
   - Every animation MUST use theme presets
   - Every component MUST be fully typed
   - NO business logic in atoms
   - NO direct state management in atoms

6. **Architecture Context**:
   - Using Hasura for GraphQL API
   - Zustand for state management
   - React Native Reanimated for animations
   - Glass morphism design throughout
