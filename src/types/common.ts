/**
 * Common type definitions used throughout the application
 */

// UUID type alias for clarity
export type UUID = string;

// Common database field types
export type Timestamp = string; // ISO 8601 format
export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
export interface JSONObject {
  [key: string]: JSONValue;
}
export type JSONArray = JSONValue[];

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (infer U)[]
    ? ReadonlyArray<DeepReadonly<U>>
    : T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

// Common response types
export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Type guards
export const isSuccessResponse = <T>(response: ApiResponse<T>): response is SuccessResponse<T> =>
  response.success === true;

export const isErrorResponse = <T>(response: ApiResponse<T>): response is ErrorResponse =>
  response.success === false;

// Exhaustive check helper
export const exhaustiveCheck = (value: never): never => {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`);
};
