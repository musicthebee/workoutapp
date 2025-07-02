# Workout Tracker UI/UX Design System

## 🎯 Design Philosophy

### Core Principles
1. **Touch-First Design**: Minimum 60x60pt touch targets for sweaty gym fingers
2. **Progressive Disclosure**: Show only what's needed, when it's needed
3. **Consistent Patterns**: Same interaction model everywhere
4. **Full-Screen Focus**: One task at a time, no distractions
5. **Clear Visual Hierarchy**: List → Action → Modal → Complete

### Key Design Decisions
- **No Hidden Gestures**: All actions have visible buttons
- **Modal-First Interactions**: Full-screen modals for all editing/input
- **Spacious Layouts**: Large controls with ample spacing
- **Contextual Information**: Show relevant data (last performance, PRs)
- **Quick Actions**: Common values readily accessible

## 🏗️ Atomic Design Structure

### ⚛️ Atoms (Base Components)

#### Core Atoms
```typescript
// Visual Elements
├── GlassBase         // Glassmorphic containers
├── TextBase          // Typography component
├── IconBase          // Icon wrapper
├── Divider           // Section separators
└── Badge             // Status indicators ("PR", "New", etc.)

// Interactive Elements  
├── TouchableNumber   // Single number button [8]
├── BigButton         // Large primary actions
├── IconButton        // Small icon buttons [×] [←]
├── IncrementButton   // [+] [-] controls
└── DragHandle        // [≡] for reordering

// Display Elements
├── ValueDisplay      // "4 sets × 8 reps"
├── Label             // Section labels
├── ProgressBar       // Linear progress
└── ProgressRing      // Circular progress
```

#### Implementation Priority
1. **Phase 1**: TouchableNumber, BigButton, IconButton (core interactions)
2. **Phase 2**: ValueDisplay, Label, Badge (display elements)
3. **Phase 3**: ProgressBar, ProgressRing (feedback elements)

### 🧬 Molecules (Composed Components)

#### Input Molecules
```typescript
NumberStepper
├── Label (atom)
├── IncrementButton × 2 (atoms)
├── ValueDisplay (atom)
└── Logic: increment/decrement with bounds

QuickSelectRow
├── Label (atom)
└── TouchableNumber × n (atoms)
    └── Common values for quick selection

SearchInput
├── IconBase (search icon)
├── InputBase (from atoms)
├── IconButton (clear)
└── Logic: debounced search
```

#### Display Molecules
```typescript
ExerciseListItem
├── DragHandle (atom)
├── FlexContainer
│   ├── ExerciseInfo
│   │   ├── TextBase (name)
│   │   └── ValueDisplay (sets×reps)
│   └── BigButton ("Edit")
└── Logic: press, drag handlers

ModalHeader
├── IconButton (back)
├── TextBase (title)
└── BigButton (action)
    └── Consistent 60pt height

PerformanceHint
├── Label ("Previous Performance")
├── ValueDisplay (performance)
└── Badge (if PR)
```

#### Implementation Priority
1. **Phase 1**: NumberStepper, ModalHeader (most reused)
2. **Phase 2**: ExerciseListItem, QuickSelectRow
3. **Phase 3**: SearchInput, PerformanceHint

### 🦠 Organisms (Complex Components)

#### Modal Organisms
```typescript
ExerciseEditModal
├── ModalHeader
├── ScrollView
│   ├── ExerciseInfoSection
│   │   ├── TextBase (name)
│   │   └── Badge × n (muscle groups)
│   ├── Divider
│   ├── NumberStepper (sets)
│   ├── NumberStepper (reps)
│   ├── NumberStepper (rest)
│   ├── Divider
│   └── PerformanceHint
└── Footer
    └── BigButton × 2 (Delete, Save)

SetLoggerModal
├── ModalHeader
├── ScrollView
│   ├── ExerciseTitle
│   ├── SetProgress (2 of 4)
│   ├── Divider
│   ├── NumberStepper (reps)
│   ├── QuickSelectRow (common reps)
│   ├── Divider
│   ├── NumberStepper (weight)
│   ├── QuickSelectRow (weight progression)
│   └── PerformanceHint
└── Footer
    └── BigButton (Complete Set)
```

