// src/utils/haptics.ts
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Options for haptic feedback
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

/**
 * Haptics utility for consistent haptic feedback across the app
 */
export const Haptics = {
  /**
   * Light impact feedback
   * Use for small UI interactions
   */
  light: () => {
    ReactNativeHapticFeedback.trigger('impactLight', options);
  },

  /**
   * Medium impact feedback
   * Use for standard button presses
   */
  medium: () => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
  },

  /**
   * Heavy impact feedback
   * Use for significant actions
   */
  heavy: () => {
    ReactNativeHapticFeedback.trigger('impactHeavy', options);
  },

  /**
   * Selection feedback
   * Use for selecting items in lists or toggles
   */
  selection: () => {
    ReactNativeHapticFeedback.trigger('selection', options);
  },

  /**
   * Success notification feedback
   * Use for successful operations
   */
  success: () => {
    ReactNativeHapticFeedback.trigger('notificationSuccess', options);
  },

  /**
   * Warning notification feedback
   * Use for warnings or important notices
   */
  warning: () => {
    ReactNativeHapticFeedback.trigger('notificationWarning', options);
  },

  /**
   * Error notification feedback
   * Use for errors or failed operations
   */
  error: () => {
    ReactNativeHapticFeedback.trigger('notificationError', options);
  },
};
