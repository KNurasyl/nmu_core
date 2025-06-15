/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}": typeof types.LoginDocument,
    "mutation Logout($userId: String!) {\n  logout(userId: $userId)\n}": typeof types.LogoutDocument,
    "mutation RefreshTokens {\n  refreshTokens {\n    accessToken\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}": typeof types.RefreshTokensDocument,
    "mutation Register($input: RegisterInput!) {\n  register(input: $input) {\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n    accessToken\n  }\n}": typeof types.RegisterDocument,
    "query GetCourses {\n  getCourses {\n    _id\n    courseName\n    description\n    lang\n  }\n}": typeof types.GetCoursesDocument,
    "query UserCourseProgressOptional($userId: String!) {\n  userCourseProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    course {\n      _id\n      courseName\n    }\n  }\n}": typeof types.UserCourseProgressOptionalDocument,
    "query UserLessonProgressOptional($userId: String!) {\n  userLessonProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    lesson {\n      _id\n      lessonCode\n      lessonName\n      description\n    }\n  }\n}": typeof types.UserLessonProgressOptionalDocument,
    "query UserTaskProgressOptional($userId: String!) {\n  userTaskProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    task {\n      _id\n      lessonCode\n      type\n      description {\n        kk\n        ru\n      }\n    }\n  }\n}": typeof types.UserTaskProgressOptionalDocument,
    "mutation CreateUserCourseAccess($input: CreateUserCourseAccessInput!) {\n  createUserCourseAccess(createUserCourseAccessInput: $input) {\n    _id\n    accessStartDate\n    accessEndDate\n    active\n    comment\n  }\n}": typeof types.CreateUserCourseAccessDocument,
    "query GetUserById($id: String!) {\n  getUserById(id: $id) {\n    _id\n    phoneNumber\n    userName\n    userRole\n    courseAccesses {\n      _id\n      accessEndDate\n      accessStartDate\n      active\n      comment\n      trialPeriod\n      course {\n        _id\n        courseName\n        description\n        lang\n      }\n    }\n  }\n}": typeof types.GetUserByIdDocument,
    "query GetUsersPaginated($args: UserListArgs!) {\n  getUsersPaginated(args: $args) {\n    total\n    users {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}": typeof types.GetUsersPaginatedDocument,
    "query GetUsers {\n  getUsers {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}": typeof types.GetUsersDocument,
    "mutation UpdateUserById($input: UpdateUserInput!) {\n  updateUserById(updateUserInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}": typeof types.UpdateUserByIdDocument,
    "mutation UpdateUserPassword($input: UpdatePasswordInput!) {\n  updateUserPassword(updatePasswordInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}": typeof types.UpdateUserPasswordDocument,
    "mutation SetUserCourseAccessActive($id: String!, $active: Boolean!) {\n  setUserCourseAccessActive(id: $id, active: $active) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    trialPeriod\n    comment\n  }\n}": typeof types.SetUserCourseAccessActiveDocument,
    "mutation SetUserCourseAccessTrialPeriod($id: String!, $trialPeriod: Boolean!) {\n  setUserCourseAccessTrialPeriod(id: $id, trialPeriod: $trialPeriod) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    trialPeriod\n    comment\n  }\n}": typeof types.SetUserCourseAccessTrialPeriodDocument,
    "mutation UpdateUserCourseAccess($input: UpdateUserCourseAccessInput!) {\n  updateUserCourseAccess(updateUserCourseAccessInput: $input) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    comment\n  }\n}": typeof types.UpdateUserCourseAccessDocument,
};
const documents: Documents = {
    "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout($userId: String!) {\n  logout(userId: $userId)\n}": types.LogoutDocument,
    "mutation RefreshTokens {\n  refreshTokens {\n    accessToken\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}": types.RefreshTokensDocument,
    "mutation Register($input: RegisterInput!) {\n  register(input: $input) {\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n    accessToken\n  }\n}": types.RegisterDocument,
    "query GetCourses {\n  getCourses {\n    _id\n    courseName\n    description\n    lang\n  }\n}": types.GetCoursesDocument,
    "query UserCourseProgressOptional($userId: String!) {\n  userCourseProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    course {\n      _id\n      courseName\n    }\n  }\n}": types.UserCourseProgressOptionalDocument,
    "query UserLessonProgressOptional($userId: String!) {\n  userLessonProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    lesson {\n      _id\n      lessonCode\n      lessonName\n      description\n    }\n  }\n}": types.UserLessonProgressOptionalDocument,
    "query UserTaskProgressOptional($userId: String!) {\n  userTaskProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    task {\n      _id\n      lessonCode\n      type\n      description {\n        kk\n        ru\n      }\n    }\n  }\n}": types.UserTaskProgressOptionalDocument,
    "mutation CreateUserCourseAccess($input: CreateUserCourseAccessInput!) {\n  createUserCourseAccess(createUserCourseAccessInput: $input) {\n    _id\n    accessStartDate\n    accessEndDate\n    active\n    comment\n  }\n}": types.CreateUserCourseAccessDocument,
    "query GetUserById($id: String!) {\n  getUserById(id: $id) {\n    _id\n    phoneNumber\n    userName\n    userRole\n    courseAccesses {\n      _id\n      accessEndDate\n      accessStartDate\n      active\n      comment\n      trialPeriod\n      course {\n        _id\n        courseName\n        description\n        lang\n      }\n    }\n  }\n}": types.GetUserByIdDocument,
    "query GetUsersPaginated($args: UserListArgs!) {\n  getUsersPaginated(args: $args) {\n    total\n    users {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}": types.GetUsersPaginatedDocument,
    "query GetUsers {\n  getUsers {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}": types.GetUsersDocument,
    "mutation UpdateUserById($input: UpdateUserInput!) {\n  updateUserById(updateUserInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}": types.UpdateUserByIdDocument,
    "mutation UpdateUserPassword($input: UpdatePasswordInput!) {\n  updateUserPassword(updatePasswordInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}": types.UpdateUserPasswordDocument,
    "mutation SetUserCourseAccessActive($id: String!, $active: Boolean!) {\n  setUserCourseAccessActive(id: $id, active: $active) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    trialPeriod\n    comment\n  }\n}": types.SetUserCourseAccessActiveDocument,
    "mutation SetUserCourseAccessTrialPeriod($id: String!, $trialPeriod: Boolean!) {\n  setUserCourseAccessTrialPeriod(id: $id, trialPeriod: $trialPeriod) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    trialPeriod\n    comment\n  }\n}": types.SetUserCourseAccessTrialPeriodDocument,
    "mutation UpdateUserCourseAccess($input: UpdateUserCourseAccessInput!) {\n  updateUserCourseAccess(updateUserCourseAccessInput: $input) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    comment\n  }\n}": types.UpdateUserCourseAccessDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}"): (typeof documents)["mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout($userId: String!) {\n  logout(userId: $userId)\n}"): (typeof documents)["mutation Logout($userId: String!) {\n  logout(userId: $userId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RefreshTokens {\n  refreshTokens {\n    accessToken\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}"): (typeof documents)["mutation RefreshTokens {\n  refreshTokens {\n    accessToken\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($input: RegisterInput!) {\n  register(input: $input) {\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n    accessToken\n  }\n}"): (typeof documents)["mutation Register($input: RegisterInput!) {\n  register(input: $input) {\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n    accessToken\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCourses {\n  getCourses {\n    _id\n    courseName\n    description\n    lang\n  }\n}"): (typeof documents)["query GetCourses {\n  getCourses {\n    _id\n    courseName\n    description\n    lang\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserCourseProgressOptional($userId: String!) {\n  userCourseProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    course {\n      _id\n      courseName\n    }\n  }\n}"): (typeof documents)["query UserCourseProgressOptional($userId: String!) {\n  userCourseProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    course {\n      _id\n      courseName\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserLessonProgressOptional($userId: String!) {\n  userLessonProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    lesson {\n      _id\n      lessonCode\n      lessonName\n      description\n    }\n  }\n}"): (typeof documents)["query UserLessonProgressOptional($userId: String!) {\n  userLessonProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    lesson {\n      _id\n      lessonCode\n      lessonName\n      description\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserTaskProgressOptional($userId: String!) {\n  userTaskProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    task {\n      _id\n      lessonCode\n      type\n      description {\n        kk\n        ru\n      }\n    }\n  }\n}"): (typeof documents)["query UserTaskProgressOptional($userId: String!) {\n  userTaskProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    task {\n      _id\n      lessonCode\n      type\n      description {\n        kk\n        ru\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateUserCourseAccess($input: CreateUserCourseAccessInput!) {\n  createUserCourseAccess(createUserCourseAccessInput: $input) {\n    _id\n    accessStartDate\n    accessEndDate\n    active\n    comment\n  }\n}"): (typeof documents)["mutation CreateUserCourseAccess($input: CreateUserCourseAccessInput!) {\n  createUserCourseAccess(createUserCourseAccessInput: $input) {\n    _id\n    accessStartDate\n    accessEndDate\n    active\n    comment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserById($id: String!) {\n  getUserById(id: $id) {\n    _id\n    phoneNumber\n    userName\n    userRole\n    courseAccesses {\n      _id\n      accessEndDate\n      accessStartDate\n      active\n      comment\n      trialPeriod\n      course {\n        _id\n        courseName\n        description\n        lang\n      }\n    }\n  }\n}"): (typeof documents)["query GetUserById($id: String!) {\n  getUserById(id: $id) {\n    _id\n    phoneNumber\n    userName\n    userRole\n    courseAccesses {\n      _id\n      accessEndDate\n      accessStartDate\n      active\n      comment\n      trialPeriod\n      course {\n        _id\n        courseName\n        description\n        lang\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUsersPaginated($args: UserListArgs!) {\n  getUsersPaginated(args: $args) {\n    total\n    users {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}"): (typeof documents)["query GetUsersPaginated($args: UserListArgs!) {\n  getUsersPaginated(args: $args) {\n    total\n    users {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUsers {\n  getUsers {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}"): (typeof documents)["query GetUsers {\n  getUsers {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUserById($input: UpdateUserInput!) {\n  updateUserById(updateUserInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}"): (typeof documents)["mutation UpdateUserById($input: UpdateUserInput!) {\n  updateUserById(updateUserInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUserPassword($input: UpdatePasswordInput!) {\n  updateUserPassword(updatePasswordInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}"): (typeof documents)["mutation UpdateUserPassword($input: UpdatePasswordInput!) {\n  updateUserPassword(updatePasswordInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SetUserCourseAccessActive($id: String!, $active: Boolean!) {\n  setUserCourseAccessActive(id: $id, active: $active) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    trialPeriod\n    comment\n  }\n}"): (typeof documents)["mutation SetUserCourseAccessActive($id: String!, $active: Boolean!) {\n  setUserCourseAccessActive(id: $id, active: $active) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    trialPeriod\n    comment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SetUserCourseAccessTrialPeriod($id: String!, $trialPeriod: Boolean!) {\n  setUserCourseAccessTrialPeriod(id: $id, trialPeriod: $trialPeriod) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    trialPeriod\n    comment\n  }\n}"): (typeof documents)["mutation SetUserCourseAccessTrialPeriod($id: String!, $trialPeriod: Boolean!) {\n  setUserCourseAccessTrialPeriod(id: $id, trialPeriod: $trialPeriod) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    trialPeriod\n    comment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUserCourseAccess($input: UpdateUserCourseAccessInput!) {\n  updateUserCourseAccess(updateUserCourseAccessInput: $input) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    comment\n  }\n}"): (typeof documents)["mutation UpdateUserCourseAccess($input: UpdateUserCourseAccessInput!) {\n  updateUserCourseAccess(updateUserCourseAccessInput: $input) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    comment\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;