#### List Organisms
```typescript
ExerciseList
├── FlatList
│   ├── ExerciseListItem × n
│   └── ListFooter (add button)
├── EmptyState
└── Logic: drag to reorder

WorkoutActiveDisplay
├── ProgressHeader
│   ├── ProgressBar
│   └── TextBase (Exercise 2 of 5)
├── ExerciseCard
│   ├── TextBase (name)
│   ├── ValueDisplay (current set)
│   └── PerformanceHint
└── BigButton (Log This Set)
```

## 📱 Screen Patterns & Modal Flows

### Pattern 1: List → Edit Modal
```
WorkoutBuilderScreen
└── ExerciseList
    └── ExerciseListItem [Edit] → ExerciseEditModal
        └── [Save] → Returns to list

Benefits:
- List stays clean and scannable
- Edit modal has room for all controls
- Clear save/cancel flow
```

### Pattern 2: Active State → Input Modal → Feedback
```
ActiveWorkoutScreen
└── WorkoutActiveDisplay [Log Set] → SetLoggerModal
    └── [Complete] → RestTimerModal (auto-open)
        └── [Skip/Complete] → Next exercise

Benefits:
- Focused on current task
- Natural progression
- Each step is clear
```

### Pattern 3: Browse → Detail → Action
```
ExerciseLibraryScreen
└── ExerciseGrid
    └── ExerciseCard [View] → ExerciseDetailModal
        └── [Add to Workout] → QuickConfigModal
            └── [Add] → Returns to workout

Benefits:
- Progressive disclosure
- User controls depth
- Can back out at any level
```

## 🎨 Visual Design System

### Spacing Scale
```typescript
const spacing = {
  xxxs: 2,   // Hairline borders
  xxs: 4,    // Tight spacing
  xs: 8,     // Internal padding
  sm: 12,    // Related items
  md: 16,    // Standard padding
  lg: 24,    // Section spacing
  xl: 32,    // Major sections
  xxl: 48,   // Screen padding
  xxxl: 64,  // Minimum touch target
};
```

### Touch Targets
```typescript
const touchSizes = {
  minimum: 44,    // Apple HIG minimum
  standard: 60,   // Our standard
  large: 80,      // Primary actions
  huge: 100,      // Active workout buttons
};
```

### Modal Dimensions
```typescript
const modalSizes = {
  header: 60,         // Fixed height
  footer: 80,         // With padding
  contentPadding: 24, // Horizontal
  sectionGap: 32,     // Between sections
};
```

### Typography During Workout
```typescript
const workoutTypography = {
  exerciseName: {
    size: 28,
    weight: 'bold',
  },
  setValue: {
    size: 48,        // Huge for visibility
    weight: 'bold',
  },
  label: {
    size: 16,
    weight: 'medium',
    opacity: 0.7,
  },
};
```

## 🚀 Implementation Plan

### Phase 6.1: Core Modal Infrastructure (Week 1)
1. **ModalTemplate** - Base template for all modals
2. **ModalHeader** - Consistent navigation
3. **NumberStepper** - Core input component
4. **BigButton** - Primary actions

### Phase 6.2: List Components (Week 1-2)
1. **ExerciseListItem** - With edit button
2. **ExerciseList** - With reordering
3. **DragHandle** - Touch-friendly dragging
4. **EmptyState** - For empty lists

### Phase 6.3: Edit Modals (Week 2)
1. **ExerciseEditModal** - Full implementation
2. **QuickSelectRow** - For common values
3. **PerformanceHint** - Previous/PR display
4. **Footer patterns** - Save/Cancel actions

### Phase 6.4: Active Workout (Week 3)
1. **SetLoggerModal** - Reps/weight input
2. **RestTimerModal** - Full-screen timer
3. **WorkoutActiveDisplay** - Current exercise
4. **ProgressIndicators** - Sets/exercises

