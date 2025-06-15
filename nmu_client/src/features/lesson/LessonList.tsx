'use client'

import LessonCard from '@/components/cards/LessonCard'
import LessonPromo from '@/components/promo/LessonPromo'
import { GET_COURSE_BY_ID } from '@/graphql/course'
import {
	GetCourseByIdQuery,
	GetLessonsByCourseIdQuery,
	UserCourseProgressByUserCourseQuery,
	UserLessonProgressOptionalQuery,
} from '@/graphql/generated/graphql'
import { GET_LESSON_BY_COURSE } from '@/graphql/lesson'
import {
	USER_COURSE_PROGRESS_BY_USER_COURSE,
	USER_LESSON_PROGRESS_OPTIONAL,
} from '@/graphql/progress'
import { useAuthStore } from '@/stores/auth.store'
import { useQuery } from '@apollo/client'
import { Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

interface IProps {
	courseId: string
}

const thumbnail =
	'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1903347665-60d7ef3d9947f68dba83f0da0b4a8e093c5d09afb94a3407b0c27dceb3a607c1-d_100x75&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png'

const LessonList = ({ courseId }: IProps) => {
	const router = useRouter()
	const user = useAuthStore(state => state.user)

	const { data: courseData, loading: courseLoad } =
		useQuery<GetCourseByIdQuery>(GET_COURSE_BY_ID, {
			variables: {
				id: courseId,
			},
		})

	const { data: courseProgressData, loading: progressCourseLoad } =
		useQuery<UserCourseProgressByUserCourseQuery>(
			USER_COURSE_PROGRESS_BY_USER_COURSE,
			{
				variables: {
					userId: user?._id || '',
					courseId: courseId,
				},
			}
		)

	const { data: lessonsData, loading } = useQuery<GetLessonsByCourseIdQuery>(
		GET_LESSON_BY_COURSE,
		{
			variables: {
				courseId,
			},
		}
	)

	const { data: lessonProgressData, loading: progressLessonLoad } =
		useQuery<UserLessonProgressOptionalQuery>(USER_LESSON_PROGRESS_OPTIONAL, {
			variables: {
				userId: user?._id || '',
			},
		})

	const lessons = useMemo(
		() =>
			(lessonsData?.getLessonsByCourseId ?? []).map(lesson => {
				const p = lessonProgressData?.userLessonProgressOptional?.find(
					pr => pr.lesson?._id === lesson?._id
				)

				return {
					...lesson,
					completed: p?.completed ?? false,
					score: p?.score ?? 0,
				}
			}),
		[lessonsData, lessonProgressData]
	)

	const courseProgress = courseProgressData?.userCourseProgressByUserCourse

	return (
		<Spin
			spinning={
				loading || progressCourseLoad || progressLessonLoad || courseLoad
			}
		>
			<LessonPromo
				courseName={courseData?.getCourseById?.courseName}
				description={courseData?.getCourseById?.description}
				progress={courseProgress?.score || 0}
			/>
			<div className='lesson_list'>
				{lessons?.map(lesson => (
					<LessonCard
						key={lesson._id}
						lessonName={lesson.lessonName}
						description={lesson.description}
						thumbnail={thumbnail}
						progress={lesson.score}
						completed={lesson.completed}
						onClick={() => router.push(`/lesson/${lesson._id}`)}
					/>
				))}
			</div>
		</Spin>
	)
}

export default LessonList
