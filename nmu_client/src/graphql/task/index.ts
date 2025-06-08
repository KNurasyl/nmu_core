import { graphql } from '../generated'

export const GET_TASK_BY_ID = graphql(
	'query GetTaskById($id: String!) {\n  getTaskById(id: $id) {\n    _id\n    data\n    description\n    lessonCode\n    type\n  }\n}'
)
