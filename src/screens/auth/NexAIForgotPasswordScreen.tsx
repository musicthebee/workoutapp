// src/screens/auth/NexAIForgotPasswordScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  FadeIn,
  FadeInDown,
  FadeInUp,
  Easing,
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@/theme/hooks/useTheme';
import { glassMorphism } from '@/theme/utils/glassMorphism';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '@/hooks/useAuth';

interface NexAIForgotPasswordScreenProps {
  onBackToLogin?: () => void;
}

export const NexAIForgotPasswordScreen: React.FC<NexAIForgotPasswordScreenProps> = ({ 
  onBackToLogin 
}) => {
  const theme = useTheme();
  const { reset_password } = useAuth();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Animation values
  const iconScale = useSharedValue(0);
  const iconRotation = useSharedValue(0);
  const formScale = useSharedValue(0.9);
  const formOpacity = useSharedValue(0);
  const successScale = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  
  useEffect(() => {
    // Icon entrance animation
    iconScale.value = withSpring(1, {
      damping: 12,
      stiffness: 100,
    });
    
    // Icon rotation animation
    iconRotation.value = withRepeat(
      withTiming(360, {
        duration: 20000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    
    // Form entrance animation
    formScale.value = withSpring(1, {
      damping: 15,
      stiffness: 100,
    });
    
    formOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
    
    // Pulse animation for icon
    pulseScale.value = withRepeat(
      withTiming(1.1, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);
  
  useEffect(() => {
    if (isSuccess) {
      successScale.value = withSpring(1, {
        damping: 10,
        stiffness: 100,
      });
    }
  }, [isSuccess]);
  
  const handleResetPassword = async () => {
    if (!email.trim()) return;
    
    setIsLoading(true);
    try {
      await reset_password(email.trim());
      setIsSuccess(true);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Animated styles
  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: iconScale.value * pulseScale.value },
      { rotate: `${iconRotation.value}deg` },
    ],
  }));
  
  const formStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ scale: formScale.value }],
  }));
  
  const successStyle = useAnimatedStyle(() => ({
    transform: [{ scale: successScale.value }],
    opacity: successScale.value,
  }));
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* Animated gradient background */}
        <LinearGradient
          colors={theme.isDark
            ? ['#0A0A14', '#14141F', '#1A1A2E']
            : ['#FAFBFF', '#F0F2FF', '#E8EBFF']
          }
          style={StyleSheet.absoluteFillObject}
        />
        
        {/* Gradient orbs */}
        <View style={[styles.gradientOrb, styles.gradientOrbLeft]}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0)']}
            style={styles.orb}
          />
        </View>
        
        <View style={[styles.gradientOrb, styles.gradientOrbRight]}>
          <LinearGradient
            colors={['rgba(99, 102, 241, 0.3)', 'rgba(99, 102, 241, 0)']}
            style={styles.orb}
          />
        </View>
        
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={[styles.scrollContent, { justifyContent: 'center' }]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Back button */}
            <Animated.View
              entering={FadeInDown.springify()}
              style={styles.backButtonContainer}
            >
              <TouchableOpacity 
                style={[
                  styles.circleBackButton,
                  glassMorphism({ variant: 'light', isDark: theme.isDark }),
                ]}
                onPress={onBackToLogin}
              >
                <Icon name="arrow-left" size={24} color={theme.colors.text_primary} />
              </TouchableOpacity>
            </Animated.View>
            
            {/* Icon */}
            <Animated.View
              entering={FadeInDown.delay(100).springify()}
              style={styles.iconContainer}
            >
              <View style={[
                styles.iconCircle,
                glassMorphism({ variant: 'medium', isDark: theme.isDark }),
              ]}>
                <Animated.View style={iconStyle}>
                  <LinearGradient
                    colors={[theme.colors.primary, theme.colors.secondary]}
                    style={styles.iconGradient}
                  >
                    <Icon name="lock" size={32} color="#FFFFFF" />
                  </LinearGradient>
                </Animated.View>
              </View>
            </Animated.View>
            
            {!isSuccess ? (
              <>
                {/* Title */}
                <Animated.View
                  entering={FadeInDown.delay(200).springify()}
                  style={styles.centerContent}
                >
                  <Text style={[styles.forgotTitle, { color: theme.colors.text_primary }]}>
                    Forgot Password?
                  </Text>
                  <Text style={[styles.forgotSubtitle, { color: theme.colors.text_secondary }]}>
                    No worries! Enter your email and we'll send you reset instructions.
                  </Text>
                </Animated.View>
                
                {/* Form */}
                <Animated.View style={[styles.forgotFormContainer, formStyle]}>
                  <View style={[
                    styles.glassCard,
                    glassMorphism({ variant: 'medium', isDark: theme.isDark }),
                  ]}>
                    {/* Email input */}
                    <Animated.View entering={FadeInUp.delay(400).springify()}>
                      <Text style={[styles.inputLabel, { color: theme.colors.text_secondary }]}>
                        Email Address
                      </Text>
                      <View style={[
                        styles.inputContainer,
                        {
                          backgroundColor: theme.isDark 
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.02)',
                          borderColor: theme.colors.glass_border,
                        },
                      ]}>
                        <Icon
                          name="mail"
                          size={20}
                          color={theme.colors.text_tertiary}
                        />
                        <TextInput
                          style={[styles.input, { color: theme.colors.text_primary }]}
                          placeholder="Enter your email"
                          placeholderTextColor={theme.colors.text_tertiary}
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          editable={!isLoading}
                        />
                      </View>
                    </Animated.View>
                    
                    {/* Submit button */}
                    <Animated.View entering={FadeInUp.delay(500).springify()}>
                      <TouchableOpacity
                        onPress={handleResetPassword}
                        disabled={isLoading || !email.trim()}
                        activeOpacity={0.8}
                      >
                        <LinearGradient
                          colors={[theme.colors.primary, theme.colors.secondary]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={[
                            styles.submitButton,
                            (isLoading || !email.trim()) && styles.submitButtonDisabled
                          ]}
                        >
                          <Text style={styles.submitButtonText}>
                            {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </Animated.View>
                  </View>
                </Animated.View>
                
                {/* Back to login link */}
                <Animated.View
                  entering={FadeInUp.delay(600).springify()}
                  style={styles.backToLoginContainer}
                >
                  <Text style={[styles.backToLoginText, { color: theme.colors.text_secondary }]}>
                    Remember your password?{' '}
                  </Text>
                  <TouchableOpacity onPress={onBackToLogin}>
                    <Text style={[styles.backToLoginLink, { color: theme.colors.primary }]}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </>
            ) : (
              /* Success state */
              <Animated.View style={[styles.successContainer, successStyle]}>
                <View style={[
                  styles.successCard,
                  glassMorphism({ variant: 'light', isDark: theme.isDark }),
                ]}>
                  <View style={styles.successIcon}>
                    <LinearGradient
                      colors={['#26DE81', '#0BE881']}
                      style={styles.successIconGradient}
                    >
                      <Icon name="check" size={32} color="#FFFFFF" />
                    </LinearGradient>
                  </View>
                  
                  <Text style={[styles.successTitle, { color: theme.colors.text_primary }]}>
                    Check Your Email
                  </Text>
                  
                  <Text style={[styles.successText, { color: theme.colors.text_secondary }]}>
                    We've sent password reset instructions to:
                  </Text>
                  
                  <Text style={[styles.successEmail, { color: theme.colors.text_primary }]}>
                    {email}
                  </Text>
                  
                  <Text style={[styles.successNote, { color: theme.colors.text_tertiary }]}>
                    Didn't receive the email? Check your spam folder or try again in a few minutes.
                  </Text>
                  
                  <TouchableOpacity
                    onPress={onBackToLogin}
                    activeOpacity={0.8}
                    style={styles.backButton}
                  >
                    <LinearGradient
                      colors={[theme.colors.primary, theme.colors.secondary]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.backButtonGradient}
                    >
                      <Text style={styles.backButtonText}>Back to Sign In</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => {
                      setIsSuccess(false);
                      setEmail('');
                    }}
                    style={styles.resendContainer}
                  >
                    <Text style={[styles.resendText, { color: theme.colors.text_secondary }]}>
                      Wrong email?{' '}
                    </Text>
                    <Text style={[styles.resendLink, { color: theme.colors.primary }]}>
                      Try again
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  gradientOrb: {
    position: 'absolute',
    opacity: 0.3,
  },
  gradientOrbLeft: {
    top: 100,
    left: -150,
    width: 300,
    height: 300,
  },
  gradientOrbRight: {
    bottom: 100,
    right: -150,
    width: 350,
    height: 350,
  },
  orb: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  backButtonContainer: {
    marginBottom: 32,
  },
  circleBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    marginBottom: 32,
  },
  forgotTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  forgotSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  forgotFormContainer: {
    marginBottom: 24,
  },
  glassCard: {
    borderRadius: 24,
    padding: 24,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    gap: 12,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  submitButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backToLoginText: {
    fontSize: 14,
  },
  backToLoginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
  },
  successCard: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
  },
  successIcon: {
    marginBottom: 24,
  },
  successIconGradient: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  successText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  successEmail: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
  },
  successNote: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  backButton: {
    width: '100%',
    marginBottom: 16,
  },
  backButtonGradient: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 14,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
