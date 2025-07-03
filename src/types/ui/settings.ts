/**
 * Settings Types
 * Type definitions for settings and profile components
 */

import type { ReactNode } from 'react';
import type { BaseComponentProps } from './components';

export type SettingsRowType = 'toggle' | 'action' | 'display' | 'navigation';

export interface SettingsItem {
  id: string;
  type: SettingsRowType;
  title: string;
  subtitle?: string;
  icon?: string;
  value?: boolean | string | number;
  on_press?: () => void;
  on_toggle?: (value: boolean) => void;
  disabled?: boolean;
  badge?: string | number;
  chevron?: boolean;
  destructive?: boolean;
}

export interface SettingsSection {
  id: string;
  title?: string;
  subtitle?: string;
  items: SettingsItem[];
}

export interface SettingsRowProps extends BaseComponentProps {
  item: SettingsItem;
  is_first?: boolean;
  is_last?: boolean;
  show_divider?: boolean;
}

export interface SettingsSectionProps extends BaseComponentProps {
  section: SettingsSection;
  show_section_divider?: boolean;
}

export interface SettingsListTemplateProps extends BaseComponentProps {
  sections: SettingsSection[];
  header?: ReactNode;
  footer?: ReactNode;
  empty_state?: ReactNode;
  loading?: boolean;
}