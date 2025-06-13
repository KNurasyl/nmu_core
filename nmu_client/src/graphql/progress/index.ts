import { graphql } from '../generated'

export const USER_TASK_PROGRESS_OPTIONAL = graphql(
	'query UserTaskProgressOptional($userId: String!) {\n  userTaskProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    task {\n      _id\n      lessonCode\n      type\n    }\n  }\n}'
)
