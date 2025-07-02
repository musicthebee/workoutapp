# Workout App - MVP Product Specification

## 🎯 Product Vision

A premium workout tracking application for fitness enthusiasts that provides a beautiful, intuitive experience for performing workouts with real-time guidance and progress tracking.

## 👤 Target User

- **Primary**: Fitness enthusiasts who regularly work out
- **Platform**: iOS and Android
- **Use Case**: During active workouts at the gym or home
- **Key Need**: Simple, beautiful, distraction-free workout tracking

## 📱 MVP Features

### 1. Exercise Management
**Browse & Search**
- View exercise library (template exercises maintained by app)
- View "My Exercises" (user's customized copies)
- Unified search across both library and personal exercises
- Filter by:
  - Muscle groups (chest, back, legs, etc.)
  - Category (strength, cardio, mobility, etc.)
  - Equipment (barbell, dumbbell, bodyweight, etc.)
  - Source (Library, Mine, AI Generated)
- Visual indicators for library vs personal exercises

**Add from Library**
- One-tap to copy library exercise to personal collection
- Exercise becomes fully owned by user
- Can modify without affecting original library version
- Smart duplicate prevention (can't copy same exercise twice)

**Creation & Customization**
- Create exercises manually OR with AI assistance
- AI-guided creation:
  - Provide description, muscles, equipment, energy level
  - AI generates exercise details
  - Edit and refine before saving
  - Track as AI-generated
- Full control over personal exercises:
  - Edit any field (name, sets, reps, rest, instructions)
  - Add personal notes
  - Mark as favorite
  - Archive (soft delete)
- Library exercises are read-only (must copy to edit)

### 2. Workout Management
**Browse & Create**
- Browse workout library (curated workout templates)
- View "My Workouts" (personal workout collection)
- Filter by:
  - Category (strength, HIIT, circuit, etc.)
  - Difficulty (beginner, intermediate, advanced)
  - Duration (time estimates)
  - Source (Library, Mine, AI Generated)

**Copy from Library**
- One-tap to copy library workout to personal collection
- Smart exercise handling:
  - Reuses exercises already in your collection
  - Copies only new exercises you don't have
  - Maintains your customizations on existing exercises
- Copied workout becomes fully yours to modify

**Create Custom Workouts**
- Create from scratch manually OR with AI assistance
- AI-guided workout creation:
  - Provide goals, time, equipment, experience level
  - AI generates complete workout
  - Edit and refine before saving
  - Track as AI-generated
- Full workout control:
  - Add/remove/reorder exercises
  - Customize sets/reps/rest per exercise
  - Edit name and description
  - Archive when no longer needed

**Workout Builder**
- Add exercises from your collection (library copies + custom)
- Set custom sets/reps/rest per exercise
- Drag to reorder exercises
- Save as reusable template
- Workouts use YOUR version of exercises (with your customizations)

### 3. Active Workout Experience
**Workout Flow**
- Start ANY workout (empty, preset, or custom)
- All workouts are modifiable during performance
- Warm-up timer screen (if exercises present)
- Exercise-by-exercise progression
- Real-time guidance

**Dynamic Workout Editing (During Session)**
- Add exercises anytime:
  - "+" button always visible
  - Search existing or create new
  - AI suggestions available
  - Added exercises become permanent part of workout
- Works for ALL workouts (empty or populated)
- Exercises use fractional ordering (no reindexing needed)
- Cannot delete/reorder during MVP (future enhancement)

**Key Principle**: There's no distinction between workout types - any workout can start with 0 to N exercises and be modified during use.

**During Exercise**
- Large, clear exercise name and instructions
- Current set indicator (e.g., "Set 2 of 3")
- Rep counter or timer (based on exercise type)
- Quick weight/resistance logging
- Rest timer between sets

**Rest Screens**
- Full-screen rest timer
- Next exercise preview
- Breathing guide animation
- Skip rest option

**Controls**
- Pause/resume workout
- Skip exercise
- End workout early
- Add exercise anytime

### 4. Progress Tracking
**Workout History**
- List of completed workouts
- Basic stats (duration, exercises completed)
- Performance notes

**Exercise History**
- Previous weights/reps for reference
- Personal records tracking

## 🚫 NOT in MVP (Future Releases)

- Social features (sharing, friends)
- Advanced analytics/charts
- Video demonstrations (only text instructions)
- Reordering exercises during active workout
- Deleting exercises during active workout
- Custom exercise media uploads
- Workout programs/plans
- Calendar integration
- Apple Watch/Wear OS apps
- Nutrition tracking
- Body measurements
- Export/import data
- Workout recommendations beyond basic AI
- Multiple users/coach mode
- Workout history editing

**Note**: We CAN add exercises during workout, but cannot delete or reorder them until workout is complete.

## 🎨 Design Requirements

### Visual Design
- **Glass morphism** throughout
- **Smooth animations** for all transitions
- **Consistent theming** with light/dark modes
- **Large touch targets** for workout use
- **High contrast** for gym lighting

### User Experience
- **Minimal taps** during workouts
- **Clear visual hierarchy**
- **Predictable navigation**
- **Forgiving interactions** (easy to undo)
- **Offline-first** (works without connection)

## 📊 Technical Requirements

### Database Design
- **Copy-on-Customize Pattern**: Users own full copies of data
- **user_id NULL = Library**: Template content maintained by app
- **source_id Tracking**: Links user copies to library originals
- **Fractional Ordering**: exercise_order as FLOAT for conflict-free insertions
- **Smart Deduplication**: Prevent duplicate copies of same library item
- **AI Tracking**: is_ai_generated flag and generation prompts

### Performance
- App launch < 2 seconds
- Screen transitions < 300ms
- 60 FPS animations
- List scrolling smooth with 1000+ items
- Instant exercise additions (no reindexing)

### Data
- Local storage for offline use
- Cloud sync when connected
- No data loss during workouts
- Quick search/filter response
- Workouts auto-save changes
- User owns their data (can modify freely)

### Platform
- iOS 13+ support
- Android 8+ support
- Phone and tablet layouts
- Portrait orientation (landscape optional)

## 🔄 User Flows

### Flow 1: Quick Start
1. Open app → Home screen
2. Choose:
   - "New Workout" (starts with 0 exercises)
   - "Last Workout" (starts with previous exercises)
   - Any favorite workout (starts with saved exercises)
3. Begin workout 
4. Add/perform exercises as desired
5. Complete → All changes auto-saved to that workout

### Flow 2: Browse & Start Workout
1. Open app → Home screen
2. Navigate to Workouts tab
3. Browse or search workouts
4. View workout details
5. Start workout
6. Add/perform exercises as desired
7. Complete → All changes auto-saved

### Flow 3: Create New Workout
1. Navigate to Workouts tab
2. Tap "Create Workout"
3. Choose manual or AI-assisted
4. Name workout
5. Optionally add initial exercises
6. Save workout
7. Can start immediately or save for later

### Flow 4: During ANY Workout
1. See current exercise (or empty if none)
2. Can always tap "+" to add exercise
3. Perform exercise if present
4. Log reps/weight (optional)
5. Auto-start rest timer
6. Continue adding/performing as desired
7. Complete when done

**Key Point**: Every workout is a living document. Whether it starts empty or full, it can always be modified during use.

## 📐 Screen Inventory

1. **Home Screen** - Quick start options (any workout can be modified), recent workouts, favorites
2. **Exercise Library** - Browse/search/filter exercises  
3. **Exercise Detail** - Instructions, history, customize
4. **Workout Library** - Browse/search/filter workouts
5. **Workout Detail** - Exercise list, start button
6. **Workout Builder** - Create/edit workouts
7. **Active Workout** - Exercise display, rep/timer tracking, add exercises
8. **Rest Screen** - Timer, next exercise preview
9. **Workout History** - Past performances
10. **Profile/Settings** - Preferences, theme toggle

## ✅ Success Metrics

- Users complete 80%+ of started workouts
- Average session time > 20 minutes
- Users return 3+ times per week
- 50%+ of workouts get modified (exercises added) during use
- App crash rate < 0.1%
- Users create custom workouts within first week

## 🚀 Launch Requirements

### Pre-Launch
- [ ] 50+ exercises in library
- [ ] 10+ pre-built workouts
- [ ] Full offline functionality
- [ ] Data persistence across sessions
- [ ] Basic onboarding flow

### Post-Launch Monitoring
- Crash reporting (Sentry)
- Analytics (basic events only)
- User feedback mechanism
- Performance monitoring
