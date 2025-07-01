import React, { createContext, useContext, useState, ReactNode } from 'react';

export type GlassVariant = 'light' | 'medium' | 'heavy';

interface GlassVariantContextType {
  selectedVariant: GlassVariant;
  setSelectedVariant: (variant: GlassVariant) => void;
}

const GlassVariantContext = createContext<GlassVariantContextType | undefined>(undefined);

interface GlassVariantProviderProps {
  children: ReactNode;
}

export const GlassVariantProvider: React.FC<GlassVariantProviderProps> = ({ children }) => {
  const [selectedVariant, setSelectedVariant] = useState<GlassVariant>('medium');

  return (
    <GlassVariantContext.Provider value={{ selectedVariant, setSelectedVariant }}>
      {children}
    </GlassVariantContext.Provider>
  );
};

export const useGlassVariant = (): GlassVariantContextType => {
  const context = useContext(GlassVariantContext);
  
  if (!context) {
    throw new Error('useGlassVariant must be used within GlassVariantProvider');
  }
  
  return context;
};