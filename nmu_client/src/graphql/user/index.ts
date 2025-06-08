import { graphql } from '@/graphql/generated'

export const GET_USER_BY_ID = graphql(
	'query GetUserById($id: String!) {\n  getUserById(id: $id) {\n    _id\n    phoneNumber\n    userName\n    userRole\n    courseAccesses {\n      _id\n      accessEndDate\n      accessStartDate\n      active\n      comment\n      course {\n        _id\n        courseName\n        description\n        lang\n      }\n    }\n  }\n}'
)
export const UPDATE_USER_BY_ID = graphql(
	'mutation UpdateUserById($input: UpdateUserInput!) {\n  updateUserById(updateUserInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}'
)
export const UPDATE_USER_PASSWORD = graphql(
	'mutation UpdateUserPassword($input: UpdatePasswordInput!) {\n  updateUserPassword(updatePasswordInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}'
)
