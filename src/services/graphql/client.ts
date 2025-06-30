import { 
  ApolloClient, 
  InMemoryCache, 
  createHttpLink, 
  ApolloLink,
  NormalizedCacheObject 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import environment variables
const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT || 'http://localhost:8080/v1/graphql';

/**
 * HTTP Link - Connection to GraphQL endpoint
 */
const httpLink = createHttpLink({
  uri: HASURA_ENDPOINT,
});

/**
 * Auth Link - Adds authentication headers
 */
const authLink = setContext(async (_, { headers }) => {
  // Get auth token from storage
  const token = await AsyncStorage.getItem('auth_token');
  const userId = await AsyncStorage.getItem('user_id');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'x-hasura-user-id': userId || '',
      'x-hasura-role': 'user',
    },
  };
});

/**
 * Error Link - Handles GraphQL and network errors
 */
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
    
    // Handle auth errors
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      // Clear auth and redirect to login
      AsyncStorage.multiRemove(['auth_token', 'user_id']);
      // Navigation will be handled by auth context
    }
  }
});

/**
 * Cache configuration
 */
const cache = new InMemoryCache({
  typePolicies: {
    // Workout exercises merge properly
    workout: {
      fields: {
        workout_exercises: {
          merge(existing = [], incoming: unknown[]) {
            return incoming;
          },
        },
      },
    },
    
    // Exercise uses composite key (id + user_id)
    exercise: {
      keyFields: ['id', 'user_id'],
    },
    
    // Query type policies
    Query: {
      fields: {
        // Merge paginated lists properly
        exercises: {
          keyArgs: ['where', 'order_by'],
          merge(existing = [], incoming: unknown[]) {
            return incoming;
          },
        },
        workouts: {
          keyArgs: ['where', 'order_by'],
          merge(existing = [], incoming: unknown[]) {
            return incoming;
          },
        },
      },
    },
  },
});

/**
 * Apollo Client instance
 */
export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

/**
 * Helper to reset Apollo cache
 */
export const resetApolloCache = async (): Promise<void> => {
  await apolloClient.clearStore();
};

/**
 * Helper to refetch all active queries
 */
export const refetchQueries = async (): Promise<void> => {
  await apolloClient.refetchQueries({
    include: 'active',
  });
};
