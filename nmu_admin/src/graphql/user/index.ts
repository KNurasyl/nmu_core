import { graphql } from '@/graphql/generated'

export const GET_USERS = graphql(
	'query GetUsers {\n  getUsers {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}'
)
export const GET_USER_BY_ID = graphql(
	'query GetUserById($id: String!) {\n  getUserById(id: $id) {\n    _id\n    phoneNumber\n    userName\n    userRole\n    courseAccesses {\n      _id\n      accessEndDate\n      accessStartDate\n      active\n      comment\n      course {\n        _id\n        courseName\n        description\n        lang\n      }\n    }\n  }\n}'
)
export const GET_USERS_PAGINATED = graphql(
	'query GetUsersPaginated($args: UserListArgs!) {\n  getUsersPaginated(args: $args) {\n    total\n    users {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}'
)
export const UPDATE_USER_BY_ID = graphql(
	'mutation UpdateUserById($input: UpdateUserInput!) {\n  updateUserById(updateUserInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}'
)
export const UPDATE_USER_PASSWORD = graphql(
	'mutation UpdateUserPassword($input: UpdatePasswordInput!) {\n  updateUserPassword(updatePasswordInput: $input) {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}'
)
export const CREATE_USER_COURSE_ACCESS = graphql(
	'mutation CreateUserCourseAccess($input: CreateUserCourseAccessInput!) {\n  createUserCourseAccess(createUserCourseAccessInput: $input) {\n    _id\n    accessStartDate\n    accessEndDate\n    active\n    comment\n  }\n}'
)