### Phase 6.5: Exercise Library (Week 3-4)
1. **ExerciseCard** - Grid view
2. **ExerciseDetailModal** - Full details
3. **ExercisePickerModal** - Add to workout
4. **SearchInput** - With filters

### Phase 6.6: Polish & Animation (Week 4)
1. **Transitions** - Modal animations
2. **Success states** - Completion feedback
3. **Loading states** - Skeleton screens
4. **Error handling** - User-friendly errors

## 🔧 Technical Implementation Notes

### Modal Management
```typescript
// Use React Navigation modals
navigation.navigate('ExerciseEditModal', {
  exerciseId: exercise.id,
  onSave: (updated) => updateExercise(updated),
});

// Or bottom sheet library
import { BottomSheetModal } from '@gorhom/bottom-sheet';
```

### State Management During Workout
```typescript
// Active workout uses Zustand store
const { currentExercise, logSet, nextExercise } = useWorkout();

// Each modal updates the store
const handleCompleteSet = (reps: number, weight: number) => {
  logSet({ reps, weight });
  navigation.navigate('RestTimer');
};
```

### Gesture Handling
```typescript
// Reordering with react-native-draggable-flatlist
<DraggableFlatList
  data={exercises}
  renderItem={({ item, drag }) => (
    <ExerciseListItem
      exercise={item}
      onLongPress={drag}
    />
  )}
  onDragEnd={({ data }) => reorderExercises(data)}
/>
```

### Performance Optimization
```typescript
// Memoize heavy components
const ExerciseListItem = memo(({ exercise, onEdit }) => {
  // Component implementation
});

// Virtualize long lists
<FlatList
  data={exercises}
  renderItem={renderExercise}
  getItemLayout={getItemLayout}
  maxToRenderPerBatch={10}
/>
```

## 📋 Component Checklist

### Must Have for MVP
- [ ] ModalTemplate (base for all modals)
- [ ] NumberStepper (core input)
- [ ] ExerciseListItem (workout builder)
- [ ] ExerciseEditModal (edit parameters)
- [ ] SetLoggerModal (active workout)
- [ ] RestTimerModal (between sets)
- [ ] BigButton (CTAs)
- [ ] ModalHeader (navigation)

### Nice to Have
- [ ] Animations (spring physics)
- [ ] Haptic feedback
- [ ] Sound effects
- [ ] Progress celebrations
- [ ] Workout summary

## 🎯 Success Metrics

### Usability Goals
- **Touch accuracy**: >95% successful first taps
- **Task completion**: <3 taps for any action
- **Error rate**: <5% mis-taps during workout
- **Time to log set**: <10 seconds

### Technical Goals
- **Modal open time**: <100ms
- **List scroll**: 60fps
- **Input response**: Instant (<16ms)
- **State updates**: Optimistic UI

## 🔄 Testing Strategy

### User Testing Scenarios
1. **Gym Environment**: Test with sweaty hands
2. **Quick Edits**: Change sets/reps mid-workout
3. **Reordering**: Drag exercises in list
4. **Input Methods**: Number steppers vs keyboard
5. **Progress Tracking**: Log sets efficiently

### Accessibility Testing
- **VoiceOver**: Full modal navigation
- **Dynamic Type**: Scales appropriately
- **Color Contrast**: WCAG AA minimum
- **Touch Targets**: 44pt minimum

## 📚 References & Inspiration

### Design Patterns
- **Apple Health**: Clean data input
- **Strong**: Workout logging flow
- **Nike Training**: Exercise demonstrations
- **Strava**: Activity summaries

### Technical Libraries
- React Navigation (modals)
- React Native Reanimated (animations)
- React Native Gesture Handler (touches)
- Bottom Sheet (if preferred over full modal)

---

## 🚦 Ready to Implement

This design system provides:
1. **Clear component hierarchy** (atoms → molecules → organisms)
2. **Consistent interaction patterns** (list → modal → action)
3. **Touch-friendly specifications** (60pt+ targets)
4. **Implementation roadmap** (6 phases)
5. **Technical guidelines** (state, performance)

