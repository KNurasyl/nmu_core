import { graphql } from '../generated'

export const GET_TASK_BY_ID = graphql(
	'query GetTaskById($id: String!) {\n  getTaskById(id: $id) {\n    _id\n    data\n    description {\n      kk\n      ru\n    }\n    lessonCode\n    type\n  }\n}'
)
export const CREATE_USER_TASK_PROGRESS = graphql(
	'mutation CreateUserTaskProgress($input: CreateUserTaskProgressInput!) {\n  createUserTaskProgress(createUserTaskProgressInput: $input) {\n    _id\n    completed\n    completedAt\n    score\n  }\n}'
)
