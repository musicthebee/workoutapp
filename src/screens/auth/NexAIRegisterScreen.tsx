// src/screens/auth/NexAIRegisterScreen.tsx
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
  withSequence,
  FadeInDown,
  FadeInUp,
  Easing,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { NexAILogo } from '@/components/brand/NexAILogo';
import { useTheme } from '@/theme/hooks/useTheme';
import { glassMorphism } from '@/theme/utils/glassMorphism';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '@/hooks/useAuth';


interface NexAIRegisterScreenProps {
  onLogin?: () => void;
}

export const NexAIRegisterScreen: React.FC<NexAIRegisterScreenProps> = ({ onLogin }) => {
  const theme = useTheme();
  const { sign_up, is_loading, error } = useAuth();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // Animation values
  const formScale = useSharedValue(0.9);
  const formOpacity = useSharedValue(0);
  const backgroundScale = useSharedValue(1.2);
  const progressWidth = useSharedValue(0);
  const errorShake = useSharedValue(0);
  
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
  }, []);
  
  useEffect(() => {
    // Update password strength
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 25;
    
    setPasswordStrength(strength);
    progressWidth.value = withSpring(strength);
  }, [password]);
  
  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      errorShake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 100 }),
        withTiming(-10, { duration: 100 }),
        withTiming(0, { duration: 50 })
      );
      return;
    }
    
    if (password !== confirmPassword) {
      errorShake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 100 }),
        withTiming(-10, { duration: 100 }),
        withTiming(0, { duration: 50 })
      );
      return;
    }
    
    try {
      await sign_up({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });
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
  
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return '#FF4757';
    if (passwordStrength <= 50) return '#FFA502';
    if (passwordStrength <= 75) return '#FECA57';
    return '#26DE81';
  };
  
  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };
  
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
        <View style={[styles.gradientOrb, styles.gradientOrbTop]}>
          <LinearGradient
            colors={['rgba(249, 115, 22, 0.3)', 'rgba(249, 115, 22, 0)']}
            style={styles.orb}
          />
        </View>
        
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
                <NexAILogo size={80} animated={false} variant="default" showGlow={false} />
              </View>
              
              {/* Title */}
              <Animated.View entering={FadeInDown.delay(200).springify()}>
                <Text style={[styles.title, { color: theme.colors.text_primary }]}>
                  Create Account
                </Text>
                <Text style={[styles.subtitle, { color: theme.colors.text_secondary }]}>
                  Start your fitness evolution
                </Text>
              </Animated.View>
              
              {/* Registration form */}
              <Animated.View style={[styles.formContainer, formStyle]}>
                <View style={[
                  styles.glassCard,
                  glassMorphism({ variant: 'medium', isDark: theme.isDark }),
                ]}>
                  {/* Name inputs */}
                  <View style={styles.nameRow}>
                    <Animated.View 
                      entering={FadeInUp.delay(400).springify()}
                      style={styles.nameInput}
                    >
                      <View style={[
                        styles.inputContainer,
                        {
                          backgroundColor: theme.isDark 
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.02)',
                          borderColor: focusedField === 'firstName' 
                            ? theme.colors.primary 
                            : theme.colors.glass_border,
                          borderWidth: focusedField === 'firstName' ? 2 : 1,
                        },
                      ]}>
                        <TextInput
                          style={[styles.input, { color: theme.colors.text_primary }]}
                          placeholder="First Name"
                          placeholderTextColor={theme.colors.text_tertiary}
                          value={firstName}
                          onChangeText={setFirstName}
                          onFocus={() => setFocusedField('firstName')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </View>
                    </Animated.View>
                    
                    <Animated.View 
                      entering={FadeInUp.delay(450).springify()}
                      style={styles.nameInput}
                    >
                      <View style={[
                        styles.inputContainer,
                        {
                          backgroundColor: theme.isDark 
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.02)',
                          borderColor: focusedField === 'lastName' 
                            ? theme.colors.primary 
                            : theme.colors.glass_border,
                          borderWidth: focusedField === 'lastName' ? 2 : 1,
                        },
                      ]}>
                        <TextInput
                          style={[styles.input, { color: theme.colors.text_primary }]}
                          placeholder="Last Name"
                          placeholderTextColor={theme.colors.text_tertiary}
                          value={lastName}
                          onChangeText={setLastName}
                          onFocus={() => setFocusedField('lastName')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </View>
                    </Animated.View>
                  </View>
                  
                  {/* Email input */}
                  <Animated.View entering={FadeInUp.delay(500).springify()}>
                    <View style={[
                      styles.inputContainer,
                      {
                        backgroundColor: theme.isDark 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.02)',
                        borderColor: focusedField === 'email' 
                          ? theme.colors.primary 
                          : theme.colors.glass_border,
                        borderWidth: focusedField === 'email' ? 2 : 1,
                      },
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
                    </View>
                  </Animated.View>
                  
                  {/* Password input */}
                  <Animated.View entering={FadeInUp.delay(550).springify()}>
                    <View style={[
                      styles.inputContainer,
                      {
                        backgroundColor: theme.isDark 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.02)',
                        borderColor: focusedField === 'password' 
                          ? theme.colors.primary 
                          : theme.colors.glass_border,
                        borderWidth: focusedField === 'password' ? 2 : 1,
                      },
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
                    </View>
                    
                    {/* Password strength indicator */}
                    {password.length > 0 && (
                      <View style={styles.passwordStrengthContainer}>
                        <View style={[styles.progressBar, { backgroundColor: theme.colors.glass_border }]}>
                          <Animated.View 
                            style={[
                              styles.progressFill,
                              { backgroundColor: getPasswordStrengthColor() },
                              progressStyle,
                            ]}
                          />
                        </View>
                        <Text style={[styles.progressText, { color: theme.colors.text_tertiary }]}>
                          Password strength: {getPasswordStrengthText()}
                        </Text>
                      </View>
                    )}
                  </Animated.View>
                  
                  {/* Confirm password input */}
                  <Animated.View entering={FadeInUp.delay(600).springify()}>
                    <View style={[
                      styles.inputContainer,
                      {
                        backgroundColor: theme.isDark 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.02)',
                        borderColor: focusedField === 'confirmPassword' 
                          ? theme.colors.primary 
                          : theme.colors.glass_border,
                        borderWidth: focusedField === 'confirmPassword' ? 2 : 1,
                      },
                    ]}>
                      <Icon
                        name="lock"
                        size={20}
                        color={theme.colors.text_tertiary}
                      />
                      <TextInput
                        style={[styles.input, { color: theme.colors.text_primary }]}
                        placeholder="Confirm Password"
                        placeholderTextColor={theme.colors.text_tertiary}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => setFocusedField(null)}
                        secureTextEntry={!showConfirmPassword}
                      />
                      <TouchableOpacity
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Icon
                          name={showConfirmPassword ? 'eye' : 'eye-off'}
                          size={20}
                          color={theme.colors.text_tertiary}
                        />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                  
                  {/* Register Button */}
                  <Animated.View entering={FadeInUp.delay(700).springify()}>
                    <TouchableOpacity
                      onPress={handleRegister}
                      disabled={is_loading}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={[theme.colors.primary, theme.colors.secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                          styles.registerButton,
                          is_loading && styles.registerButtonDisabled
                        ]}
                      >
                        {is_loading ? (
                          <View style={styles.loadingContainer}>
                            <Text style={styles.registerButtonText}>Creating Account...</Text>
                          </View>
                        ) : (
                          <Text style={styles.registerButtonText}>Create Account</Text>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  </Animated.View>
                  
                  {/* Error display */}
                  {error && (
                    <Animated.View 
                      entering={FadeInUp.springify()}
                      style={[styles.errorContainer, { backgroundColor: 'rgba(255, 71, 87, 0.1)' }]}
                    >
                      <Icon name="alert-circle" size={16} color="#FF4757" />
                      <Text style={[styles.errorText, { color: '#FF4757' }]}>
                        {error.message}
                      </Text>
                    </Animated.View>
                  )}
                </View>
              </Animated.View>
              
              {/* Sign in link */}
              <Animated.View
                entering={FadeInUp.delay(800).springify()}
                style={styles.signinContainer}
              >
                <Text style={[styles.signinText, { color: theme.colors.text_secondary }]}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={onLogin}>
                  <Text style={[styles.signinLink, { color: theme.colors.primary }]}>
                    Sign In
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
  },
  gradientOrb: {
    position: 'absolute',
    opacity: 0.3,
  },
  gradientOrbTop: {
    top: -200,
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
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
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
  nameRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  nameInput: {
    flex: 1,
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
  passwordStrengthContainer: {
    marginTop: -8,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
  },
  registerButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    fontSize: 14,
    flex: 1,
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  signinText: {
    fontSize: 14,
  },
  signinLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});
