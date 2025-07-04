// src/screens/auth/NexAIForgotPasswordScreen.tsx
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { GlassBase, TextBase } from '@/components/atoms';
import { BigButton } from '@/components/molecules';
import { AuthBackground, AuthFormCard, AuthInputField, AuthLink } from '@/components/auth';
import { useTheme } from '@/theme/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { Haptics } from '@/utils/haptics';

interface NexAIForgotPasswordScreenProps {
  onBackToLogin?: () => void;
}

export const NexAIForgotPasswordScreen: React.FC<NexAIForgotPasswordScreenProps> = ({
  onBackToLogin,
}) => {
  const theme = useTheme();
  const { reset_password } = useAuth();

  // Form state
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');

  // Animation
  const iconScale = useSharedValue(1);
  const successScale = useSharedValue(0);

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setValidationError('Email is required');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Please enter a valid email');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) {
      Haptics.error();
      return;
    }

    setApiError('');
    setIsLoading(true);
    Haptics.light();

    try {
      await reset_password(email.trim());
      Haptics.success();
      setIsSuccess(true);
      successScale.value = withSpring(1, {
        damping: 12,
        stiffness: 100,
      });
    } catch (error: any) {
      Haptics.error();
      setApiError(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const successStyle = useAnimatedStyle(() => ({
    transform: [{ scale: successScale.value }],
    opacity: successScale.value,
  }));

  React.useEffect(() => {
    // Pulse animation for icon
    iconScale.value = withSequence(
      withTiming(1.1, { duration: 1000 }),
      withTiming(1, { duration: 1000 }),
    );

    const interval = setInterval(() => {
      iconScale.value = withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Back button */}
            <Animated.View entering={FadeInDown.springify()} style={styles.backButtonContainer}>
              <Pressable
                onPress={onBackToLogin}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <GlassBase variant="light" style={styles.backButton}>
                  <Icon name="arrow-left" size={24} color={theme.colors.text_primary} />
                </GlassBase>
              </Pressable>
            </Animated.View>

            {!isSuccess ? (
              <>
                {/* Icon */}
                <Animated.View
                  entering={FadeInDown.delay(100).springify()}
                  style={styles.iconContainer}
                >
                  <GlassBase variant="medium" style={styles.iconCircle}>
                    <Animated.View style={iconStyle}>
                      <LinearGradient
                        colors={[theme.colors.primary, theme.colors.secondary]}
                        style={styles.iconGradient}
                      >
                        <Icon name="lock" size={32} color="#FFFFFF" />
                      </LinearGradient>
                    </Animated.View>
                  </GlassBase>
                </Animated.View>

                {/* Header */}
                <Animated.View
                  entering={FadeInDown.delay(200).springify()}
                  style={styles.headerContainer}
                >
                  <TextBase variant="heading_4" align="center">
                    Forgot Password?
                  </TextBase>
                  <TextBase
                    variant="body_small"
                    color="secondary"
                    align="center"
                    style={styles.subtitle}
                  >
                    No worries! Enter your email and we'll send you reset instructions.
                  </TextBase>
                </Animated.View>

                {/* Form */}
                <AuthFormCard delay={300}>
                  <AuthInputField
                    label="Email Address"
                    value={email}
                    onChangeText={text => {
                      setEmail(text);
                      if (validationError) {
                        setValidationError('');
                      }
                      if (apiError) {
                        setApiError('');
                      }
                    }}
                    placeholder="Enter your email"
                    icon="mail"
                    type="email"
                    error={validationError || apiError}
                    delay={400}
                    editable={!isLoading}
                  />

                  <Animated.View entering={FadeInUp.delay(500).springify()}>
                    <BigButton
                      variant="primary"
                      label="Reset Password"
                      onPress={handleResetPassword}
                      loading={isLoading}
                      loading_text="Sending..."
                      style={styles.submitButton}
                    />
                  </Animated.View>

                  {/* Back to login link */}
                  <Animated.View
                    entering={FadeInUp.delay(600).springify()}
                    style={styles.loginLinkContainer}
                  >
                    <TextBase variant="body_medium" color="secondary">
                      Remember your password?{' '}
                    </TextBase>
                    <AuthLink onPress={onBackToLogin!}>Sign In</AuthLink>
                  </Animated.View>
                </AuthFormCard>
              </>
            ) : (
              /* Success state */
              <Animated.View style={[styles.successContainer, successStyle]}>
                <GlassBase variant="light" style={styles.successCard}>
                  <View style={styles.successIcon}>
                    <LinearGradient
                      colors={['#26DE81', '#0BE881']}
                      style={styles.successIconGradient}
                    >
                      <Icon name="check" size={32} color="#FFFFFF" />
                    </LinearGradient>
                  </View>

                  <TextBase variant="heading_3" align="center" style={styles.successTitle}>
                    Check Your Email
                  </TextBase>

                  <TextBase variant="body_medium" color="secondary" align="center">
                    We've sent password reset instructions to:
                  </TextBase>

                  <TextBase variant="body_large" align="center" style={styles.successEmail}>
                    {email}
                  </TextBase>

                  <TextBase
                    variant="body_small"
                    color="tertiary"
                    align="center"
                    style={styles.successNote}
                  >
                    Didn't receive the email? Check your spam folder or try again in a few minutes.
                  </TextBase>

                  <BigButton
                    variant="primary"
                    label="Back to Sign In"
                    onPress={onBackToLogin!}
                    full_width
                    style={styles.backToLoginButton}
                  />

                  <View style={styles.resendContainer}>
                    <TextBase variant="body_small" color="secondary">
                      Wrong email?{' '}
                    </TextBase>
                    <AuthLink
                      onPress={() => {
                        setIsSuccess(false);
                        setEmail('');
                        successScale.value = 0;
                      }}
                    >
                      Try again
                    </AuthLink>
                  </View>
                </GlassBase>
              </Animated.View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AuthBackground>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  backButtonContainer: {
    left: 24,
    position: 'absolute',
    top: 32,
    zIndex: 1,
  },
  backToLoginButton: {
    marginBottom: 16,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 32,
  },
  iconCircle: {
    alignItems: 'center',
    borderRadius: 44,
    height: 88,
    justifyContent: 'center',
    width: 88,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconGradient: {
    alignItems: 'center',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  loginLinkContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  resendContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  submitButton: {
    marginTop: 16,
  },
  subtitle: {
    marginTop: 8,
    paddingHorizontal: 20,
  },
  successCard: {
    alignItems: 'center',
    borderRadius: 24,
    padding: 32,
    width: '100%',
  },
  successContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  successEmail: {
    fontWeight: '600',
    marginVertical: 16,
  },
  successIcon: {
    marginBottom: 24,
  },
  successIconGradient: {
    alignItems: 'center',
    borderRadius: 36,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  successNote: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  successTitle: {
    marginBottom: 16,
  },
});
