// src/screens/ComponentShowcaseV2Screen.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '@/hooks';
import type { MuscleGroup } from '@/types';
import { 
  Spacer, 
  TextBase,
  GlassBase,
} from '@/components/atoms';
import {
  ModalTemplate,
  ModalHeader,
  NumberStepper,
  QuickSelectRow,
  BigButton,
  QuickActionButton,
  FloatingActionButton,
  EmptyState,
  ListEmptyState,
  SearchEmptyState,
  ErrorEmptyState,
  SearchInput,
  SearchBar,
  FilterChip,
  FilterChipGroup,
  ActiveFilters,
  StatCard,
  StatCardGrid,
  MiniStat,
  PerformanceHint,
  PerformanceComparison,
  Badge,
} from '@/components/molecules';
import { 
  useExercises, 
  useWorkouts, 
  useActiveWorkout,
  useTimer,
} from '@/hooks';

/**
 * Component Showcase Screen
 * Demonstrates all Phase 5 (Hooks) and Phase 6 (Molecules) components
 * Following project principles: DRY, Type Safety, Snake_case, Theme Tokens
 */
export const ComponentShowcaseScreen: React.FC = () => {
  const theme = useTheme();
  
  // Demo state using our hooks - ALL FIXED!
  const { filters, handle_filter_change, toggle_favorites_filter } = useExercises(); // ✅ FIXED
  useWorkouts(); // ✅ FIXED
  const { is_active, start_empty_workout, end_workout } = useActiveWorkout(); // ✅ FIXED
  const timer = useTimer({ mode: 'countdown', initial_seconds: 90 });
  
  // Mock data for better showcase since filtering is disabled
  const demo_exercises = Array.from({ length: 12 }, (_, i) => ({ 
    id: `ex-${i}`, 
    name: `Exercise ${i + 1}` 
  }));
  const demo_workouts = Array.from({ length: 8 }, (_, i) => ({ 
    id: `wo-${i}`, 
    name: `Workout ${i + 1}` 
  }));
  const demo_workout_counts = { total: 25, library: 15, mine: 10 };
  
  // Local demo state
  const [search_query, setSearchQuery] = useState('');
  const [stepper_value, setStepperValue] = useState(10);
  const [selected_weight, setSelectedWeight] = useState(135);
  const [show_modal, setShowModal] = useState(false);
  const [active_filters, setActiveFilters] = useState([
    { id: '1', label: 'Muscle', value: 'Chest' },
    { id: '2', label: 'Equipment', value: 'Barbell' },
  ]);
  
  const demo_chips = [
    { id: 'chest', label: 'Chest', count: 15, is_selected: true },
    { id: 'back', label: 'Back', count: 12, is_selected: false },
    { id: 'quads', label: 'Quads', count: 18, is_selected: false },
    { id: 'shoulders', label: 'Shoulders', count: 10, is_selected: false },
  ];
  
  const demo_stats = [
    { id: '1', label: 'Total', value: demo_workout_counts.total, icon: 'fitness' as const, trend: 'up' as const, trend_value: '+12%' },
    { id: '2', label: 'Library', value: demo_exercises.length, icon: 'barbell' as const, trend: 'up' as const, trend_value: '+5' },
    { id: '3', label: 'Week', value: 4, icon: 'calendar' as const },
    { id: '4', label: 'Streak', value: 7, icon: 'flame' as const, trend: 'up' as const, trend_value: '+2' },
  ];
  
  const demo_performance = {
    reps: 8,
    weight: 225,
    is_pr: true,
    date: new Date().toISOString(),
  };
  
  const previous_performance = {
    reps: 6,
    weight: 205,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    section: {
      marginBottom: theme.spacing.xxxl,
    },
    sectionHeader: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      marginBottom: theme.spacing.xs,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.md,
    },
    gridItem: {
      flex: 1,
      minWidth: 160,
    },
    buttonRow: {
      flexDirection: 'row',
    },
    quickButtonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
      flexWrap: 'wrap',
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.sm,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    demoBox: {
      padding: theme.spacing.lg,
      borderRadius: theme.borders.radii.md,
    },
    modalContent: {
      padding: theme.spacing.xl,
    },
  });

  return (
    <ModalTemplate
      header={
        <ModalHeader
          title="Components V2"
          on_back={() => {}}
          on_action={() => setShowModal(true)}
          action_label="Modal"
        />
      }
      scrollable
    >
        <View style={{ marginTop: theme.spacing.xl }}>
        {/* Phase 5: Hooks Demo */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextBase variant="heading_2" style={styles.sectionTitle}>
              Phase 5: Core Hooks
            </TextBase>
            <TextBase variant="body_medium" color="secondary">
              State management in action
            </TextBase>
          </View>
          
          <GlassBase variant="light" style={styles.demoBox}>
            <TextBase variant="body_small" color="secondary">Active Hooks:</TextBase>
            <Spacer size="sm" />
            <TextBase variant="body_medium">• useExercises: {demo_exercises.length} exercises loaded</TextBase>
            <TextBase variant="body_medium">• useWorkouts: {demo_workouts.length} workouts, {demo_workout_counts.total} total</TextBase>
            <TextBase variant="body_medium">• useActiveWorkout: {is_active ? 'Active' : 'Inactive'}</TextBase>
            <TextBase variant="body_medium">• useTimer: {timer.display}</TextBase>
            <TextBase variant="body_medium">• Filters active: {Object.keys(filters).length}</TextBase>
            <Spacer size="md" />
            <View style={styles.row}>
              <BigButton
                label={is_active ? "End Workout" : "Start Workout"}
                onPress={is_active ? end_workout : start_empty_workout}
                variant={is_active ? "secondary" : "primary"}
                icon={is_active ? "stop-circle" : "play-circle"}>
                {is_active ? "End Workout" : "Start Workout"}
              </BigButton>
            </View>
            <Spacer size="sm" />
            <View style={styles.row}>
              <BigButton
                label="Toggle Favorites"
                onPress={toggle_favorites_filter}
                variant="secondary"
                icon="heart"
              >
              </BigButton>
            </View>
          </GlassBase>
        </View>

        {/* Input Components */}
        <View style={styles.section}>
          <TextBase variant="heading_3" style={styles.sectionHeader}>
            Input Components
          </TextBase>
          
          {/* Search Inputs */}
          <TextBase variant="heading_4">Search Input</TextBase>
          <Spacer size="sm" />
          <SearchInput
            value={search_query}
            on_change_text={setSearchQuery}
            placeholder="Search exercises..."
          />
          <Spacer size="md" />
          
          <SearchBar
            value={search_query}
            on_change_text={setSearchQuery}
            on_filter_press={() => {}}
            filter_count={active_filters.length}
          />
          <Spacer size="lg" />
          
          {/* Number Stepper */}
          <TextBase variant="heading_4">Number Stepper</TextBase>
          <Spacer size="sm" />
          <NumberStepper
            value={stepper_value}
            on_value_change={setStepperValue}
            label="Reps"
            min={1}
            max={30}
          />
          <Spacer size="lg" />
          
          {/* Quick Select */}
          <TextBase variant="heading_4">Quick Select Row</TextBase>
          <Spacer size="sm" />
          <QuickSelectRow
            values={[95, 115, 135, 155, 185]}
            selected_value={selected_weight}
            on_select={setSelectedWeight}
            label="Common Weights (lbs)"
          />
        </View>

        {/* Button Components */}
        <View style={[styles.section, { paddingTop: theme.spacing.lg }]}>
          <TextBase variant="heading_3" style={styles.sectionHeader}>
            Button Components
          </TextBase>
          
          <View style={styles.buttonRow}>
            <BigButton
              label="Complete Set"
              icon="checkmark-circle"
              onPress={() => {}}
              variant="primary"
            >
            </BigButton>
          </View>
          <Spacer size="sm" />
          <View style={styles.buttonRow}>
            <BigButton
              label="Rest Timer"
              icon="timer"
              variant="secondary"
              onPress={() => timer.toggle()}
            >
            </BigButton>
          </View>
          <Spacer size="md" />
          
          <View style={styles.quickButtonRow}>
            <QuickActionButton
              label="History"
              icon="time"
              on_press={() => {}}
              variant="secondary"
              badge={3}
            />
            <QuickActionButton
              label="Exercises"
              icon="barbell"
              on_press={() => {}}
              variant="secondary"
            />
          </View>
        </View>

        {/* Filter Components */}
        <View style={styles.section}>
          <TextBase variant="heading_3" style={styles.sectionHeader}>
            Filter Components
          </TextBase>
          
          <TextBase variant="heading_4">Filter Chips</TextBase>
          <Spacer size="sm" />
          <FilterChipGroup
            chips={demo_chips}
            on_chip_press={(id: string) => {
              console.log('Chip pressed:', id);
              handle_filter_change('muscle_groups', [id as MuscleGroup]);
            }}
          />
          <Spacer size="md" />
          
          <TextBase variant="heading_4">Individual Filter Chip</TextBase>
          <Spacer size="sm" />
          <View style={styles.row}>
            <FilterChip
              id="demo"
              label="Chest"
              count={15}
              is_selected={true}
              on_press={() => console.log('Single chip pressed')}
            />
            <FilterChip
              id="demo2"
              label="Back"
              count={12}
              is_selected={false}
              on_press={() => console.log('Single chip pressed')}
            />
          </View>
          <Spacer size="lg" />
          
          <TextBase variant="heading_4">Active Filters</TextBase>
          <Spacer size="sm" />
          <ActiveFilters
            filters={active_filters}
            on_remove={(id: string) => setActiveFilters(active_filters.filter(f => f.id !== id))}
            on_clear_all={() => setActiveFilters([])}
          />
        </View>

        {/* Display Components */}
        <View style={styles.section}>
          <TextBase variant="heading_3" style={styles.sectionHeader}>
            Display Components
          </TextBase>
          
          {/* Stat Cards */}
          <TextBase variant="heading_4">Stat Card Grid</TextBase>
          <Spacer size="sm" />
          <StatCardGrid stats={demo_stats} columns={2} animated />
          <Spacer size="md" />
          
          <TextBase variant="heading_4">Individual Stat Card</TextBase>
          <Spacer size="sm" />
          <StatCard
            id="demo-card"
            label="Total Workouts"
            value={42}
            unit="sessions"
            icon="fitness"
            trend="up"
            trend_value="+5 this week"
            animated={true}
          />
          <Spacer size="lg" />
          
          {/* Mini Stats */}
          <TextBase variant="heading_4">Mini Stats</TextBase>
          <Spacer size="sm" />
          <View style={styles.row}>
            <MiniStat label="Sets" value="3 × 8" icon="layers" />
            <MiniStat label="Weight" value="225 lbs" icon="barbell" />
            <MiniStat label="Rest" value="90s" icon="timer" />
          </View>
          <Spacer size="lg" />
          
          {/* Performance Hints */}
          <TextBase variant="heading_4">Performance Hints</TextBase>
          <Spacer size="sm" />
          <PerformanceHint
            label="Last Performance"
            performance={demo_performance}
            variant="card"
          />
          <Spacer size="md" />
          <PerformanceComparison
            current={demo_performance}
            previous={previous_performance}
          />
          <Spacer size="md" />
          
          {/* Badges */}
          <View style={styles.row}>
            <Badge label="PR" variant="pr" />
            <Badge label="New" variant="new" />
            <Badge label="+20 lbs" variant="improved" />
            <Badge label="Custom" color={theme.colors.info} icon="star" />
          </View>
        </View>

        {/* Empty States */}
        <View style={styles.section}>
          <TextBase variant="heading_3" style={styles.sectionHeader}>
            Empty States
          </TextBase>
          
          <GlassBase variant="light" style={{ height: 200 }}>
            <ListEmptyState
              title="No Exercises Found"
              item_type="exercises"
              action_label="Add Exercise"
              on_action={() => {}}
            />
          </GlassBase>
          <Spacer size="md" />
          
          <GlassBase variant="light" style={{ height: 200 }}>
            <SearchEmptyState
              title="No Results Found"
              search_query={search_query || "bench press"}
              on_clear_search={() => setSearchQuery('')}
            />
          </GlassBase>
          <Spacer size="md" />
          
          <GlassBase variant="light" style={{ height: 200 }}>
            <ErrorEmptyState
              title="Connection Error"
              error_message="Network connection failed"
              on_retry={() => {}}
            />
          </GlassBase>
        </View>

        {/* Timer Demo */}
        <View style={styles.section}>
          <TextBase variant="heading_3" style={styles.sectionHeader}>
            Timer Integration
          </TextBase>
          
          <GlassBase variant="medium" style={styles.demoBox}>
            <TextBase variant="heading_1" style={{ textAlign: 'center' }}>
              {timer.display}
            </TextBase>
            <Spacer size="md" />
            <View style={styles.row}>
              <BigButton
                label={timer.is_running ? "Pause" : "Play"}
                icon={timer.is_running ? "pause" : "play"}
                onPress={timer.toggle}
                variant="primary">
                {timer.is_running ? "Pause" : "Play"}
              </BigButton>
              <BigButton
                label="Reset"
                icon="refresh"
                onPress={timer.reset}
                variant="ghost">
                Reset
              </BigButton>
            </View>
            <Spacer size="sm" />
            <View style={[styles.row, { justifyContent: 'center' }]}>
              <BigButton
                label="-30s"
                onPress={timer.subtract_30_seconds}
                variant="secondary"
                full_width={false}
                style={{ minWidth: 80 }}>
                -30s
              </BigButton>
              <BigButton
                label="+30s"
                onPress={timer.add_30_seconds}
                variant="secondary"
                full_width={false}
                style={{ minWidth: 80 }}
              >
              </BigButton>
            </View>
          </GlassBase>
        </View>

        <Spacer size="xxxl" />
        </View>

      {/* Floating Action Button */}
      <FloatingActionButton
        on_press={() => {}}
        visible={!show_modal}
      />

      {/* Demo Modal */}
      {show_modal && (
        <View style={StyleSheet.absoluteFillObject}>
          <ModalTemplate
            header={
              <ModalHeader
                title="Demo Modal"
                on_back={() => setShowModal(false)}
                on_action={() => setShowModal(false)}
                action_label="Done"
              />
            }
          >
            <View style={styles.modalContent}>
              <EmptyState
                icon="checkmark-circle"
                title="Modal Works!"
                message="This demonstrates the modal template with header"
                action_label="Close"
                on_action={() => setShowModal(false)}
              />
            </View>
          </ModalTemplate>
        </View>
      )}
    </ModalTemplate>
  );
};
