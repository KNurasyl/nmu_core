'use client'

import LessonCard from '@/components/cards/LessonCard'
import LessonPromo from '@/components/promo/LessonPromo'
import { GET_COURSE_BY_ID } from '@/graphql/course'
import {
	GetCourseByIdQuery,
	GetLessonsByCourseIdQuery,
} from '@/graphql/generated/graphql'
import { GET_LESSON_BY_COURSE } from '@/graphql/lesson'
import { useQuery } from '@apollo/client'
import { Spin } from 'antd'
import { useRouter } from 'next/navigation'

interface IProps {
	courseId: string
}

const thumbnail =
	'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1903347665-60d7ef3d9947f68dba83f0da0b4a8e093c5d09afb94a3407b0c27dceb3a607c1-d_100x75&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png'

const LessonList = ({ courseId }: IProps) => {
	const router = useRouter()

	const { data: courseData } = useQuery<GetCourseByIdQuery>(GET_COURSE_BY_ID, {
		variables: {
			id: courseId,
		},
	})

	const { data: lessonsData, loading } = useQuery<GetLessonsByCourseIdQuery>(
		GET_LESSON_BY_COURSE,
		{
			variables: {
				courseId,
			},
		}
	)

	const course = courseData?.getCourseById
	const lessons = lessonsData?.getLessonsByCourseId

	return (
		<Spin spinning={loading}>
			<LessonPromo
				courseName={course?.courseName}
				description={course?.description}
				progress={0}
			/>
			<div className='lesson_list'>
				{lessons?.map(lesson => (
					<LessonCard
						key={lesson._id}
						lessonName={lesson.lessonName}
						description={lesson.description}
						thumbnail={thumbnail}
						progress={0}
						onClick={() => router.push(`/lesson/${lesson._id}`)}
					/>
				))}
			</div>
		</Spin>
	)
}

export default LessonList
