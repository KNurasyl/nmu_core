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
    "query GetCourseById($id: String!) {\n  getCourseById(id: $id) {\n    _id\n    courseName\n    description\n    lang\n  }\n}": typeof types.GetCourseByIdDocument,
    "query GetLessonById($id: String!) {\n  getLessonById(id: $id) {\n    _id\n    description\n    lang\n    lessonCode\n    lessonName\n    order\n    videoUrl\n    tasks {\n      _id\n      description\n      lessonCode\n      type\n    }\n  }\n}": typeof types.GetLessonByIdDocument,
    "query GetLessonsByCourseId($courseId: String!) {\n  getLessonsByCourseId(courseId: $courseId) {\n    _id\n    description\n    lang\n    lessonCode\n    lessonName\n    order\n    videoUrl\n  }\n}": typeof types.GetLessonsByCourseIdDocument,
    "query GetTaskById($id: String!) {\n  getTaskById(id: $id) {\n    _id\n    data\n    description\n    lessonCode\n    type\n  }\n}": typeof types.GetTaskByIdDocument,
    "query GetUserById($id: String!) {\n  getUserById(id: $id) {\n    _id\n    phoneNumber\n    userName\n    userRole\n    courseAccesses {\n      _id\n      accessEndDate\n      accessStartDate\n      active\n      comment\n      course {\n        _id\n        courseName\n        description\n        lang\n      }\n    }\n  }\n}": typeof types.GetUserByIdDocument,
    "mutation UpdateUserById($input: UpdateUserInput!) {\n  updateUserById(updateUserInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}": typeof types.UpdateUserByIdDocument,
    "mutation UpdateUserPassword($input: UpdatePasswordInput!) {\n  updateUserPassword(updatePasswordInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}": typeof types.UpdateUserPasswordDocument,
};
const documents: Documents = {
    "mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}": types.LoginDocument,
    "mutation Logout($userId: String!) {\n  logout(userId: $userId)\n}": types.LogoutDocument,
    "mutation RefreshTokens {\n  refreshTokens {\n    accessToken\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}": types.RefreshTokensDocument,
    "query GetCourseById($id: String!) {\n  getCourseById(id: $id) {\n    _id\n    courseName\n    description\n    lang\n  }\n}": types.GetCourseByIdDocument,
    "query GetLessonById($id: String!) {\n  getLessonById(id: $id) {\n    _id\n    description\n    lang\n    lessonCode\n    lessonName\n    order\n    videoUrl\n    tasks {\n      _id\n      description\n      lessonCode\n      type\n    }\n  }\n}": types.GetLessonByIdDocument,
    "query GetLessonsByCourseId($courseId: String!) {\n  getLessonsByCourseId(courseId: $courseId) {\n    _id\n    description\n    lang\n    lessonCode\n    lessonName\n    order\n    videoUrl\n  }\n}": types.GetLessonsByCourseIdDocument,
    "query GetTaskById($id: String!) {\n  getTaskById(id: $id) {\n    _id\n    data\n    description\n    lessonCode\n    type\n  }\n}": types.GetTaskByIdDocument,
    "query GetUserById($id: String!) {\n  getUserById(id: $id) {\n    _id\n    phoneNumber\n    userName\n    userRole\n    courseAccesses {\n      _id\n      accessEndDate\n      accessStartDate\n      active\n      comment\n      course {\n        _id\n        courseName\n        description\n        lang\n      }\n    }\n  }\n}": types.GetUserByIdDocument,
    "mutation UpdateUserById($input: UpdateUserInput!) {\n  updateUserById(updateUserInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}": types.UpdateUserByIdDocument,
    "mutation UpdateUserPassword($input: UpdatePasswordInput!) {\n  updateUserPassword(updatePasswordInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}": types.UpdateUserPasswordDocument,
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
export function graphql(source: "query GetCourseById($id: String!) {\n  getCourseById(id: $id) {\n    _id\n    courseName\n    description\n    lang\n  }\n}"): (typeof documents)["query GetCourseById($id: String!) {\n  getCourseById(id: $id) {\n    _id\n    courseName\n    description\n    lang\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetLessonById($id: String!) {\n  getLessonById(id: $id) {\n    _id\n    description\n    lang\n    lessonCode\n    lessonName\n    order\n    videoUrl\n    tasks {\n      _id\n      description\n      lessonCode\n      type\n    }\n  }\n}"): (typeof documents)["query GetLessonById($id: String!) {\n  getLessonById(id: $id) {\n    _id\n    description\n    lang\n    lessonCode\n    lessonName\n    order\n    videoUrl\n    tasks {\n      _id\n      description\n      lessonCode\n      type\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetLessonsByCourseId($courseId: String!) {\n  getLessonsByCourseId(courseId: $courseId) {\n    _id\n    description\n    lang\n    lessonCode\n    lessonName\n    order\n    videoUrl\n  }\n}"): (typeof documents)["query GetLessonsByCourseId($courseId: String!) {\n  getLessonsByCourseId(courseId: $courseId) {\n    _id\n    description\n    lang\n    lessonCode\n    lessonName\n    order\n    videoUrl\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTaskById($id: String!) {\n  getTaskById(id: $id) {\n    _id\n    data\n    description\n    lessonCode\n    type\n  }\n}"): (typeof documents)["query GetTaskById($id: String!) {\n  getTaskById(id: $id) {\n    _id\n    data\n    description\n    lessonCode\n    type\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserById($id: String!) {\n  getUserById(id: $id) {\n    _id\n    phoneNumber\n    userName\n    userRole\n    courseAccesses {\n      _id\n      accessEndDate\n      accessStartDate\n      active\n      comment\n      course {\n        _id\n        courseName\n        description\n        lang\n      }\n    }\n  }\n}"): (typeof documents)["query GetUserById($id: String!) {\n  getUserById(id: $id) {\n    _id\n    phoneNumber\n    userName\n    userRole\n    courseAccesses {\n      _id\n      accessEndDate\n      accessStartDate\n      active\n      comment\n      course {\n        _id\n        courseName\n        description\n        lang\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUserById($input: UpdateUserInput!) {\n  updateUserById(updateUserInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}"): (typeof documents)["mutation UpdateUserById($input: UpdateUserInput!) {\n  updateUserById(updateUserInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUserPassword($input: UpdatePasswordInput!) {\n  updateUserPassword(updatePasswordInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}"): (typeof documents)["mutation UpdateUserPassword($input: UpdatePasswordInput!) {\n  updateUserPassword(updatePasswordInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;