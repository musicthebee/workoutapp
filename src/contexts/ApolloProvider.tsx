import React, { ReactNode } from 'react';
import { ApolloProvider as BaseApolloProvider } from '@apollo/client';

import { apolloClient } from '@/services/graphql/client';

/**
 * Apollo Provider Props
 */
interface ApolloProviderProps {
  children: ReactNode;
}

/**
 * Apollo Provider Component
 * Wraps the app with Apollo Client for GraphQL
 */
export const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  return (
    <BaseApolloProvider client={apolloClient}>
      {children}
    </BaseApolloProvider>
  );
};
