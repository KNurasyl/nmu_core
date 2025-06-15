'use client'

import CourseCard from '@/components/cards/CourseCard'
import {
	GetUserByIdQuery,
	UserCourseProgressOptionalQuery,
} from '@/graphql/generated/graphql'
import { USER_COURSE_PROGRESS_OPTIONAL } from '@/graphql/progress'
import { GET_USER_BY_ID } from '@/graphql/user'
import { useAuthStore } from '@/stores/auth.store'
import { useTaskStore } from '@/stores/task.store'
import { useQuery } from '@apollo/client'
import { Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const CourseList = () => {
	const router = useRouter()
	const { t } = useTranslation('common')
	const user = useAuthStore(state => state.user)
	const { setCurrenCourseId, setTrialPeriod } = useTaskStore(state => state)

	const { data, loading } = useQuery<GetUserByIdQuery>(GET_USER_BY_ID, {
		variables: { id: user?._id },
	})

	const { data: courseProgressData, loading: progressCourseLoad } =
		useQuery<UserCourseProgressOptionalQuery>(USER_COURSE_PROGRESS_OPTIONAL, {
			variables: {
				userId: user?._id || '',
			},
		})

	const courseList = useMemo(
		() =>
			(data?.getUserById.courseAccesses ?? []).map(courseAccess => {
				const p = courseProgressData?.userCourseProgressOptional?.find(
					pr => pr.course?._id === courseAccess?.course?._id
				)

				return {
					...courseAccess,
					completed: p?.completed ?? false,
					score: p?.score ?? 0,
				}
			}),
		[courseProgressData, data]
	)

	const onClickHandler = (id?: string, trialPeriod?: boolean) => {
		router.push(`/${id}`)
		setCurrenCourseId(id)
		setTrialPeriod(trialPeriod || null)
	}

	return (
		<Spin spinning={loading || progressCourseLoad}>
			<div className='course_list'>
				{courseList?.map(course => (
					<CourseCard
						key={course._id}
						title={course.course.courseName}
						description={course?.course?.description}
						progress={course?.score}
						active={course?.active}
						trialPeriod={course?.trialPeriod}
						lockText={t('lock')}
						trialPeriodText={t('trialPeriodText')}
						onClick={() =>
							onClickHandler(course.course._id, course?.trialPeriod)
						}
					/>
				))}
			</div>
		</Spin>
	)
}

export default CourseList
