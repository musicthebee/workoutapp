// src/screens/ProfileScreen.tsx
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@/hooks';
import { useAuth } from '@/hooks/useAuth';
import { GlassBase, TextBase } from '@/components/atoms';
import { SettingsListTemplate } from '@/components/templates';
import type { SettingsSection } from '@/types';

/**
 * Profile Screen
 * Tab screen displaying user profile and quick settings
 * Uses custom header instead of ModalTemplate
 */
export const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const { user, sign_out } = useAuth();

  const styles = StyleSheet.create({
    avatar: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: theme.spacing.lg,
      height: theme.spacing.xxl,
      justifyContent: 'center',
      marginRight: theme.spacing.md,
      width: theme.spacing.xxl,
    },
    email: {
      color: theme.colors.text_secondary,
    },
    header: {
      marginBottom: 0,
      marginTop: 0,
      paddingBottom: 0,
      paddingHorizontal: theme.spacing.sm,
      paddingTop: 0,
    },
    headerContent: {
      borderRadius: theme.borders.radii.lg,
      marginBottom: 0,
      marginTop: 0,
      padding: theme.spacing.md,
    },
    name: {
      color: theme.colors.text_primary,
      marginBottom: theme.spacing.xxs,
    },
    quickActionsContainer: {
      gap: theme.spacing.sm,
      paddingBottom: theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
    },
    userInfoRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    userTextContainer: {
      flex: 1,
    },
  });

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await sign_out();
          } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
          }
        },
      },
    ]);
  };

  const handleSettingsPress = () => {
    // TODO: Navigate to settings modal
    Alert.alert('Coming Soon', 'Settings will be available soon.');
  };

  const handleEditProfile = () => {
    // TODO: Navigate to edit profile
    Alert.alert('Coming Soon', 'Edit profile will be available soon.');
  };

  const profileSections: SettingsSection[] = [
    {
      id: 'account',
      title: 'Account',
      items: [
        {
          id: 'edit-profile',
          type: 'navigation',
          title: 'Edit Profile',
          subtitle: 'Update your profile information',
          icon: 'person-outline',
          on_press: handleEditProfile,
        },
        {
          id: 'settings',
          type: 'navigation',
          title: 'Settings',
          subtitle: 'App preferences and privacy',
          icon: 'settings-outline',
          on_press: handleSettingsPress,
        },
      ],
    },
    {
      id: 'preferences',
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          type: 'toggle',
          title: 'Push Notifications',
          subtitle: 'Receive workout reminders',
          icon: 'notifications-outline',
          value: true,
          on_toggle: value => {
            console.log('Notifications toggled:', value);
            // TODO: Update notification preferences
          },
        },
        {
          id: 'help',
          type: 'navigation',
          title: 'Help & FAQ',
          icon: 'help-circle-outline',
          on_press: () => Alert.alert('Coming Soon', 'Help section will be available soon.'),
        },
        {
          id: 'feedback',
          type: 'navigation',
          title: 'Send Feedback',
          icon: 'chatbubble-outline',
          on_press: () => Alert.alert('Coming Soon', 'Feedback will be available soon.'),
        },
      ],
    },
    {
      id: 'danger',
      title: 'Account Actions',
      items: [
        {
          id: 'logout',
          type: 'action',
          title: 'Logout',
          icon: 'log-out-outline',
          destructive: true,
          on_press: handleLogout,
        },
      ],
    },
  ];

  const ProfileHeader = () => (
    <View style={styles.header}>
      <GlassBase variant="light" style={styles.headerContent}>
        {/* User Info Row - Avatar + Name/Email */}
        <View style={styles.userInfoRow}>
          <View style={styles.avatar}>
            <Icon name="person" size={theme.sizes.icons.md} color={theme.colors.text_inverse} />
          </View>
          <View style={styles.userTextContainer}>
            <TextBase variant="body_large" style={styles.name}>
              {user?.display_name || user?.email?.split('@')[0] || 'User'}
            </TextBase>
            <TextBase variant="body_small" style={styles.email}>
              {user?.email || 'user@example.com'}
            </TextBase>
          </View>
        </View>
      </GlassBase>
    </View>
  );

  return (
    <SettingsListTemplate
      sections={profileSections}
      header={<ProfileHeader />}
      testID="profile-screen"
    />
  );
};

export default ProfileScreen;
