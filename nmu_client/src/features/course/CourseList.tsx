'use client'

import CourseCard from '@/components/cards/CourseCard'
import { GetUserByIdQuery } from '@/graphql/generated/graphql'
import { GET_USER_BY_ID } from '@/graphql/user'
import { useAuthStore } from '@/stores/auth.store'
import { useTaskStore } from '@/stores/task.store'
import { useQuery } from '@apollo/client'
import { Spin } from 'antd'
import { useRouter } from 'next/navigation'

const CourseList = () => {
	const router = useRouter()
	const user = useAuthStore(state => state.user)
	const setCurrenCourseId = useTaskStore(state => state.setCurrenCourseId)

	const { data, loading } = useQuery<GetUserByIdQuery>(GET_USER_BY_ID, {
		variables: { id: user?._id },
	})

	const courseList = data?.getUserById?.courseAccesses

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
						progress={0}
						onClick={() => onClickHandler(course.course._id)}
					/>
				))}
			</div>
		</Spin>
	)
}

export default CourseList
