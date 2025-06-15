import { graphql } from '@/graphql/generated'

export const LOGIN = graphql(
	'mutation Login($input: LoginInput!) {\n  login(input: $input) {\n    accessToken\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}'
)
export const REFRESH_TOKENS = graphql(
	'mutation RefreshTokens {\n  refreshTokens {\n    accessToken\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n  }\n}'
)
export const LOGOUT = graphql(
	'mutation Logout($userId: String!) {\n  logout(userId: $userId)\n}'
)
export const REGISTER = graphql(
	'mutation Register($input: RegisterInput!) {\n  register(input: $input) {\n    user {\n      _id\n      phoneNumber\n      userName\n      userRole\n    }\n    accessToken\n  }\n}'
)
