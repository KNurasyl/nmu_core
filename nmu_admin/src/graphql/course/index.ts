import { graphql } from '../generated'

export const GET_COURSES = graphql(
	'query GetCourses {\n  getCourses {\n    _id\n    courseName\n    description\n    lang\n  }\n}'
)