Start with Phase 6.1 core components and build up progressively. Each phase delivers usable features while maintaining the overall design vision.

# Workout App UI Visual Mockups

## 🎨 Core Modal Pattern Visual Examples

### 1. Workout Builder - List View
```
┌─────────────────────────────────────┐
│ [←] Chest Workout            [Save] │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [≡] 1. Bench Press              │ │
│ │     4 sets × 8 reps · 90s       │ │
│ │                        [Edit]   │ │ ← 60pt button
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [≡] 2. Incline Press            │ │
│ │     3 sets × 10 reps · 60s      │ │
│ │                        [Edit]   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [≡] 3. Cable Flyes              │ │
│ │     3 sets × 12 reps · 60s      │ │
│ │                        [Edit]   │ │
│ └─────────────────────────────────┘ │
│                                     │
│      [+ Add Exercise]               │ ← 80pt height
│                                     │
└─────────────────────────────────────┘

Visual Hierarchy:
- Clean list items with clear info
- Visible [Edit] buttons (no hidden gestures)
- Large [+ Add Exercise] CTA
- Drag handles visible but subtle
```

### 2. Exercise Edit Modal (Full Screen)
```
┌─────────────────────────────────────┐
│ [←] Edit Exercise           [Save]  │ ← 60pt header
├─────────────────────────────────────┤
│                                     │
│        💪 BENCH PRESS               │ ← 28pt bold
│     Chest • Triceps • Shoulders    │ ← 16pt, badges
│                                     │
├─────────────────────────────────────┤
│                                     │
│ SETS                                │ ← 16pt label
│                                     │
│    ┌──────┐  ┌──────┐  ┌──────┐   │
│    │  -1  │  │  4   │  │  +1  │   │ ← 80×80pt
│    └──────┘  └──────┘  └──────┘   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ REPS PER SET                        │
│                                     │
│    ┌──────┐  ┌──────┐  ┌──────┐   │
│    │  -1  │  │  8   │  │  +1  │   │
│    └──────┘  └──────┘  └──────┘   │
│                                     │
│    Common: [6] [8] [10] [12]       │ ← 60×44pt
│                                     │
├─────────────────────────────────────┤
│                                     │
│ REST BETWEEN SETS                   │
│                                     │
│   ┌──────┐  ┌──────┐  ┌──────┐    │
│   │ -15s │  │ 90s  │  │ +15s │    │
│   └──────┘  └──────┘  └──────┘    │
│                                     │
│   Quick: [60s] [90s] [2m] [3m]     │
│                                     │
├─────────────────────────────────────┤
│ Previous Performance                │ ← Context section
│ Last: 4×8 @ 135 lbs (2 days ago)   │
│ Best: 4×8 @ 145 lbs 💪             │
│                                     │
│ [Replace Exercise]  [Delete]        │ ← Secondary actions
│                                     │
└─────────────────────────────────────┘

Touch Target Analysis:
- Primary controls: 80×80pt (huge)
- Quick selects: 60×44pt (comfortable)
- Navigation: 60pt height (standard)
- Ample spacing between elements
```

### 3. Active Workout - Exercise Display
```
┌─────────────────────────────────────┐
│ Exercise 2 of 5              [⋮]   │ ← Progress context
├─────────────────────────────────────┤
│                                     │
│                                     │
│         BENCH PRESS                 │ ← 32pt, centered
│                                     │
│         SET 2 OF 4                  │ ← 24pt
│                                     │
│                                     │
│        Target: 8 reps               │ ← 20pt
│                                     │
│     Last set: 8 × 135 lbs ✓         │ ← Previous reference
│                                     │
│                                     │
├─────────────────────────────────────┤
│                                     │
│         [LOG THIS SET]              │ ← 100pt height!
│                                     │
└─────────────────────────────────────┘

Design Rationale:
- Minimal info, maximum clarity
- Huge LOG button (can't miss)
- Previous set for reference
- Clean, focused interface
```

