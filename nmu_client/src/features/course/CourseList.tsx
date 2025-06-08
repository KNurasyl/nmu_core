'use client'

import CourseCard from '@/components/cards/CourseCard'
import { GetUserByIdQuery } from '@/graphql/generated/graphql'
import { GET_USER_BY_ID } from '@/graphql/user'
import { useAuthStore } from '@/stores/auth.store'
import { useQuery } from '@apollo/client'
import { Spin } from 'antd'
import { useRouter } from 'next/navigation'

const CourseList = () => {
	const router = useRouter()
	const user = useAuthStore(state => state.user)

	const { data, loading } = useQuery<GetUserByIdQuery>(GET_USER_BY_ID, {
		variables: { id: user?._id },
	})

	const courseList = data?.getUserById?.courseAccesses

	return (
		<Spin spinning={loading}>
			<div className='course_list'>
				{courseList?.map(course => (
					<CourseCard
						key={course._id}
						title={course.course.courseName}
						description={course?.course?.description}
						progress={0}
						onClick={() => router.push(`/${course.course._id}`)}
					/>
				))}
			</div>
		</Spin>
	)
}

export default CourseList
