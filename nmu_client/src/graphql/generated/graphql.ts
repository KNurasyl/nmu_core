/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type Course = {
  __typename?: 'Course';
  _id: Scalars['ID']['output'];
  courseName: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  lang: Scalars['String']['output'];
  lessons?: Maybe<Array<Maybe<Lesson>>>;
};

export type CourseInfoDto = {
  __typename?: 'CourseInfoDto';
  accessEndDate?: Maybe<Scalars['DateTime']['output']>;
  accessStartDate?: Maybe<Scalars['DateTime']['output']>;
  courseId: Scalars['String']['output'];
  courseName: Scalars['String']['output'];
  trialPeriod: Scalars['Boolean']['output'];
};

export type CourseProgressDto = {
  __typename?: 'CourseProgressDto';
  completedLessons: Scalars['Int']['output'];
  courseId: Scalars['String']['output'];
  courseName: Scalars['String']['output'];
  label: Scalars['String']['output'];
  totalLessons: Scalars['Int']['output'];
};

export type CreateCourseInput = {
  courseName: Scalars['String']['input'];
  description: Scalars['String']['input'];
  lang: Scalars['String']['input'];
};

export type CreateLessonInput = {
  course: Scalars['String']['input'];
  description: Scalars['String']['input'];
  lang: Scalars['String']['input'];
  lessonCode: Scalars['String']['input'];
  lessonName: Scalars['String']['input'];
  order: Scalars['Float']['input'];
  videoUrl: Scalars['String']['input'];
};