### 4. Set Logger Modal - Progressive Input
```
┌─────────────────────────────────────┐
│ [←] Cancel                   [Skip] │
├─────────────────────────────────────┤
│                                     │
│     BENCH PRESS - SET 2 OF 4        │ ← Context
│                                     │
├─────────────────────────────────────┤
│                                     │
│ REPS COMPLETED                      │
│                                     │
│   ┌──────┐  ┌──────┐  ┌──────┐    │
│   │  -1  │  │  8   │  │  +1  │    │ ← 100×100pt!
│   └──────┘  └──────┘  └──────┘    │
│                                     │
│   Quick: [6] [7] [8] [9] [10]      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ WEIGHT USED (lbs)                   │
│                                     │
│   ┌──────┐  ┌──────┐  ┌──────┐    │
│   │  -5  │  │ 135  │  │  +5  │    │
│   └──────┘  └──────┘  └──────┘    │
│                                     │
│   [-25]    [Same]    [+25]         │ ← Quick adjustments
│                                     │
│   Last: 135 lbs | PR: 145 lbs      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│        [💪 COMPLETE SET]            │ ← 100pt height
│                                     │
│        [Failed Set]                 │ ← 60pt secondary
│                                     │
└─────────────────────────────────────┘

Interaction Flow:
1. Opens with reps focused
2. Easy increment/decrement
3. Quick selections available
4. Clear completion action
```

### 5. Rest Timer Modal (Auto-opens after set)
```
┌─────────────────────────────────────┐
│                                [×]  │
├─────────────────────────────────────┤
│                                     │
│                                     │
│              REST                   │ ← 24pt
│                                     │
│                                     │
│             1:27                    │ ← 72pt!
│                                     │
│         ████████░░░░░░░             │ ← Progress bar
│                                     │
│                                     │
│         Next: Set 3 of 4            │ ← 18pt
│          Bench Press                │
│          Target: 8 reps             │
│                                     │
│                                     │
├─────────────────────────────────────┤
│                                     │
│   [Skip Rest]        [+30 sec]      │ ← 80pt buttons
│                                     │
└─────────────────────────────────────┘

Visual Design:
- Timer is HUGE and centered
- Clear progress indication
- Next set preview
- Easy to skip or extend
```

### 6. Bodyweight Exercise Handling
```
┌─────────────────────────────────────┐
│ [←] Log Set                  [Skip] │
├─────────────────────────────────────┤
│                                     │
│      PULL-UPS - SET 3 OF 3          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ REPS COMPLETED                      │
│                                     │
│   ┌──────┐  ┌──────┐  ┌──────┐    │
│   │  -1  │  │  5   │  │  +1  │    │
│   └──────┘  └──────┘  └──────┘    │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ADDED WEIGHT (Optional)             │
│                                     │
│   ┌──────┐  ┌──────┐  ┌──────┐    │
│   │ -2.5 │  │  0   │  │ +2.5 │    │
│   └──────┘  └──────┘  └──────┘    │
│                                     │
│      [Bodyweight Only]              │ ← Toggle
│                                     │
├─────────────────────────────────────┤
│                                     │
│        [💪 COMPLETE SET]            │
│                                     │
└─────────────────────────────────────┘

Bodyweight Logic:
- Weight section is optional
- Clear "Bodyweight Only" option
- Can track weighted variations
- Same UI pattern as weighted
```

## 🔄 Complete User Flows

### Flow 1: Adding Exercise to Workout
```
Workout Builder          Exercise Library         Configure
     List                    Modal                  Modal
       │                       │                      │
       ├──[+ Add Exercise]────►│                      │
       │                       ├──[Search/Filter]     │
       │                       ├──[Select Exercise]──►│
       │                       │                      ├──[Set Parameters]
       │◄──────────────────────┼──────────────────────┤──[Add to Workout]
       │                       │                      │
    Updated                 (closes)              (closes)
```

### Flow 2: Active Workout Progression
```
Exercise Display → Set Logger → Rest Timer → Next Exercise
       │               │            │             │
    [Log Set]──►   [Complete]──►  Auto──►   [Continue]
                                  Opens
```

