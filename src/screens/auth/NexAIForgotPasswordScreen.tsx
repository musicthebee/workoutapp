// =============================================================
// FORGOT PASSWORD SCREEN
// =============================================================
// src/screens/auth/ForgotPasswordScreen.tsx
import React, { useState, useEffect } from 'react'
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
} from 'react-native'
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
} from 'react-native-reanimated'
import { BlurView } from '@react-native-community/blur'
import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '@/theme/hooks/useTheme'
import { Haptics } from '@/utils/haptics'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useAuth } from '@/hooks/useAuth'

interface NexAIForgotPasswordScreenProps {
  onBackToLogin?: () => void
}

export const NexAIForgotPasswordScreen: React.FC<NexAIForgotPasswordScreenProps> = ({ onBackToLogin }) => {
  const { isDark, colors, glass, animation, performanceMode } = useTheme()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const iconRotation = useSharedValue(0)
  const successScale = useSharedValue(0)
  const formScale = useSharedValue(0.9)
  const formOpacity = useSharedValue(0)
  
  useEffect(() => {
    formScale.value = withSpring(1, animation.easing.spring.bouncy)
    formOpacity.value = withTiming(1, {
      duration: animation.duration.normal,
      easing: Easing.out(Easing.exp),
    })
    
    // Icon animation
    iconRotation.value = withRepeat(
      withTiming(360, {
        duration: 20000,
        easing: Easing.linear,
      }),
      -1,
      false
    )
  }, [])
  
  const handleResetPassword = async () => {
    if (!email) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      await authService.reset_password(email)
      setIsLoading(false)
      setIsSuccess(true)
      successScale.value = withSpring(1, animation.easing.spring.bouncy)
    } catch (err: any) {
      setIsLoading(false)
      setError(err.message || 'Failed to send reset email')
    }
  }
  
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotation.value}deg` }],
  }))
  
  const formStyle = useAnimatedStyle(() => ({
    transform: [{ scale: formScale.value }],
    opacity: formOpacity.value,
  }))
  
  const successStyle = useAnimatedStyle(() => ({
    transform: [{ scale: successScale.value }],
  }))
  
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
        
        {/* Decorative gradient */}
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          style={[styles.gradientOrb, { top: -150, right: -150 }]}
        >
          <LinearGradient
            colors={theme.gradients.meshPrimary}
            style={[styles.orb, { width: 350, height: 350 }]}
          />
        </Animated.View>
        
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
                  { 
                    backgroundColor: isDark ? glass.darkSoft : glass.lightSoft,
                    borderColor: theme.borders.glass.light,
                  }
                ]}
                onPress={onBackToLogin}
              >
                <Icon name="arrow-left" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </Animated.View>
            
            {/* Icon */}
            <Animated.View
              entering={FadeInDown.delay(100).springify()}
              style={styles.iconContainer}
            >
              <View style={[
                styles.iconCircle,
                { backgroundColor: isDark ? glass.darkMedium : glass.lightMedium }
              ]}>
                <Animated.View style={iconStyle}>
                  <LinearGradient
                    colors={theme.gradients.primaryVibrant}
                    style={styles.iconGradient}
                  >
                    <Icon name="lock" size={32} color={theme.colors.neutral[0]} />
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
                  <Text style={[styles.forgotTitle, { color: colors.text.primary }]}>
                    Forgot Password?
                  </Text>
                  <Text style={[styles.forgotSubtitle, { color: colors.text.secondary }]}>
                    No worries! Enter your email and we'll send you reset instructions.
                  </Text>
                </Animated.View>
                
                {/* Form */}
                <Animated.View style={[styles.forgotFormContainer, formStyle]}>
                  <View style={[
                    styles.glassCard,
                    {
                      backgroundColor: isDark ? glass.darkMedium : glass.lightMedium,
                      borderColor: theme.borders.glass.light,
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
                    
                    <View style={styles.formContent}>
                      {/* Email Input */}
                      <View style={styles.inputWrapper}>
                        <View style={[
                          styles.inputContainer,
                          {
                            backgroundColor: isDark ? glass.darkSoft : glass.lightSoft,
                            borderColor: focusedField 
                              ? theme.colors.primary[500]
                              : theme.borders.glass.light,
                          }
                        ]}>
                          <Icon
                            name="mail"
                            size={20}
                            color={focusedField 
                              ? theme.colors.primary[500]
                              : colors.text.tertiary
                            }
                          />
                          <TextInput
                            style={[styles.input, { color: colors.text.primary }]}
                            placeholder="Enter your email"
                            placeholderTextColor={colors.text.tertiary}
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setFocusedField(true)}
                            onBlur={() => setFocusedField(false)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                          />
                        </View>
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
                      
                      {/* Reset Button */}
                      <TouchableOpacity
                        onPress={handleResetPassword}
                        disabled={isLoading || !email}
                        activeOpacity={0.8}
                      >
                        <LinearGradient
                          colors={theme.gradients.primaryVibrant}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={[
                            styles.resetButton,
                            (!email || isLoading) && styles.resetButtonDisabled
                          ]}
                        >
                          {isLoading ? (
                            <View style={styles.loadingContainer}>
                              <Animated.View
                                style={[
                                  styles.loadingDot,
                                  { backgroundColor: theme.colors.neutral[0] }
                                ]}
                              />
                              <Animated.View
                                style={[
                                  styles.loadingDot,
                                  { backgroundColor: theme.colors.neutral[0] }
                                ]}
                              />
                              <Animated.View
                                style={[
                                  styles.loadingDot,
                                  { backgroundColor: theme.colors.neutral[0] }
                                ]}
                              />
                            </View>
                          ) : (
                            <>
                              <Text style={[styles.resetButtonText, { color: theme.colors.neutral[0] }]}>
                                Send Reset Link
                              </Text>
                              <Icon name="send" size={20} color={theme.colors.neutral[0]} />
                            </>
                          )}
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              </>
            ) : (
              /* Success State */
              <Animated.View style={[styles.successContainer, successStyle]}>
                <View style={[
                  styles.successIconContainer,
                  { backgroundColor: theme.colors.semantic.success + '20' }
                ]}>
                  <Icon name="check-circle" size={64} color={theme.colors.semantic.success} />
                </View>
                
                <Text style={[styles.successTitle, { color: colors.text.primary }]}>
                  Check your email
                </Text>
                <Text style={[styles.successSubtitle, { color: colors.text.secondary }]}>
                  We've sent password reset instructions to{'\n'}
                  <Text style={{ color: colors.text.primary, fontWeight: '600' }}>{email}</Text>
                </Text>
                
                <TouchableOpacity
                  style={[
                    styles.successButton,
                    { borderColor: theme.borders.glass.light }
                  ]}
                >
                  <Text style={[styles.successButtonText, { color: colors.text.primary }]}>
                    Open Email App
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.resendContainer}>
                  <Text style={[styles.resendText, { color: colors.text.secondary }]}>
                    Didn't receive the email?{' '}
                  </Text>
                  <Text style={[styles.resendLink, { color: theme.colors.primary[500] }]}>
                    Resend
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}
            
            {/* Back to login */}
            {!isSuccess && (
              <Animated.View
                entering={FadeInUp.delay(400).springify()}
                style={styles.backToLoginContainer}
              >
                <TouchableOpacity style={styles.backToLoginButton} onPress={onBackToLogin}>
                  <Icon name="arrow-left" size={16} color={theme.colors.primary[500]} />
                  <Text style={[styles.backToLoginText, { color: theme.colors.primary[500] }]}>
                    Back to Sign In
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}
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
  loadingContainer: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
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
  backButtonContainer: {
    position: 'absolute',
    top: theme.spacing.safeTop + theme.spacing.md,
    left: theme.spacing.screenPadding,
    zIndex: 1,
  },
  circleBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  forgotTitle: {
    ...typography.heading(1),
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  forgotSubtitle: {
    ...typography.body('medium'),
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  forgotFormContainer: {
    marginBottom: theme.spacing.lg,
  },
  resetButton: {
    flexDirection: 'row',
    height: theme.components.button.height.large,
    borderRadius: theme.borderRadius.button,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
    ...elevation(3),
  },
  resetButtonDisabled: {
    opacity: 0.5,
  },
  resetButtonText: {
    ...typography.body('medium'),
    fontWeight: '600',
  },
  backToLoginContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  backToLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  backToLoginText: {
    ...typography.label('medium'),
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  successIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  successTitle: {
    ...typography.heading(2),
    marginBottom: theme.spacing.sm,
  },
  successSubtitle: {
    ...typography.body('medium'),
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  successButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.button,
    borderWidth: 1,
    marginBottom: theme.spacing.lg,
  },
  successButtonText: {
    ...typography.label('medium'),
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    ...typography.body('small'),
  },
  resendLink: {
    ...typography.label('small'),
    fontWeight: '600',
  },
})
