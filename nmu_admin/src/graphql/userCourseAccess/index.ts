import { graphql } from '../generated'

export const UPDATE_USER_COURSE_ACCESS = graphql(
	'mutation UpdateUserCourseAccess($input: UpdateUserCourseAccessInput!) {\n  updateUserCourseAccess(updateUserCourseAccessInput: $input) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    comment\n  }\n}'
)
export const SET_USER_COURSE_ACCESS_ACTIVE = graphql(
	'mutation SetUserCourseAccessActive($id: String!, $active: Boolean!) {\n  setUserCourseAccessActive(id: $id, active: $active) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    trialPeriod\n    comment\n  }\n}'
)
export const SET_USER_COURSE_ACCESS_TRIAL_PERIOD = graphql(
	'mutation SetUserCourseAccessTrialPeriod($id: String!, $trialPeriod: Boolean!) {\n  setUserCourseAccessTrialPeriod(id: $id, trialPeriod: $trialPeriod) {\n    _id\n    accessEndDate\n    accessStartDate\n    active\n    trialPeriod\n    comment\n  }\n}'
)
