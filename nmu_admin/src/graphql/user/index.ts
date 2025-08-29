import { graphql } from '@/graphql/generated'

export const GET_USERS = graphql(
	'query GetUsers {\n  getUsers {\n    _id\n    phoneNumber\n    userName\n    userRole\n  }\n}'
)
export const GET_USER_MONITORING = graphql(
	'query GetMonitoring($args: UserMonitoringArgs!) {\n  getMonitoring(args: $args) {\n    total\n    items {\n      _id\n      lastActiveDate\n      lastActiveDays\n      lastActiveLesson\n      phoneNumber\n      userName\n      userRole\n      hasMentorSupport\n      isFrozen\n      freezes {\n        startDate\n        endDate\n      }\n      availableCourses {\n        accessEndDate\n        accessStartDate\n        courseId\n        courseName\n        trialPeriod\n      }\n      coursesProgress {\n        courseId\n        courseName\n        completedLessons\n        totalLessons\n        label\n      }\n    }\n  }\n}'
)
export const GET_USER_STATS = graphql(
	'query StudentStatistics {\n  studentStatistics {\n    activeStudents\n    frozenStudents\n    noMentorStudents\n    totalStudents\n    courseStudents {\n      count\n      course {\n        courseName\n        id\n      }\n    }\n  }\n}'
)
export const GET_USER_BY_ID = graphql(
	'query GetUserById($id: String!) {\n  getUserById(id: $id) {\n    _id\n    phoneNumber\n    userName\n    userRole\n    courseAccesses {\n      _id\n      accessEndDate\n      accessStartDate\n      active\n      comment\n      trialPeriod\n      course {\n        _id\n        courseName\n        description\n        lang\n      }\n    }\n  }\n}'
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
export const STOP_USER_MENTOR = graphql(
	'mutation StopUserMentorSupport($userId: String!) {\n  stopUserMentorSupport(userId: $userId) {\n    _id\n    hasMentorSupport\n  }\n}'
)
export const START_USER_MENTOR = graphql(
	'mutation StartUserMentorSupport($userId: String!) {\n  startUserMentorSupport(userId: $userId) {\n    _id\n    hasMentorSupport\n  }\n}'
)
export const FREEZE_USER = graphql(
	'mutation FreezeUser($input: FreezeUserInput!) {\n  freezeUser(input: $input) {\n    _id\n    isFrozen\n    freezes {\n      startDate\n      endDate\n    }\n  }\n}'
)
export const UNFREEZE_USER = graphql(
	'mutation UnfreezeUser($userId: String!) {\n  unfreezeUser(userId: $userId) {\n    _id\n    isFrozen\n    freezes {\n      startDate\n      endDate\n    }\n  }\n}'
)
