// src/screens/auth/NexAILoginScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  withRepeat,
  interpolate,
  Extrapolate,
  FadeIn,
  FadeInDown,
  FadeInUp,
  Layout,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { NexAILogo } from '@/components/brand/NexAILogo';
import { useTheme } from '@/theme/hooks/useTheme';
import { glassMorphism } from '@/theme/utils/glassMorphism';
import { useLogin } from '@/hooks/useAuth';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface NexAILoginScreenProps {
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export const NexAILoginScreen: React.FC<NexAILoginScreenProps> = ({ 
  onForgotPassword, 
  onRegister 
}) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);
  const { mutate: login, isPending } = useLogin();
  
  const formScale = useSharedValue(0.9);
  const formOpacity = useSharedValue(0);
  const backgroundScale = useSharedValue(1.2);
  const glassOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const errorShake = useSharedValue(0);
  
  // Additional animation values for enhanced effects
  const emailFocus = useSharedValue(0);
  const passwordFocus = useSharedValue(0);
  const formProgress = useSharedValue(0);
  
  useEffect(() => {
    // Update focus animations
    emailFocus.value = withSpring(focusedField === 'email' ? 1 : 0);
    passwordFocus.value = withSpring(focusedField === 'password' ? 1 : 0);
    
    // Update form progress based on filled fields
    const progress = (email ? 0.5 : 0) + (password ? 0.5 : 0);
    formProgress.value = withSpring(progress);
  }, [focusedField, email, password]);
  
  useEffect(() => {
    // Initial animations
    formScale.value = withSpring(1, {
      damping: 15,
      stiffness: 100,
    });
    
    formOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
    
    backgroundScale.value = withTiming(1, {
      duration: 1500,
      easing: Easing.out(Easing.cubic),
    });
    
    glassOpacity.value = withDelay(300,
      withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      })
    );
    
    return () => {
      cancelAnimation(formScale);
      cancelAnimation(formOpacity);
      cancelAnimation(backgroundScale);
      cancelAnimation(glassOpacity);
    };
  }, []);
  
  const handleLogin = async () => {
    if (!email || !password) {
      errorShake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 100 }),
        withTiming(-10, { duration: 100 }),
        withTiming(0, { duration: 50 })
      );
      return;
    }
    
    try {
      await login({ email, password });
    } catch (error) {
      errorShake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 100 }),
        withTiming(-10, { duration: 100 }),
        withTiming(0, { duration: 50 })
      );
    }
  };
  
  // Animated styles
  const formStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [
      { scale: formScale.value },
      { translateX: errorShake.value },
    ],
  }));
  
  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [{ scale: backgroundScale.value }],
  }));
  
  const glassStyle = useAnimatedStyle(() => ({
    opacity: glassOpacity.value,
  }));
  
  const emailContainerStyle = useAnimatedStyle(() => {
    const borderColor = interpolate(
      emailFocus.value,
      [0, 1],
      [0, 1],
    );
    
    return {
      borderColor: theme.colors.primary,
      borderWidth: interpolate(emailFocus.value, [0, 1], [1, 2]),
    };
  });
  
  const passwordContainerStyle = useAnimatedStyle(() => ({
    borderColor: theme.colors.primary,
    borderWidth: interpolate(passwordFocus.value, [0, 1], [1, 2]),
  }));
  
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));
  
  const buttonProgressStyle = useAnimatedStyle(() => ({
    opacity: formProgress.value,
  }));
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* Animated gradient background */}
        <Animated.View style={[StyleSheet.absoluteFillObject, backgroundStyle]}>
          <LinearGradient
            colors={theme.isDark
              ? ['#0A0A14', '#14141F', '#1A1A2E']
              : ['#FAFBFF', '#F0F2FF', '#E8EBFF']
            }
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
        
        {/* Gradient orbs */}
        <Animated.View style={[styles.gradientOrb, styles.gradientOrbTop, glassStyle]}>
          <LinearGradient
            colors={['rgba(99, 102, 241, 0.3)', 'rgba(99, 102, 241, 0)']}
            style={styles.orb}
          />
        </Animated.View>
        
        <Animated.View style={[styles.gradientOrb, styles.gradientOrbBottom, glassStyle]}>
          <LinearGradient
            colors={['rgba(249, 115, 22, 0.3)', 'rgba(249, 115, 22, 0)']}
            style={styles.orb}
          />
        </Animated.View>
        
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View entering={FadeInDown.springify()}>
              {/* Logo */}
              <View style={styles.logoContainer}>
                <NexAILogo size={100} animated={false} variant="default" />
              </View>
              
              {/* Welcome text */}
              <Animated.View entering={FadeInDown.delay(200).springify()}>
                <Text style={[styles.welcomeTitle, { color: theme.colors.text_primary }]}>
                  Welcome Back
                </Text>
                <Text style={[styles.welcomeSubtitle, { color: theme.colors.text_secondary }]}>
                  Sign in to continue your fitness journey
                </Text>
              </Animated.View>
              
              {/* Login form */}
              <Animated.View style={[styles.formContainer, formStyle]}>
                <View style={[
                  styles.glassCard,
                  glassMorphism({ variant: 'medium', isDark: theme.isDark }),
                ]}>
                  {/* Email input */}
                  <Animated.View 
                    entering={FadeInUp.delay(400).springify()}
                    layout={Layout.springify()}
                  >
                    <Animated.View style={[
                      styles.inputContainer,
                      {
                        backgroundColor: theme.isDark 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.02)',
                        borderColor: theme.colors.glass_border,
                      },
                      emailContainerStyle,
                    ]}>
                      <Icon
                        name="mail"
                        size={20}
                        color={theme.colors.text_tertiary}
                      />
                      <TextInput
                        style={[styles.input, { color: theme.colors.text_primary }]}
                        placeholder="Email"
                        placeholderTextColor={theme.colors.text_tertiary}
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </Animated.View>
                  </Animated.View>
                  
                  {/* Password input */}
                  <Animated.View 
                    entering={FadeInUp.delay(500).springify()}
                    layout={Layout.springify()}
                  >
                    <Animated.View style={[
                      styles.inputContainer,
                      {
                        backgroundColor: theme.isDark 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.02)',
                        borderColor: theme.colors.glass_border,
                      },
                      passwordContainerStyle,
                    ]}>
                      <Icon
                        name="lock"
                        size={20}
                        color={theme.colors.text_tertiary}
                      />
                      <TextInput
                        style={[styles.input, { color: theme.colors.text_primary }]}
                        placeholder="Password"
                        placeholderTextColor={theme.colors.text_tertiary}
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Icon
                          name={showPassword ? 'eye' : 'eye-off'}
                          size={20}
                          color={theme.colors.text_tertiary}
                        />
                      </TouchableOpacity>
                    </Animated.View>
                  </Animated.View>
                  
                  {/* Forgot Password */}
                  <Animated.View
                    entering={FadeInUp.delay(600).springify()}
                    layout={Layout.springify()}
                    style={styles.forgotContainer}
                  >
                    <TouchableOpacity onPress={onForgotPassword}>
                      <Text style={[styles.forgotText, { color: theme.colors.primary }]}>
                        Forgot password?
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                  
                  {/* Login Button */}
                  <Animated.View
                    entering={FadeInUp.delay(700).springify()}
                    style={[buttonAnimatedStyle, buttonProgressStyle]}
                  >
                    <TouchableOpacity
                      onPress={handleLogin}
                      disabled={isPending}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={['#2196F3', '#9C27B0']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                          styles.loginButton,
                          isPending && styles.loginButtonDisabled
                        ]}
                      >
                        {isPending ? (
                          <View style={styles.loadingContainer}>
                            <Text style={styles.loginButtonText}>Signing in...</Text>
                          </View>
                        ) : (
                          <Text style={styles.loginButtonText}>Sign In</Text>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  </Animated.View>
                  
                  {/* Divider */}
                  <Animated.View
                    entering={FadeInUp.delay(800).springify()}
                    style={styles.dividerContainer}
                  >
                    <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
                    <Text style={[styles.dividerText, { color: theme.colors.text_tertiary }]}>
                      OR
                    </Text>
                    <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
                  </Animated.View>
                  
                  {/* Social login */}
                  <Animated.View
                    entering={FadeInUp.delay(900).springify()}
                    style={styles.socialContainer}
                  >
                    <TouchableOpacity 
                      style={[
                        styles.socialButton,
                        { 
                          backgroundColor: theme.isDark 
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.02)',
                          borderColor: theme.colors.glass_border,
                        }
                      ]}
                    >
                      <Icon name="chrome" size={24} color={theme.colors.text_primary} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[
                        styles.socialButton,
                        { 
                          backgroundColor: theme.isDark 
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.02)',
                          borderColor: theme.colors.glass_border,
                        }
                      ]}
                    >
                      <Icon name="smartphone" size={24} color={theme.colors.text_primary} />
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              </Animated.View>
              
              {/* Sign up link */}
              <Animated.View
                entering={FadeInUp.delay(1000).springify()}
                style={styles.signupContainer}
              >
                <Text style={[styles.signupText, { color: theme.colors.text_secondary }]}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity onPress={onRegister}>
                  <Text style={[styles.signupLink, { color: theme.colors.primary }]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
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
    justifyContent: 'center',
  },
  gradientOrb: {
    position: 'absolute',
    opacity: 0.3,
  },
  gradientOrbTop: {
    top: -100,
    right: -100,
    width: 300,
    height: 300,
  },
  gradientOrbBottom: {
    bottom: -150,
    left: -100,
    width: 400,
    height: 400,
  },
  orb: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  formContainer: {
    marginBottom: 24,
  },
  glassCard: {
    borderRadius: 24,
    padding: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    gap: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
