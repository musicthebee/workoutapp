// src/hooks/index.ts
// Main hooks export file
export * from './ui';
export * from './data';
export * from './utility';

// Re-export theme hook for convenience
export { useTheme, useThemeControls, useThemeToken, useThemeValue } from '@/theme/hooks/useTheme';

// Re-export glass variant hook for convenience  
export { useGlassVariant } from '@/contexts/GlassVariantContext';