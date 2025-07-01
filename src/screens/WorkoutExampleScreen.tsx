import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  GlassBase,
  ButtonBase,
  TextBase,
  InputBase,
  Spacer,
  Flex,
  Grid,
  ProgressBase,
  AnimatedValue,
} from '@/components/atoms';
import { useTheme } from '@/hooks';

/**
 * Workout Example Screen
 * Shows how atoms compose into real workout UI
 */
export const WorkoutExampleScreen: React.FC = () => {
  const theme = useTheme();
  
  // Mock data
  const [currentSet, setCurrentSet] = useState(2);
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [repsInput, setRepsInput] = useState('');
  const [weightInput, setWeightInput] = useState('135');
  
  const exercises = [
    { id: '1', name: 'Bench Press', sets: '3x10', muscle: 'Chest', completed: true },
    { id: '2', name: 'Incline Press', sets: '3x8', muscle: 'Chest', completed: false },
    { id: '3', name: 'Cable Flyes', sets: '3x12', muscle: 'Chest', completed: false },
    { id: '4', name: 'Tricep Dips', sets: '3x10', muscle: 'Triceps', completed: false },
  ];
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Flex direction="row" justify="between" align="center">
          <TextBase variant="heading_2">Push Day</TextBase>
          <TextBase variant="body_medium" color="secondary">
            {exercises.filter(e => e.completed).length}/{exercises.length} exercises
          </TextBase>
        </Flex>
        
        <Spacer size="lg" />
        
        {/* Progress */}
        <ProgressBase 
          progress={exercises.filter(e => e.completed).length / exercises.length} 
          variant="linear" 
          size="md" 
        />
        
        <Spacer size="xl" />
        
        {/* Current Exercise Display */}
        <GlassBase variant="heavy" style={{ padding: theme.spacing.xl }}>
          <Flex align="center" gap="md">
            <TextBase variant="body_small" color="secondary">CURRENT EXERCISE</TextBase>
            <TextBase variant="heading_1">Bench Press</TextBase>
            <TextBase variant="heading_3" color="primary">Set {currentSet} of 3</TextBase>
            
            <Spacer size="md" />
            
            <Flex direction="row" gap="xl" justify="center">
              <Flex align="center">
                <TextBase variant="caption" color="tertiary">PREVIOUS</TextBase>
                <TextBase variant="body_large">10 × 135 lbs</TextBase>
              </Flex>
              
              <View style={{ width: theme.borders.widths.thin, backgroundColor: theme.colors.divider }} />
              
              <Flex align="center">
                <TextBase variant="caption" color="tertiary">TARGET</TextBase>
                <TextBase variant="body_large" color="primary">10 reps</TextBase>
              </Flex>
            </Flex>
          </Flex>
        </GlassBase>
        
        <Spacer size="xl" />
        
        {/* Rest Timer */}
        <GlassBase variant="medium" style={{ padding: theme.spacing.lg }}>
          <Flex direction="row" justify="between" align="center">
            <Flex>
              <TextBase variant="caption" color="tertiary">REST TIME</TextBase>
              <AnimatedValue 
                value={timeRemaining}
                format={(v) => `${Math.floor(v)}s`}
                style={{ fontSize: theme.typography.heading_2.font_size }}
              />
            </Flex>
            
            <ButtonBase variant="ghost" size="sm" onPress={() => setTimeRemaining(0)}>
              <TextBase variant="button_small">Skip Rest</TextBase>
            </ButtonBase>
          </Flex>
        </GlassBase>
        
        <Spacer size="xl" />
        
        {/* Log Set Form */}
        <TextBase variant="heading_4">Log This Set</TextBase>
        <Spacer size="md" />
        
        <Flex gap="md">
          <Flex direction="row" gap="md">
            <Flex flex={1} gap="xs">
              <TextBase variant="body_small" color="tertiary">REPS</TextBase>
              <InputBase
                variant="numeric"
                size="lg"
                placeholder="10"
                value={repsInput}
                onChangeText={setRepsInput}
              />
            </Flex>
            
            <Flex flex={1} gap="xs">
              <TextBase variant="body_small" color="tertiary">WEIGHT (LBS)</TextBase>
              <InputBase
                variant="numeric"
                size="lg"
                placeholder="135"
                value={weightInput}
                onChangeText={setWeightInput}
              />
            </Flex>
          </Flex>
          
          <ButtonBase 
            variant="primary" 
            size="lg" 
            onPress={() => console.log('Complete set')}
          >
            <TextBase variant="button_large" color="inverse">
              Complete Set
            </TextBase>
          </ButtonBase>
        </Flex>
        
        <Spacer size="xl" />
        
        {/* Exercise List */}
        <TextBase variant="heading_4">Today's Exercises</TextBase>
        <Spacer size="md" />
        
        <Flex gap="sm">
          {exercises.map((exercise, index) => (
            <GlassBase 
              key={exercise.id} 
              variant="light" 
              style={{ 
                padding: theme.spacing.md,
                opacity: exercise.completed ? 0.7 : 1,
              }}
            >
              <Flex direction="row" justify="between" align="center">
                <Flex direction="row" gap="md" align="center" flex={1}>
                  <TextBase variant="body_large" color="tertiary">
                    {index + 1}
                  </TextBase>
                  
                  <Flex flex={1}>
                    <TextBase 
                      variant="body_medium" 
                      style={{ 
                        textDecorationLine: exercise.completed ? 'line-through' : 'none' 
                      }}
                    >
                      {exercise.name}
                    </TextBase>
                    <TextBase variant="caption" color="secondary">
                      {exercise.sets} • {exercise.muscle}
                    </TextBase>
                  </Flex>
                </Flex>
                
                {exercise.completed && (
                  <TextBase variant="body_medium" color="success">✓</TextBase>
                )}
              </Flex>
            </GlassBase>
          ))}
        </Flex>
        
        <Spacer size="xl" />
        
        {/* Action Buttons */}
        <Grid columns={2} gap="md">
          <ButtonBase variant="ghost" size="md" onPress={() => {}}>
            <TextBase variant="button_medium">Add Exercise</TextBase>
          </ButtonBase>
          
          <ButtonBase variant="danger" size="md" onPress={() => {}}>
            <TextBase variant="button_medium" color="inverse">End Workout</TextBase>
          </ButtonBase>
        </Grid>
        
        <Spacer size="xxxl" />
      </ScrollView>
    </SafeAreaView>
  );
};
