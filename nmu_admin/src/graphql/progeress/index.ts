import { graphql } from '../generated'

export const USER_TASK_PROGRESS_OPTIONAL = graphql(
	'query UserTaskProgressOptional($userId: String!) {\n  userTaskProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    task {\n      _id\n      lessonCode\n      type\n      description {\n        kk\n        ru\n      }\n    }\n  }\n}'
)
export const USER_LESSON_PROGRESS_OPTIONAL = graphql(
	'query UserLessonProgressOptional($userId: String!) {\n  userLessonProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    lesson {\n      _id\n      lessonCode\n      lessonName\n      description\n    }\n  }\n}'
)
export const USER_COURSE_PROGRESS_OPTIONAL = graphql(
	'query UserCourseProgressOptional($userId: String!) {\n  userCourseProgressOptional(userId: $userId) {\n    _id\n    completed\n    completedAt\n    score\n    course {\n      _id\n      courseName\n    }\n  }\n}'
)
