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
import { toast } from 'react-toastify'

const CourseList = () => {
	const router = useRouter()
	const user = useAuthStore(state => state.user)
	const setCurrenCourseId = useTaskStore(state => state.setCurrenCourseId)

	const { data, loading } = useQuery<GetUserByIdQuery>(GET_USER_BY_ID, {
		variables: { id: user?._id },
	})

	const { data: courseProgressData, loading: progressCourseLoad } =
		useQuery<UserCourseProgressOptionalQuery>(USER_COURSE_PROGRESS_OPTIONAL, {
			variables: {
				userId: user?._id || '',
			},
			onError() {
				toast.error('Ошибка при получений прогресса')
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

	const onClickHandler = (id?: string) => {
		router.push(`/${id}`)
		setCurrenCourseId(id)
	}

	return (
		<Spin spinning={loading}>
			<div className='course_list'>
				{courseList?.map(course => (
					<CourseCard
						key={course._id}
						title={course.course.courseName}
						description={course?.course?.description}
						progress={course?.score}
						onClick={() => onClickHandler(course.course._id)}
					/>
				))}
			</div>
		</Spin>
	)
}

export default CourseList
