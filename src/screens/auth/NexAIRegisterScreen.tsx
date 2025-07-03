// =============================================================
// REGISTER SCREEN
// =============================================================

// src/screens/auth/RegisterScreen.tsx
import React, { useState, useEffect } from 'react'
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
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  FadeIn,
  FadeInDown,
  FadeInUp,
  Easing,
} from 'react-native-reanimated'
import { BlurView } from '@react-native-community/blur'
import LinearGradient from 'react-native-linear-gradient'
import { NexAILogo } from '@/components/brand/NexAILogo'
import { useTheme } from '@/theme/hooks/useTheme'
import { Haptics } from '@/utils/haptics'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useAuth } from '@/hooks/useAuth'

const { width: screenWidth } = Dimensions.get('window')


interface NexAIRegisterScreenProps {
  onLogin?: () => void
}

export const NexAIRegisterScreen: React.FC<NexAIRegisterScreenProps> = ({ onLogin }) => {
  const { isDark, colors, glass, animation, performanceMode } = useTheme()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const progressWidth = useSharedValue(0)
  const stepScale = useSharedValue(1)
  const formSlide = useSharedValue(0)
  
  useEffect(() => {
    progressWidth.value = withTiming((currentStep + 1) / 3 * 100, {
      duration: animation.duration.normal,
    })
    
    stepScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, animation.easing.spring.bouncy)
    )
    
    const stepWidth = screenWidth - (theme.spacing.screenPadding * 2) - (theme.spacing.lg * 2)
    formSlide.value = withTiming(-currentStep * stepWidth, {
      duration: animation.duration.normal,
      easing: Easing.out(Easing.exp),
    })
  }, [currentStep])
  
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }))
  
  
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Animated.View
            entering={FadeInUp.springify()}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: colors.text.primary }]}>
              Let's get started
            </Text>
            <Text style={[styles.stepSubtitle, { color: colors.text.secondary }]}>
              Create your account to begin your fitness journey
            </Text>
            
            {/* Name inputs */}
            <View style={styles.nameRow}>
              <View style={[styles.nameInput, styles.inputWrapper]}>
                <View style={[
                  styles.inputContainer,
                  {
                    backgroundColor: isDark ? glass.darkSoft : glass.lightSoft,
                    borderColor: focusedField === 'firstName' 
                      ? theme.colors.primary[500]
                      : theme.borders.glass.light,
                  }
                ]}>
                  <Icon
                    name="user"
                    size={20}
                    color={focusedField === 'firstName' 
                      ? theme.colors.primary[500]
                      : colors.text.tertiary
                    }
                  />
                  <TextInput
                    style={[styles.input, { color: colors.text.primary }]}
                    placeholder="First name"
                    placeholderTextColor={colors.text.tertiary}
                    value={formData.firstName}
                    onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                    onFocus={() => setFocusedField('firstName')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>
              
              <View style={[styles.nameInput, styles.inputWrapper]}>
                <View style={[
                  styles.inputContainer,
                  {
                    backgroundColor: isDark ? glass.darkSoft : glass.lightSoft,
                    borderColor: focusedField === 'lastName' 
                      ? theme.colors.primary[500]
                      : theme.borders.glass.light,
                  }
                ]}>
                  <TextInput
                    style={[styles.input, { color: colors.text.primary }]}
                    placeholder="Last name"
                    placeholderTextColor={colors.text.tertiary}
                    value={formData.lastName}
                    onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                    onFocus={() => setFocusedField('lastName')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>
            </View>
            
            {/* Email input */}
            <View style={styles.inputWrapper}>
              <View style={[
                styles.inputContainer,
                {
                  backgroundColor: isDark ? glass.darkSoft : glass.lightSoft,
                  borderColor: focusedField === 'email' 
                    ? theme.colors.primary[500]
                    : theme.borders.glass.light,
                }
              ]}>
                <Icon
                  name="mail"
                  size={20}
                  color={focusedField === 'email' 
                    ? theme.colors.primary[500]
                    : colors.text.tertiary
                  }
                />
                <TextInput
                  style={[styles.input, { color: colors.text.primary }]}
                  placeholder="Email address"
                  placeholderTextColor={colors.text.tertiary}
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </Animated.View>
        )
        
      case 1:
        return (
          <Animated.View
            entering={FadeInUp.springify()}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: colors.text.primary }]}>
              Secure your account
            </Text>
            <Text style={[styles.stepSubtitle, { color: colors.text.secondary }]}>
              Choose a strong password to protect your data
            </Text>
            
            {/* Password strength indicator */}
            <View style={styles.passwordStrengthContainer}>
              <View style={[styles.passwordStrengthBar, { backgroundColor: isDark ? glass.darkSoft : glass.lightSoft }]}>
                <LinearGradient
                  colors={theme.gradients.success}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.passwordStrengthFill,
                    { width: getPasswordStrength(formData.password) }
                  ]}
                />
              </View>
              <Text style={[styles.passwordStrengthText, { color: colors.text.tertiary }]}>
                {getPasswordStrengthText(formData.password)}
              </Text>
            </View>
            
            {/* Password input */}
            <View style={styles.inputWrapper}>
              <View style={[
                styles.inputContainer,
                {
                  backgroundColor: isDark ? glass.darkSoft : glass.lightSoft,
                  borderColor: focusedField === 'password' 
                    ? theme.colors.primary[500]
                    : theme.borders.glass.light,
                }
              ]}>
                <Icon
                  name="lock"
                  size={20}
                  color={focusedField === 'password' 
                    ? theme.colors.primary[500]
                    : colors.text.tertiary
                  }
                />
                <TextInput
                  style={[styles.input, { color: colors.text.primary }]}
                  placeholder="Password"
                  placeholderTextColor={colors.text.tertiary}
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
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
                    color={colors.text.tertiary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Confirm password input */}
            <View style={styles.inputWrapper}>
              <View style={[
                styles.inputContainer,
                {
                  backgroundColor: isDark ? glass.darkSoft : glass.lightSoft,
                  borderColor: focusedField === 'confirmPassword' 
                    ? theme.colors.primary[500]
                    : theme.borders.glass.light,
                }
              ]}>
                <Icon
                  name="lock"
                  size={20}
                  color={focusedField === 'confirmPassword' 
                    ? theme.colors.primary[500]
                    : colors.text.tertiary
                  }
                />
                <TextInput
                  style={[styles.input, { color: colors.text.primary }]}
                  placeholder="Confirm password"
                  placeholderTextColor={colors.text.tertiary}
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
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
                    color={colors.text.tertiary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )
        
      case 2:
        return (
          <Animated.View
            entering={FadeInUp.springify()}
            style={styles.stepContainer}
          >
            <Text style={[styles.stepTitle, { color: colors.text.primary }]}>
              Almost there!
            </Text>
            <Text style={[styles.stepSubtitle, { color: colors.text.secondary }]}>
              Review our terms and complete your registration
            </Text>
            
            {/* Terms checkbox */}
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
            >
              <View style={[
                styles.checkbox,
                {
                  backgroundColor: acceptedTerms ? theme.colors.primary[500] : (isDark ? glass.darkSoft : glass.lightSoft),
                  borderColor: acceptedTerms ? theme.colors.primary[500] : theme.borders.glass.light,
                }
              ]}>
                {acceptedTerms && (
                  <Icon name="check" size={16} color={theme.colors.neutral[0]} />
                )}
              </View>
              <Text style={[styles.termsText, { color: colors.text.secondary }]}>
                I agree to the{' '}
                <Text style={{ color: theme.colors.primary[500] }}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={{ color: theme.colors.primary[500] }}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>
            
            {/* Marketing checkbox */}
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => {}}
            >
              <View style={[
                styles.checkbox,
                {
                  backgroundColor: isDark ? glass.darkSoft : glass.lightSoft,
                  borderColor: theme.borders.glass.light,
                }
              ]} />
              <Text style={[styles.termsText, { color: colors.text.secondary }]}>
                Send me tips, updates and exclusive offers
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )
      default:
        return null
    }
  }
  
  const getPasswordStrength = (password: string) => {
    if (!password) return '0%'
    if (password.length < 6) return '25%'
    if (password.length < 8) return '50%'
    if (password.length < 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return '75%'
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) return '100%'
    return '50%'
  }
  
  const getPasswordStrengthText = (password: string) => {
    if (!password) return 'Enter a password'
    const strength = getPasswordStrength(password)
    if (strength === '25%') return 'Weak'
    if (strength === '50%') return 'Fair'
    if (strength === '75%') return 'Good'
    if (strength === '100%') return 'Strong'
    return 'Fair'
  }
  
  const handleRegistration = async () => {
    if (!formData.email || !formData.password || !acceptedTerms) {
      setError('Please fill all fields and accept terms')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      await authService.sign_up({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      })
      // Auth service will handle the navigation via state change
    } catch (err: any) {
      setIsLoading(false)
      setError(err.message || 'Registration failed')
    }
  }
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: isDark ? colors.background : colors.background }]}>
        {/* Background */}
        <LinearGradient
          colors={isDark 
            ? ['#000000', '#0A0A0B', '#18181B']
            : ['#FFFFFF', '#FAFAFA', '#F4F4F5']
          }
          style={StyleSheet.absoluteFillObject}
        />
        
        {/* Decorative elements */}
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          style={[styles.gradientOrb, styles.gradientOrbTop]}
        >
          <LinearGradient
            colors={theme.gradients.meshPrimary}
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
            {/* Logo */}
            <Animated.View
              entering={FadeInDown.delay(100).springify()}
              style={styles.logoContainerSmall}
            >
              <NexAILogo
                size={60}
                animated={true}
                variant="minimal"
                showGlow={false}
              />
            </Animated.View>
            
            {/* Progress bar */}
            <Animated.View
              entering={FadeInDown.delay(200).springify()}
              style={styles.progressContainer}
            >
              <View style={[styles.progressBar, { backgroundColor: isDark ? glass.darkSoft : glass.lightSoft }]}>
                <Animated.View style={[styles.progressFill, progressStyle]}>
                  <LinearGradient
                    colors={theme.gradients.primaryVibrant}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFillObject}
                  />
                </Animated.View>
              </View>
              <Text style={[styles.progressText, { color: colors.text.tertiary }]}>
                Step {currentStep + 1} of 3
              </Text>
            </Animated.View>
            
            {/* Form container */}
            <View style={[
              styles.registerFormContainer,
              {
                backgroundColor: isDark ? glass.darkMedium : glass.lightMedium,
                borderColor: isDark ? glass.darkSoft : glass.lightSoft,
              },
              performanceMode !== 'low' && elevation(2),
            ]}>
              {performanceMode !== 'low' && (
                <BlurView
                  style={StyleSheet.absoluteFillObject}
                  blurType={isDark ? 'dark' : 'light'}
                  blurAmount={20}
                />
              )}
              
              <View style={styles.formSteps}>
                {renderStep()}
              </View>
              
              {/* Error Display */}
              {error && (
                <View style={[styles.errorContainer, { backgroundColor: theme.colors.semantic.error + '20', borderColor: theme.colors.semantic.error }]}>
                  <Icon name="alert-circle" size={16} color={theme.colors.semantic.error} />
                  <Text style={[styles.errorText, { color: theme.colors.semantic.error }]}>
                    {error}
                  </Text>
                </View>
              )}
              
              {/* Navigation buttons */}
              <View style={styles.navigationContainer}>
                {currentStep > 0 && (
                  <TouchableOpacity
                    style={[
                      styles.backButton,
                      { borderColor: isDark ? glass.darkSoft : glass.lightSoft }
                    ]}
                    onPress={() => setCurrentStep(currentStep - 1)}
                  >
                    <Icon name="arrow-left" size={20} color={colors.text.primary} />
                    <Text style={[styles.backButtonText, { color: colors.text.primary }]}>
                      Back
                    </Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity
                  style={styles.nextButtonContainer}
                  onPress={() => {
                    if (currentStep < 2) {
                      setCurrentStep(currentStep + 1)
                    } else {
                      handleRegistration()
                    }
                  }}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={theme.gradients.primaryVibrant}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.nextButton}
                  >
                    {isLoading && currentStep === 2 ? (
                      <View style={[styles.loadingContainer, { gap: theme.spacing.xs }]}>
                        <View style={[styles.loadingDot, { backgroundColor: theme.colors.neutral[0] }]} />
                        <View style={[styles.loadingDot, { backgroundColor: theme.colors.neutral[0] }]} />
                        <View style={[styles.loadingDot, { backgroundColor: theme.colors.neutral[0] }]} />
                      </View>
                    ) : (
                      <>
                        <Text style={[styles.nextButtonText, { color: theme.colors.neutral[0] }]}>
                          {currentStep === 2 ? 'Create Account' : 'Next'}
                        </Text>
                        <Icon name="arrow-right" size={20} color={theme.colors.neutral[0]} />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Sign in link */}
            <Animated.View
              entering={FadeInUp.delay(300).springify()}
              style={styles.signinContainer}
            >
              <Text style={[styles.signinText, { color: colors.text.secondary }]}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={onLogin}>
                <Text style={[styles.signinLink, { color: theme.colors.primary[500] }]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  // Base styles from LoginScreen
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.screenPadding,
    paddingVertical: theme.spacing.xl,
  },
  gradientOrb: {
    position: 'absolute',
    opacity: 0.3,
  },
  orb: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
  glassCard: {
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    padding: theme.spacing.lg,
  },
  formContent: {
    padding: theme.spacing.lg,
  },
  inputWrapper: {
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borderRadius.input,
    paddingHorizontal: theme.spacing.md,
    height: theme.components.input.height.large,
    borderWidth: 1,
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body('medium'),
    height: '100%',
  },
  // Register-specific styles (minimal additions following existing patterns)
  formSteps: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    ...typography.heading(2),
    marginBottom: theme.spacing.xs,
  },
  stepSubtitle: {
    ...typography.body('medium'),
    marginBottom: theme.spacing.lg,
  },
  nameRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  nameInput: {
    flex: 1,
  },
  passwordStrengthContainer: {
    marginBottom: theme.spacing.md,
  },
  passwordStrengthBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: theme.spacing.xs,
  },
  passwordStrengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  passwordStrengthText: {
    ...typography.label('small'),
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.xs,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    ...typography.body('small'),
    flex: 1,
    lineHeight: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.button,
    borderWidth: 1,
  },
  backButtonText: {
    ...typography.label('medium'),
  },
  nextButtonContainer: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    height: theme.components.button.height.large,
    borderRadius: theme.borderRadius.button,
    ...elevation(3),
  },
  nextButtonText: {
    ...typography.body('medium'),
    fontWeight: '600',
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    ...typography.body('medium'),
  },
  signinLink: {
    ...typography.label('medium'),
    fontWeight: '600',
  },
  logoContainerSmall: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  progressContainer: {
    marginBottom: theme.spacing.lg,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: theme.spacing.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    ...typography.label('small'),
    textAlign: 'center',
  },
  registerFormContainer: {
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  gradientOrbTop: {
    top: -200,
    left: -100,
    width: 400,
    height: 400,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
  },
  errorText: {
    ...typography.body('small'),
    flex: 1,
  },
})
