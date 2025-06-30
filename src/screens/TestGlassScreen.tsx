// src/screens/TestGlassScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import GlassBase from '@/components/atoms/glass/GlassBase';
import { GradientBackground } from '@/components/atoms/glass/GradientOrb';
import { useTheme } from '@/theme/hooks/useTheme';

export const TestGlassScreen: React.FC = () => {
  const theme = useTheme();
  
  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Glass Test</Text>
        
        <View style={styles.content}>
          <GlassBase variant="light" style={styles.card} glow shimmer>
            <Text style={styles.cardText}>Light Glass</Text>
          </GlassBase>
          
          <GlassBase variant="medium" style={styles.card} glow>
            <Text style={styles.cardText}>Medium Glass</Text>
          </GlassBase>
          
          <GlassBase variant="heavy" style={styles.card} animated>
            <Text style={styles.cardText}>Heavy Glass</Text>
          </GlassBase>
        </View>
        
        <LinearGradient
          colors={[...theme.gradients.primary]}
          style={styles.gradientBox}
        >
          <GlassBase variant="medium" style={styles.glassOverGradient}>
            <Text style={styles.cardText}>Glass over Gradient</Text>
          </GlassBase>
        </LinearGradient>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    gap: 16,
  },
  card: {
    padding: 20,
    borderRadius: 16,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  gradientBox: {
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
  },
  glassOverGradient: {
    padding: 20,
    borderRadius: 12,
  },
});