export type CreateTaskInput = {
  data?: InputMaybe<Scalars['JSONObject']['input']>;
  description: Scalars['String']['input'];
  lessonCode: Scalars['String']['input'];
  subType: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateUserCourseAccessInput = {
  accessEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  accessStartDate?: InputMaybe<Scalars['DateTime']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  course: Scalars['ID']['input'];
  trialPeriod?: InputMaybe<Scalars['Boolean']['input']>;
  user: Scalars['ID']['input'];
};

export type CreateUserCourseProgressInput = {
  completed?: Scalars['Boolean']['input'];
  /** Дата выполнения */
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  courseId: Scalars['ID']['input'];
  /** Оценка или процент выполнения (0–100) */
  score?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};

export type CreateUserInput = {
  mentorId?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  userName: Scalars['String']['input'];
  userRole: Scalars['String']['input'];
};

export type CreateUserLessonProgressInput = {
  completed?: Scalars['Boolean']['input'];
  /** Дата выполнения */
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  lessonId: Scalars['ID']['input'];
  /** Оценка или процент выполнения (0–100) */
  score?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};

export type CreateUserTaskProgressInput = {
  completed?: Scalars['Boolean']['input'];
  /** Дата выполнения */
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  courseId: Scalars['ID']['input'];
  elapsedTime?: InputMaybe<Scalars['String']['input']>;
  lessonId: Scalars['ID']['input'];
  results?: InputMaybe<Scalars['JSONObject']['input']>;
  /** Оценка или процент выполнения (0–100) */
  score?: InputMaybe<Scalars['Int']['input']>;
  taskId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Description = {
  __typename?: 'Description';
  kk: Scalars['String']['output'];
  ru: Scalars['String']['output'];
};

export type FreezeDto = {
  __typename?: 'FreezeDto';
  endDate: Scalars['DateTime']['output'];
  startDate: Scalars['DateTime']['output'];
};

export type FreezePeriod = {
  __typename?: 'FreezePeriod';
  endDate: Scalars['DateTime']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  startDate: Scalars['DateTime']['output'];
};

export type FreezeUserInput = {
  endDate: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Lesson = {
  __typename?: 'Lesson';
  _id: Scalars['ID']['output'];
  course: Course;
  description?: Maybe<Scalars['String']['output']>;
  lang: Scalars['String']['output'];
  lessonCode: Scalars['String']['output'];
  lessonName: Scalars['String']['output'];
  order: Scalars['Float']['output'];
  tasks?: Maybe<Array<Maybe<Task>>>;
  videoUrl?: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type MonitoringDto = {
  __typename?: 'MonitoringDto';
  _id: Scalars['String']['output'];
  availableCourses: Array<CourseInfoDto>;
  coursesProgress: Array<CourseProgressDto>;
  freezes?: Maybe<Array<FreezeDto>>;
  hasMentorSupport: Scalars['Boolean']['output'];
  isFrozen?: Maybe<Scalars['Boolean']['output']>;
  lastActiveDate?: Maybe<Scalars['DateTime']['output']>;
  lastActiveDays?: Maybe<Scalars['Int']['output']>;
  lastActiveLesson?: Maybe<Scalars['String']['output']>;
  phoneNumber: Scalars['String']['output'];
  userName: Scalars['String']['output'];
  userRole: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse: Course;
  createLesson: Lesson;
  createTask: Task;
  createUser: User;
  createUserCourseAccess: UserCourseAccess;
  createUserCourseProgress: UserCourseProgress;
  createUserLessonProgress: UserLessonProgress;
  createUserTaskProgress: UserTaskProgress;
  freezeUser: User;
  login: AuthResponse;
  logout: Scalars['Boolean']['output'];
  refreshTokens: AuthResponse;
  register: AuthResponse;
  removeCourseById: Course;
  removeLessonById: Lesson;
  removeTaskById: Task;
  removeUserById: User;
  removeUserCourseAccess: UserCourseAccess;
  removeUserCourseProgress: UserCourseProgress;
  removeUserLessonProgress: UserLessonProgress;
  removeUserTaskProgress: UserTaskProgress;
  seedUsers: Scalars['String']['output'];
  setUserCourseAccessActive: UserCourseAccess;
  setUserCourseAccessTrialPeriod: UserCourseAccess;
  setUserMentorSupport: User;
  startUserMentorSupport: User;
  stopUserMentorSupport: User;
  unfreezeUser: User;
  updateCourseById: Course;
  updateLessonById: Lesson;
  updateTaskById: Task;
  updateUserById: User;
  updateUserCourseAccess: UserCourseAccess;
  updateUserCourseProgress: UserCourseProgress;
  updateUserLessonProgress: UserLessonProgress;
  updateUserPassword: User;
  updateUserTaskProgress: UserTaskProgress;
};


export type MutationCreateCourseArgs = {
  createCourseInput: CreateCourseInput;
};


export type MutationCreateLessonArgs = {
  createLessonInput: CreateLessonInput;
};


export type MutationCreateTaskArgs = {
  createTaskInput: CreateTaskInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateUserCourseAccessArgs = {
  createUserCourseAccessInput: CreateUserCourseAccessInput;
};


export type MutationCreateUserCourseProgressArgs = {
  createUserCourseProgressInput: CreateUserCourseProgressInput;
};


export type MutationCreateUserLessonProgressArgs = {
  createUserLessonProgressInput: CreateUserLessonProgressInput;
};


export type MutationCreateUserTaskProgressArgs = {
  createUserTaskProgressInput: CreateUserTaskProgressInput;
};


export type MutationFreezeUserArgs = {
  input: FreezeUserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLogoutArgs = {
  userId: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveCourseByIdArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveLessonByIdArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveTaskByIdArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserCourseAccessArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserCourseProgressArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserLessonProgressArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserTaskProgressArgs = {
  id: Scalars['String']['input'];
};


export type MutationSetUserCourseAccessActiveArgs = {
  active: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
};


export type MutationSetUserCourseAccessTrialPeriodArgs = {
  id: Scalars['String']['input'];
  trialPeriod: Scalars['Boolean']['input'];
};


export type MutationSetUserMentorSupportArgs = {
  enabled: Scalars['Boolean']['input'];
  userId: Scalars['String']['input'];
};


export type MutationStartUserMentorSupportArgs = {
  userId: Scalars['String']['input'];
};


export type MutationStopUserMentorSupportArgs = {
  userId: Scalars['String']['input'];
};


export type MutationUnfreezeUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationUpdateCourseByIdArgs = {
  updateCourseInput: UpdateCourseInput;
};


export type MutationUpdateLessonByIdArgs = {
  updateLessonInput: UpdateLessonInput;
};


export type MutationUpdateTaskByIdArgs = {
  updateTaskInput: UpdateTaskInput;
};


export type MutationUpdateUserByIdArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateUserCourseAccessArgs = {
  updateUserCourseAccessInput: UpdateUserCourseAccessInput;
};


export type MutationUpdateUserCourseProgressArgs = {
  updateUserCourseProgressInput: UpdateUserCourseProgressInput;
};


export type MutationUpdateUserLessonProgressArgs = {
  updateUserLessonProgressInput: UpdateUserLessonProgressInput;
};


export type MutationUpdateUserPasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};


export type MutationUpdateUserTaskProgressArgs = {
  updateUserTaskProgressInput: UpdateUserTaskProgressInput;
};

export type Query = {
  __typename?: 'Query';
  getAllTasks: Array<Task>;
  getCourseById: Course;
  getCourses: Array<Course>;
  getLessonById: Lesson;
  getLessons: Array<Lesson>;
  getLessonsByCourseId: Array<Lesson>;
  getMonitoring: UserMonitoringPaginated;
  getTaskById: Task;
  getTasksByLesson: Array<Task>;
  getUserById: User;
  getUsers: Array<User>;
  getUsersPaginated: UserPaginated;
  userCourseAccess: UserCourseAccess;
  userCourseProgress: UserCourseProgress;
  userCourseProgressByUserCourse: UserCourseProgress;
  userCourseProgressOptional: Array<UserCourseProgress>;
  userLessonProgress: UserLessonProgress;
  userLessonProgressOptional: Array<UserLessonProgress>;
  userTaskProgress: UserTaskProgress;
  userTaskProgressOptional: Array<UserTaskProgress>;
};


export type QueryGetCourseByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetLessonByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetLessonsByCourseIdArgs = {
  courseId: Scalars['String']['input'];
};


export type QueryGetMonitoringArgs = {
  args: UserMonitoringArgs;
};


export type QueryGetTaskByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetTasksByLessonArgs = {
  lessonId: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUsersPaginatedArgs = {
  args: UserListArgs;
};


export type QueryUserCourseAccessArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserCourseProgressArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserCourseProgressByUserCourseArgs = {
  courseId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserCourseProgressOptionalArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUserLessonProgressArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserLessonProgressOptionalArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUserTaskProgressArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserTaskProgressOptionalArgs = {
  userId: Scalars['String']['input'];
};

export type RegisterInput = {
  mentorId?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  userName: Scalars['String']['input'];
  userRole: Scalars['String']['input'];
};

export type Task = {
  __typename?: 'Task';
  _id: Scalars['String']['output'];
  data: Scalars['JSONObject']['output'];
  description?: Maybe<Description>;
  lessonCode: Scalars['String']['output'];
  subType?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type UpdateCourseInput = {
  courseName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  lang?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLessonInput = {
  course?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  lang?: InputMaybe<Scalars['String']['input']>;
  lessonCode?: InputMaybe<Scalars['String']['input']>;
  lessonName?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Float']['input']>;
  videoUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type UpdateTaskInput = {
  data?: InputMaybe<Scalars['JSONObject']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  lessonCode?: InputMaybe<Scalars['String']['input']>;
  subType?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserCourseAccessInput = {
  accessEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  accessStartDate?: InputMaybe<Scalars['DateTime']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  course?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['String']['input'];
  trialPeriod?: InputMaybe<Scalars['Boolean']['input']>;
  user?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateUserCourseProgressInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Дата выполнения */
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['String']['input'];
  /** Оценка или процент выполнения (0–100) */
  score?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateUserInput = {
  id: Scalars['String']['input'];
  mentorId?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  userName?: InputMaybe<Scalars['String']['input']>;
  userRole?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserLessonProgressInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Дата выполнения */
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  lessonId?: InputMaybe<Scalars['ID']['input']>;
  /** Оценка или процент выполнения (0–100) */
  score?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateUserTaskProgressInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Дата выполнения */
  completedAt?: InputMaybe<Scalars['DateTime']['input']>;
  courseId?: InputMaybe<Scalars['ID']['input']>;
  elapsedTime?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  lessonId?: InputMaybe<Scalars['ID']['input']>;
  results?: InputMaybe<Scalars['JSONObject']['input']>;
  /** Оценка или процент выполнения (0–100) */
  score?: InputMaybe<Scalars['Int']['input']>;
  taskId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  courseAccesses?: Maybe<Array<UserCourseAccess>>;
  freezes?: Maybe<Array<FreezePeriod>>;
  hasMentorSupport?: Maybe<Scalars['Boolean']['output']>;
  isFrozen?: Maybe<Scalars['Boolean']['output']>;
  mentorId?: Maybe<Scalars['String']['output']>;
  phoneNumber: Scalars['String']['output'];
  userName: Scalars['String']['output'];
  userRole: Scalars['String']['output'];
};

export type UserCourseAccess = {
  __typename?: 'UserCourseAccess';
  _id: Scalars['ID']['output'];
  /** Дата окончания доступа */
  accessEndDate?: Maybe<Scalars['DateTime']['output']>;
  /** Дата начала доступа */
  accessStartDate?: Maybe<Scalars['DateTime']['output']>;
  active: Scalars['Boolean']['output'];
  /** Дополнительные примечания */
  comment?: Maybe<Scalars['String']['output']>;
  course: Course;
  trialPeriod: Scalars['Boolean']['output'];
  user: User;
};

export type UserCourseProgress = {
  __typename?: 'UserCourseProgress';
  _id: Scalars['ID']['output'];
  completed: Scalars['Boolean']['output'];
  /** Дата выполнения */
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  course: Course;
  /** Optional score or percent (0-100) */
  score?: Maybe<Scalars['Int']['output']>;
  user: User;
};

export type UserLessonProgress = {
  __typename?: 'UserLessonProgress';
  _id: Scalars['ID']['output'];
  completed: Scalars['Boolean']['output'];
  /** Дата выполнения */
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  lesson: Lesson;
  /** Optional score or percent (0-100) */
  score?: Maybe<Scalars['Int']['output']>;
  user: User;
};

export type UserListArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type UserMonitoringArgs = {
  courseId?: InputMaybe<Scalars['String']['input']>;
  idle?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  plan?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  todayOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserMonitoringPaginated = {
  __typename?: 'UserMonitoringPaginated';
  items: Array<MonitoringDto>;
  total: Scalars['Int']['output'];
};

export type UserPaginated = {
  __typename?: 'UserPaginated';
  total: Scalars['Int']['output'];
  users: Array<User>;
};

export type UserTaskProgress = {
  __typename?: 'UserTaskProgress';
  _id: Scalars['ID']['output'];
  completed: Scalars['Boolean']['output'];
  /** Дата выполнения */
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  elapsedTime?: Maybe<Scalars['String']['output']>;
  results: Scalars['JSONObject']['output'];
  /** Optional score or percent (0-100) */
  score?: Maybe<Scalars['Int']['output']>;
  task: Task;
  user: User;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, user: { __typename?: 'User', _id: string, phoneNumber: string, userName: string, userRole: string, isFrozen?: boolean | null, freezes?: Array<{ __typename?: 'FreezePeriod', endDate: any }> | null } } };

export type LogoutMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RefreshTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokensMutation = { __typename?: 'Mutation', refreshTokens: { __typename?: 'AuthResponse', accessToken: string, user: { __typename?: 'User', _id: string, phoneNumber: string, userName: string, userRole: string } } };

export type GetCourseByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetCourseByIdQuery = { __typename?: 'Query', getCourseById: { __typename?: 'Course', _id: string, courseName: string, description?: string | null, lang: string } };

export type GetLessonByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetLessonByIdQuery = { __typename?: 'Query', getLessonById: { __typename?: 'Lesson', _id: string, description?: string | null, lang: string, lessonCode: string, lessonName: string, order: number, videoUrl?: string | null, tasks?: Array<{ __typename?: 'Task', _id: string, lessonCode: string, type: string, description?: { __typename?: 'Description', kk: string, ru: string } | null } | null> | null } };

export type GetLessonsByCourseIdQueryVariables = Exact<{
  courseId: Scalars['String']['input'];
}>;


export type GetLessonsByCourseIdQuery = { __typename?: 'Query', getLessonsByCourseId: Array<{ __typename?: 'Lesson', _id: string, description?: string | null, lang: string, lessonCode: string, lessonName: string, order: number, videoUrl?: string | null }> };

export type UserCourseProgressByUserCourseQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  courseId?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserCourseProgressByUserCourseQuery = { __typename?: 'Query', userCourseProgressByUserCourse: { __typename?: 'UserCourseProgress', _id: string, completed: boolean, score?: number | null, completedAt?: any | null, course: { __typename?: 'Course', courseName: string, description?: string | null } } };

export type UserCourseProgressOptionalQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserCourseProgressOptionalQuery = { __typename?: 'Query', userCourseProgressOptional: Array<{ __typename?: 'UserCourseProgress', _id: string, completed: boolean, completedAt?: any | null, score?: number | null, course: { __typename?: 'Course', _id: string, courseName: string } }> };

export type UserLessonProgressOptionalQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserLessonProgressOptionalQuery = { __typename?: 'Query', userLessonProgressOptional: Array<{ __typename?: 'UserLessonProgress', _id: string, completed: boolean, completedAt?: any | null, score?: number | null, lesson: { __typename?: 'Lesson', _id: string, lessonCode: string, lessonName: string } }> };

export type UserTaskProgressOptionalQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type UserTaskProgressOptionalQuery = { __typename?: 'Query', userTaskProgressOptional: Array<{ __typename?: 'UserTaskProgress', _id: string, completed: boolean, completedAt?: any | null, score?: number | null, task: { __typename?: 'Task', _id: string, lessonCode: string, type: string } }> };

export type CreateUserTaskProgressMutationVariables = Exact<{
  input: CreateUserTaskProgressInput;
}>;


export type CreateUserTaskProgressMutation = { __typename?: 'Mutation', createUserTaskProgress: { __typename?: 'UserTaskProgress', _id: string, completed: boolean, completedAt?: any | null, score?: number | null } };

export type GetTaskByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetTaskByIdQuery = { __typename?: 'Query', getTaskById: { __typename?: 'Task', _id: string, data: any, lessonCode: string, type: string, description?: { __typename?: 'Description', kk: string, ru: string } | null } };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', _id: string, phoneNumber: string, userName: string, userRole: string, courseAccesses?: Array<{ __typename?: 'UserCourseAccess', _id: string, accessEndDate?: any | null, accessStartDate?: any | null, active: boolean, trialPeriod: boolean, comment?: string | null, course: { __typename?: 'Course', _id: string, courseName: string, description?: string | null, lang: string } }> | null } };

export type UpdateUserByIdMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserByIdMutation = { __typename?: 'Mutation', updateUserById: { __typename?: 'User', _id: string, phoneNumber: string, userName: string, userRole: string } };

export type UpdateUserPasswordMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword: { __typename?: 'User', _id: string, phoneNumber: string, userName: string, userRole: string } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userRole"}},{"kind":"Field","name":{"kind":"Name","value":"isFrozen"}},{"kind":"Field","name":{"kind":"Name","value":"freezes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userRole"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokensMutation, RefreshTokensMutationVariables>;
export const GetCourseByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCourseById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCourseById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"courseName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]} as unknown as DocumentNode<GetCourseByIdQuery, GetCourseByIdQueryVariables>;
export const GetLessonByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLessonById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLessonById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"lessonCode"}},{"kind":"Field","name":{"kind":"Name","value":"lessonName"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"videoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kk"}},{"kind":"Field","name":{"kind":"Name","value":"ru"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lessonCode"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<GetLessonByIdQuery, GetLessonByIdQueryVariables>;
export const GetLessonsByCourseIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLessonsByCourseId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLessonsByCourseId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}},{"kind":"Field","name":{"kind":"Name","value":"lessonCode"}},{"kind":"Field","name":{"kind":"Name","value":"lessonName"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"videoUrl"}}]}}]}}]} as unknown as DocumentNode<GetLessonsByCourseIdQuery, GetLessonsByCourseIdQueryVariables>;
export const UserCourseProgressByUserCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserCourseProgressByUserCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userCourseProgressByUserCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"courseName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<UserCourseProgressByUserCourseQuery, UserCourseProgressByUserCourseQueryVariables>;
export const UserCourseProgressOptionalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserCourseProgressOptional"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userCourseProgressOptional"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"courseName"}}]}}]}}]}}]} as unknown as DocumentNode<UserCourseProgressOptionalQuery, UserCourseProgressOptionalQueryVariables>;
export const UserLessonProgressOptionalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserLessonProgressOptional"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userLessonProgressOptional"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"lesson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"lessonCode"}},{"kind":"Field","name":{"kind":"Name","value":"lessonName"}}]}}]}}]}}]} as unknown as DocumentNode<UserLessonProgressOptionalQuery, UserLessonProgressOptionalQueryVariables>;
export const UserTaskProgressOptionalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserTaskProgressOptional"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userTaskProgressOptional"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"lessonCode"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<UserTaskProgressOptionalQuery, UserTaskProgressOptionalQueryVariables>;
export const CreateUserTaskProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserTaskProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserTaskProgressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserTaskProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserTaskProgressInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]} as unknown as DocumentNode<CreateUserTaskProgressMutation, CreateUserTaskProgressMutationVariables>;
export const GetTaskByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTaskById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTaskById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kk"}},{"kind":"Field","name":{"kind":"Name","value":"ru"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lessonCode"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetTaskByIdQuery, GetTaskByIdQueryVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userRole"}},{"kind":"Field","name":{"kind":"Name","value":"courseAccesses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"accessEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"accessStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"trialPeriod"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"course"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"courseName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"lang"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const UpdateUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userRole"}}]}}]}}]} as unknown as DocumentNode<UpdateUserByIdMutation, UpdateUserByIdMutationVariables>;
export const UpdateUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"userRole"}}]}}]}}]} as unknown as DocumentNode<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;