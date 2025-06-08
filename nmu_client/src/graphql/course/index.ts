import { graphql } from '@/graphql/generated'

export const GET_COURSE_BY_ID = graphql(
	'query GetCourseById($id: String!) {\n  getCourseById(id: $id) {\n    _id\n    courseName\n    description\n    lang\n  }\n}'
)
