import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  date: { input: any; output: any; }
  difficulty: { input: any; output: any; }
  equipment: { input: any; output: any; }
  exercise_category: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  measurement_type: { input: any; output: any; }
  muscle_group: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
  vector: { input: any; output: any; }
  workout_category: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "available_exercises" */
export type Available_Exercises = {
  ai_prompt?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['exercise_category']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  default_duration?: Maybe<Scalars['Int']['output']>;
  default_reps?: Maybe<Scalars['Int']['output']>;
  default_rest?: Maybe<Scalars['Int']['output']>;
  default_sets?: Maybe<Scalars['Int']['output']>;
  difficulty_score?: Maybe<Scalars['Int']['output']>;
  embedding?: Maybe<Scalars['vector']['output']>;
  equipment?: Maybe<Scalars['equipment']['output']>;
  exercise_type?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  instructions?: Maybe<Scalars['String']['output']>;
  is_ai_generated?: Maybe<Scalars['Boolean']['output']>;
  is_archived?: Maybe<Scalars['Boolean']['output']>;
  is_favorite?: Maybe<Scalars['Boolean']['output']>;
  measurement_type?: Maybe<Scalars['measurement_type']['output']>;
  muscle_groups?: Maybe<Array<Scalars['muscle_group']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  source_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "available_exercises" */
export type Available_Exercises_Aggregate = {
  aggregate?: Maybe<Available_Exercises_Aggregate_Fields>;
  nodes: Array<Available_Exercises>;
};

/** aggregate fields of "available_exercises" */
export type Available_Exercises_Aggregate_Fields = {
  avg?: Maybe<Available_Exercises_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Available_Exercises_Max_Fields>;
  min?: Maybe<Available_Exercises_Min_Fields>;
  stddev?: Maybe<Available_Exercises_Stddev_Fields>;
  stddev_pop?: Maybe<Available_Exercises_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Available_Exercises_Stddev_Samp_Fields>;
  sum?: Maybe<Available_Exercises_Sum_Fields>;
  var_pop?: Maybe<Available_Exercises_Var_Pop_Fields>;
  var_samp?: Maybe<Available_Exercises_Var_Samp_Fields>;
  variance?: Maybe<Available_Exercises_Variance_Fields>;
};


/** aggregate fields of "available_exercises" */
export type Available_Exercises_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Available_Exercises_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Available_Exercises_Avg_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "available_exercises". All fields are combined with a logical 'AND'. */
export type Available_Exercises_Bool_Exp = {
  _and?: InputMaybe<Array<Available_Exercises_Bool_Exp>>;
  _not?: InputMaybe<Available_Exercises_Bool_Exp>;
  _or?: InputMaybe<Array<Available_Exercises_Bool_Exp>>;
  ai_prompt?: InputMaybe<String_Comparison_Exp>;
  category?: InputMaybe<Exercise_Category_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  default_duration?: InputMaybe<Int_Comparison_Exp>;
  default_reps?: InputMaybe<Int_Comparison_Exp>;
  default_rest?: InputMaybe<Int_Comparison_Exp>;
  default_sets?: InputMaybe<Int_Comparison_Exp>;
  difficulty_score?: InputMaybe<Int_Comparison_Exp>;
  embedding?: InputMaybe<Vector_Comparison_Exp>;
  equipment?: InputMaybe<Equipment_Comparison_Exp>;
  exercise_type?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  instructions?: InputMaybe<String_Comparison_Exp>;
  is_ai_generated?: InputMaybe<Boolean_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  is_favorite?: InputMaybe<Boolean_Comparison_Exp>;
  measurement_type?: InputMaybe<Measurement_Type_Comparison_Exp>;
  muscle_groups?: InputMaybe<Muscle_Group_Array_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  popularity_score?: InputMaybe<Int_Comparison_Exp>;
  source_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "available_exercises" */
export type Available_Exercises_Inc_Input = {
  default_duration?: InputMaybe<Scalars['Int']['input']>;
  default_reps?: InputMaybe<Scalars['Int']['input']>;
  default_rest?: InputMaybe<Scalars['Int']['input']>;
  default_sets?: InputMaybe<Scalars['Int']['input']>;
  difficulty_score?: InputMaybe<Scalars['Int']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "available_exercises" */
export type Available_Exercises_Insert_Input = {
  ai_prompt?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['exercise_category']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  default_duration?: InputMaybe<Scalars['Int']['input']>;
  default_reps?: InputMaybe<Scalars['Int']['input']>;
  default_rest?: InputMaybe<Scalars['Int']['input']>;
  default_sets?: InputMaybe<Scalars['Int']['input']>;
  difficulty_score?: InputMaybe<Scalars['Int']['input']>;
  embedding?: InputMaybe<Scalars['vector']['input']>;
  equipment?: InputMaybe<Scalars['equipment']['input']>;
  exercise_type?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  is_ai_generated?: InputMaybe<Scalars['Boolean']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  measurement_type?: InputMaybe<Scalars['measurement_type']['input']>;
  muscle_groups?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  source_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Available_Exercises_Max_Fields = {
  ai_prompt?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['exercise_category']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  default_duration?: Maybe<Scalars['Int']['output']>;
  default_reps?: Maybe<Scalars['Int']['output']>;
  default_rest?: Maybe<Scalars['Int']['output']>;
  default_sets?: Maybe<Scalars['Int']['output']>;
  difficulty_score?: Maybe<Scalars['Int']['output']>;
  equipment?: Maybe<Scalars['equipment']['output']>;
  exercise_type?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  instructions?: Maybe<Scalars['String']['output']>;
  measurement_type?: Maybe<Scalars['measurement_type']['output']>;
  muscle_groups?: Maybe<Array<Scalars['muscle_group']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  source_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Available_Exercises_Min_Fields = {
  ai_prompt?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['exercise_category']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  default_duration?: Maybe<Scalars['Int']['output']>;
  default_reps?: Maybe<Scalars['Int']['output']>;
  default_rest?: Maybe<Scalars['Int']['output']>;
  default_sets?: Maybe<Scalars['Int']['output']>;
  difficulty_score?: Maybe<Scalars['Int']['output']>;
  equipment?: Maybe<Scalars['equipment']['output']>;
  exercise_type?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  instructions?: Maybe<Scalars['String']['output']>;
  measurement_type?: Maybe<Scalars['measurement_type']['output']>;
  muscle_groups?: Maybe<Array<Scalars['muscle_group']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  source_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "available_exercises" */
export type Available_Exercises_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Available_Exercises>;
};

/** Ordering options when selecting data from "available_exercises". */
export type Available_Exercises_Order_By = {
  ai_prompt?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  default_duration?: InputMaybe<Order_By>;
  default_reps?: InputMaybe<Order_By>;
  default_rest?: InputMaybe<Order_By>;
  default_sets?: InputMaybe<Order_By>;
  difficulty_score?: InputMaybe<Order_By>;
  embedding?: InputMaybe<Order_By>;
  equipment?: InputMaybe<Order_By>;
  exercise_type?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  instructions?: InputMaybe<Order_By>;
  is_ai_generated?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  is_favorite?: InputMaybe<Order_By>;
  measurement_type?: InputMaybe<Order_By>;
  muscle_groups?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  source_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "available_exercises" */
export type Available_Exercises_Select_Column =
  /** column name */
  | 'ai_prompt'
  /** column name */
  | 'category'
  /** column name */
  | 'created_at'
  /** column name */
  | 'default_duration'
  /** column name */
  | 'default_reps'
  /** column name */
  | 'default_rest'
  /** column name */
  | 'default_sets'
  /** column name */
  | 'difficulty_score'
  /** column name */
  | 'embedding'
  /** column name */
  | 'equipment'
  /** column name */
  | 'exercise_type'
  /** column name */
  | 'id'
  /** column name */
  | 'instructions'
  /** column name */
  | 'is_ai_generated'
  /** column name */
  | 'is_archived'
  /** column name */
  | 'is_favorite'
  /** column name */
  | 'measurement_type'
  /** column name */
  | 'muscle_groups'
  /** column name */
  | 'name'
  /** column name */
  | 'notes'
  /** column name */
  | 'popularity_score'
  /** column name */
  | 'source_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** input type for updating data in table "available_exercises" */
export type Available_Exercises_Set_Input = {
  ai_prompt?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['exercise_category']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  default_duration?: InputMaybe<Scalars['Int']['input']>;
  default_reps?: InputMaybe<Scalars['Int']['input']>;
  default_rest?: InputMaybe<Scalars['Int']['input']>;
  default_sets?: InputMaybe<Scalars['Int']['input']>;
  difficulty_score?: InputMaybe<Scalars['Int']['input']>;
  embedding?: InputMaybe<Scalars['vector']['input']>;
  equipment?: InputMaybe<Scalars['equipment']['input']>;
  exercise_type?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  is_ai_generated?: InputMaybe<Scalars['Boolean']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  measurement_type?: InputMaybe<Scalars['measurement_type']['input']>;
  muscle_groups?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  source_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Available_Exercises_Stddev_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Available_Exercises_Stddev_Pop_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Available_Exercises_Stddev_Samp_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "available_exercises" */
export type Available_Exercises_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Available_Exercises_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Available_Exercises_Stream_Cursor_Value_Input = {
  ai_prompt?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['exercise_category']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  default_duration?: InputMaybe<Scalars['Int']['input']>;
  default_reps?: InputMaybe<Scalars['Int']['input']>;
  default_rest?: InputMaybe<Scalars['Int']['input']>;
  default_sets?: InputMaybe<Scalars['Int']['input']>;
  difficulty_score?: InputMaybe<Scalars['Int']['input']>;
  embedding?: InputMaybe<Scalars['vector']['input']>;
  equipment?: InputMaybe<Scalars['equipment']['input']>;
  exercise_type?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  is_ai_generated?: InputMaybe<Scalars['Boolean']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  measurement_type?: InputMaybe<Scalars['measurement_type']['input']>;
  muscle_groups?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  source_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Available_Exercises_Sum_Fields = {
  default_duration?: Maybe<Scalars['Int']['output']>;
  default_reps?: Maybe<Scalars['Int']['output']>;
  default_rest?: Maybe<Scalars['Int']['output']>;
  default_sets?: Maybe<Scalars['Int']['output']>;
  difficulty_score?: Maybe<Scalars['Int']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
};

export type Available_Exercises_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Available_Exercises_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Available_Exercises_Set_Input>;
  /** filter the rows which have to be updated */
  where: Available_Exercises_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Available_Exercises_Var_Pop_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Available_Exercises_Var_Samp_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Available_Exercises_Variance_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "available_workouts" */
export type Available_Workouts = {
  ai_prompt?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['workout_category']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['difficulty']['output']>;
  embedding?: Maybe<Scalars['vector']['output']>;
  estimated_duration_minutes?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  is_ai_generated?: Maybe<Scalars['Boolean']['output']>;
  is_archived?: Maybe<Scalars['Boolean']['output']>;
  is_favorite?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  source_id?: Maybe<Scalars['uuid']['output']>;
  total_volume_estimate?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workout_type?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "available_workouts" */
export type Available_Workouts_Aggregate = {
  aggregate?: Maybe<Available_Workouts_Aggregate_Fields>;
  nodes: Array<Available_Workouts>;
};

/** aggregate fields of "available_workouts" */
export type Available_Workouts_Aggregate_Fields = {
  avg?: Maybe<Available_Workouts_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Available_Workouts_Max_Fields>;
  min?: Maybe<Available_Workouts_Min_Fields>;
  stddev?: Maybe<Available_Workouts_Stddev_Fields>;
  stddev_pop?: Maybe<Available_Workouts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Available_Workouts_Stddev_Samp_Fields>;
  sum?: Maybe<Available_Workouts_Sum_Fields>;
  var_pop?: Maybe<Available_Workouts_Var_Pop_Fields>;
  var_samp?: Maybe<Available_Workouts_Var_Samp_Fields>;
  variance?: Maybe<Available_Workouts_Variance_Fields>;
};


/** aggregate fields of "available_workouts" */
export type Available_Workouts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Available_Workouts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Available_Workouts_Avg_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "available_workouts". All fields are combined with a logical 'AND'. */
export type Available_Workouts_Bool_Exp = {
  _and?: InputMaybe<Array<Available_Workouts_Bool_Exp>>;
  _not?: InputMaybe<Available_Workouts_Bool_Exp>;
  _or?: InputMaybe<Array<Available_Workouts_Bool_Exp>>;
  ai_prompt?: InputMaybe<String_Comparison_Exp>;
  category?: InputMaybe<Workout_Category_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  difficulty?: InputMaybe<Difficulty_Comparison_Exp>;
  embedding?: InputMaybe<Vector_Comparison_Exp>;
  estimated_duration_minutes?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_ai_generated?: InputMaybe<Boolean_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  is_favorite?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  popularity_score?: InputMaybe<Int_Comparison_Exp>;
  source_id?: InputMaybe<Uuid_Comparison_Exp>;
  total_volume_estimate?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  workout_type?: InputMaybe<String_Comparison_Exp>;
};

/** input type for incrementing numeric columns in table "available_workouts" */
export type Available_Workouts_Inc_Input = {
  estimated_duration_minutes?: InputMaybe<Scalars['Int']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  total_volume_estimate?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "available_workouts" */
export type Available_Workouts_Insert_Input = {
  ai_prompt?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['workout_category']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['difficulty']['input']>;
  embedding?: InputMaybe<Scalars['vector']['input']>;
  estimated_duration_minutes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_ai_generated?: InputMaybe<Scalars['Boolean']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  source_id?: InputMaybe<Scalars['uuid']['input']>;
  total_volume_estimate?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workout_type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Available_Workouts_Max_Fields = {
  ai_prompt?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['workout_category']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['difficulty']['output']>;
  estimated_duration_minutes?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  source_id?: Maybe<Scalars['uuid']['output']>;
  total_volume_estimate?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workout_type?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Available_Workouts_Min_Fields = {
  ai_prompt?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['workout_category']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['difficulty']['output']>;
  estimated_duration_minutes?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  source_id?: Maybe<Scalars['uuid']['output']>;
  total_volume_estimate?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workout_type?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "available_workouts" */
export type Available_Workouts_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Available_Workouts>;
};

/** Ordering options when selecting data from "available_workouts". */
export type Available_Workouts_Order_By = {
  ai_prompt?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  difficulty?: InputMaybe<Order_By>;
  embedding?: InputMaybe<Order_By>;
  estimated_duration_minutes?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_ai_generated?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  is_favorite?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  source_id?: InputMaybe<Order_By>;
  total_volume_estimate?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workout_type?: InputMaybe<Order_By>;
};

/** select columns of table "available_workouts" */
export type Available_Workouts_Select_Column =
  /** column name */
  | 'ai_prompt'
  /** column name */
  | 'category'
  /** column name */
  | 'created_at'
  /** column name */
  | 'description'
  /** column name */
  | 'difficulty'
  /** column name */
  | 'embedding'
  /** column name */
  | 'estimated_duration_minutes'
  /** column name */
  | 'id'
  /** column name */
  | 'is_ai_generated'
  /** column name */
  | 'is_archived'
  /** column name */
  | 'is_favorite'
  /** column name */
  | 'name'
  /** column name */
  | 'notes'
  /** column name */
  | 'popularity_score'
  /** column name */
  | 'source_id'
  /** column name */
  | 'total_volume_estimate'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id'
  /** column name */
  | 'workout_type';

/** input type for updating data in table "available_workouts" */
export type Available_Workouts_Set_Input = {
  ai_prompt?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['workout_category']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['difficulty']['input']>;
  embedding?: InputMaybe<Scalars['vector']['input']>;
  estimated_duration_minutes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_ai_generated?: InputMaybe<Scalars['Boolean']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  source_id?: InputMaybe<Scalars['uuid']['input']>;
  total_volume_estimate?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workout_type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Available_Workouts_Stddev_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Available_Workouts_Stddev_Pop_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Available_Workouts_Stddev_Samp_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "available_workouts" */
export type Available_Workouts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Available_Workouts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Available_Workouts_Stream_Cursor_Value_Input = {
  ai_prompt?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['workout_category']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['difficulty']['input']>;
  embedding?: InputMaybe<Scalars['vector']['input']>;
  estimated_duration_minutes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_ai_generated?: InputMaybe<Scalars['Boolean']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  source_id?: InputMaybe<Scalars['uuid']['input']>;
  total_volume_estimate?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workout_type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Available_Workouts_Sum_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Int']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  total_volume_estimate?: Maybe<Scalars['Int']['output']>;
};

export type Available_Workouts_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Available_Workouts_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Available_Workouts_Set_Input>;
  /** filter the rows which have to be updated */
  where: Available_Workouts_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Available_Workouts_Var_Pop_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Available_Workouts_Var_Samp_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Available_Workouts_Variance_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

export type Copy_Exercise_For_User_Args = {
  p_exercise_id?: InputMaybe<Scalars['uuid']['input']>;
  p_user_id?: InputMaybe<Scalars['uuid']['input']>;
};

export type Copy_Workout_For_User_Args = {
  p_user_id?: InputMaybe<Scalars['uuid']['input']>;
  p_workout_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** ordering argument of a cursor */
export type Cursor_Ordering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']['input']>;
  _gt?: InputMaybe<Scalars['date']['input']>;
  _gte?: InputMaybe<Scalars['date']['input']>;
  _in?: InputMaybe<Array<Scalars['date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['date']['input']>;
  _lte?: InputMaybe<Scalars['date']['input']>;
  _neq?: InputMaybe<Scalars['date']['input']>;
  _nin?: InputMaybe<Array<Scalars['date']['input']>>;
};

/** Boolean expression to compare columns of type "difficulty". All fields are combined with logical 'AND'. */
export type Difficulty_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['difficulty']['input']>;
  _gt?: InputMaybe<Scalars['difficulty']['input']>;
  _gte?: InputMaybe<Scalars['difficulty']['input']>;
  _in?: InputMaybe<Array<Scalars['difficulty']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['difficulty']['input']>;
  _lte?: InputMaybe<Scalars['difficulty']['input']>;
  _neq?: InputMaybe<Scalars['difficulty']['input']>;
  _nin?: InputMaybe<Array<Scalars['difficulty']['input']>>;
};

/** Boolean expression to compare columns of type "equipment". All fields are combined with logical 'AND'. */
export type Equipment_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['equipment']['input']>;
  _gt?: InputMaybe<Scalars['equipment']['input']>;
  _gte?: InputMaybe<Scalars['equipment']['input']>;
  _in?: InputMaybe<Array<Scalars['equipment']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['equipment']['input']>;
  _lte?: InputMaybe<Scalars['equipment']['input']>;
  _neq?: InputMaybe<Scalars['equipment']['input']>;
  _nin?: InputMaybe<Array<Scalars['equipment']['input']>>;
};

/** columns and relationships of "exercise" */
export type Exercise = {
  ai_prompt?: Maybe<Scalars['String']['output']>;
  category: Scalars['exercise_category']['output'];
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  default_duration?: Maybe<Scalars['Int']['output']>;
  default_reps?: Maybe<Scalars['Int']['output']>;
  default_rest: Scalars['Int']['output'];
  default_sets: Scalars['Int']['output'];
  difficulty_score?: Maybe<Scalars['Int']['output']>;
  embedding?: Maybe<Scalars['vector']['output']>;
  equipment: Scalars['equipment']['output'];
  /** An object relationship */
  exercise?: Maybe<Exercise>;
  /** An array relationship */
  exercises: Array<Exercise>;
  /** An aggregate relationship */
  exercises_aggregate: Exercise_Aggregate;
  id: Scalars['uuid']['output'];
  instructions: Scalars['String']['output'];
  is_ai_generated?: Maybe<Scalars['Boolean']['output']>;
  is_archived?: Maybe<Scalars['Boolean']['output']>;
  is_favorite?: Maybe<Scalars['Boolean']['output']>;
  measurement_type: Scalars['measurement_type']['output'];
  muscle_groups: Array<Scalars['muscle_group']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  source_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  sys_user?: Maybe<Sys_User>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  /** An array relationship */
  workout_exercises: Array<Workout_Exercise>;
  /** An aggregate relationship */
  workout_exercises_aggregate: Workout_Exercise_Aggregate;
};


/** columns and relationships of "exercise" */
export type ExerciseExercisesArgs = {
  distinct_on?: InputMaybe<Array<Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercise_Order_By>>;
  where?: InputMaybe<Exercise_Bool_Exp>;
};


/** columns and relationships of "exercise" */
export type ExerciseExercises_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercise_Order_By>>;
  where?: InputMaybe<Exercise_Bool_Exp>;
};


/** columns and relationships of "exercise" */
export type ExerciseWorkout_ExercisesArgs = {
  distinct_on?: InputMaybe<Array<Workout_Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Exercise_Order_By>>;
  where?: InputMaybe<Workout_Exercise_Bool_Exp>;
};


/** columns and relationships of "exercise" */
export type ExerciseWorkout_Exercises_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workout_Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Exercise_Order_By>>;
  where?: InputMaybe<Workout_Exercise_Bool_Exp>;
};

/** aggregated selection of "exercise" */
export type Exercise_Aggregate = {
  aggregate?: Maybe<Exercise_Aggregate_Fields>;
  nodes: Array<Exercise>;
};

export type Exercise_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Exercise_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Exercise_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Exercise_Aggregate_Bool_Exp_Count>;
};

export type Exercise_Aggregate_Bool_Exp_Bool_And = {
  arguments: Exercise_Select_Column_Exercise_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Exercise_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Exercise_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Exercise_Select_Column_Exercise_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Exercise_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Exercise_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Exercise_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Exercise_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "exercise" */
export type Exercise_Aggregate_Fields = {
  avg?: Maybe<Exercise_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Exercise_Max_Fields>;
  min?: Maybe<Exercise_Min_Fields>;
  stddev?: Maybe<Exercise_Stddev_Fields>;
  stddev_pop?: Maybe<Exercise_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Exercise_Stddev_Samp_Fields>;
  sum?: Maybe<Exercise_Sum_Fields>;
  var_pop?: Maybe<Exercise_Var_Pop_Fields>;
  var_samp?: Maybe<Exercise_Var_Samp_Fields>;
  variance?: Maybe<Exercise_Variance_Fields>;
};


/** aggregate fields of "exercise" */
export type Exercise_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Exercise_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "exercise" */
export type Exercise_Aggregate_Order_By = {
  avg?: InputMaybe<Exercise_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Exercise_Max_Order_By>;
  min?: InputMaybe<Exercise_Min_Order_By>;
  stddev?: InputMaybe<Exercise_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Exercise_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Exercise_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Exercise_Sum_Order_By>;
  var_pop?: InputMaybe<Exercise_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Exercise_Var_Samp_Order_By>;
  variance?: InputMaybe<Exercise_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "exercise" */
export type Exercise_Arr_Rel_Insert_Input = {
  data: Array<Exercise_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Exercise_On_Conflict>;
};

/** aggregate avg on columns */
export type Exercise_Avg_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "exercise" */
export type Exercise_Avg_Order_By = {
  default_duration?: InputMaybe<Order_By>;
  default_reps?: InputMaybe<Order_By>;
  default_rest?: InputMaybe<Order_By>;
  default_sets?: InputMaybe<Order_By>;
  difficulty_score?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "exercise". All fields are combined with a logical 'AND'. */
export type Exercise_Bool_Exp = {
  _and?: InputMaybe<Array<Exercise_Bool_Exp>>;
  _not?: InputMaybe<Exercise_Bool_Exp>;
  _or?: InputMaybe<Array<Exercise_Bool_Exp>>;
  ai_prompt?: InputMaybe<String_Comparison_Exp>;
  category?: InputMaybe<Exercise_Category_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  default_duration?: InputMaybe<Int_Comparison_Exp>;
  default_reps?: InputMaybe<Int_Comparison_Exp>;
  default_rest?: InputMaybe<Int_Comparison_Exp>;
  default_sets?: InputMaybe<Int_Comparison_Exp>;
  difficulty_score?: InputMaybe<Int_Comparison_Exp>;
  embedding?: InputMaybe<Vector_Comparison_Exp>;
  equipment?: InputMaybe<Equipment_Comparison_Exp>;
  exercise?: InputMaybe<Exercise_Bool_Exp>;
  exercises?: InputMaybe<Exercise_Bool_Exp>;
  exercises_aggregate?: InputMaybe<Exercise_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  instructions?: InputMaybe<String_Comparison_Exp>;
  is_ai_generated?: InputMaybe<Boolean_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  is_favorite?: InputMaybe<Boolean_Comparison_Exp>;
  measurement_type?: InputMaybe<Measurement_Type_Comparison_Exp>;
  muscle_groups?: InputMaybe<Muscle_Group_Array_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  popularity_score?: InputMaybe<Int_Comparison_Exp>;
  source_id?: InputMaybe<Uuid_Comparison_Exp>;
  sys_user?: InputMaybe<Sys_User_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  workout_exercises?: InputMaybe<Workout_Exercise_Bool_Exp>;
  workout_exercises_aggregate?: InputMaybe<Workout_Exercise_Aggregate_Bool_Exp>;
};

/** Boolean expression to compare columns of type "exercise_category". All fields are combined with logical 'AND'. */
export type Exercise_Category_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['exercise_category']['input']>;
  _gt?: InputMaybe<Scalars['exercise_category']['input']>;
  _gte?: InputMaybe<Scalars['exercise_category']['input']>;
  _in?: InputMaybe<Array<Scalars['exercise_category']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['exercise_category']['input']>;
  _lte?: InputMaybe<Scalars['exercise_category']['input']>;
  _neq?: InputMaybe<Scalars['exercise_category']['input']>;
  _nin?: InputMaybe<Array<Scalars['exercise_category']['input']>>;
};

/** unique or primary key constraints on table "exercise" */
export type Exercise_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'exercise_pkey';

/** input type for incrementing numeric columns in table "exercise" */
export type Exercise_Inc_Input = {
  default_duration?: InputMaybe<Scalars['Int']['input']>;
  default_reps?: InputMaybe<Scalars['Int']['input']>;
  default_rest?: InputMaybe<Scalars['Int']['input']>;
  default_sets?: InputMaybe<Scalars['Int']['input']>;
  difficulty_score?: InputMaybe<Scalars['Int']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "exercise" */
export type Exercise_Insert_Input = {
  ai_prompt?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['exercise_category']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  default_duration?: InputMaybe<Scalars['Int']['input']>;
  default_reps?: InputMaybe<Scalars['Int']['input']>;
  default_rest?: InputMaybe<Scalars['Int']['input']>;
  default_sets?: InputMaybe<Scalars['Int']['input']>;
  difficulty_score?: InputMaybe<Scalars['Int']['input']>;
  embedding?: InputMaybe<Scalars['vector']['input']>;
  equipment?: InputMaybe<Scalars['equipment']['input']>;
  exercise?: InputMaybe<Exercise_Obj_Rel_Insert_Input>;
  exercises?: InputMaybe<Exercise_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  is_ai_generated?: InputMaybe<Scalars['Boolean']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  measurement_type?: InputMaybe<Scalars['measurement_type']['input']>;
  muscle_groups?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  source_id?: InputMaybe<Scalars['uuid']['input']>;
  sys_user?: InputMaybe<Sys_User_Obj_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workout_exercises?: InputMaybe<Workout_Exercise_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Exercise_Max_Fields = {
  ai_prompt?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['exercise_category']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  default_duration?: Maybe<Scalars['Int']['output']>;
  default_reps?: Maybe<Scalars['Int']['output']>;
  default_rest?: Maybe<Scalars['Int']['output']>;
  default_sets?: Maybe<Scalars['Int']['output']>;
  difficulty_score?: Maybe<Scalars['Int']['output']>;
  equipment?: Maybe<Scalars['equipment']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  instructions?: Maybe<Scalars['String']['output']>;
  measurement_type?: Maybe<Scalars['measurement_type']['output']>;
  muscle_groups?: Maybe<Array<Scalars['muscle_group']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  source_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "exercise" */
export type Exercise_Max_Order_By = {
  ai_prompt?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  default_duration?: InputMaybe<Order_By>;
  default_reps?: InputMaybe<Order_By>;
  default_rest?: InputMaybe<Order_By>;
  default_sets?: InputMaybe<Order_By>;
  difficulty_score?: InputMaybe<Order_By>;
  equipment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  instructions?: InputMaybe<Order_By>;
  measurement_type?: InputMaybe<Order_By>;
  muscle_groups?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  source_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Exercise_Min_Fields = {
  ai_prompt?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['exercise_category']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  default_duration?: Maybe<Scalars['Int']['output']>;
  default_reps?: Maybe<Scalars['Int']['output']>;
  default_rest?: Maybe<Scalars['Int']['output']>;
  default_sets?: Maybe<Scalars['Int']['output']>;
  difficulty_score?: Maybe<Scalars['Int']['output']>;
  equipment?: Maybe<Scalars['equipment']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  instructions?: Maybe<Scalars['String']['output']>;
  measurement_type?: Maybe<Scalars['measurement_type']['output']>;
  muscle_groups?: Maybe<Array<Scalars['muscle_group']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  source_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "exercise" */
export type Exercise_Min_Order_By = {
  ai_prompt?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  default_duration?: InputMaybe<Order_By>;
  default_reps?: InputMaybe<Order_By>;
  default_rest?: InputMaybe<Order_By>;
  default_sets?: InputMaybe<Order_By>;
  difficulty_score?: InputMaybe<Order_By>;
  equipment?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  instructions?: InputMaybe<Order_By>;
  measurement_type?: InputMaybe<Order_By>;
  muscle_groups?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  source_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "exercise" */
export type Exercise_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Exercise>;
};

/** input type for inserting object relation for remote table "exercise" */
export type Exercise_Obj_Rel_Insert_Input = {
  data: Exercise_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Exercise_On_Conflict>;
};

/** on_conflict condition type for table "exercise" */
export type Exercise_On_Conflict = {
  constraint: Exercise_Constraint;
  update_columns?: Array<Exercise_Update_Column>;
  where?: InputMaybe<Exercise_Bool_Exp>;
};

/** Ordering options when selecting data from "exercise". */
export type Exercise_Order_By = {
  ai_prompt?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  default_duration?: InputMaybe<Order_By>;
  default_reps?: InputMaybe<Order_By>;
  default_rest?: InputMaybe<Order_By>;
  default_sets?: InputMaybe<Order_By>;
  difficulty_score?: InputMaybe<Order_By>;
  embedding?: InputMaybe<Order_By>;
  equipment?: InputMaybe<Order_By>;
  exercise?: InputMaybe<Exercise_Order_By>;
  exercises_aggregate?: InputMaybe<Exercise_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  instructions?: InputMaybe<Order_By>;
  is_ai_generated?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  is_favorite?: InputMaybe<Order_By>;
  measurement_type?: InputMaybe<Order_By>;
  muscle_groups?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  source_id?: InputMaybe<Order_By>;
  sys_user?: InputMaybe<Sys_User_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workout_exercises_aggregate?: InputMaybe<Workout_Exercise_Aggregate_Order_By>;
};

/** primary key columns input for table: exercise */
export type Exercise_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "exercise" */
export type Exercise_Select_Column =
  /** column name */
  | 'ai_prompt'
  /** column name */
  | 'category'
  /** column name */
  | 'created_at'
  /** column name */
  | 'default_duration'
  /** column name */
  | 'default_reps'
  /** column name */
  | 'default_rest'
  /** column name */
  | 'default_sets'
  /** column name */
  | 'difficulty_score'
  /** column name */
  | 'embedding'
  /** column name */
  | 'equipment'
  /** column name */
  | 'id'
  /** column name */
  | 'instructions'
  /** column name */
  | 'is_ai_generated'
  /** column name */
  | 'is_archived'
  /** column name */
  | 'is_favorite'
  /** column name */
  | 'measurement_type'
  /** column name */
  | 'muscle_groups'
  /** column name */
  | 'name'
  /** column name */
  | 'notes'
  /** column name */
  | 'popularity_score'
  /** column name */
  | 'source_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** select "exercise_aggregate_bool_exp_bool_and_arguments_columns" columns of table "exercise" */
export type Exercise_Select_Column_Exercise_Aggregate_Bool_Exp_Bool_And_Arguments_Columns =
  /** column name */
  | 'is_ai_generated'
  /** column name */
  | 'is_archived'
  /** column name */
  | 'is_favorite';

/** select "exercise_aggregate_bool_exp_bool_or_arguments_columns" columns of table "exercise" */
export type Exercise_Select_Column_Exercise_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns =
  /** column name */
  | 'is_ai_generated'
  /** column name */
  | 'is_archived'
  /** column name */
  | 'is_favorite';

/** input type for updating data in table "exercise" */
export type Exercise_Set_Input = {
  ai_prompt?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['exercise_category']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  default_duration?: InputMaybe<Scalars['Int']['input']>;
  default_reps?: InputMaybe<Scalars['Int']['input']>;
  default_rest?: InputMaybe<Scalars['Int']['input']>;
  default_sets?: InputMaybe<Scalars['Int']['input']>;
  difficulty_score?: InputMaybe<Scalars['Int']['input']>;
  embedding?: InputMaybe<Scalars['vector']['input']>;
  equipment?: InputMaybe<Scalars['equipment']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  is_ai_generated?: InputMaybe<Scalars['Boolean']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  measurement_type?: InputMaybe<Scalars['measurement_type']['input']>;
  muscle_groups?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  source_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Exercise_Stddev_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "exercise" */
export type Exercise_Stddev_Order_By = {
  default_duration?: InputMaybe<Order_By>;
  default_reps?: InputMaybe<Order_By>;
  default_rest?: InputMaybe<Order_By>;
  default_sets?: InputMaybe<Order_By>;
  difficulty_score?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Exercise_Stddev_Pop_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "exercise" */
export type Exercise_Stddev_Pop_Order_By = {
  default_duration?: InputMaybe<Order_By>;
  default_reps?: InputMaybe<Order_By>;
  default_rest?: InputMaybe<Order_By>;
  default_sets?: InputMaybe<Order_By>;
  difficulty_score?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Exercise_Stddev_Samp_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "exercise" */
export type Exercise_Stddev_Samp_Order_By = {
  default_duration?: InputMaybe<Order_By>;
  default_reps?: InputMaybe<Order_By>;
  default_rest?: InputMaybe<Order_By>;
  default_sets?: InputMaybe<Order_By>;
  difficulty_score?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "exercise" */
export type Exercise_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Exercise_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Exercise_Stream_Cursor_Value_Input = {
  ai_prompt?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['exercise_category']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  default_duration?: InputMaybe<Scalars['Int']['input']>;
  default_reps?: InputMaybe<Scalars['Int']['input']>;
  default_rest?: InputMaybe<Scalars['Int']['input']>;
  default_sets?: InputMaybe<Scalars['Int']['input']>;
  difficulty_score?: InputMaybe<Scalars['Int']['input']>;
  embedding?: InputMaybe<Scalars['vector']['input']>;
  equipment?: InputMaybe<Scalars['equipment']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  is_ai_generated?: InputMaybe<Scalars['Boolean']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  measurement_type?: InputMaybe<Scalars['measurement_type']['input']>;
  muscle_groups?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  source_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Exercise_Sum_Fields = {
  default_duration?: Maybe<Scalars['Int']['output']>;
  default_reps?: Maybe<Scalars['Int']['output']>;
  default_rest?: Maybe<Scalars['Int']['output']>;
  default_sets?: Maybe<Scalars['Int']['output']>;
  difficulty_score?: Maybe<Scalars['Int']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "exercise" */
export type Exercise_Sum_Order_By = {
  default_duration?: InputMaybe<Order_By>;
  default_reps?: InputMaybe<Order_By>;
  default_rest?: InputMaybe<Order_By>;
  default_sets?: InputMaybe<Order_By>;
  difficulty_score?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
};

/** update columns of table "exercise" */
export type Exercise_Update_Column =
  /** column name */
  | 'ai_prompt'
  /** column name */
  | 'category'
  /** column name */
  | 'created_at'
  /** column name */
  | 'default_duration'
  /** column name */
  | 'default_reps'
  /** column name */
  | 'default_rest'
  /** column name */
  | 'default_sets'
  /** column name */
  | 'difficulty_score'
  /** column name */
  | 'embedding'
  /** column name */
  | 'equipment'
  /** column name */
  | 'id'
  /** column name */
  | 'instructions'
  /** column name */
  | 'is_ai_generated'
  /** column name */
  | 'is_archived'
  /** column name */
  | 'is_favorite'
  /** column name */
  | 'measurement_type'
  /** column name */
  | 'muscle_groups'
  /** column name */
  | 'name'
  /** column name */
  | 'notes'
  /** column name */
  | 'popularity_score'
  /** column name */
  | 'source_id'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

export type Exercise_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Exercise_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Exercise_Set_Input>;
  /** filter the rows which have to be updated */
  where: Exercise_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Exercise_Var_Pop_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "exercise" */
export type Exercise_Var_Pop_Order_By = {
  default_duration?: InputMaybe<Order_By>;
  default_reps?: InputMaybe<Order_By>;
  default_rest?: InputMaybe<Order_By>;
  default_sets?: InputMaybe<Order_By>;
  difficulty_score?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Exercise_Var_Samp_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "exercise" */
export type Exercise_Var_Samp_Order_By = {
  default_duration?: InputMaybe<Order_By>;
  default_reps?: InputMaybe<Order_By>;
  default_rest?: InputMaybe<Order_By>;
  default_sets?: InputMaybe<Order_By>;
  difficulty_score?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Exercise_Variance_Fields = {
  default_duration?: Maybe<Scalars['Float']['output']>;
  default_reps?: Maybe<Scalars['Float']['output']>;
  default_rest?: Maybe<Scalars['Float']['output']>;
  default_sets?: Maybe<Scalars['Float']['output']>;
  difficulty_score?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "exercise" */
export type Exercise_Variance_Order_By = {
  default_duration?: InputMaybe<Order_By>;
  default_reps?: InputMaybe<Order_By>;
  default_rest?: InputMaybe<Order_By>;
  default_sets?: InputMaybe<Order_By>;
  difficulty_score?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** Boolean expression to compare columns of type "measurement_type". All fields are combined with logical 'AND'. */
export type Measurement_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['measurement_type']['input']>;
  _gt?: InputMaybe<Scalars['measurement_type']['input']>;
  _gte?: InputMaybe<Scalars['measurement_type']['input']>;
  _in?: InputMaybe<Array<Scalars['measurement_type']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['measurement_type']['input']>;
  _lte?: InputMaybe<Scalars['measurement_type']['input']>;
  _neq?: InputMaybe<Scalars['measurement_type']['input']>;
  _nin?: InputMaybe<Array<Scalars['measurement_type']['input']>>;
};

/** Boolean expression to compare columns of type "muscle_group". All fields are combined with logical 'AND'. */
export type Muscle_Group_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  _eq?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  _gt?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  _gte?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['muscle_group']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  _lte?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  _neq?: InputMaybe<Array<Scalars['muscle_group']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['muscle_group']['input']>>>;
};

/** mutation root */
export type Mutation_Root = {
  /** execute VOLATILE function "copy_exercise_for_user" which returns "exercise" */
  copy_exercise_for_user: Array<Exercise>;
  /** execute VOLATILE function "copy_workout_for_user" which returns "workout" */
  copy_workout_for_user: Array<Workout>;
  /** delete data from the table: "available_exercises" */
  delete_available_exercises?: Maybe<Available_Exercises_Mutation_Response>;
  /** delete data from the table: "available_workouts" */
  delete_available_workouts?: Maybe<Available_Workouts_Mutation_Response>;
  /** delete data from the table: "exercise" */
  delete_exercise?: Maybe<Exercise_Mutation_Response>;
  /** delete single row from the table: "exercise" */
  delete_exercise_by_pk?: Maybe<Exercise>;
  /** delete data from the table: "sys_user" */
  delete_sys_user?: Maybe<Sys_User_Mutation_Response>;
  /** delete single row from the table: "sys_user" */
  delete_sys_user_by_pk?: Maybe<Sys_User>;
  /** delete data from the table: "user_weight_history" */
  delete_user_weight_history?: Maybe<User_Weight_History_Mutation_Response>;
  /** delete single row from the table: "user_weight_history" */
  delete_user_weight_history_by_pk?: Maybe<User_Weight_History>;
  /** delete data from the table: "workout" */
  delete_workout?: Maybe<Workout_Mutation_Response>;
  /** delete single row from the table: "workout" */
  delete_workout_by_pk?: Maybe<Workout>;
  /** delete data from the table: "workout_exercise" */
  delete_workout_exercise?: Maybe<Workout_Exercise_Mutation_Response>;
  /** delete single row from the table: "workout_exercise" */
  delete_workout_exercise_by_pk?: Maybe<Workout_Exercise>;
  /** delete data from the table: "workout_performance" */
  delete_workout_performance?: Maybe<Workout_Performance_Mutation_Response>;
  /** delete single row from the table: "workout_performance" */
  delete_workout_performance_by_pk?: Maybe<Workout_Performance>;
  /** insert data into the table: "available_exercises" */
  insert_available_exercises?: Maybe<Available_Exercises_Mutation_Response>;
  /** insert a single row into the table: "available_exercises" */
  insert_available_exercises_one?: Maybe<Available_Exercises>;
  /** insert data into the table: "available_workouts" */
  insert_available_workouts?: Maybe<Available_Workouts_Mutation_Response>;
  /** insert a single row into the table: "available_workouts" */
  insert_available_workouts_one?: Maybe<Available_Workouts>;
  /** insert data into the table: "exercise" */
  insert_exercise?: Maybe<Exercise_Mutation_Response>;
  /** insert a single row into the table: "exercise" */
  insert_exercise_one?: Maybe<Exercise>;
  /** insert data into the table: "sys_user" */
  insert_sys_user?: Maybe<Sys_User_Mutation_Response>;
  /** insert a single row into the table: "sys_user" */
  insert_sys_user_one?: Maybe<Sys_User>;
  /** insert data into the table: "user_weight_history" */
  insert_user_weight_history?: Maybe<User_Weight_History_Mutation_Response>;
  /** insert a single row into the table: "user_weight_history" */
  insert_user_weight_history_one?: Maybe<User_Weight_History>;
  /** insert data into the table: "workout" */
  insert_workout?: Maybe<Workout_Mutation_Response>;
  /** insert data into the table: "workout_exercise" */
  insert_workout_exercise?: Maybe<Workout_Exercise_Mutation_Response>;
  /** insert a single row into the table: "workout_exercise" */
  insert_workout_exercise_one?: Maybe<Workout_Exercise>;
  /** insert a single row into the table: "workout" */
  insert_workout_one?: Maybe<Workout>;
  /** insert data into the table: "workout_performance" */
  insert_workout_performance?: Maybe<Workout_Performance_Mutation_Response>;
  /** insert a single row into the table: "workout_performance" */
  insert_workout_performance_one?: Maybe<Workout_Performance>;
  /** update data of the table: "available_exercises" */
  update_available_exercises?: Maybe<Available_Exercises_Mutation_Response>;
  /** update multiples rows of table: "available_exercises" */
  update_available_exercises_many?: Maybe<Array<Maybe<Available_Exercises_Mutation_Response>>>;
  /** update data of the table: "available_workouts" */
  update_available_workouts?: Maybe<Available_Workouts_Mutation_Response>;
  /** update multiples rows of table: "available_workouts" */
  update_available_workouts_many?: Maybe<Array<Maybe<Available_Workouts_Mutation_Response>>>;
  /** update data of the table: "exercise" */
  update_exercise?: Maybe<Exercise_Mutation_Response>;
  /** update single row of the table: "exercise" */
  update_exercise_by_pk?: Maybe<Exercise>;
  /** update multiples rows of table: "exercise" */
  update_exercise_many?: Maybe<Array<Maybe<Exercise_Mutation_Response>>>;
  /** update data of the table: "sys_user" */
  update_sys_user?: Maybe<Sys_User_Mutation_Response>;
  /** update single row of the table: "sys_user" */
  update_sys_user_by_pk?: Maybe<Sys_User>;
  /** update multiples rows of table: "sys_user" */
  update_sys_user_many?: Maybe<Array<Maybe<Sys_User_Mutation_Response>>>;
  /** update data of the table: "user_weight_history" */
  update_user_weight_history?: Maybe<User_Weight_History_Mutation_Response>;
  /** update single row of the table: "user_weight_history" */
  update_user_weight_history_by_pk?: Maybe<User_Weight_History>;
  /** update multiples rows of table: "user_weight_history" */
  update_user_weight_history_many?: Maybe<Array<Maybe<User_Weight_History_Mutation_Response>>>;
  /** update data of the table: "workout" */
  update_workout?: Maybe<Workout_Mutation_Response>;
  /** update single row of the table: "workout" */
  update_workout_by_pk?: Maybe<Workout>;
  /** update data of the table: "workout_exercise" */
  update_workout_exercise?: Maybe<Workout_Exercise_Mutation_Response>;
  /** update single row of the table: "workout_exercise" */
  update_workout_exercise_by_pk?: Maybe<Workout_Exercise>;
  /** update multiples rows of table: "workout_exercise" */
  update_workout_exercise_many?: Maybe<Array<Maybe<Workout_Exercise_Mutation_Response>>>;
  /** update multiples rows of table: "workout" */
  update_workout_many?: Maybe<Array<Maybe<Workout_Mutation_Response>>>;
  /** update data of the table: "workout_performance" */
  update_workout_performance?: Maybe<Workout_Performance_Mutation_Response>;
  /** update single row of the table: "workout_performance" */
  update_workout_performance_by_pk?: Maybe<Workout_Performance>;
  /** update multiples rows of table: "workout_performance" */
  update_workout_performance_many?: Maybe<Array<Maybe<Workout_Performance_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootCopy_Exercise_For_UserArgs = {
  args: Copy_Exercise_For_User_Args;
  distinct_on?: InputMaybe<Array<Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercise_Order_By>>;
  where?: InputMaybe<Exercise_Bool_Exp>;
};


/** mutation root */
export type Mutation_RootCopy_Workout_For_UserArgs = {
  args: Copy_Workout_For_User_Args;
  distinct_on?: InputMaybe<Array<Workout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Order_By>>;
  where?: InputMaybe<Workout_Bool_Exp>;
};


/** mutation root */
export type Mutation_RootDelete_Available_ExercisesArgs = {
  where: Available_Exercises_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Available_WorkoutsArgs = {
  where: Available_Workouts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ExerciseArgs = {
  where: Exercise_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Exercise_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Sys_UserArgs = {
  where: Sys_User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Sys_User_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_Weight_HistoryArgs = {
  where: User_Weight_History_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Weight_History_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_WorkoutArgs = {
  where: Workout_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Workout_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Workout_ExerciseArgs = {
  where: Workout_Exercise_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Workout_Exercise_By_PkArgs = {
  exercise_id: Scalars['uuid']['input'];
  workout_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Workout_PerformanceArgs = {
  where: Workout_Performance_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Workout_Performance_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsert_Available_ExercisesArgs = {
  objects: Array<Available_Exercises_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Available_Exercises_OneArgs = {
  object: Available_Exercises_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Available_WorkoutsArgs = {
  objects: Array<Available_Workouts_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Available_Workouts_OneArgs = {
  object: Available_Workouts_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_ExerciseArgs = {
  objects: Array<Exercise_Insert_Input>;
  on_conflict?: InputMaybe<Exercise_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Exercise_OneArgs = {
  object: Exercise_Insert_Input;
  on_conflict?: InputMaybe<Exercise_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sys_UserArgs = {
  objects: Array<Sys_User_Insert_Input>;
  on_conflict?: InputMaybe<Sys_User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sys_User_OneArgs = {
  object: Sys_User_Insert_Input;
  on_conflict?: InputMaybe<Sys_User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Weight_HistoryArgs = {
  objects: Array<User_Weight_History_Insert_Input>;
  on_conflict?: InputMaybe<User_Weight_History_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Weight_History_OneArgs = {
  object: User_Weight_History_Insert_Input;
  on_conflict?: InputMaybe<User_Weight_History_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WorkoutArgs = {
  objects: Array<Workout_Insert_Input>;
  on_conflict?: InputMaybe<Workout_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workout_ExerciseArgs = {
  objects: Array<Workout_Exercise_Insert_Input>;
  on_conflict?: InputMaybe<Workout_Exercise_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workout_Exercise_OneArgs = {
  object: Workout_Exercise_Insert_Input;
  on_conflict?: InputMaybe<Workout_Exercise_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workout_OneArgs = {
  object: Workout_Insert_Input;
  on_conflict?: InputMaybe<Workout_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workout_PerformanceArgs = {
  objects: Array<Workout_Performance_Insert_Input>;
  on_conflict?: InputMaybe<Workout_Performance_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Workout_Performance_OneArgs = {
  object: Workout_Performance_Insert_Input;
  on_conflict?: InputMaybe<Workout_Performance_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Available_ExercisesArgs = {
  _inc?: InputMaybe<Available_Exercises_Inc_Input>;
  _set?: InputMaybe<Available_Exercises_Set_Input>;
  where: Available_Exercises_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Available_Exercises_ManyArgs = {
  updates: Array<Available_Exercises_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Available_WorkoutsArgs = {
  _inc?: InputMaybe<Available_Workouts_Inc_Input>;
  _set?: InputMaybe<Available_Workouts_Set_Input>;
  where: Available_Workouts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Available_Workouts_ManyArgs = {
  updates: Array<Available_Workouts_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ExerciseArgs = {
  _inc?: InputMaybe<Exercise_Inc_Input>;
  _set?: InputMaybe<Exercise_Set_Input>;
  where: Exercise_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Exercise_By_PkArgs = {
  _inc?: InputMaybe<Exercise_Inc_Input>;
  _set?: InputMaybe<Exercise_Set_Input>;
  pk_columns: Exercise_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Exercise_ManyArgs = {
  updates: Array<Exercise_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Sys_UserArgs = {
  _inc?: InputMaybe<Sys_User_Inc_Input>;
  _set?: InputMaybe<Sys_User_Set_Input>;
  where: Sys_User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Sys_User_By_PkArgs = {
  _inc?: InputMaybe<Sys_User_Inc_Input>;
  _set?: InputMaybe<Sys_User_Set_Input>;
  pk_columns: Sys_User_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Sys_User_ManyArgs = {
  updates: Array<Sys_User_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_Weight_HistoryArgs = {
  _inc?: InputMaybe<User_Weight_History_Inc_Input>;
  _set?: InputMaybe<User_Weight_History_Set_Input>;
  where: User_Weight_History_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Weight_History_By_PkArgs = {
  _inc?: InputMaybe<User_Weight_History_Inc_Input>;
  _set?: InputMaybe<User_Weight_History_Set_Input>;
  pk_columns: User_Weight_History_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Weight_History_ManyArgs = {
  updates: Array<User_Weight_History_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_WorkoutArgs = {
  _inc?: InputMaybe<Workout_Inc_Input>;
  _set?: InputMaybe<Workout_Set_Input>;
  where: Workout_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Workout_By_PkArgs = {
  _inc?: InputMaybe<Workout_Inc_Input>;
  _set?: InputMaybe<Workout_Set_Input>;
  pk_columns: Workout_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Workout_ExerciseArgs = {
  _inc?: InputMaybe<Workout_Exercise_Inc_Input>;
  _set?: InputMaybe<Workout_Exercise_Set_Input>;
  where: Workout_Exercise_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Workout_Exercise_By_PkArgs = {
  _inc?: InputMaybe<Workout_Exercise_Inc_Input>;
  _set?: InputMaybe<Workout_Exercise_Set_Input>;
  pk_columns: Workout_Exercise_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Workout_Exercise_ManyArgs = {
  updates: Array<Workout_Exercise_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Workout_ManyArgs = {
  updates: Array<Workout_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Workout_PerformanceArgs = {
  _append?: InputMaybe<Workout_Performance_Append_Input>;
  _delete_at_path?: InputMaybe<Workout_Performance_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Workout_Performance_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Workout_Performance_Delete_Key_Input>;
  _prepend?: InputMaybe<Workout_Performance_Prepend_Input>;
  _set?: InputMaybe<Workout_Performance_Set_Input>;
  where: Workout_Performance_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Workout_Performance_By_PkArgs = {
  _append?: InputMaybe<Workout_Performance_Append_Input>;
  _delete_at_path?: InputMaybe<Workout_Performance_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Workout_Performance_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Workout_Performance_Delete_Key_Input>;
  _prepend?: InputMaybe<Workout_Performance_Prepend_Input>;
  _set?: InputMaybe<Workout_Performance_Set_Input>;
  pk_columns: Workout_Performance_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Workout_Performance_ManyArgs = {
  updates: Array<Workout_Performance_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export type Order_By =
  /** in ascending order, nulls last */
  | 'asc'
  /** in ascending order, nulls first */
  | 'asc_nulls_first'
  /** in ascending order, nulls last */
  | 'asc_nulls_last'
  /** in descending order, nulls first */
  | 'desc'
  /** in descending order, nulls first */
  | 'desc_nulls_first'
  /** in descending order, nulls last */
  | 'desc_nulls_last';

export type Query_Root = {
  /** fetch data from the table: "available_exercises" */
  available_exercises: Array<Available_Exercises>;
  /** fetch aggregated fields from the table: "available_exercises" */
  available_exercises_aggregate: Available_Exercises_Aggregate;
  /** fetch data from the table: "available_workouts" */
  available_workouts: Array<Available_Workouts>;
  /** fetch aggregated fields from the table: "available_workouts" */
  available_workouts_aggregate: Available_Workouts_Aggregate;
  /** fetch data from the table: "exercise" */
  exercise: Array<Exercise>;
  /** fetch aggregated fields from the table: "exercise" */
  exercise_aggregate: Exercise_Aggregate;
  /** fetch data from the table: "exercise" using primary key columns */
  exercise_by_pk?: Maybe<Exercise>;
  /** fetch data from the table: "sys_user" */
  sys_user: Array<Sys_User>;
  /** fetch aggregated fields from the table: "sys_user" */
  sys_user_aggregate: Sys_User_Aggregate;
  /** fetch data from the table: "sys_user" using primary key columns */
  sys_user_by_pk?: Maybe<Sys_User>;
  /** fetch data from the table: "user_weight_history" */
  user_weight_history: Array<User_Weight_History>;
  /** fetch aggregated fields from the table: "user_weight_history" */
  user_weight_history_aggregate: User_Weight_History_Aggregate;
  /** fetch data from the table: "user_weight_history" using primary key columns */
  user_weight_history_by_pk?: Maybe<User_Weight_History>;
  /** fetch data from the table: "workout" */
  workout: Array<Workout>;
  /** fetch aggregated fields from the table: "workout" */
  workout_aggregate: Workout_Aggregate;
  /** fetch data from the table: "workout" using primary key columns */
  workout_by_pk?: Maybe<Workout>;
  /** fetch data from the table: "workout_exercise" */
  workout_exercise: Array<Workout_Exercise>;
  /** fetch aggregated fields from the table: "workout_exercise" */
  workout_exercise_aggregate: Workout_Exercise_Aggregate;
  /** fetch data from the table: "workout_exercise" using primary key columns */
  workout_exercise_by_pk?: Maybe<Workout_Exercise>;
  /** fetch data from the table: "workout_performance" */
  workout_performance: Array<Workout_Performance>;
  /** fetch aggregated fields from the table: "workout_performance" */
  workout_performance_aggregate: Workout_Performance_Aggregate;
  /** fetch data from the table: "workout_performance" using primary key columns */
  workout_performance_by_pk?: Maybe<Workout_Performance>;
};


export type Query_RootAvailable_ExercisesArgs = {
  distinct_on?: InputMaybe<Array<Available_Exercises_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Available_Exercises_Order_By>>;
  where?: InputMaybe<Available_Exercises_Bool_Exp>;
};


export type Query_RootAvailable_Exercises_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Available_Exercises_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Available_Exercises_Order_By>>;
  where?: InputMaybe<Available_Exercises_Bool_Exp>;
};


export type Query_RootAvailable_WorkoutsArgs = {
  distinct_on?: InputMaybe<Array<Available_Workouts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Available_Workouts_Order_By>>;
  where?: InputMaybe<Available_Workouts_Bool_Exp>;
};


export type Query_RootAvailable_Workouts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Available_Workouts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Available_Workouts_Order_By>>;
  where?: InputMaybe<Available_Workouts_Bool_Exp>;
};


export type Query_RootExerciseArgs = {
  distinct_on?: InputMaybe<Array<Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercise_Order_By>>;
  where?: InputMaybe<Exercise_Bool_Exp>;
};


export type Query_RootExercise_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercise_Order_By>>;
  where?: InputMaybe<Exercise_Bool_Exp>;
};


export type Query_RootExercise_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootSys_UserArgs = {
  distinct_on?: InputMaybe<Array<Sys_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sys_User_Order_By>>;
  where?: InputMaybe<Sys_User_Bool_Exp>;
};


export type Query_RootSys_User_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sys_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sys_User_Order_By>>;
  where?: InputMaybe<Sys_User_Bool_Exp>;
};


export type Query_RootSys_User_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUser_Weight_HistoryArgs = {
  distinct_on?: InputMaybe<Array<User_Weight_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Weight_History_Order_By>>;
  where?: InputMaybe<User_Weight_History_Bool_Exp>;
};


export type Query_RootUser_Weight_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Weight_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Weight_History_Order_By>>;
  where?: InputMaybe<User_Weight_History_Bool_Exp>;
};


export type Query_RootUser_Weight_History_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootWorkoutArgs = {
  distinct_on?: InputMaybe<Array<Workout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Order_By>>;
  where?: InputMaybe<Workout_Bool_Exp>;
};


export type Query_RootWorkout_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Order_By>>;
  where?: InputMaybe<Workout_Bool_Exp>;
};


export type Query_RootWorkout_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootWorkout_ExerciseArgs = {
  distinct_on?: InputMaybe<Array<Workout_Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Exercise_Order_By>>;
  where?: InputMaybe<Workout_Exercise_Bool_Exp>;
};


export type Query_RootWorkout_Exercise_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workout_Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Exercise_Order_By>>;
  where?: InputMaybe<Workout_Exercise_Bool_Exp>;
};


export type Query_RootWorkout_Exercise_By_PkArgs = {
  exercise_id: Scalars['uuid']['input'];
  workout_id: Scalars['uuid']['input'];
};


export type Query_RootWorkout_PerformanceArgs = {
  distinct_on?: InputMaybe<Array<Workout_Performance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Performance_Order_By>>;
  where?: InputMaybe<Workout_Performance_Bool_Exp>;
};


export type Query_RootWorkout_Performance_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workout_Performance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Performance_Order_By>>;
  where?: InputMaybe<Workout_Performance_Bool_Exp>;
};


export type Query_RootWorkout_Performance_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_Root = {
  /** fetch data from the table: "available_exercises" */
  available_exercises: Array<Available_Exercises>;
  /** fetch aggregated fields from the table: "available_exercises" */
  available_exercises_aggregate: Available_Exercises_Aggregate;
  /** fetch data from the table in a streaming manner: "available_exercises" */
  available_exercises_stream: Array<Available_Exercises>;
  /** fetch data from the table: "available_workouts" */
  available_workouts: Array<Available_Workouts>;
  /** fetch aggregated fields from the table: "available_workouts" */
  available_workouts_aggregate: Available_Workouts_Aggregate;
  /** fetch data from the table in a streaming manner: "available_workouts" */
  available_workouts_stream: Array<Available_Workouts>;
  /** fetch data from the table: "exercise" */
  exercise: Array<Exercise>;
  /** fetch aggregated fields from the table: "exercise" */
  exercise_aggregate: Exercise_Aggregate;
  /** fetch data from the table: "exercise" using primary key columns */
  exercise_by_pk?: Maybe<Exercise>;
  /** fetch data from the table in a streaming manner: "exercise" */
  exercise_stream: Array<Exercise>;
  /** fetch data from the table: "sys_user" */
  sys_user: Array<Sys_User>;
  /** fetch aggregated fields from the table: "sys_user" */
  sys_user_aggregate: Sys_User_Aggregate;
  /** fetch data from the table: "sys_user" using primary key columns */
  sys_user_by_pk?: Maybe<Sys_User>;
  /** fetch data from the table in a streaming manner: "sys_user" */
  sys_user_stream: Array<Sys_User>;
  /** fetch data from the table: "user_weight_history" */
  user_weight_history: Array<User_Weight_History>;
  /** fetch aggregated fields from the table: "user_weight_history" */
  user_weight_history_aggregate: User_Weight_History_Aggregate;
  /** fetch data from the table: "user_weight_history" using primary key columns */
  user_weight_history_by_pk?: Maybe<User_Weight_History>;
  /** fetch data from the table in a streaming manner: "user_weight_history" */
  user_weight_history_stream: Array<User_Weight_History>;
  /** fetch data from the table: "workout" */
  workout: Array<Workout>;
  /** fetch aggregated fields from the table: "workout" */
  workout_aggregate: Workout_Aggregate;
  /** fetch data from the table: "workout" using primary key columns */
  workout_by_pk?: Maybe<Workout>;
  /** fetch data from the table: "workout_exercise" */
  workout_exercise: Array<Workout_Exercise>;
  /** fetch aggregated fields from the table: "workout_exercise" */
  workout_exercise_aggregate: Workout_Exercise_Aggregate;
  /** fetch data from the table: "workout_exercise" using primary key columns */
  workout_exercise_by_pk?: Maybe<Workout_Exercise>;
  /** fetch data from the table in a streaming manner: "workout_exercise" */
  workout_exercise_stream: Array<Workout_Exercise>;
  /** fetch data from the table: "workout_performance" */
  workout_performance: Array<Workout_Performance>;
  /** fetch aggregated fields from the table: "workout_performance" */
  workout_performance_aggregate: Workout_Performance_Aggregate;
  /** fetch data from the table: "workout_performance" using primary key columns */
  workout_performance_by_pk?: Maybe<Workout_Performance>;
  /** fetch data from the table in a streaming manner: "workout_performance" */
  workout_performance_stream: Array<Workout_Performance>;
  /** fetch data from the table in a streaming manner: "workout" */
  workout_stream: Array<Workout>;
};


export type Subscription_RootAvailable_ExercisesArgs = {
  distinct_on?: InputMaybe<Array<Available_Exercises_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Available_Exercises_Order_By>>;
  where?: InputMaybe<Available_Exercises_Bool_Exp>;
};


export type Subscription_RootAvailable_Exercises_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Available_Exercises_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Available_Exercises_Order_By>>;
  where?: InputMaybe<Available_Exercises_Bool_Exp>;
};


export type Subscription_RootAvailable_Exercises_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Available_Exercises_Stream_Cursor_Input>>;
  where?: InputMaybe<Available_Exercises_Bool_Exp>;
};


export type Subscription_RootAvailable_WorkoutsArgs = {
  distinct_on?: InputMaybe<Array<Available_Workouts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Available_Workouts_Order_By>>;
  where?: InputMaybe<Available_Workouts_Bool_Exp>;
};


export type Subscription_RootAvailable_Workouts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Available_Workouts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Available_Workouts_Order_By>>;
  where?: InputMaybe<Available_Workouts_Bool_Exp>;
};


export type Subscription_RootAvailable_Workouts_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Available_Workouts_Stream_Cursor_Input>>;
  where?: InputMaybe<Available_Workouts_Bool_Exp>;
};


export type Subscription_RootExerciseArgs = {
  distinct_on?: InputMaybe<Array<Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercise_Order_By>>;
  where?: InputMaybe<Exercise_Bool_Exp>;
};


export type Subscription_RootExercise_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercise_Order_By>>;
  where?: InputMaybe<Exercise_Bool_Exp>;
};


export type Subscription_RootExercise_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootExercise_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Exercise_Stream_Cursor_Input>>;
  where?: InputMaybe<Exercise_Bool_Exp>;
};


export type Subscription_RootSys_UserArgs = {
  distinct_on?: InputMaybe<Array<Sys_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sys_User_Order_By>>;
  where?: InputMaybe<Sys_User_Bool_Exp>;
};


export type Subscription_RootSys_User_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sys_User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sys_User_Order_By>>;
  where?: InputMaybe<Sys_User_Bool_Exp>;
};


export type Subscription_RootSys_User_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootSys_User_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Sys_User_Stream_Cursor_Input>>;
  where?: InputMaybe<Sys_User_Bool_Exp>;
};


export type Subscription_RootUser_Weight_HistoryArgs = {
  distinct_on?: InputMaybe<Array<User_Weight_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Weight_History_Order_By>>;
  where?: InputMaybe<User_Weight_History_Bool_Exp>;
};


export type Subscription_RootUser_Weight_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Weight_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Weight_History_Order_By>>;
  where?: InputMaybe<User_Weight_History_Bool_Exp>;
};


export type Subscription_RootUser_Weight_History_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUser_Weight_History_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Weight_History_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Weight_History_Bool_Exp>;
};


export type Subscription_RootWorkoutArgs = {
  distinct_on?: InputMaybe<Array<Workout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Order_By>>;
  where?: InputMaybe<Workout_Bool_Exp>;
};


export type Subscription_RootWorkout_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Order_By>>;
  where?: InputMaybe<Workout_Bool_Exp>;
};


export type Subscription_RootWorkout_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootWorkout_ExerciseArgs = {
  distinct_on?: InputMaybe<Array<Workout_Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Exercise_Order_By>>;
  where?: InputMaybe<Workout_Exercise_Bool_Exp>;
};


export type Subscription_RootWorkout_Exercise_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workout_Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Exercise_Order_By>>;
  where?: InputMaybe<Workout_Exercise_Bool_Exp>;
};


export type Subscription_RootWorkout_Exercise_By_PkArgs = {
  exercise_id: Scalars['uuid']['input'];
  workout_id: Scalars['uuid']['input'];
};


export type Subscription_RootWorkout_Exercise_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Workout_Exercise_Stream_Cursor_Input>>;
  where?: InputMaybe<Workout_Exercise_Bool_Exp>;
};


export type Subscription_RootWorkout_PerformanceArgs = {
  distinct_on?: InputMaybe<Array<Workout_Performance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Performance_Order_By>>;
  where?: InputMaybe<Workout_Performance_Bool_Exp>;
};


export type Subscription_RootWorkout_Performance_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workout_Performance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Performance_Order_By>>;
  where?: InputMaybe<Workout_Performance_Bool_Exp>;
};


export type Subscription_RootWorkout_Performance_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootWorkout_Performance_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Workout_Performance_Stream_Cursor_Input>>;
  where?: InputMaybe<Workout_Performance_Bool_Exp>;
};


export type Subscription_RootWorkout_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Workout_Stream_Cursor_Input>>;
  where?: InputMaybe<Workout_Bool_Exp>;
};

/** columns and relationships of "sys_user" */
export type Sys_User = {
  achievement_notifications?: Maybe<Scalars['Boolean']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  date_of_birth?: Maybe<Scalars['date']['output']>;
  email: Scalars['String']['output'];
  /** An array relationship */
  exercises: Array<Exercise>;
  /** An aggregate relationship */
  exercises_aggregate: Exercise_Aggregate;
  firebase_uid: Scalars['String']['output'];
  height_cm?: Maybe<Scalars['Int']['output']>;
  id: Scalars['uuid']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  last_login?: Maybe<Scalars['timestamptz']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  preferred_units?: Maybe<Scalars['String']['output']>;
  primary_goal?: Maybe<Scalars['String']['output']>;
  rest_timer_auto_start?: Maybe<Scalars['Boolean']['output']>;
  rest_timer_enabled?: Maybe<Scalars['Boolean']['output']>;
  training_experience?: Maybe<Scalars['difficulty']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  user_weight_histories: Array<User_Weight_History>;
  /** An aggregate relationship */
  user_weight_histories_aggregate: User_Weight_History_Aggregate;
  weight_kg?: Maybe<Scalars['numeric']['output']>;
  /** An array relationship */
  workout_performances: Array<Workout_Performance>;
  /** An aggregate relationship */
  workout_performances_aggregate: Workout_Performance_Aggregate;
  workout_reminders?: Maybe<Scalars['Boolean']['output']>;
  /** An array relationship */
  workouts: Array<Workout>;
  /** An aggregate relationship */
  workouts_aggregate: Workout_Aggregate;
};


/** columns and relationships of "sys_user" */
export type Sys_UserExercisesArgs = {
  distinct_on?: InputMaybe<Array<Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercise_Order_By>>;
  where?: InputMaybe<Exercise_Bool_Exp>;
};


/** columns and relationships of "sys_user" */
export type Sys_UserExercises_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Exercise_Order_By>>;
  where?: InputMaybe<Exercise_Bool_Exp>;
};


/** columns and relationships of "sys_user" */
export type Sys_UserUser_Weight_HistoriesArgs = {
  distinct_on?: InputMaybe<Array<User_Weight_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Weight_History_Order_By>>;
  where?: InputMaybe<User_Weight_History_Bool_Exp>;
};


/** columns and relationships of "sys_user" */
export type Sys_UserUser_Weight_Histories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Weight_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Weight_History_Order_By>>;
  where?: InputMaybe<User_Weight_History_Bool_Exp>;
};


/** columns and relationships of "sys_user" */
export type Sys_UserWorkout_PerformancesArgs = {
  distinct_on?: InputMaybe<Array<Workout_Performance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Performance_Order_By>>;
  where?: InputMaybe<Workout_Performance_Bool_Exp>;
};


/** columns and relationships of "sys_user" */
export type Sys_UserWorkout_Performances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workout_Performance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Performance_Order_By>>;
  where?: InputMaybe<Workout_Performance_Bool_Exp>;
};


/** columns and relationships of "sys_user" */
export type Sys_UserWorkoutsArgs = {
  distinct_on?: InputMaybe<Array<Workout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Order_By>>;
  where?: InputMaybe<Workout_Bool_Exp>;
};


/** columns and relationships of "sys_user" */
export type Sys_UserWorkouts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Order_By>>;
  where?: InputMaybe<Workout_Bool_Exp>;
};

/** aggregated selection of "sys_user" */
export type Sys_User_Aggregate = {
  aggregate?: Maybe<Sys_User_Aggregate_Fields>;
  nodes: Array<Sys_User>;
};

/** aggregate fields of "sys_user" */
export type Sys_User_Aggregate_Fields = {
  avg?: Maybe<Sys_User_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Sys_User_Max_Fields>;
  min?: Maybe<Sys_User_Min_Fields>;
  stddev?: Maybe<Sys_User_Stddev_Fields>;
  stddev_pop?: Maybe<Sys_User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Sys_User_Stddev_Samp_Fields>;
  sum?: Maybe<Sys_User_Sum_Fields>;
  var_pop?: Maybe<Sys_User_Var_Pop_Fields>;
  var_samp?: Maybe<Sys_User_Var_Samp_Fields>;
  variance?: Maybe<Sys_User_Variance_Fields>;
};


/** aggregate fields of "sys_user" */
export type Sys_User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sys_User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Sys_User_Avg_Fields = {
  height_cm?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "sys_user". All fields are combined with a logical 'AND'. */
export type Sys_User_Bool_Exp = {
  _and?: InputMaybe<Array<Sys_User_Bool_Exp>>;
  _not?: InputMaybe<Sys_User_Bool_Exp>;
  _or?: InputMaybe<Array<Sys_User_Bool_Exp>>;
  achievement_notifications?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  date_of_birth?: InputMaybe<Date_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  exercises?: InputMaybe<Exercise_Bool_Exp>;
  exercises_aggregate?: InputMaybe<Exercise_Aggregate_Bool_Exp>;
  firebase_uid?: InputMaybe<String_Comparison_Exp>;
  height_cm?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  last_login?: InputMaybe<Timestamptz_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  preferred_units?: InputMaybe<String_Comparison_Exp>;
  primary_goal?: InputMaybe<String_Comparison_Exp>;
  rest_timer_auto_start?: InputMaybe<Boolean_Comparison_Exp>;
  rest_timer_enabled?: InputMaybe<Boolean_Comparison_Exp>;
  training_experience?: InputMaybe<Difficulty_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_weight_histories?: InputMaybe<User_Weight_History_Bool_Exp>;
  user_weight_histories_aggregate?: InputMaybe<User_Weight_History_Aggregate_Bool_Exp>;
  weight_kg?: InputMaybe<Numeric_Comparison_Exp>;
  workout_performances?: InputMaybe<Workout_Performance_Bool_Exp>;
  workout_performances_aggregate?: InputMaybe<Workout_Performance_Aggregate_Bool_Exp>;
  workout_reminders?: InputMaybe<Boolean_Comparison_Exp>;
  workouts?: InputMaybe<Workout_Bool_Exp>;
  workouts_aggregate?: InputMaybe<Workout_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "sys_user" */
export type Sys_User_Constraint =
  /** unique or primary key constraint on columns "email" */
  | 'sys_user_email_key'
  /** unique or primary key constraint on columns "firebase_uid" */
  | 'sys_user_firebase_uid_key'
  /** unique or primary key constraint on columns "id" */
  | 'sys_user_pkey';

/** input type for incrementing numeric columns in table "sys_user" */
export type Sys_User_Inc_Input = {
  height_cm?: InputMaybe<Scalars['Int']['input']>;
  weight_kg?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "sys_user" */
export type Sys_User_Insert_Input = {
  achievement_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  date_of_birth?: InputMaybe<Scalars['date']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  exercises?: InputMaybe<Exercise_Arr_Rel_Insert_Input>;
  firebase_uid?: InputMaybe<Scalars['String']['input']>;
  height_cm?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  last_login?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  preferred_units?: InputMaybe<Scalars['String']['input']>;
  primary_goal?: InputMaybe<Scalars['String']['input']>;
  rest_timer_auto_start?: InputMaybe<Scalars['Boolean']['input']>;
  rest_timer_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  training_experience?: InputMaybe<Scalars['difficulty']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_weight_histories?: InputMaybe<User_Weight_History_Arr_Rel_Insert_Input>;
  weight_kg?: InputMaybe<Scalars['numeric']['input']>;
  workout_performances?: InputMaybe<Workout_Performance_Arr_Rel_Insert_Input>;
  workout_reminders?: InputMaybe<Scalars['Boolean']['input']>;
  workouts?: InputMaybe<Workout_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Sys_User_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  date_of_birth?: Maybe<Scalars['date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firebase_uid?: Maybe<Scalars['String']['output']>;
  height_cm?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  last_login?: Maybe<Scalars['timestamptz']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  preferred_units?: Maybe<Scalars['String']['output']>;
  primary_goal?: Maybe<Scalars['String']['output']>;
  training_experience?: Maybe<Scalars['difficulty']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  weight_kg?: Maybe<Scalars['numeric']['output']>;
};

/** aggregate min on columns */
export type Sys_User_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  date_of_birth?: Maybe<Scalars['date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firebase_uid?: Maybe<Scalars['String']['output']>;
  height_cm?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  last_login?: Maybe<Scalars['timestamptz']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  preferred_units?: Maybe<Scalars['String']['output']>;
  primary_goal?: Maybe<Scalars['String']['output']>;
  training_experience?: Maybe<Scalars['difficulty']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  weight_kg?: Maybe<Scalars['numeric']['output']>;
};

/** response of any mutation on the table "sys_user" */
export type Sys_User_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Sys_User>;
};

/** input type for inserting object relation for remote table "sys_user" */
export type Sys_User_Obj_Rel_Insert_Input = {
  data: Sys_User_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Sys_User_On_Conflict>;
};

/** on_conflict condition type for table "sys_user" */
export type Sys_User_On_Conflict = {
  constraint: Sys_User_Constraint;
  update_columns?: Array<Sys_User_Update_Column>;
  where?: InputMaybe<Sys_User_Bool_Exp>;
};

/** Ordering options when selecting data from "sys_user". */
export type Sys_User_Order_By = {
  achievement_notifications?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  date_of_birth?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  exercises_aggregate?: InputMaybe<Exercise_Aggregate_Order_By>;
  firebase_uid?: InputMaybe<Order_By>;
  height_cm?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  last_login?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  preferred_units?: InputMaybe<Order_By>;
  primary_goal?: InputMaybe<Order_By>;
  rest_timer_auto_start?: InputMaybe<Order_By>;
  rest_timer_enabled?: InputMaybe<Order_By>;
  training_experience?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_weight_histories_aggregate?: InputMaybe<User_Weight_History_Aggregate_Order_By>;
  weight_kg?: InputMaybe<Order_By>;
  workout_performances_aggregate?: InputMaybe<Workout_Performance_Aggregate_Order_By>;
  workout_reminders?: InputMaybe<Order_By>;
  workouts_aggregate?: InputMaybe<Workout_Aggregate_Order_By>;
};

/** primary key columns input for table: sys_user */
export type Sys_User_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "sys_user" */
export type Sys_User_Select_Column =
  /** column name */
  | 'achievement_notifications'
  /** column name */
  | 'created_at'
  /** column name */
  | 'date_of_birth'
  /** column name */
  | 'email'
  /** column name */
  | 'firebase_uid'
  /** column name */
  | 'height_cm'
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'last_login'
  /** column name */
  | 'name'
  /** column name */
  | 'preferred_units'
  /** column name */
  | 'primary_goal'
  /** column name */
  | 'rest_timer_auto_start'
  /** column name */
  | 'rest_timer_enabled'
  /** column name */
  | 'training_experience'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'weight_kg'
  /** column name */
  | 'workout_reminders';

/** input type for updating data in table "sys_user" */
export type Sys_User_Set_Input = {
  achievement_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  date_of_birth?: InputMaybe<Scalars['date']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firebase_uid?: InputMaybe<Scalars['String']['input']>;
  height_cm?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  last_login?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  preferred_units?: InputMaybe<Scalars['String']['input']>;
  primary_goal?: InputMaybe<Scalars['String']['input']>;
  rest_timer_auto_start?: InputMaybe<Scalars['Boolean']['input']>;
  rest_timer_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  training_experience?: InputMaybe<Scalars['difficulty']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  weight_kg?: InputMaybe<Scalars['numeric']['input']>;
  workout_reminders?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type Sys_User_Stddev_Fields = {
  height_cm?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Sys_User_Stddev_Pop_Fields = {
  height_cm?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Sys_User_Stddev_Samp_Fields = {
  height_cm?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "sys_user" */
export type Sys_User_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Sys_User_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Sys_User_Stream_Cursor_Value_Input = {
  achievement_notifications?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  date_of_birth?: InputMaybe<Scalars['date']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firebase_uid?: InputMaybe<Scalars['String']['input']>;
  height_cm?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  last_login?: InputMaybe<Scalars['timestamptz']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  preferred_units?: InputMaybe<Scalars['String']['input']>;
  primary_goal?: InputMaybe<Scalars['String']['input']>;
  rest_timer_auto_start?: InputMaybe<Scalars['Boolean']['input']>;
  rest_timer_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  training_experience?: InputMaybe<Scalars['difficulty']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  weight_kg?: InputMaybe<Scalars['numeric']['input']>;
  workout_reminders?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type Sys_User_Sum_Fields = {
  height_cm?: Maybe<Scalars['Int']['output']>;
  weight_kg?: Maybe<Scalars['numeric']['output']>;
};

/** update columns of table "sys_user" */
export type Sys_User_Update_Column =
  /** column name */
  | 'achievement_notifications'
  /** column name */
  | 'created_at'
  /** column name */
  | 'date_of_birth'
  /** column name */
  | 'email'
  /** column name */
  | 'firebase_uid'
  /** column name */
  | 'height_cm'
  /** column name */
  | 'id'
  /** column name */
  | 'is_active'
  /** column name */
  | 'last_login'
  /** column name */
  | 'name'
  /** column name */
  | 'preferred_units'
  /** column name */
  | 'primary_goal'
  /** column name */
  | 'rest_timer_auto_start'
  /** column name */
  | 'rest_timer_enabled'
  /** column name */
  | 'training_experience'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'weight_kg'
  /** column name */
  | 'workout_reminders';

export type Sys_User_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Sys_User_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Sys_User_Set_Input>;
  /** filter the rows which have to be updated */
  where: Sys_User_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Sys_User_Var_Pop_Fields = {
  height_cm?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Sys_User_Var_Samp_Fields = {
  height_cm?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Sys_User_Variance_Fields = {
  height_cm?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user_weight_history" */
export type User_Weight_History = {
  body_fat_percentage?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  recorded_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  sys_user: Sys_User;
  user_id: Scalars['uuid']['output'];
  weight_kg: Scalars['numeric']['output'];
};

/** aggregated selection of "user_weight_history" */
export type User_Weight_History_Aggregate = {
  aggregate?: Maybe<User_Weight_History_Aggregate_Fields>;
  nodes: Array<User_Weight_History>;
};

export type User_Weight_History_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Weight_History_Aggregate_Bool_Exp_Count>;
};

export type User_Weight_History_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Weight_History_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Weight_History_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_weight_history" */
export type User_Weight_History_Aggregate_Fields = {
  avg?: Maybe<User_Weight_History_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<User_Weight_History_Max_Fields>;
  min?: Maybe<User_Weight_History_Min_Fields>;
  stddev?: Maybe<User_Weight_History_Stddev_Fields>;
  stddev_pop?: Maybe<User_Weight_History_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Weight_History_Stddev_Samp_Fields>;
  sum?: Maybe<User_Weight_History_Sum_Fields>;
  var_pop?: Maybe<User_Weight_History_Var_Pop_Fields>;
  var_samp?: Maybe<User_Weight_History_Var_Samp_Fields>;
  variance?: Maybe<User_Weight_History_Variance_Fields>;
};


/** aggregate fields of "user_weight_history" */
export type User_Weight_History_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Weight_History_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_weight_history" */
export type User_Weight_History_Aggregate_Order_By = {
  avg?: InputMaybe<User_Weight_History_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Weight_History_Max_Order_By>;
  min?: InputMaybe<User_Weight_History_Min_Order_By>;
  stddev?: InputMaybe<User_Weight_History_Stddev_Order_By>;
  stddev_pop?: InputMaybe<User_Weight_History_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<User_Weight_History_Stddev_Samp_Order_By>;
  sum?: InputMaybe<User_Weight_History_Sum_Order_By>;
  var_pop?: InputMaybe<User_Weight_History_Var_Pop_Order_By>;
  var_samp?: InputMaybe<User_Weight_History_Var_Samp_Order_By>;
  variance?: InputMaybe<User_Weight_History_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "user_weight_history" */
export type User_Weight_History_Arr_Rel_Insert_Input = {
  data: Array<User_Weight_History_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Weight_History_On_Conflict>;
};

/** aggregate avg on columns */
export type User_Weight_History_Avg_Fields = {
  body_fat_percentage?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "user_weight_history" */
export type User_Weight_History_Avg_Order_By = {
  body_fat_percentage?: InputMaybe<Order_By>;
  weight_kg?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_weight_history". All fields are combined with a logical 'AND'. */
export type User_Weight_History_Bool_Exp = {
  _and?: InputMaybe<Array<User_Weight_History_Bool_Exp>>;
  _not?: InputMaybe<User_Weight_History_Bool_Exp>;
  _or?: InputMaybe<Array<User_Weight_History_Bool_Exp>>;
  body_fat_percentage?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  recorded_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  sys_user?: InputMaybe<Sys_User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  weight_kg?: InputMaybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_weight_history" */
export type User_Weight_History_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'user_weight_history_pkey';

/** input type for incrementing numeric columns in table "user_weight_history" */
export type User_Weight_History_Inc_Input = {
  body_fat_percentage?: InputMaybe<Scalars['numeric']['input']>;
  weight_kg?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "user_weight_history" */
export type User_Weight_History_Insert_Input = {
  body_fat_percentage?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  recorded_at?: InputMaybe<Scalars['timestamptz']['input']>;
  sys_user?: InputMaybe<Sys_User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  weight_kg?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate max on columns */
export type User_Weight_History_Max_Fields = {
  body_fat_percentage?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  recorded_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  weight_kg?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "user_weight_history" */
export type User_Weight_History_Max_Order_By = {
  body_fat_percentage?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  recorded_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  weight_kg?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Weight_History_Min_Fields = {
  body_fat_percentage?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  recorded_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  weight_kg?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "user_weight_history" */
export type User_Weight_History_Min_Order_By = {
  body_fat_percentage?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  recorded_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  weight_kg?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_weight_history" */
export type User_Weight_History_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Weight_History>;
};

/** on_conflict condition type for table "user_weight_history" */
export type User_Weight_History_On_Conflict = {
  constraint: User_Weight_History_Constraint;
  update_columns?: Array<User_Weight_History_Update_Column>;
  where?: InputMaybe<User_Weight_History_Bool_Exp>;
};

/** Ordering options when selecting data from "user_weight_history". */
export type User_Weight_History_Order_By = {
  body_fat_percentage?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  recorded_at?: InputMaybe<Order_By>;
  sys_user?: InputMaybe<Sys_User_Order_By>;
  user_id?: InputMaybe<Order_By>;
  weight_kg?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_weight_history */
export type User_Weight_History_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "user_weight_history" */
export type User_Weight_History_Select_Column =
  /** column name */
  | 'body_fat_percentage'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'notes'
  /** column name */
  | 'recorded_at'
  /** column name */
  | 'user_id'
  /** column name */
  | 'weight_kg';

/** input type for updating data in table "user_weight_history" */
export type User_Weight_History_Set_Input = {
  body_fat_percentage?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  recorded_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  weight_kg?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate stddev on columns */
export type User_Weight_History_Stddev_Fields = {
  body_fat_percentage?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "user_weight_history" */
export type User_Weight_History_Stddev_Order_By = {
  body_fat_percentage?: InputMaybe<Order_By>;
  weight_kg?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Weight_History_Stddev_Pop_Fields = {
  body_fat_percentage?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "user_weight_history" */
export type User_Weight_History_Stddev_Pop_Order_By = {
  body_fat_percentage?: InputMaybe<Order_By>;
  weight_kg?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Weight_History_Stddev_Samp_Fields = {
  body_fat_percentage?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "user_weight_history" */
export type User_Weight_History_Stddev_Samp_Order_By = {
  body_fat_percentage?: InputMaybe<Order_By>;
  weight_kg?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "user_weight_history" */
export type User_Weight_History_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Weight_History_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Weight_History_Stream_Cursor_Value_Input = {
  body_fat_percentage?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  recorded_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  weight_kg?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type User_Weight_History_Sum_Fields = {
  body_fat_percentage?: Maybe<Scalars['numeric']['output']>;
  weight_kg?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "user_weight_history" */
export type User_Weight_History_Sum_Order_By = {
  body_fat_percentage?: InputMaybe<Order_By>;
  weight_kg?: InputMaybe<Order_By>;
};

/** update columns of table "user_weight_history" */
export type User_Weight_History_Update_Column =
  /** column name */
  | 'body_fat_percentage'
  /** column name */
  | 'created_at'
  /** column name */
  | 'id'
  /** column name */
  | 'notes'
  /** column name */
  | 'recorded_at'
  /** column name */
  | 'user_id'
  /** column name */
  | 'weight_kg';

export type User_Weight_History_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<User_Weight_History_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Weight_History_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Weight_History_Bool_Exp;
};

/** aggregate var_pop on columns */
export type User_Weight_History_Var_Pop_Fields = {
  body_fat_percentage?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "user_weight_history" */
export type User_Weight_History_Var_Pop_Order_By = {
  body_fat_percentage?: InputMaybe<Order_By>;
  weight_kg?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Weight_History_Var_Samp_Fields = {
  body_fat_percentage?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "user_weight_history" */
export type User_Weight_History_Var_Samp_Order_By = {
  body_fat_percentage?: InputMaybe<Order_By>;
  weight_kg?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Weight_History_Variance_Fields = {
  body_fat_percentage?: Maybe<Scalars['Float']['output']>;
  weight_kg?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "user_weight_history" */
export type User_Weight_History_Variance_Order_By = {
  body_fat_percentage?: InputMaybe<Order_By>;
  weight_kg?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** Boolean expression to compare columns of type "vector". All fields are combined with logical 'AND'. */
export type Vector_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['vector']['input']>;
  _gt?: InputMaybe<Scalars['vector']['input']>;
  _gte?: InputMaybe<Scalars['vector']['input']>;
  _in?: InputMaybe<Array<Scalars['vector']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['vector']['input']>;
  _lte?: InputMaybe<Scalars['vector']['input']>;
  _neq?: InputMaybe<Scalars['vector']['input']>;
  _nin?: InputMaybe<Array<Scalars['vector']['input']>>;
};

/** columns and relationships of "workout" */
export type Workout = {
  ai_prompt?: Maybe<Scalars['String']['output']>;
  category: Scalars['workout_category']['output'];
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty: Scalars['difficulty']['output'];
  embedding?: Maybe<Scalars['vector']['output']>;
  estimated_duration_minutes: Scalars['Int']['output'];
  id: Scalars['uuid']['output'];
  is_ai_generated?: Maybe<Scalars['Boolean']['output']>;
  is_archived?: Maybe<Scalars['Boolean']['output']>;
  is_favorite?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  source_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  sys_user?: Maybe<Sys_User>;
  total_volume_estimate?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  workout?: Maybe<Workout>;
  /** An array relationship */
  workout_exercises: Array<Workout_Exercise>;
  /** An aggregate relationship */
  workout_exercises_aggregate: Workout_Exercise_Aggregate;
  /** An array relationship */
  workout_performances: Array<Workout_Performance>;
  /** An aggregate relationship */
  workout_performances_aggregate: Workout_Performance_Aggregate;
  /** An array relationship */
  workouts: Array<Workout>;
  /** An aggregate relationship */
  workouts_aggregate: Workout_Aggregate;
};


/** columns and relationships of "workout" */
export type WorkoutWorkout_ExercisesArgs = {
  distinct_on?: InputMaybe<Array<Workout_Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Exercise_Order_By>>;
  where?: InputMaybe<Workout_Exercise_Bool_Exp>;
};


/** columns and relationships of "workout" */
export type WorkoutWorkout_Exercises_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workout_Exercise_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Exercise_Order_By>>;
  where?: InputMaybe<Workout_Exercise_Bool_Exp>;
};


/** columns and relationships of "workout" */
export type WorkoutWorkout_PerformancesArgs = {
  distinct_on?: InputMaybe<Array<Workout_Performance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Performance_Order_By>>;
  where?: InputMaybe<Workout_Performance_Bool_Exp>;
};


/** columns and relationships of "workout" */
export type WorkoutWorkout_Performances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workout_Performance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Performance_Order_By>>;
  where?: InputMaybe<Workout_Performance_Bool_Exp>;
};


/** columns and relationships of "workout" */
export type WorkoutWorkoutsArgs = {
  distinct_on?: InputMaybe<Array<Workout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Order_By>>;
  where?: InputMaybe<Workout_Bool_Exp>;
};


/** columns and relationships of "workout" */
export type WorkoutWorkouts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Workout_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Workout_Order_By>>;
  where?: InputMaybe<Workout_Bool_Exp>;
};

/** aggregated selection of "workout" */
export type Workout_Aggregate = {
  aggregate?: Maybe<Workout_Aggregate_Fields>;
  nodes: Array<Workout>;
};

export type Workout_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Workout_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Workout_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Workout_Aggregate_Bool_Exp_Count>;
};

export type Workout_Aggregate_Bool_Exp_Bool_And = {
  arguments: Workout_Select_Column_Workout_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Workout_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Workout_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Workout_Select_Column_Workout_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Workout_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Workout_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Workout_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Workout_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "workout" */
export type Workout_Aggregate_Fields = {
  avg?: Maybe<Workout_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Workout_Max_Fields>;
  min?: Maybe<Workout_Min_Fields>;
  stddev?: Maybe<Workout_Stddev_Fields>;
  stddev_pop?: Maybe<Workout_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Workout_Stddev_Samp_Fields>;
  sum?: Maybe<Workout_Sum_Fields>;
  var_pop?: Maybe<Workout_Var_Pop_Fields>;
  var_samp?: Maybe<Workout_Var_Samp_Fields>;
  variance?: Maybe<Workout_Variance_Fields>;
};


/** aggregate fields of "workout" */
export type Workout_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Workout_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "workout" */
export type Workout_Aggregate_Order_By = {
  avg?: InputMaybe<Workout_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Workout_Max_Order_By>;
  min?: InputMaybe<Workout_Min_Order_By>;
  stddev?: InputMaybe<Workout_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Workout_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Workout_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Workout_Sum_Order_By>;
  var_pop?: InputMaybe<Workout_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Workout_Var_Samp_Order_By>;
  variance?: InputMaybe<Workout_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "workout" */
export type Workout_Arr_Rel_Insert_Input = {
  data: Array<Workout_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Workout_On_Conflict>;
};

/** aggregate avg on columns */
export type Workout_Avg_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "workout" */
export type Workout_Avg_Order_By = {
  estimated_duration_minutes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  total_volume_estimate?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "workout". All fields are combined with a logical 'AND'. */
export type Workout_Bool_Exp = {
  _and?: InputMaybe<Array<Workout_Bool_Exp>>;
  _not?: InputMaybe<Workout_Bool_Exp>;
  _or?: InputMaybe<Array<Workout_Bool_Exp>>;
  ai_prompt?: InputMaybe<String_Comparison_Exp>;
  category?: InputMaybe<Workout_Category_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  difficulty?: InputMaybe<Difficulty_Comparison_Exp>;
  embedding?: InputMaybe<Vector_Comparison_Exp>;
  estimated_duration_minutes?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_ai_generated?: InputMaybe<Boolean_Comparison_Exp>;
  is_archived?: InputMaybe<Boolean_Comparison_Exp>;
  is_favorite?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  popularity_score?: InputMaybe<Int_Comparison_Exp>;
  source_id?: InputMaybe<Uuid_Comparison_Exp>;
  sys_user?: InputMaybe<Sys_User_Bool_Exp>;
  total_volume_estimate?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  workout?: InputMaybe<Workout_Bool_Exp>;
  workout_exercises?: InputMaybe<Workout_Exercise_Bool_Exp>;
  workout_exercises_aggregate?: InputMaybe<Workout_Exercise_Aggregate_Bool_Exp>;
  workout_performances?: InputMaybe<Workout_Performance_Bool_Exp>;
  workout_performances_aggregate?: InputMaybe<Workout_Performance_Aggregate_Bool_Exp>;
  workouts?: InputMaybe<Workout_Bool_Exp>;
  workouts_aggregate?: InputMaybe<Workout_Aggregate_Bool_Exp>;
};

/** Boolean expression to compare columns of type "workout_category". All fields are combined with logical 'AND'. */
export type Workout_Category_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['workout_category']['input']>;
  _gt?: InputMaybe<Scalars['workout_category']['input']>;
  _gte?: InputMaybe<Scalars['workout_category']['input']>;
  _in?: InputMaybe<Array<Scalars['workout_category']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['workout_category']['input']>;
  _lte?: InputMaybe<Scalars['workout_category']['input']>;
  _neq?: InputMaybe<Scalars['workout_category']['input']>;
  _nin?: InputMaybe<Array<Scalars['workout_category']['input']>>;
};

/** unique or primary key constraints on table "workout" */
export type Workout_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'workout_pkey';

/** columns and relationships of "workout_exercise" */
export type Workout_Exercise = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  exercise: Exercise;
  exercise_id: Scalars['uuid']['output'];
  exercise_order: Scalars['numeric']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  reps?: Maybe<Scalars['Int']['output']>;
  rest: Scalars['Int']['output'];
  sets: Scalars['Int']['output'];
  /** An object relationship */
  workout: Workout;
  workout_id: Scalars['uuid']['output'];
};

/** aggregated selection of "workout_exercise" */
export type Workout_Exercise_Aggregate = {
  aggregate?: Maybe<Workout_Exercise_Aggregate_Fields>;
  nodes: Array<Workout_Exercise>;
};

export type Workout_Exercise_Aggregate_Bool_Exp = {
  count?: InputMaybe<Workout_Exercise_Aggregate_Bool_Exp_Count>;
};

export type Workout_Exercise_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Workout_Exercise_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Workout_Exercise_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "workout_exercise" */
export type Workout_Exercise_Aggregate_Fields = {
  avg?: Maybe<Workout_Exercise_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Workout_Exercise_Max_Fields>;
  min?: Maybe<Workout_Exercise_Min_Fields>;
  stddev?: Maybe<Workout_Exercise_Stddev_Fields>;
  stddev_pop?: Maybe<Workout_Exercise_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Workout_Exercise_Stddev_Samp_Fields>;
  sum?: Maybe<Workout_Exercise_Sum_Fields>;
  var_pop?: Maybe<Workout_Exercise_Var_Pop_Fields>;
  var_samp?: Maybe<Workout_Exercise_Var_Samp_Fields>;
  variance?: Maybe<Workout_Exercise_Variance_Fields>;
};


/** aggregate fields of "workout_exercise" */
export type Workout_Exercise_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Workout_Exercise_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "workout_exercise" */
export type Workout_Exercise_Aggregate_Order_By = {
  avg?: InputMaybe<Workout_Exercise_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Workout_Exercise_Max_Order_By>;
  min?: InputMaybe<Workout_Exercise_Min_Order_By>;
  stddev?: InputMaybe<Workout_Exercise_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Workout_Exercise_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Workout_Exercise_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Workout_Exercise_Sum_Order_By>;
  var_pop?: InputMaybe<Workout_Exercise_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Workout_Exercise_Var_Samp_Order_By>;
  variance?: InputMaybe<Workout_Exercise_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "workout_exercise" */
export type Workout_Exercise_Arr_Rel_Insert_Input = {
  data: Array<Workout_Exercise_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Workout_Exercise_On_Conflict>;
};

/** aggregate avg on columns */
export type Workout_Exercise_Avg_Fields = {
  duration?: Maybe<Scalars['Float']['output']>;
  exercise_order?: Maybe<Scalars['Float']['output']>;
  reps?: Maybe<Scalars['Float']['output']>;
  rest?: Maybe<Scalars['Float']['output']>;
  sets?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "workout_exercise" */
export type Workout_Exercise_Avg_Order_By = {
  duration?: InputMaybe<Order_By>;
  exercise_order?: InputMaybe<Order_By>;
  reps?: InputMaybe<Order_By>;
  rest?: InputMaybe<Order_By>;
  sets?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "workout_exercise". All fields are combined with a logical 'AND'. */
export type Workout_Exercise_Bool_Exp = {
  _and?: InputMaybe<Array<Workout_Exercise_Bool_Exp>>;
  _not?: InputMaybe<Workout_Exercise_Bool_Exp>;
  _or?: InputMaybe<Array<Workout_Exercise_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  duration?: InputMaybe<Int_Comparison_Exp>;
  exercise?: InputMaybe<Exercise_Bool_Exp>;
  exercise_id?: InputMaybe<Uuid_Comparison_Exp>;
  exercise_order?: InputMaybe<Numeric_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  reps?: InputMaybe<Int_Comparison_Exp>;
  rest?: InputMaybe<Int_Comparison_Exp>;
  sets?: InputMaybe<Int_Comparison_Exp>;
  workout?: InputMaybe<Workout_Bool_Exp>;
  workout_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "workout_exercise" */
export type Workout_Exercise_Constraint =
  /** unique or primary key constraint on columns "workout_id", "exercise_id" */
  | 'workout_exercise_pkey';

/** input type for incrementing numeric columns in table "workout_exercise" */
export type Workout_Exercise_Inc_Input = {
  duration?: InputMaybe<Scalars['Int']['input']>;
  exercise_order?: InputMaybe<Scalars['numeric']['input']>;
  reps?: InputMaybe<Scalars['Int']['input']>;
  rest?: InputMaybe<Scalars['Int']['input']>;
  sets?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "workout_exercise" */
export type Workout_Exercise_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  exercise?: InputMaybe<Exercise_Obj_Rel_Insert_Input>;
  exercise_id?: InputMaybe<Scalars['uuid']['input']>;
  exercise_order?: InputMaybe<Scalars['numeric']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reps?: InputMaybe<Scalars['Int']['input']>;
  rest?: InputMaybe<Scalars['Int']['input']>;
  sets?: InputMaybe<Scalars['Int']['input']>;
  workout?: InputMaybe<Workout_Obj_Rel_Insert_Input>;
  workout_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Workout_Exercise_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  exercise_id?: Maybe<Scalars['uuid']['output']>;
  exercise_order?: Maybe<Scalars['numeric']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  reps?: Maybe<Scalars['Int']['output']>;
  rest?: Maybe<Scalars['Int']['output']>;
  sets?: Maybe<Scalars['Int']['output']>;
  workout_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "workout_exercise" */
export type Workout_Exercise_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  exercise_id?: InputMaybe<Order_By>;
  exercise_order?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  reps?: InputMaybe<Order_By>;
  rest?: InputMaybe<Order_By>;
  sets?: InputMaybe<Order_By>;
  workout_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Workout_Exercise_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  exercise_id?: Maybe<Scalars['uuid']['output']>;
  exercise_order?: Maybe<Scalars['numeric']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  reps?: Maybe<Scalars['Int']['output']>;
  rest?: Maybe<Scalars['Int']['output']>;
  sets?: Maybe<Scalars['Int']['output']>;
  workout_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "workout_exercise" */
export type Workout_Exercise_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  exercise_id?: InputMaybe<Order_By>;
  exercise_order?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  reps?: InputMaybe<Order_By>;
  rest?: InputMaybe<Order_By>;
  sets?: InputMaybe<Order_By>;
  workout_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "workout_exercise" */
export type Workout_Exercise_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Workout_Exercise>;
};

/** on_conflict condition type for table "workout_exercise" */
export type Workout_Exercise_On_Conflict = {
  constraint: Workout_Exercise_Constraint;
  update_columns?: Array<Workout_Exercise_Update_Column>;
  where?: InputMaybe<Workout_Exercise_Bool_Exp>;
};

/** Ordering options when selecting data from "workout_exercise". */
export type Workout_Exercise_Order_By = {
  created_at?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  exercise?: InputMaybe<Exercise_Order_By>;
  exercise_id?: InputMaybe<Order_By>;
  exercise_order?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  reps?: InputMaybe<Order_By>;
  rest?: InputMaybe<Order_By>;
  sets?: InputMaybe<Order_By>;
  workout?: InputMaybe<Workout_Order_By>;
  workout_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: workout_exercise */
export type Workout_Exercise_Pk_Columns_Input = {
  exercise_id: Scalars['uuid']['input'];
  workout_id: Scalars['uuid']['input'];
};

/** select columns of table "workout_exercise" */
export type Workout_Exercise_Select_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'duration'
  /** column name */
  | 'exercise_id'
  /** column name */
  | 'exercise_order'
  /** column name */
  | 'notes'
  /** column name */
  | 'reps'
  /** column name */
  | 'rest'
  /** column name */
  | 'sets'
  /** column name */
  | 'workout_id';

/** input type for updating data in table "workout_exercise" */
export type Workout_Exercise_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  exercise_id?: InputMaybe<Scalars['uuid']['input']>;
  exercise_order?: InputMaybe<Scalars['numeric']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reps?: InputMaybe<Scalars['Int']['input']>;
  rest?: InputMaybe<Scalars['Int']['input']>;
  sets?: InputMaybe<Scalars['Int']['input']>;
  workout_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Workout_Exercise_Stddev_Fields = {
  duration?: Maybe<Scalars['Float']['output']>;
  exercise_order?: Maybe<Scalars['Float']['output']>;
  reps?: Maybe<Scalars['Float']['output']>;
  rest?: Maybe<Scalars['Float']['output']>;
  sets?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "workout_exercise" */
export type Workout_Exercise_Stddev_Order_By = {
  duration?: InputMaybe<Order_By>;
  exercise_order?: InputMaybe<Order_By>;
  reps?: InputMaybe<Order_By>;
  rest?: InputMaybe<Order_By>;
  sets?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Workout_Exercise_Stddev_Pop_Fields = {
  duration?: Maybe<Scalars['Float']['output']>;
  exercise_order?: Maybe<Scalars['Float']['output']>;
  reps?: Maybe<Scalars['Float']['output']>;
  rest?: Maybe<Scalars['Float']['output']>;
  sets?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "workout_exercise" */
export type Workout_Exercise_Stddev_Pop_Order_By = {
  duration?: InputMaybe<Order_By>;
  exercise_order?: InputMaybe<Order_By>;
  reps?: InputMaybe<Order_By>;
  rest?: InputMaybe<Order_By>;
  sets?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Workout_Exercise_Stddev_Samp_Fields = {
  duration?: Maybe<Scalars['Float']['output']>;
  exercise_order?: Maybe<Scalars['Float']['output']>;
  reps?: Maybe<Scalars['Float']['output']>;
  rest?: Maybe<Scalars['Float']['output']>;
  sets?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "workout_exercise" */
export type Workout_Exercise_Stddev_Samp_Order_By = {
  duration?: InputMaybe<Order_By>;
  exercise_order?: InputMaybe<Order_By>;
  reps?: InputMaybe<Order_By>;
  rest?: InputMaybe<Order_By>;
  sets?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "workout_exercise" */
export type Workout_Exercise_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Workout_Exercise_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Workout_Exercise_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  exercise_id?: InputMaybe<Scalars['uuid']['input']>;
  exercise_order?: InputMaybe<Scalars['numeric']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reps?: InputMaybe<Scalars['Int']['input']>;
  rest?: InputMaybe<Scalars['Int']['input']>;
  sets?: InputMaybe<Scalars['Int']['input']>;
  workout_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Workout_Exercise_Sum_Fields = {
  duration?: Maybe<Scalars['Int']['output']>;
  exercise_order?: Maybe<Scalars['numeric']['output']>;
  reps?: Maybe<Scalars['Int']['output']>;
  rest?: Maybe<Scalars['Int']['output']>;
  sets?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "workout_exercise" */
export type Workout_Exercise_Sum_Order_By = {
  duration?: InputMaybe<Order_By>;
  exercise_order?: InputMaybe<Order_By>;
  reps?: InputMaybe<Order_By>;
  rest?: InputMaybe<Order_By>;
  sets?: InputMaybe<Order_By>;
};

/** update columns of table "workout_exercise" */
export type Workout_Exercise_Update_Column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'duration'
  /** column name */
  | 'exercise_id'
  /** column name */
  | 'exercise_order'
  /** column name */
  | 'notes'
  /** column name */
  | 'reps'
  /** column name */
  | 'rest'
  /** column name */
  | 'sets'
  /** column name */
  | 'workout_id';

export type Workout_Exercise_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Workout_Exercise_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Workout_Exercise_Set_Input>;
  /** filter the rows which have to be updated */
  where: Workout_Exercise_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Workout_Exercise_Var_Pop_Fields = {
  duration?: Maybe<Scalars['Float']['output']>;
  exercise_order?: Maybe<Scalars['Float']['output']>;
  reps?: Maybe<Scalars['Float']['output']>;
  rest?: Maybe<Scalars['Float']['output']>;
  sets?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "workout_exercise" */
export type Workout_Exercise_Var_Pop_Order_By = {
  duration?: InputMaybe<Order_By>;
  exercise_order?: InputMaybe<Order_By>;
  reps?: InputMaybe<Order_By>;
  rest?: InputMaybe<Order_By>;
  sets?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Workout_Exercise_Var_Samp_Fields = {
  duration?: Maybe<Scalars['Float']['output']>;
  exercise_order?: Maybe<Scalars['Float']['output']>;
  reps?: Maybe<Scalars['Float']['output']>;
  rest?: Maybe<Scalars['Float']['output']>;
  sets?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "workout_exercise" */
export type Workout_Exercise_Var_Samp_Order_By = {
  duration?: InputMaybe<Order_By>;
  exercise_order?: InputMaybe<Order_By>;
  reps?: InputMaybe<Order_By>;
  rest?: InputMaybe<Order_By>;
  sets?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Workout_Exercise_Variance_Fields = {
  duration?: Maybe<Scalars['Float']['output']>;
  exercise_order?: Maybe<Scalars['Float']['output']>;
  reps?: Maybe<Scalars['Float']['output']>;
  rest?: Maybe<Scalars['Float']['output']>;
  sets?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "workout_exercise" */
export type Workout_Exercise_Variance_Order_By = {
  duration?: InputMaybe<Order_By>;
  exercise_order?: InputMaybe<Order_By>;
  reps?: InputMaybe<Order_By>;
  rest?: InputMaybe<Order_By>;
  sets?: InputMaybe<Order_By>;
};

/** input type for incrementing numeric columns in table "workout" */
export type Workout_Inc_Input = {
  estimated_duration_minutes?: InputMaybe<Scalars['Int']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  total_volume_estimate?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "workout" */
export type Workout_Insert_Input = {
  ai_prompt?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['workout_category']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['difficulty']['input']>;
  embedding?: InputMaybe<Scalars['vector']['input']>;
  estimated_duration_minutes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_ai_generated?: InputMaybe<Scalars['Boolean']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  source_id?: InputMaybe<Scalars['uuid']['input']>;
  sys_user?: InputMaybe<Sys_User_Obj_Rel_Insert_Input>;
  total_volume_estimate?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workout?: InputMaybe<Workout_Obj_Rel_Insert_Input>;
  workout_exercises?: InputMaybe<Workout_Exercise_Arr_Rel_Insert_Input>;
  workout_performances?: InputMaybe<Workout_Performance_Arr_Rel_Insert_Input>;
  workouts?: InputMaybe<Workout_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Workout_Max_Fields = {
  ai_prompt?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['workout_category']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['difficulty']['output']>;
  estimated_duration_minutes?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  source_id?: Maybe<Scalars['uuid']['output']>;
  total_volume_estimate?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "workout" */
export type Workout_Max_Order_By = {
  ai_prompt?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  difficulty?: InputMaybe<Order_By>;
  estimated_duration_minutes?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  source_id?: InputMaybe<Order_By>;
  total_volume_estimate?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Workout_Min_Fields = {
  ai_prompt?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['workout_category']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['difficulty']['output']>;
  estimated_duration_minutes?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  source_id?: Maybe<Scalars['uuid']['output']>;
  total_volume_estimate?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "workout" */
export type Workout_Min_Order_By = {
  ai_prompt?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  difficulty?: InputMaybe<Order_By>;
  estimated_duration_minutes?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  source_id?: InputMaybe<Order_By>;
  total_volume_estimate?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "workout" */
export type Workout_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Workout>;
};

/** input type for inserting object relation for remote table "workout" */
export type Workout_Obj_Rel_Insert_Input = {
  data: Workout_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Workout_On_Conflict>;
};

/** on_conflict condition type for table "workout" */
export type Workout_On_Conflict = {
  constraint: Workout_Constraint;
  update_columns?: Array<Workout_Update_Column>;
  where?: InputMaybe<Workout_Bool_Exp>;
};

/** Ordering options when selecting data from "workout". */
export type Workout_Order_By = {
  ai_prompt?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  difficulty?: InputMaybe<Order_By>;
  embedding?: InputMaybe<Order_By>;
  estimated_duration_minutes?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_ai_generated?: InputMaybe<Order_By>;
  is_archived?: InputMaybe<Order_By>;
  is_favorite?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  source_id?: InputMaybe<Order_By>;
  sys_user?: InputMaybe<Sys_User_Order_By>;
  total_volume_estimate?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workout?: InputMaybe<Workout_Order_By>;
  workout_exercises_aggregate?: InputMaybe<Workout_Exercise_Aggregate_Order_By>;
  workout_performances_aggregate?: InputMaybe<Workout_Performance_Aggregate_Order_By>;
  workouts_aggregate?: InputMaybe<Workout_Aggregate_Order_By>;
};

/** columns and relationships of "workout_performance" */
export type Workout_Performance = {
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  exercises_performed: Scalars['jsonb']['output'];
  id: Scalars['uuid']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  started_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  sys_user: Sys_User;
  user_id: Scalars['uuid']['output'];
  /** An object relationship */
  workout: Workout;
  workout_id: Scalars['uuid']['output'];
};


/** columns and relationships of "workout_performance" */
export type Workout_PerformanceExercises_PerformedArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "workout_performance" */
export type Workout_Performance_Aggregate = {
  aggregate?: Maybe<Workout_Performance_Aggregate_Fields>;
  nodes: Array<Workout_Performance>;
};

export type Workout_Performance_Aggregate_Bool_Exp = {
  count?: InputMaybe<Workout_Performance_Aggregate_Bool_Exp_Count>;
};

export type Workout_Performance_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Workout_Performance_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Workout_Performance_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "workout_performance" */
export type Workout_Performance_Aggregate_Fields = {
  count: Scalars['Int']['output'];
  max?: Maybe<Workout_Performance_Max_Fields>;
  min?: Maybe<Workout_Performance_Min_Fields>;
};


/** aggregate fields of "workout_performance" */
export type Workout_Performance_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Workout_Performance_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "workout_performance" */
export type Workout_Performance_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Workout_Performance_Max_Order_By>;
  min?: InputMaybe<Workout_Performance_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Workout_Performance_Append_Input = {
  exercises_performed?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "workout_performance" */
export type Workout_Performance_Arr_Rel_Insert_Input = {
  data: Array<Workout_Performance_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Workout_Performance_On_Conflict>;
};

/** Boolean expression to filter rows from the table "workout_performance". All fields are combined with a logical 'AND'. */
export type Workout_Performance_Bool_Exp = {
  _and?: InputMaybe<Array<Workout_Performance_Bool_Exp>>;
  _not?: InputMaybe<Workout_Performance_Bool_Exp>;
  _or?: InputMaybe<Array<Workout_Performance_Bool_Exp>>;
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  exercises_performed?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  notes?: InputMaybe<String_Comparison_Exp>;
  started_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  sys_user?: InputMaybe<Sys_User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  workout?: InputMaybe<Workout_Bool_Exp>;
  workout_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "workout_performance" */
export type Workout_Performance_Constraint =
  /** unique or primary key constraint on columns "id" */
  | 'workout_performance_pkey';

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Workout_Performance_Delete_At_Path_Input = {
  exercises_performed?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Workout_Performance_Delete_Elem_Input = {
  exercises_performed?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Workout_Performance_Delete_Key_Input = {
  exercises_performed?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "workout_performance" */
export type Workout_Performance_Insert_Input = {
  completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  exercises_performed?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  started_at?: InputMaybe<Scalars['timestamptz']['input']>;
  sys_user?: InputMaybe<Sys_User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workout?: InputMaybe<Workout_Obj_Rel_Insert_Input>;
  workout_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Workout_Performance_Max_Fields = {
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  started_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workout_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "workout_performance" */
export type Workout_Performance_Max_Order_By = {
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  started_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workout_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Workout_Performance_Min_Fields = {
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  started_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  workout_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "workout_performance" */
export type Workout_Performance_Min_Order_By = {
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  started_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  workout_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "workout_performance" */
export type Workout_Performance_Mutation_Response = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Workout_Performance>;
};

/** on_conflict condition type for table "workout_performance" */
export type Workout_Performance_On_Conflict = {
  constraint: Workout_Performance_Constraint;
  update_columns?: Array<Workout_Performance_Update_Column>;
  where?: InputMaybe<Workout_Performance_Bool_Exp>;
};

/** Ordering options when selecting data from "workout_performance". */
export type Workout_Performance_Order_By = {
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  exercises_performed?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  notes?: InputMaybe<Order_By>;
  started_at?: InputMaybe<Order_By>;
  sys_user?: InputMaybe<Sys_User_Order_By>;
  user_id?: InputMaybe<Order_By>;
  workout?: InputMaybe<Workout_Order_By>;
  workout_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: workout_performance */
export type Workout_Performance_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Workout_Performance_Prepend_Input = {
  exercises_performed?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "workout_performance" */
export type Workout_Performance_Select_Column =
  /** column name */
  | 'completed_at'
  /** column name */
  | 'created_at'
  /** column name */
  | 'exercises_performed'
  /** column name */
  | 'id'
  /** column name */
  | 'notes'
  /** column name */
  | 'started_at'
  /** column name */
  | 'user_id'
  /** column name */
  | 'workout_id';

/** input type for updating data in table "workout_performance" */
export type Workout_Performance_Set_Input = {
  completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  exercises_performed?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  started_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workout_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "workout_performance" */
export type Workout_Performance_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Workout_Performance_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Workout_Performance_Stream_Cursor_Value_Input = {
  completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  exercises_performed?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  started_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  workout_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "workout_performance" */
export type Workout_Performance_Update_Column =
  /** column name */
  | 'completed_at'
  /** column name */
  | 'created_at'
  /** column name */
  | 'exercises_performed'
  /** column name */
  | 'id'
  /** column name */
  | 'notes'
  /** column name */
  | 'started_at'
  /** column name */
  | 'user_id'
  /** column name */
  | 'workout_id';

export type Workout_Performance_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Workout_Performance_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Workout_Performance_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Workout_Performance_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Workout_Performance_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Workout_Performance_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Workout_Performance_Set_Input>;
  /** filter the rows which have to be updated */
  where: Workout_Performance_Bool_Exp;
};

/** primary key columns input for table: workout */
export type Workout_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "workout" */
export type Workout_Select_Column =
  /** column name */
  | 'ai_prompt'
  /** column name */
  | 'category'
  /** column name */
  | 'created_at'
  /** column name */
  | 'description'
  /** column name */
  | 'difficulty'
  /** column name */
  | 'embedding'
  /** column name */
  | 'estimated_duration_minutes'
  /** column name */
  | 'id'
  /** column name */
  | 'is_ai_generated'
  /** column name */
  | 'is_archived'
  /** column name */
  | 'is_favorite'
  /** column name */
  | 'name'
  /** column name */
  | 'notes'
  /** column name */
  | 'popularity_score'
  /** column name */
  | 'source_id'
  /** column name */
  | 'total_volume_estimate'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

/** select "workout_aggregate_bool_exp_bool_and_arguments_columns" columns of table "workout" */
export type Workout_Select_Column_Workout_Aggregate_Bool_Exp_Bool_And_Arguments_Columns =
  /** column name */
  | 'is_ai_generated'
  /** column name */
  | 'is_archived'
  /** column name */
  | 'is_favorite';

/** select "workout_aggregate_bool_exp_bool_or_arguments_columns" columns of table "workout" */
export type Workout_Select_Column_Workout_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns =
  /** column name */
  | 'is_ai_generated'
  /** column name */
  | 'is_archived'
  /** column name */
  | 'is_favorite';

/** input type for updating data in table "workout" */
export type Workout_Set_Input = {
  ai_prompt?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['workout_category']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['difficulty']['input']>;
  embedding?: InputMaybe<Scalars['vector']['input']>;
  estimated_duration_minutes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_ai_generated?: InputMaybe<Scalars['Boolean']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  source_id?: InputMaybe<Scalars['uuid']['input']>;
  total_volume_estimate?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Workout_Stddev_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "workout" */
export type Workout_Stddev_Order_By = {
  estimated_duration_minutes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  total_volume_estimate?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Workout_Stddev_Pop_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "workout" */
export type Workout_Stddev_Pop_Order_By = {
  estimated_duration_minutes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  total_volume_estimate?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Workout_Stddev_Samp_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "workout" */
export type Workout_Stddev_Samp_Order_By = {
  estimated_duration_minutes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  total_volume_estimate?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "workout" */
export type Workout_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Workout_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Workout_Stream_Cursor_Value_Input = {
  ai_prompt?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['workout_category']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['difficulty']['input']>;
  embedding?: InputMaybe<Scalars['vector']['input']>;
  estimated_duration_minutes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_ai_generated?: InputMaybe<Scalars['Boolean']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_favorite?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  popularity_score?: InputMaybe<Scalars['Int']['input']>;
  source_id?: InputMaybe<Scalars['uuid']['input']>;
  total_volume_estimate?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Workout_Sum_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Int']['output']>;
  popularity_score?: Maybe<Scalars['Int']['output']>;
  total_volume_estimate?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "workout" */
export type Workout_Sum_Order_By = {
  estimated_duration_minutes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  total_volume_estimate?: InputMaybe<Order_By>;
};

/** update columns of table "workout" */
export type Workout_Update_Column =
  /** column name */
  | 'ai_prompt'
  /** column name */
  | 'category'
  /** column name */
  | 'created_at'
  /** column name */
  | 'description'
  /** column name */
  | 'difficulty'
  /** column name */
  | 'embedding'
  /** column name */
  | 'estimated_duration_minutes'
  /** column name */
  | 'id'
  /** column name */
  | 'is_ai_generated'
  /** column name */
  | 'is_archived'
  /** column name */
  | 'is_favorite'
  /** column name */
  | 'name'
  /** column name */
  | 'notes'
  /** column name */
  | 'popularity_score'
  /** column name */
  | 'source_id'
  /** column name */
  | 'total_volume_estimate'
  /** column name */
  | 'updated_at'
  /** column name */
  | 'user_id';

export type Workout_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Workout_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Workout_Set_Input>;
  /** filter the rows which have to be updated */
  where: Workout_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Workout_Var_Pop_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "workout" */
export type Workout_Var_Pop_Order_By = {
  estimated_duration_minutes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  total_volume_estimate?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Workout_Var_Samp_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "workout" */
export type Workout_Var_Samp_Order_By = {
  estimated_duration_minutes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  total_volume_estimate?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Workout_Variance_Fields = {
  estimated_duration_minutes?: Maybe<Scalars['Float']['output']>;
  popularity_score?: Maybe<Scalars['Float']['output']>;
  total_volume_estimate?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "workout" */
export type Workout_Variance_Order_By = {
  estimated_duration_minutes?: InputMaybe<Order_By>;
  popularity_score?: InputMaybe<Order_By>;
  total_volume_estimate?: InputMaybe<Order_By>;
};

export type GetExercisesQueryVariables = Exact<{
  user_id: Scalars['uuid']['input'];
}>;


export type GetExercisesQuery = { exercise: Array<{ id: any, user_id?: any | null, source_id?: any | null, name: string, muscle_groups: Array<any>, category: any, equipment: any, instructions: string, measurement_type: any, default_sets: number, default_reps?: number | null, default_duration?: number | null, default_rest: number, is_favorite?: boolean | null, is_archived?: boolean | null, is_ai_generated?: boolean | null, ai_prompt?: string | null, notes?: string | null, created_at?: any | null, updated_at?: any | null }> };

export type GetExerciseByIdQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetExerciseByIdQuery = { exercise_by_pk?: { id: any, user_id?: any | null, source_id?: any | null, name: string, muscle_groups: Array<any>, category: any, equipment: any, instructions: string, measurement_type: any, default_sets: number, default_reps?: number | null, default_duration?: number | null, default_rest: number, is_favorite?: boolean | null, is_archived?: boolean | null, is_ai_generated?: boolean | null, ai_prompt?: string | null, notes?: string | null, created_at?: any | null, updated_at?: any | null } | null };

export type CreateExerciseMutationVariables = Exact<{
  object: Exercise_Insert_Input;
}>;


export type CreateExerciseMutation = { insert_exercise_one?: { id: any, user_id?: any | null, source_id?: any | null, name: string, muscle_groups: Array<any>, category: any, equipment: any, instructions: string, measurement_type: any, default_sets: number, default_reps?: number | null, default_duration?: number | null, default_rest: number, is_favorite?: boolean | null, is_archived?: boolean | null, is_ai_generated?: boolean | null, ai_prompt?: string | null, notes?: string | null, created_at?: any | null, updated_at?: any | null } | null };

export type UpdateExerciseMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  set: Exercise_Set_Input;
}>;


export type UpdateExerciseMutation = { update_exercise_by_pk?: { id: any, user_id?: any | null, source_id?: any | null, name: string, muscle_groups: Array<any>, category: any, equipment: any, instructions: string, measurement_type: any, default_sets: number, default_reps?: number | null, default_duration?: number | null, default_rest: number, is_favorite?: boolean | null, is_archived?: boolean | null, notes?: string | null, updated_at?: any | null } | null };

export type CopyExerciseFromLibraryMutationVariables = Exact<{
  user_id: Scalars['uuid']['input'];
  source_id: Scalars['uuid']['input'];
}>;


export type CopyExerciseFromLibraryMutation = { insert_exercise_one?: { id: any, user_id?: any | null, source_id?: any | null, name: string, muscle_groups: Array<any>, category: any, equipment: any, instructions: string, measurement_type: any, default_sets: number, default_reps?: number | null, default_duration?: number | null, default_rest: number, created_at?: any | null, updated_at?: any | null } | null };

export type ToggleFavoriteExerciseMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  is_favorite: Scalars['Boolean']['input'];
}>;


export type ToggleFavoriteExerciseMutation = { update_exercise_by_pk?: { id: any, is_favorite?: boolean | null } | null };

export type ArchiveExerciseMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type ArchiveExerciseMutation = { update_exercise_by_pk?: { id: any, is_archived?: boolean | null } | null };

export type GetWorkoutsQueryVariables = Exact<{
  user_id: Scalars['uuid']['input'];
}>;


export type GetWorkoutsQuery = { workout: Array<{ id: any, user_id?: any | null, source_id?: any | null, name: string, description?: string | null, category: any, difficulty: any, estimated_duration_minutes: number, is_favorite?: boolean | null, is_archived?: boolean | null, is_ai_generated?: boolean | null, ai_prompt?: string | null, created_at?: any | null, updated_at?: any | null, workout_exercises: Array<{ exercise_id: any, exercise_order: any, sets: number, reps?: number | null, duration?: number | null, rest: number, exercise: { id: any, name: string, muscle_groups: Array<any>, equipment: any, measurement_type: any } }> }> };

export type GetWorkoutByIdQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetWorkoutByIdQuery = { workout_by_pk?: { id: any, user_id?: any | null, source_id?: any | null, name: string, description?: string | null, category: any, difficulty: any, estimated_duration_minutes: number, is_favorite?: boolean | null, is_archived?: boolean | null, is_ai_generated?: boolean | null, ai_prompt?: string | null, created_at?: any | null, updated_at?: any | null, workout_exercises: Array<{ exercise_id: any, exercise_order: any, sets: number, reps?: number | null, duration?: number | null, rest: number, exercise: { id: any, name: string, muscle_groups: Array<any>, equipment: any, instructions: string, measurement_type: any } }> } | null };

export type CreateWorkoutMutationVariables = Exact<{
  object: Workout_Insert_Input;
}>;


export type CreateWorkoutMutation = { insert_workout_one?: { id: any, user_id?: any | null, source_id?: any | null, name: string, description?: string | null, category: any, difficulty: any, estimated_duration_minutes: number, is_favorite?: boolean | null, is_archived?: boolean | null, is_ai_generated?: boolean | null, ai_prompt?: string | null, created_at?: any | null, updated_at?: any | null } | null };

export type UpdateWorkoutMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  set: Workout_Set_Input;
}>;


export type UpdateWorkoutMutation = { update_workout_by_pk?: { id: any, name: string, description?: string | null, category: any, difficulty: any, estimated_duration_minutes: number, is_favorite?: boolean | null, updated_at?: any | null } | null };

export type AddExerciseToWorkoutMutationVariables = Exact<{
  workout_id: Scalars['uuid']['input'];
  exercise_id: Scalars['uuid']['input'];
  exercise_order: Scalars['numeric']['input'];
  sets: Scalars['Int']['input'];
  reps?: InputMaybe<Scalars['Int']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  rest: Scalars['Int']['input'];
}>;


export type AddExerciseToWorkoutMutation = { insert_workout_exercise_one?: { workout_id: any, exercise_id: any, exercise_order: any, sets: number, reps?: number | null, duration?: number | null, rest: number } | null };

export type UpdateWorkoutExerciseMutationVariables = Exact<{
  workout_id: Scalars['uuid']['input'];
  exercise_id: Scalars['uuid']['input'];
  set: Workout_Exercise_Set_Input;
}>;


export type UpdateWorkoutExerciseMutation = { update_workout_exercise_by_pk?: { workout_id: any, exercise_id: any, exercise_order: any, sets: number, reps?: number | null, duration?: number | null, rest: number } | null };

export type RemoveExerciseFromWorkoutMutationVariables = Exact<{
  workout_id: Scalars['uuid']['input'];
  exercise_id: Scalars['uuid']['input'];
}>;


export type RemoveExerciseFromWorkoutMutation = { delete_workout_exercise_by_pk?: { workout_id: any, exercise_id: any } | null };

export type CopyWorkoutFromLibraryMutationVariables = Exact<{
  user_id: Scalars['uuid']['input'];
  source_id: Scalars['uuid']['input'];
}>;


export type CopyWorkoutFromLibraryMutation = { insert_workout_one?: { id: any, user_id?: any | null, source_id?: any | null, name: string, description?: string | null, category: any, difficulty: any, estimated_duration_minutes: number, created_at?: any | null, updated_at?: any | null } | null };

export type ToggleFavoriteWorkoutMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  is_favorite: Scalars['Boolean']['input'];
}>;


export type ToggleFavoriteWorkoutMutation = { update_workout_by_pk?: { id: any, is_favorite?: boolean | null } | null };

export type ArchiveWorkoutMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type ArchiveWorkoutMutation = { update_workout_by_pk?: { id: any, is_archived?: boolean | null } | null };

export type StartWorkoutPerformanceMutationVariables = Exact<{
  user_id: Scalars['uuid']['input'];
  workout_id: Scalars['uuid']['input'];
}>;


export type StartWorkoutPerformanceMutation = { insert_workout_performance_one?: { id: any, user_id: any, workout_id: any, started_at: any } | null };


export const GetExercisesDocument = gql`
    query GetExercises($user_id: uuid!) {
  exercise(
    where: {_or: [{user_id: {_eq: $user_id}}, {user_id: {_is_null: true}}], is_archived: {_eq: false}}
    order_by: {name: asc}
  ) {
    id
    user_id
    source_id
    name
    muscle_groups
    category
    equipment
    instructions
    measurement_type
    default_sets
    default_reps
    default_duration
    default_rest
    is_favorite
    is_archived
    is_ai_generated
    ai_prompt
    notes
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetExercisesQuery__
 *
 * To run a query within a React component, call `useGetExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExercisesQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useGetExercisesQuery(baseOptions: Apollo.QueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables> & ({ variables: GetExercisesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, options);
      }
export function useGetExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, options);
        }
export function useGetExercisesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, options);
        }
export type GetExercisesQueryHookResult = ReturnType<typeof useGetExercisesQuery>;
export type GetExercisesLazyQueryHookResult = ReturnType<typeof useGetExercisesLazyQuery>;
export type GetExercisesSuspenseQueryHookResult = ReturnType<typeof useGetExercisesSuspenseQuery>;
export type GetExercisesQueryResult = Apollo.QueryResult<GetExercisesQuery, GetExercisesQueryVariables>;
export const GetExerciseByIdDocument = gql`
    query GetExerciseById($id: uuid!) {
  exercise_by_pk(id: $id) {
    id
    user_id
    source_id
    name
    muscle_groups
    category
    equipment
    instructions
    measurement_type
    default_sets
    default_reps
    default_duration
    default_rest
    is_favorite
    is_archived
    is_ai_generated
    ai_prompt
    notes
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetExerciseByIdQuery__
 *
 * To run a query within a React component, call `useGetExerciseByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExerciseByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExerciseByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetExerciseByIdQuery(baseOptions: Apollo.QueryHookOptions<GetExerciseByIdQuery, GetExerciseByIdQueryVariables> & ({ variables: GetExerciseByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExerciseByIdQuery, GetExerciseByIdQueryVariables>(GetExerciseByIdDocument, options);
      }
export function useGetExerciseByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExerciseByIdQuery, GetExerciseByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExerciseByIdQuery, GetExerciseByIdQueryVariables>(GetExerciseByIdDocument, options);
        }
export function useGetExerciseByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetExerciseByIdQuery, GetExerciseByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExerciseByIdQuery, GetExerciseByIdQueryVariables>(GetExerciseByIdDocument, options);
        }
export type GetExerciseByIdQueryHookResult = ReturnType<typeof useGetExerciseByIdQuery>;
export type GetExerciseByIdLazyQueryHookResult = ReturnType<typeof useGetExerciseByIdLazyQuery>;
export type GetExerciseByIdSuspenseQueryHookResult = ReturnType<typeof useGetExerciseByIdSuspenseQuery>;
export type GetExerciseByIdQueryResult = Apollo.QueryResult<GetExerciseByIdQuery, GetExerciseByIdQueryVariables>;
export const CreateExerciseDocument = gql`
    mutation CreateExercise($object: exercise_insert_input!) {
  insert_exercise_one(object: $object) {
    id
    user_id
    source_id
    name
    muscle_groups
    category
    equipment
    instructions
    measurement_type
    default_sets
    default_reps
    default_duration
    default_rest
    is_favorite
    is_archived
    is_ai_generated
    ai_prompt
    notes
    created_at
    updated_at
  }
}
    `;
export type CreateExerciseMutationFn = Apollo.MutationFunction<CreateExerciseMutation, CreateExerciseMutationVariables>;

/**
 * __useCreateExerciseMutation__
 *
 * To run a mutation, you first call `useCreateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseMutation, { data, loading, error }] = useCreateExerciseMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useCreateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseMutation, CreateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseMutation, CreateExerciseMutationVariables>(CreateExerciseDocument, options);
      }
export type CreateExerciseMutationHookResult = ReturnType<typeof useCreateExerciseMutation>;
export type CreateExerciseMutationResult = Apollo.MutationResult<CreateExerciseMutation>;
export type CreateExerciseMutationOptions = Apollo.BaseMutationOptions<CreateExerciseMutation, CreateExerciseMutationVariables>;
export const UpdateExerciseDocument = gql`
    mutation UpdateExercise($id: uuid!, $set: exercise_set_input!) {
  update_exercise_by_pk(pk_columns: {id: $id}, _set: $set) {
    id
    user_id
    source_id
    name
    muscle_groups
    category
    equipment
    instructions
    measurement_type
    default_sets
    default_reps
    default_duration
    default_rest
    is_favorite
    is_archived
    notes
    updated_at
  }
}
    `;
export type UpdateExerciseMutationFn = Apollo.MutationFunction<UpdateExerciseMutation, UpdateExerciseMutationVariables>;

/**
 * __useUpdateExerciseMutation__
 *
 * To run a mutation, you first call `useUpdateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciseMutation, { data, loading, error }] = useUpdateExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateExerciseMutation, UpdateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateExerciseMutation, UpdateExerciseMutationVariables>(UpdateExerciseDocument, options);
      }
export type UpdateExerciseMutationHookResult = ReturnType<typeof useUpdateExerciseMutation>;
export type UpdateExerciseMutationResult = Apollo.MutationResult<UpdateExerciseMutation>;
export type UpdateExerciseMutationOptions = Apollo.BaseMutationOptions<UpdateExerciseMutation, UpdateExerciseMutationVariables>;
export const CopyExerciseFromLibraryDocument = gql`
    mutation CopyExerciseFromLibrary($user_id: uuid!, $source_id: uuid!) {
  insert_exercise_one(object: {user_id: $user_id, source_id: $source_id}) {
    id
    user_id
    source_id
    name
    muscle_groups
    category
    equipment
    instructions
    measurement_type
    default_sets
    default_reps
    default_duration
    default_rest
    created_at
    updated_at
  }
}
    `;
export type CopyExerciseFromLibraryMutationFn = Apollo.MutationFunction<CopyExerciseFromLibraryMutation, CopyExerciseFromLibraryMutationVariables>;

/**
 * __useCopyExerciseFromLibraryMutation__
 *
 * To run a mutation, you first call `useCopyExerciseFromLibraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCopyExerciseFromLibraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [copyExerciseFromLibraryMutation, { data, loading, error }] = useCopyExerciseFromLibraryMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      source_id: // value for 'source_id'
 *   },
 * });
 */
export function useCopyExerciseFromLibraryMutation(baseOptions?: Apollo.MutationHookOptions<CopyExerciseFromLibraryMutation, CopyExerciseFromLibraryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CopyExerciseFromLibraryMutation, CopyExerciseFromLibraryMutationVariables>(CopyExerciseFromLibraryDocument, options);
      }
export type CopyExerciseFromLibraryMutationHookResult = ReturnType<typeof useCopyExerciseFromLibraryMutation>;
export type CopyExerciseFromLibraryMutationResult = Apollo.MutationResult<CopyExerciseFromLibraryMutation>;
export type CopyExerciseFromLibraryMutationOptions = Apollo.BaseMutationOptions<CopyExerciseFromLibraryMutation, CopyExerciseFromLibraryMutationVariables>;
export const ToggleFavoriteExerciseDocument = gql`
    mutation ToggleFavoriteExercise($id: uuid!, $is_favorite: Boolean!) {
  update_exercise_by_pk(pk_columns: {id: $id}, _set: {is_favorite: $is_favorite}) {
    id
    is_favorite
  }
}
    `;
export type ToggleFavoriteExerciseMutationFn = Apollo.MutationFunction<ToggleFavoriteExerciseMutation, ToggleFavoriteExerciseMutationVariables>;

/**
 * __useToggleFavoriteExerciseMutation__
 *
 * To run a mutation, you first call `useToggleFavoriteExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavoriteExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFavoriteExerciseMutation, { data, loading, error }] = useToggleFavoriteExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      is_favorite: // value for 'is_favorite'
 *   },
 * });
 */
export function useToggleFavoriteExerciseMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFavoriteExerciseMutation, ToggleFavoriteExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFavoriteExerciseMutation, ToggleFavoriteExerciseMutationVariables>(ToggleFavoriteExerciseDocument, options);
      }
export type ToggleFavoriteExerciseMutationHookResult = ReturnType<typeof useToggleFavoriteExerciseMutation>;
export type ToggleFavoriteExerciseMutationResult = Apollo.MutationResult<ToggleFavoriteExerciseMutation>;
export type ToggleFavoriteExerciseMutationOptions = Apollo.BaseMutationOptions<ToggleFavoriteExerciseMutation, ToggleFavoriteExerciseMutationVariables>;
export const ArchiveExerciseDocument = gql`
    mutation ArchiveExercise($id: uuid!) {
  update_exercise_by_pk(pk_columns: {id: $id}, _set: {is_archived: true}) {
    id
    is_archived
  }
}
    `;
export type ArchiveExerciseMutationFn = Apollo.MutationFunction<ArchiveExerciseMutation, ArchiveExerciseMutationVariables>;

/**
 * __useArchiveExerciseMutation__
 *
 * To run a mutation, you first call `useArchiveExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveExerciseMutation, { data, loading, error }] = useArchiveExerciseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveExerciseMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveExerciseMutation, ArchiveExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveExerciseMutation, ArchiveExerciseMutationVariables>(ArchiveExerciseDocument, options);
      }
export type ArchiveExerciseMutationHookResult = ReturnType<typeof useArchiveExerciseMutation>;
export type ArchiveExerciseMutationResult = Apollo.MutationResult<ArchiveExerciseMutation>;
export type ArchiveExerciseMutationOptions = Apollo.BaseMutationOptions<ArchiveExerciseMutation, ArchiveExerciseMutationVariables>;
export const GetWorkoutsDocument = gql`
    query GetWorkouts($user_id: uuid!) {
  workout(
    where: {_or: [{user_id: {_eq: $user_id}}, {user_id: {_is_null: true}}], is_archived: {_eq: false}}
    order_by: {updated_at: desc}
  ) {
    id
    user_id
    source_id
    name
    description
    category
    difficulty
    estimated_duration_minutes
    is_favorite
    is_archived
    is_ai_generated
    ai_prompt
    created_at
    updated_at
    workout_exercises(order_by: {exercise_order: asc}) {
      exercise_id
      exercise_order
      sets
      reps
      duration
      rest
      exercise {
        id
        name
        muscle_groups
        equipment
        measurement_type
      }
    }
  }
}
    `;

/**
 * __useGetWorkoutsQuery__
 *
 * To run a query within a React component, call `useGetWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkoutsQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useGetWorkoutsQuery(baseOptions: Apollo.QueryHookOptions<GetWorkoutsQuery, GetWorkoutsQueryVariables> & ({ variables: GetWorkoutsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkoutsQuery, GetWorkoutsQueryVariables>(GetWorkoutsDocument, options);
      }
export function useGetWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkoutsQuery, GetWorkoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkoutsQuery, GetWorkoutsQueryVariables>(GetWorkoutsDocument, options);
        }
export function useGetWorkoutsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkoutsQuery, GetWorkoutsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkoutsQuery, GetWorkoutsQueryVariables>(GetWorkoutsDocument, options);
        }
export type GetWorkoutsQueryHookResult = ReturnType<typeof useGetWorkoutsQuery>;
export type GetWorkoutsLazyQueryHookResult = ReturnType<typeof useGetWorkoutsLazyQuery>;
export type GetWorkoutsSuspenseQueryHookResult = ReturnType<typeof useGetWorkoutsSuspenseQuery>;
export type GetWorkoutsQueryResult = Apollo.QueryResult<GetWorkoutsQuery, GetWorkoutsQueryVariables>;
export const GetWorkoutByIdDocument = gql`
    query GetWorkoutById($id: uuid!) {
  workout_by_pk(id: $id) {
    id
    user_id
    source_id
    name
    description
    category
    difficulty
    estimated_duration_minutes
    is_favorite
    is_archived
    is_ai_generated
    ai_prompt
    created_at
    updated_at
    workout_exercises(order_by: {exercise_order: asc}) {
      exercise_id
      exercise_order
      sets
      reps
      duration
      rest
      exercise {
        id
        name
        muscle_groups
        equipment
        instructions
        measurement_type
      }
    }
  }
}
    `;

/**
 * __useGetWorkoutByIdQuery__
 *
 * To run a query within a React component, call `useGetWorkoutByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkoutByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkoutByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWorkoutByIdQuery(baseOptions: Apollo.QueryHookOptions<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables> & ({ variables: GetWorkoutByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>(GetWorkoutByIdDocument, options);
      }
export function useGetWorkoutByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>(GetWorkoutByIdDocument, options);
        }
export function useGetWorkoutByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>(GetWorkoutByIdDocument, options);
        }
export type GetWorkoutByIdQueryHookResult = ReturnType<typeof useGetWorkoutByIdQuery>;
export type GetWorkoutByIdLazyQueryHookResult = ReturnType<typeof useGetWorkoutByIdLazyQuery>;
export type GetWorkoutByIdSuspenseQueryHookResult = ReturnType<typeof useGetWorkoutByIdSuspenseQuery>;
export type GetWorkoutByIdQueryResult = Apollo.QueryResult<GetWorkoutByIdQuery, GetWorkoutByIdQueryVariables>;
export const CreateWorkoutDocument = gql`
    mutation CreateWorkout($object: workout_insert_input!) {
  insert_workout_one(object: $object) {
    id
    user_id
    source_id
    name
    description
    category
    difficulty
    estimated_duration_minutes
    is_favorite
    is_archived
    is_ai_generated
    ai_prompt
    created_at
    updated_at
  }
}
    `;
export type CreateWorkoutMutationFn = Apollo.MutationFunction<CreateWorkoutMutation, CreateWorkoutMutationVariables>;

/**
 * __useCreateWorkoutMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutMutation, { data, loading, error }] = useCreateWorkoutMutation({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useCreateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkoutMutation, CreateWorkoutMutationVariables>(CreateWorkoutDocument, options);
      }
export type CreateWorkoutMutationHookResult = ReturnType<typeof useCreateWorkoutMutation>;
export type CreateWorkoutMutationResult = Apollo.MutationResult<CreateWorkoutMutation>;
export type CreateWorkoutMutationOptions = Apollo.BaseMutationOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>;
export const UpdateWorkoutDocument = gql`
    mutation UpdateWorkout($id: uuid!, $set: workout_set_input!) {
  update_workout_by_pk(pk_columns: {id: $id}, _set: $set) {
    id
    name
    description
    category
    difficulty
    estimated_duration_minutes
    is_favorite
    updated_at
  }
}
    `;
export type UpdateWorkoutMutationFn = Apollo.MutationFunction<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>;

/**
 * __useUpdateWorkoutMutation__
 *
 * To run a mutation, you first call `useUpdateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkoutMutation, { data, loading, error }] = useUpdateWorkoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>(UpdateWorkoutDocument, options);
      }
export type UpdateWorkoutMutationHookResult = ReturnType<typeof useUpdateWorkoutMutation>;
export type UpdateWorkoutMutationResult = Apollo.MutationResult<UpdateWorkoutMutation>;
export type UpdateWorkoutMutationOptions = Apollo.BaseMutationOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>;
export const AddExerciseToWorkoutDocument = gql`
    mutation AddExerciseToWorkout($workout_id: uuid!, $exercise_id: uuid!, $exercise_order: numeric!, $sets: Int!, $reps: Int, $duration: Int, $rest: Int!) {
  insert_workout_exercise_one(
    object: {workout_id: $workout_id, exercise_id: $exercise_id, exercise_order: $exercise_order, sets: $sets, reps: $reps, duration: $duration, rest: $rest}
  ) {
    workout_id
    exercise_id
    exercise_order
    sets
    reps
    duration
    rest
  }
}
    `;
export type AddExerciseToWorkoutMutationFn = Apollo.MutationFunction<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>;

/**
 * __useAddExerciseToWorkoutMutation__
 *
 * To run a mutation, you first call `useAddExerciseToWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExerciseToWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExerciseToWorkoutMutation, { data, loading, error }] = useAddExerciseToWorkoutMutation({
 *   variables: {
 *      workout_id: // value for 'workout_id'
 *      exercise_id: // value for 'exercise_id'
 *      exercise_order: // value for 'exercise_order'
 *      sets: // value for 'sets'
 *      reps: // value for 'reps'
 *      duration: // value for 'duration'
 *      rest: // value for 'rest'
 *   },
 * });
 */
export function useAddExerciseToWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>(AddExerciseToWorkoutDocument, options);
      }
export type AddExerciseToWorkoutMutationHookResult = ReturnType<typeof useAddExerciseToWorkoutMutation>;
export type AddExerciseToWorkoutMutationResult = Apollo.MutationResult<AddExerciseToWorkoutMutation>;
export type AddExerciseToWorkoutMutationOptions = Apollo.BaseMutationOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>;
export const UpdateWorkoutExerciseDocument = gql`
    mutation UpdateWorkoutExercise($workout_id: uuid!, $exercise_id: uuid!, $set: workout_exercise_set_input!) {
  update_workout_exercise_by_pk(
    pk_columns: {workout_id: $workout_id, exercise_id: $exercise_id}
    _set: $set
  ) {
    workout_id
    exercise_id
    exercise_order
    sets
    reps
    duration
    rest
  }
}
    `;
export type UpdateWorkoutExerciseMutationFn = Apollo.MutationFunction<UpdateWorkoutExerciseMutation, UpdateWorkoutExerciseMutationVariables>;

/**
 * __useUpdateWorkoutExerciseMutation__
 *
 * To run a mutation, you first call `useUpdateWorkoutExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkoutExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkoutExerciseMutation, { data, loading, error }] = useUpdateWorkoutExerciseMutation({
 *   variables: {
 *      workout_id: // value for 'workout_id'
 *      exercise_id: // value for 'exercise_id'
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdateWorkoutExerciseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkoutExerciseMutation, UpdateWorkoutExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkoutExerciseMutation, UpdateWorkoutExerciseMutationVariables>(UpdateWorkoutExerciseDocument, options);
      }
export type UpdateWorkoutExerciseMutationHookResult = ReturnType<typeof useUpdateWorkoutExerciseMutation>;
export type UpdateWorkoutExerciseMutationResult = Apollo.MutationResult<UpdateWorkoutExerciseMutation>;
export type UpdateWorkoutExerciseMutationOptions = Apollo.BaseMutationOptions<UpdateWorkoutExerciseMutation, UpdateWorkoutExerciseMutationVariables>;
export const RemoveExerciseFromWorkoutDocument = gql`
    mutation RemoveExerciseFromWorkout($workout_id: uuid!, $exercise_id: uuid!) {
  delete_workout_exercise_by_pk(
    workout_id: $workout_id
    exercise_id: $exercise_id
  ) {
    workout_id
    exercise_id
  }
}
    `;
export type RemoveExerciseFromWorkoutMutationFn = Apollo.MutationFunction<RemoveExerciseFromWorkoutMutation, RemoveExerciseFromWorkoutMutationVariables>;

/**
 * __useRemoveExerciseFromWorkoutMutation__
 *
 * To run a mutation, you first call `useRemoveExerciseFromWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveExerciseFromWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeExerciseFromWorkoutMutation, { data, loading, error }] = useRemoveExerciseFromWorkoutMutation({
 *   variables: {
 *      workout_id: // value for 'workout_id'
 *      exercise_id: // value for 'exercise_id'
 *   },
 * });
 */
export function useRemoveExerciseFromWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<RemoveExerciseFromWorkoutMutation, RemoveExerciseFromWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveExerciseFromWorkoutMutation, RemoveExerciseFromWorkoutMutationVariables>(RemoveExerciseFromWorkoutDocument, options);
      }
export type RemoveExerciseFromWorkoutMutationHookResult = ReturnType<typeof useRemoveExerciseFromWorkoutMutation>;
export type RemoveExerciseFromWorkoutMutationResult = Apollo.MutationResult<RemoveExerciseFromWorkoutMutation>;
export type RemoveExerciseFromWorkoutMutationOptions = Apollo.BaseMutationOptions<RemoveExerciseFromWorkoutMutation, RemoveExerciseFromWorkoutMutationVariables>;
export const CopyWorkoutFromLibraryDocument = gql`
    mutation CopyWorkoutFromLibrary($user_id: uuid!, $source_id: uuid!) {
  insert_workout_one(object: {user_id: $user_id, source_id: $source_id}) {
    id
    user_id
    source_id
    name
    description
    category
    difficulty
    estimated_duration_minutes
    created_at
    updated_at
  }
}
    `;
export type CopyWorkoutFromLibraryMutationFn = Apollo.MutationFunction<CopyWorkoutFromLibraryMutation, CopyWorkoutFromLibraryMutationVariables>;

/**
 * __useCopyWorkoutFromLibraryMutation__
 *
 * To run a mutation, you first call `useCopyWorkoutFromLibraryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCopyWorkoutFromLibraryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [copyWorkoutFromLibraryMutation, { data, loading, error }] = useCopyWorkoutFromLibraryMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      source_id: // value for 'source_id'
 *   },
 * });
 */
export function useCopyWorkoutFromLibraryMutation(baseOptions?: Apollo.MutationHookOptions<CopyWorkoutFromLibraryMutation, CopyWorkoutFromLibraryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CopyWorkoutFromLibraryMutation, CopyWorkoutFromLibraryMutationVariables>(CopyWorkoutFromLibraryDocument, options);
      }
export type CopyWorkoutFromLibraryMutationHookResult = ReturnType<typeof useCopyWorkoutFromLibraryMutation>;
export type CopyWorkoutFromLibraryMutationResult = Apollo.MutationResult<CopyWorkoutFromLibraryMutation>;
export type CopyWorkoutFromLibraryMutationOptions = Apollo.BaseMutationOptions<CopyWorkoutFromLibraryMutation, CopyWorkoutFromLibraryMutationVariables>;
export const ToggleFavoriteWorkoutDocument = gql`
    mutation ToggleFavoriteWorkout($id: uuid!, $is_favorite: Boolean!) {
  update_workout_by_pk(pk_columns: {id: $id}, _set: {is_favorite: $is_favorite}) {
    id
    is_favorite
  }
}
    `;
export type ToggleFavoriteWorkoutMutationFn = Apollo.MutationFunction<ToggleFavoriteWorkoutMutation, ToggleFavoriteWorkoutMutationVariables>;

/**
 * __useToggleFavoriteWorkoutMutation__
 *
 * To run a mutation, you first call `useToggleFavoriteWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavoriteWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFavoriteWorkoutMutation, { data, loading, error }] = useToggleFavoriteWorkoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *      is_favorite: // value for 'is_favorite'
 *   },
 * });
 */
export function useToggleFavoriteWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFavoriteWorkoutMutation, ToggleFavoriteWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFavoriteWorkoutMutation, ToggleFavoriteWorkoutMutationVariables>(ToggleFavoriteWorkoutDocument, options);
      }
export type ToggleFavoriteWorkoutMutationHookResult = ReturnType<typeof useToggleFavoriteWorkoutMutation>;
export type ToggleFavoriteWorkoutMutationResult = Apollo.MutationResult<ToggleFavoriteWorkoutMutation>;
export type ToggleFavoriteWorkoutMutationOptions = Apollo.BaseMutationOptions<ToggleFavoriteWorkoutMutation, ToggleFavoriteWorkoutMutationVariables>;
export const ArchiveWorkoutDocument = gql`
    mutation ArchiveWorkout($id: uuid!) {
  update_workout_by_pk(pk_columns: {id: $id}, _set: {is_archived: true}) {
    id
    is_archived
  }
}
    `;
export type ArchiveWorkoutMutationFn = Apollo.MutationFunction<ArchiveWorkoutMutation, ArchiveWorkoutMutationVariables>;

/**
 * __useArchiveWorkoutMutation__
 *
 * To run a mutation, you first call `useArchiveWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveWorkoutMutation, { data, loading, error }] = useArchiveWorkoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useArchiveWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveWorkoutMutation, ArchiveWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveWorkoutMutation, ArchiveWorkoutMutationVariables>(ArchiveWorkoutDocument, options);
      }
export type ArchiveWorkoutMutationHookResult = ReturnType<typeof useArchiveWorkoutMutation>;
export type ArchiveWorkoutMutationResult = Apollo.MutationResult<ArchiveWorkoutMutation>;
export type ArchiveWorkoutMutationOptions = Apollo.BaseMutationOptions<ArchiveWorkoutMutation, ArchiveWorkoutMutationVariables>;
export const StartWorkoutPerformanceDocument = gql`
    mutation StartWorkoutPerformance($user_id: uuid!, $workout_id: uuid!) {
  insert_workout_performance_one(
    object: {user_id: $user_id, workout_id: $workout_id, started_at: "now()"}
  ) {
    id
    user_id
    workout_id
    started_at
  }
}
    `;
export type StartWorkoutPerformanceMutationFn = Apollo.MutationFunction<StartWorkoutPerformanceMutation, StartWorkoutPerformanceMutationVariables>;

/**
 * __useStartWorkoutPerformanceMutation__
 *
 * To run a mutation, you first call `useStartWorkoutPerformanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartWorkoutPerformanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startWorkoutPerformanceMutation, { data, loading, error }] = useStartWorkoutPerformanceMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      workout_id: // value for 'workout_id'
 *   },
 * });
 */
export function useStartWorkoutPerformanceMutation(baseOptions?: Apollo.MutationHookOptions<StartWorkoutPerformanceMutation, StartWorkoutPerformanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartWorkoutPerformanceMutation, StartWorkoutPerformanceMutationVariables>(StartWorkoutPerformanceDocument, options);
      }
export type StartWorkoutPerformanceMutationHookResult = ReturnType<typeof useStartWorkoutPerformanceMutation>;
export type StartWorkoutPerformanceMutationResult = Apollo.MutationResult<StartWorkoutPerformanceMutation>;
export type StartWorkoutPerformanceMutationOptions = Apollo.BaseMutationOptions<StartWorkoutPerformanceMutation, StartWorkoutPerformanceMutationVariables>;