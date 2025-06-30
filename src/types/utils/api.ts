/**
 * API utility types
 * Used for GraphQL and REST API interactions
 */

// GraphQL response wrapper
export interface GraphQLResponse<T> {
  readonly data?: T;
  readonly errors?: ReadonlyArray<GraphQLError>;
  readonly extensions?: Record<string, unknown>;
}

// GraphQL error structure
export interface GraphQLError {
  readonly message: string;
  readonly locations?: ReadonlyArray<{
    readonly line: number;
    readonly column: number;
  }>;
  readonly path?: ReadonlyArray<string | number>;
  readonly extensions?: {
    readonly code?: string;
    readonly exception?: {
      readonly stacktrace?: ReadonlyArray<string>;
    };
  };
}

// Generic API error
export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly statusCode?: number;
  readonly details?: unknown;
}

// Pagination types
export interface PaginationInfo {
  readonly totalCount: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly startCursor?: string;
  readonly endCursor?: string;
}

export interface PageInfo {
  readonly limit: number;
  readonly offset: number;
  readonly total: number;
  readonly currentPage: number;
  readonly totalPages: number;
}

// Connection types (Relay-style pagination)
export interface Edge<T> {
  readonly cursor: string;
  readonly node: T;
}

export interface Connection<T> {
  readonly edges: ReadonlyArray<Edge<T>>;
  readonly pageInfo: PaginationInfo;
  readonly totalCount: number;
}

// Query options
export interface QueryOptions {
  readonly limit?: number;
  readonly offset?: number;
  readonly orderBy?: Record<string, 'asc' | 'desc'>;
  readonly where?: Record<string, unknown>;
}

// Mutation response types
export interface MutationResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: ApiError;
}

// Subscription types
export interface SubscriptionEvent<T> {
  readonly type: 'added' | 'modified' | 'removed';
  readonly data: T;
  readonly timestamp: string;
}

// Cache update helpers
export type CacheUpdater<T> = (cache: T) => T;

// Type guards
export const hasGraphQLErrors = <T>(
  response: GraphQLResponse<T>
): response is GraphQLResponse<T> & { errors: ReadonlyArray<GraphQLError> } => {
  return Boolean(response.errors && response.errors.length > 0);
};

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    typeof (error as ApiError).code === 'string' &&
    typeof (error as ApiError).message === 'string'
  );
};

// Error helpers
export const createApiError = (
  code: string,
  message: string,
  statusCode?: number,
  details?: unknown
): ApiError => ({
  code,
  message,
  statusCode,
  details,
});

export const extractGraphQLError = (errors: ReadonlyArray<GraphQLError>): string => {
  if (errors.length === 0) return 'Unknown GraphQL error';
  return errors.map(e => e.message).join(', ');
};

// Network state
export interface NetworkState {
  readonly isConnected: boolean;
  readonly isInternetReachable: boolean;
  readonly type: 'wifi' | 'cellular' | 'none' | 'unknown';
}

// Request state for hooks
export interface RequestState<T> {
  readonly data?: T;
  readonly loading: boolean;
  readonly error?: ApiError;
  readonly refetch?: () => Promise<void>;
}

// Optimistic update types
export interface OptimisticUpdate<T> {
  readonly id: string;
  readonly type: 'create' | 'update' | 'delete';
  readonly data: T;
  readonly timestamp: number;
}