### Flow 3: Quick Edit During Workout
```
Active Workout → Edit Modal → Return to Workout
       │              │              │
   [Edit Sets]──►  [Save]──────────►│
                                  Updated
```

## 📏 Spacing & Measurements

### Standard Spacings
```
Element Padding:
┌─────────────────────────────────────┐
│←────────── 24pt ──────────►│        │
│                            │        │
│  ┌────────────────────┐    │ 16pt   │
│  │    Component       │    │   ↕    │
│  └────────────────────┘    │        │
│                            │        │
└─────────────────────────────────────┘

Section Spacing:
┌─────────────────────────────────────┐
│ Section 1                           │
│                                     │
├─────────────────────────────────────┤ ← 32pt gap
│                                     │
│ Section 2                           │
│                                     │
└─────────────────────────────────────┘
```

### Touch Target Zones
```
Minimum (44pt):  ┌────┐
                 │ 44 │  Secondary actions
                 └────┘

Standard (60pt): ┌──────┐
                 │  60  │  Normal buttons
                 └──────┘

Large (80pt):    ┌────────┐
                 │   80   │  Primary actions
                 └────────┘

Huge (100pt):    ┌──────────┐
                 │   100    │  Active workout
                 └──────────┘
```

## 🎯 Implementation Priority Visual

```
Week 1: Core Infrastructure
├── ModalTemplate ████████████ 100%
├── NumberStepper ████████████ 100%
├── BigButton     ████████████ 100%
└── ModalHeader   ████████████ 100%

Week 2: List Components  
├── ExerciseListItem ████████░░ 80%
├── ExerciseList     ████████░░ 80%
└── DragHandle       ████████░░ 80%

Week 3: Workout Flow
├── SetLoggerModal   ██████░░░░ 60%
├── RestTimerModal   ██████░░░░ 60%
└── WorkoutDisplay   ██████░░░░ 60%

Week 4: Polish
├── Animations       ████░░░░░░ 40%
├── Transitions      ████░░░░░░ 40%
└── Error States     ████░░░░░░ 40%
```

This visual guide complements the design system document and provides concrete examples of every major UI component and interaction flow.

# Workout App UI Implementation Summary

## 🎯 Key Design Decisions

### 1. **Full-Screen Modal Pattern**
- **Why**: Touch-friendly, focused, consistent
- **How**: Every edit/input uses full-screen modal
- **Benefit**: Same pattern everywhere, no hidden gestures

### 2. **Number Stepper vs Keyboard**
- **Why**: No keyboard in gym, sweaty fingers
- **How**: [-] [Value] [+] with smart increments
- **Benefit**: Fast input, no typing needed

### 3. **Progressive Input Flow**
- **Why**: One decision at a time
- **How**: Reps → Weight → Complete (separate screens if needed)
- **Benefit**: Clear, focused, less errors

### 4. **Visible Actions Only**
- **Why**: No gesture discovery needed
- **How**: [Edit] [Add] [Log] buttons always visible
- **Benefit**: Intuitive for all users

## 🏗️ Build Order (Phase 6)

### Week 1: Foundation
```
1. ModalTemplate.tsx
   - Base for ALL modals
   - Header, content, footer structure
   - Navigation handling

2. NumberStepper.tsx  
   - Core input component
   - Increment/decrement logic
   - Min/max bounds

3. BigButton.tsx
   - Primary CTAs
   - 80-100pt height
   - Loading states

4. ExerciseEditModal.tsx
   - First complete modal
   - Uses all base components
   - Reference implementation
```

### Week 2: Workout Builder
```
5. ExerciseListItem.tsx
   - Display in workout
   - [Edit] button
   - Drag handle

6. ExerciseList.tsx
   - Reorderable list
   - Empty state
   - Add button

7. WorkoutBuilderScreen.tsx
   - Integrate components
   - Save/load workout
```

### Week 3: Active Workout
```
8. SetLoggerModal.tsx
   - Reps + weight input
   - Quick selections
   - Previous performance

9. RestTimerModal.tsx
   - Full-screen timer
   - Skip/extend options
   - Next exercise preview

10. ActiveWorkoutFlow.tsx
    - Exercise → Log → Rest cycle
    - Progress tracking
    - Completion
```

### Week 4: Library & Polish
```
11. ExercisePickerModal.tsx
    - Search/filter
    - Add to workout
    - Recent exercises

12. Animations & Transitions
    - Modal slides
    - Success states
    - Loading states
```

## 📐 Component Hierarchy

```
App
├── Screens
│   ├── WorkoutBuilderScreen
│   │   └── ExerciseList
│   │       └── ExerciseListItem → [Edit] → ExerciseEditModal
│   │
│   └── ActiveWorkoutScreen
│       └── WorkoutDisplay → [Log] → SetLoggerModal
│                                  → RestTimerModal (auto)
│
└── Shared Modals
    ├── ExerciseEditModal (edit parameters)
    ├── SetLoggerModal (log performance)
    ├── RestTimerModal (between sets)
    └── ExercisePickerModal (add exercises)
```

## 🎨 Critical Measurements

```typescript
// Touch Targets
const MIN_TOUCH = 44;    // iOS minimum
const STANDARD = 60;     // Our minimum  
const LARGE = 80;        // Primary actions
const HUGE = 100;        // Active workout

// Modal Structure
const HEADER_HEIGHT = 60;
const FOOTER_HEIGHT = 80;
const CONTENT_PADDING = 24;

// Number Increments
const WEIGHT_INCREMENT = 5;   // or 2.5 for small
const TIME_INCREMENT = 15;    // seconds
const REPS_INCREMENT = 1;     // always 1
```

## ✅ Implementation Checklist

### Must Have (MVP)
- [ ] Full-screen modals working
- [ ] Number steppers for all inputs  
- [ ] Exercise list with edit buttons
- [ ] Set logging flow complete
- [ ] Rest timer functional
- [ ] Basic navigation working

### Should Have
- [ ] Drag to reorder
- [ ] Quick value selections
- [ ] Previous performance display
- [ ] Loading/error states
- [ ] Basic animations

### Nice to Have
- [ ] Haptic feedback
- [ ] Sound effects
- [ ] Celebration animations
- [ ] Advanced filtering
- [ ] Workout templates

## 🚀 Quick Start Code

### Modal Template
```typescript
const ModalTemplate: React.FC<{
  title: string;
  onBack: () => void;
  onAction?: () => void;
  actionLabel?: string;
  children: React.ReactNode;
}> = ({ title, onBack, onAction, actionLabel, children }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <IconButton icon="arrow-left" onPress={onBack} />
      <Text style={styles.title}>{title}</Text>
      {onAction && (
        <BigButton onPress={onAction} variant="text">
          {actionLabel}
        </BigButton>
      )}
    </View>
    <ScrollView style={styles.content}>
      {children}
    </ScrollView>
  </SafeAreaView>
);
```

### Number Stepper
```typescript
const NumberStepper: React.FC<{
  value: number;
  onChange: (value: number) => void;
  increment?: number;
  min?: number;
  max?: number;
  label: string;
}> = ({ value, onChange, increment = 1, min, max, label }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.controls}>
      <IconButton
        icon="minus"
        onPress={() => onChange(value - increment)}
        disabled={min !== undefined && value <= min}
        size="large"
      />
      <Text style={styles.value}>{value}</Text>
      <IconButton
        icon="plus"
        onPress={() => onChange(value + increment)}
        disabled={max !== undefined && value >= max}
        size="large"
      />
    </View>
  </View>
);
```

## 📋 For New Conversation

You now have:
1. **Design System** - Complete UI/UX specification
2. **Visual Mockups** - Clear examples of every screen
3. **Implementation Guide** - Week-by-week build plan
4. **Component Hierarchy** - What depends on what
5. **Code Examples** - Starting templates

Start with Week 1 foundation components, test the modal pattern with ExerciseEditModal, then build up from there. The pattern scales to all features!

